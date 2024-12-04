import { HttpStatus, ValidationError } from '@nestjs/common';
import { Duration, getHttpStatusDescription, ResponseDto, ResponseErrorDto } from 'nest-clean-response';
import { ErrorEnum } from '../enums/errors.enum';

export default function exceptionFactorySwagger(oErrors: ValidationError[]) {
    const oErrorsClient: ResponseErrorDto[] = [];

    oErrors.forEach((oError) => {
        for (const oDetail in oError.constraints) {
            let sKeyError = '';

            for (const key of Object.values(ErrorEnum) as string[]) {
                if (oDetail.includes(key)) {
                    sKeyError = key;
                }
            }

            if (sKeyError.length === 0) {
                sKeyError = 'propertyNoExist';
            }

            oErrorsClient.push(new ResponseErrorDto(oError.property, sKeyError, [oError.value]));
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