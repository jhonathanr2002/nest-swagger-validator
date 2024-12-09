import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsBoolean,
    IsDateString,
    IsIn,
    IsNumber,
    IsString,
    IsUUID,
    MaxLength,
    MinLength
} from 'class-validator';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { ApiProperty } from '@nestjs/swagger';
import { ErrorEnum } from '../enums/errors.enum';
import ValidatorOption, {
    IArrayValidatorOption,
    INumberValidatorOption,
    IStringValidatorOption,
    IUuidValidatorOption,
    IValidatorOption
} from "./validator-option.interface";

export function IsValidator(options: ValidatorOption) {
    return function (target: NonNullable<unknown>, propertyKey: string) {
        if (options.swaggerDocs === true) {
            const _options = options as IValidatorOption;
            if (_options['stringOptions'] && _options['stringOptions']['enum']) {
                if (typeof _options['apiPropertyOptions'] !== "object" || (typeof _options['apiPropertyOptions'] === "object" && !_options['apiPropertyOptions']['enum'])) {
                    if (!_options['apiPropertyOptions']) {
                        _options['apiPropertyOptions'] = {};
                    }

                    _options['apiPropertyOptions']['enum'] = options['stringOptions']['enum'];
                }
            }

            if (typeof _options['apiPropertyOptions'] == "object") {
                ApiProperty(_options['apiPropertyOptions'])(target, propertyKey);
            } else {
                ApiProperty()(target, propertyKey);
            }
        }

        if (options.ruleType === "array") {
            const _options = options as IArrayValidatorOption;

            IsArray({
                always: true,
                each: true,
                message: (validationArguments: ValidationArguments): string => {
                    return JSON.stringify({
                        property: validationArguments.property,
                        messageCode: ErrorEnum.IS_NOT_ARRAY,
                        value: validationArguments.value,
                        args: {},
                    });
                },
            })(target, propertyKey);

            if (typeof _options.arrayOptions.min === 'number') {
                ArrayMinSize(_options.arrayOptions.min, {
                    message: (validationArguments: ValidationArguments): string => {
                        return JSON.stringify({
                            property: validationArguments.property,
                            messageCode: ErrorEnum.MIN_ARRAY_LENGTH,
                            value: validationArguments.value,
                            args: [_options.arrayOptions.min, validationArguments.value],
                        });
                    },
                })(target, propertyKey);
            }

            if (typeof _options.arrayOptions.max === 'number') {
                ArrayMaxSize(_options.arrayOptions.max, {
                    message: (validationArguments: ValidationArguments): string => {
                        return JSON.stringify({
                            property: validationArguments.property,
                            messageCode: ErrorEnum.MAX_ARRAY_LENGTH,
                            value: validationArguments.value,
                            args: [_options.arrayOptions.max, validationArguments.value],
                        });
                    },
                })(target, propertyKey);
            }
        }

        if (options.ruleType === "boolean") {
            IsBoolean({
                always: true,
                each: true,
                message: (validationArguments: ValidationArguments): string => {
                    return JSON.stringify({
                        property: validationArguments.property,
                        messageCode: ErrorEnum.IS_NOT_BOOLEAN,
                        value: validationArguments.value,
                        args: {},
                    });
                },
            })(target, propertyKey);
        } else if (options.ruleType === "date") {
            IsDateString({
                strict: true,
                strictSeparator: true,
            }, {
                always: true,
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
        } else if (options.ruleType === "number") {
            const _options = options as INumberValidatorOption;
            IsNumber(_options.numberOptions, {
                always: true,
                each: true,
                message: (validationArguments: ValidationArguments): string => {
                    return JSON.stringify({
                        property: validationArguments.property,
                        messageCode: ErrorEnum.IS_NOT_NUMBER,
                        value: validationArguments.value,
                        args: {},
                    });
                },
            })(target, propertyKey);
        } else if (options.ruleType === "string") {
            const _options = options as IStringValidatorOption;

            IsString({
                always: true,
                each: true,
                message: (validationArguments: ValidationArguments): string => {
                    return JSON.stringify({
                        property: validationArguments.property,
                        messageCode: ErrorEnum.IS_NOT_NUMBER,
                        value: validationArguments.value,
                        args: {},
                    });
                },
            })(target, propertyKey);

            if (_options.stringOptions.enum) {
                IsIn(Object.values(_options.stringOptions.enum), {
                    always: true,
                    each: true,
                    message: (validationArguments: ValidationArguments): string => {
                        return JSON.stringify({
                            property: validationArguments.property,
                            messageCode: ErrorEnum.ONLY_OPTIONS,
                            value: validationArguments.value,
                            args: [Object.values(_options.stringOptions.enum)?.join(', ')],
                        });
                    },
                })(target, propertyKey);
            }

            if (typeof _options.stringOptions.minLength === 'number') {
                MinLength(_options.stringOptions.minLength, {
                    always: true,
                    each: true,
                    message: (validationArguments: ValidationArguments): string => {
                        return JSON.stringify({
                            property: validationArguments.property,
                            messageCode: ErrorEnum.MIN_LENGTH,
                            value: validationArguments.value,
                            args: [_options.stringOptions.minLength, validationArguments.value],
                        });
                    },
                })(target, propertyKey);
            }

            if (typeof _options.stringOptions.maxLength === 'number') {
                MaxLength(_options.stringOptions.maxLength, {
                    always: true,
                    each: true,
                    message: (validationArguments: ValidationArguments): string => {
                        return JSON.stringify({
                            property: validationArguments.property,
                            messageCode: ErrorEnum.MAX_LENGTH,
                            value: validationArguments.value,
                            args: [_options.stringOptions.maxLength, validationArguments.value],
                        });
                    },
                })(target, propertyKey);
            }
        } else if (options.ruleType === "uuid") {
            const _options = options as IUuidValidatorOption;
            IsUUID(_options.uuidOptions.version, {
                always: true,
                each: true,
                message: (validationArguments: ValidationArguments): string => {
                    return JSON.stringify({
                        property: validationArguments.property,
                        messageCode: ErrorEnum.IS_NOT_UUID,
                        value: validationArguments.value,
                        args: {},
                    });
                },
            })(target, propertyKey);
        }
    };
}
