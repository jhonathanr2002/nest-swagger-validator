import {IsStringValidatorOption} from './is-string-validator-option.interface';
import {IsIn, IsString, MaxLength, MinLength} from 'class-validator';
import {ValidationArguments} from 'class-validator/types/validation/ValidationArguments';
import {ApiProperty} from '@nestjs/swagger';
import {ErrorEnum} from '../enums/errors.enum';

export function IsStringValidator(options?: Partial<IsStringValidatorOption>) {
    return function (target: NonNullable<unknown>, propertyKey: string) {
        const _options: IsStringValidatorOption = options ?? {};
        if (_options.swaggerDocs === true) {
            if (Array.isArray(_options.options)) {
                ApiProperty({
                    enum: _options.options,
                    type: _options.options,
                })(target, propertyKey);
            } else if (_options.enum) {
                _options.options = Object.values(_options.enum);

                ApiProperty({
                    enum: _options.enum,
                })(target, propertyKey);
            } else {
                ApiProperty()(target, propertyKey);
            }
        }

        IsString({
            //always: true,
            each: true,
            message: (validationArguments: ValidationArguments): string => {
                return JSON.stringify({
                    property: validationArguments.property,
                    messageCode: ErrorEnum.IS_NOT_STRING,
                    value: validationArguments.value,
                    args: [],
                });
            },
        })(target, propertyKey);

        if (Array.isArray(_options.options)) {
            IsIn(_options.options, {
                always: true,
                message: (validationArguments: ValidationArguments): string => {
                    return JSON.stringify({
                        property: validationArguments.property,
                        messageCode: ErrorEnum.ONLY_OPTIONS,
                        value: validationArguments.value,
                        args: [_options.options?.join(', ')],
                    });
                },
            })(target, propertyKey);
        }

        if (typeof _options.minLength === 'number') {
            MinLength(_options.minLength, {
                always: true,
                message: (validationArguments: ValidationArguments): string => {
                    return JSON.stringify({
                        property: validationArguments.property,
                        messageCode: ErrorEnum.MIN_LENGTH,
                        value: validationArguments.value,
                        args: [_options.minLength, validationArguments.value],
                    });
                },
            })(target, propertyKey);
        }

        if (typeof _options.maxLength === 'number') {
            MaxLength(_options.maxLength, {
                always: true,
                message: (validationArguments: ValidationArguments): string => {
                    return JSON.stringify({
                        property: validationArguments.property,
                        messageCode: ErrorEnum.MAX_LENGTH,
                        value: validationArguments.value,
                        args: [_options.maxLength, validationArguments.value],
                    });
                },
            })(target, propertyKey);
        }
    };
}
