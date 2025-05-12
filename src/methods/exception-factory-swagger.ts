import {HttpStatus, ValidationError} from '@nestjs/common';
import {Duration, ErrorEnum, getHttpStatusDescription, ResponseDto, ResponseErrorDto} from 'nest-clean-response';

function getErrors(_oErrors: ValidationError[]): ValidationError[]{
    let oErrors: ValidationError[] = [];

    for (let oError of _oErrors) {
        oErrors.push(oError);

        if (Array.isArray(oError.children)) {
            oErrors = oErrors.concat(getErrors(oError.children.map((oItem) => {
                oItem.property = `${oError.property}.${oItem.property}`;
                return oItem;
            })));
        }
    }

    return oErrors;
}

export default function exceptionFactorySwagger(_oErrors: ValidationError[]) {
    const oErrorsClient: ResponseErrorDto[] = [];

    let oErrors: ValidationError[] = getErrors(_oErrors);

    oErrors.forEach((oError: ValidationError) => {
        for (const oDetail in oError.constraints) {
            let sKeyError = '';

            for (const key of Object.values(ErrorEnum) as string[]) {
                if (oError.constraints[oDetail].includes(key)) {
                    sKeyError = key;
                    oErrorsClient.push(JSON.parse(oError.constraints[oDetail]));
                    continue;
                }
            }

            if (sKeyError.length === 0) {
                sKeyError = 'propertyNoExist';
                oErrorsClient.push(new ResponseErrorDto(oError.property, sKeyError, [oError.value]));
            }
        }
    });

    return new ResponseDto<null>(
        HttpStatus.BAD_REQUEST,
        getHttpStatusDescription(HttpStatus.BAD_REQUEST),
        null,
        Duration.getDuration(new Date().getTime()).toObject(),
        oErrorsClient,
    );
}