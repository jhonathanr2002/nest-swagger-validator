import { ArrayMaxSize, ArrayMinSize, IsArray } from 'class-validator';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';

import { ApiProperty } from '@nestjs/swagger';
import { IsArrayValidatorOption } from './is-array-validator-option.interface';
import { ErrorEnum } from '../enums/errors.enum';

export function IsArrayValidator(options?: IsArrayValidatorOption) {
    return function(target: NonNullable<unknown>, propertyKey: string) {
        const _options: IsArrayValidatorOption = options ?? {};

        if (_options.swaggerDocs === true) {
            ApiProperty({
                isArray: true,
                type: _options.type,
                enum: _options.enum,
            })(target, propertyKey);
        }

        IsArray({
            always: true,
            message: (validationArguments: ValidationArguments): string => {
                return JSON.stringify({
                    property: validationArguments.property,
                    messageCode: ErrorEnum.IS_NOT_ARRAY,
                    value: validationArguments.value,
                    args: {},
                });
            },
        })(target, propertyKey);

        if (typeof _options.min === 'number') {
            ArrayMinSize(_options.min, {
                //always: true,
                //each: true,
                message: (validationArguments: ValidationArguments): string => {
                    return JSON.stringify({
                        property: validationArguments.property,
                        messageCode: ErrorEnum.MIN_ARRAY_LENGTH,
                        value: validationArguments.value,
                        args: [_options.min, validationArguments.value],
                    });
                },
            })(target, propertyKey);
        }

        if (typeof _options.max === 'number') {
            ArrayMaxSize(_options.max, {
                //always: true,
                //each: true,
                message: (validationArguments: ValidationArguments): string => {
                    return JSON.stringify({
                        property: validationArguments.property,
                        messageCode: ErrorEnum.MAX_ARRAY_LENGTH,
                        value: validationArguments.value,
                        args: [_options.max, validationArguments.value],
                    });
                },
            })(target, propertyKey);
        }
    };
}
