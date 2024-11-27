import { IsDateString } from 'class-validator';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';

import { ApiProperty } from '@nestjs/swagger';
import { IsDateValidatorOption } from './is-date-validator-option.interface';
import { ErrorEnum } from '../enums/errors.enum';

export function IsDateValidator(options?: IsDateValidatorOption) {
    return function(target: NonNullable<unknown>, propertyKey: string) {
        const _options: IsDateValidatorOption = options ?? {};

        if (_options.swaggerDocs === true) {
            ApiProperty()(target, propertyKey);
        }

        IsDateString({
            strict: true,
            strictSeparator: true,
        }, {
            each: true,
            message: (validationArguments: ValidationArguments): string => {
                return JSON.stringify({
                    property: validationArguments.property,
                    messageCode: ErrorEnum.IS_NOT_DATE,
                    value: validationArguments.value,
                    args: {},
                });
            },
        })(target, propertyKey);
    };
}
