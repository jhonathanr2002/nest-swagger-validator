import { IsBoolean } from "class-validator";
import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";
import { ApiProperty } from "@nestjs/swagger";
import { IsBooleanValidatorOption } from "./is-boolean-validator-option.interface";
import { ErrorEnum } from "../enums/errors.enum";

export function IsBooleanValidator(options?: Partial<IsBooleanValidatorOption>) {
    return function (target: NonNullable<unknown>, propertyKey: string) {
        const _options: IsBooleanValidatorOption = options ?? {};

        if (_options.swaggerDocs === true) {
            ApiProperty()(target, propertyKey);
        }

        IsBoolean({
            always: true,
            message: (validationArguments: ValidationArguments): string => {
                return JSON.stringify({
                    property: validationArguments.property,
                    messageCode: ErrorEnum.IS_NOT_BOOLEAN,
                    value: validationArguments.value,
                    args: {}
                });
            }
        })(target, propertyKey);
    };
}
