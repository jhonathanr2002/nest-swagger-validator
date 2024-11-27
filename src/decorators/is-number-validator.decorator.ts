import { IsNumber } from 'class-validator';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';

import { ApiProperty } from '@nestjs/swagger';
import { IsNumberValidatorOption } from './is-number-validator-option.interface';
import { ErrorEnum } from '../enums/errors.enum';

export function IsNumberValidator(options?: IsNumberValidatorOption) {
    return function(target: NonNullable<unknown>, propertyKey: string) {
        const _options: IsNumberValidatorOption = options ?? {};

        if (_options.swaggerDocs === true) {
            ApiProperty()(target, propertyKey);
        }

        IsNumber({
            allowNaN: _options.allowNaN ?? false,
            allowInfinity: _options.allowInfinity ?? false,
            maxDecimalPlaces: _options.maxDecimalPlaces ?? 0,
        }, {
            message: (validationArguments: ValidationArguments): string => {
                return JSON.stringify({
                    property: validationArguments.property,
                    messageCode: ErrorEnum.IS_NOT_NUMBER,
                    value: validationArguments.value,
                    args: {},
                });
            },
        })(target, propertyKey);
    };
}
