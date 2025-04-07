import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsBoolean,
    IsDateString,
    IsIn,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
    ValidateNested
} from 'class-validator';
import {Type} from 'class-transformer';
import {ValidationArguments} from 'class-validator/types/validation/ValidationArguments';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import InternalValidatorOption, {
    IArrayValidatorOption,
    INumberValidatorOption,
    IStringValidatorOption, IUuidValidatorOption, IValidatorOption
} from "./internal-validator-option.interface";
import ValidatorOption from "./validator-option.interface";
import {ErrorEnum} from "nest-clean-response";

function IsValidatorRules(options: InternalValidatorOption, target: NonNullable<unknown>, propertyKey: string){
    if(!options){
        return;
    }

    if (options.ruleType === "array") {
        const _options = options as IArrayValidatorOption;

        IsArray({
            message: (validationArguments: ValidationArguments): string => {
                return JSON.stringify({
                    property: validationArguments.property,
                    messageCode: ErrorEnum.IS_NOT_ARRAY,
                    value: validationArguments.value,
                    args: [options.name ?? propertyKey, validationArguments.value],
                });
            },
        })(target, propertyKey);

        if (_options.arrayOptions.type) {
            ValidateNested({each: true})(target, propertyKey);
            Type(() => _options.arrayOptions.type)(target, propertyKey);
        }

        IsValidatorRules(_options.arrayOptions.itemsRules, target, propertyKey);

        if (typeof _options.arrayOptions.min === 'number') {
            ArrayMinSize(_options.arrayOptions.min, {
                message: (validationArguments: ValidationArguments): string => {
                    return JSON.stringify({
                        property: validationArguments.property,
                        messageCode: ErrorEnum.MIN_ARRAY_LENGTH,
                        value: validationArguments.value,
                        args: [options.name ?? propertyKey, _options.arrayOptions.min, validationArguments.value],
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
                        args: [options.name ?? propertyKey, _options.arrayOptions.max, validationArguments.value],
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
                    args: [options.name ?? propertyKey, validationArguments.value],
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
                    args: [options.name ?? propertyKey, validationArguments.value],
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
                    args: [options.name ?? propertyKey, validationArguments.value],
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
                    messageCode: ErrorEnum.IS_NOT_STRING,
                    value: validationArguments.value,
                    args: [options.name ?? propertyKey, validationArguments.value],
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
                        args: [options.name ?? propertyKey, Object.values(_options.stringOptions.enum)?.join(', '), validationArguments.value],
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
                        args: [options.name ?? propertyKey, _options.stringOptions.minLength, validationArguments.value],
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
                        args: [options.name ?? propertyKey, _options.stringOptions.maxLength, validationArguments.value],
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
                    args: [options.name ?? propertyKey, validationArguments.value],
                });
            },
        })(target, propertyKey);
    }
}

export function IsValidator(options: ValidatorOption) {
    return function (target: NonNullable<unknown>, propertyKey: string) {
        if (!(typeof options.apiPropertyOptions == "object")) {
            options.apiPropertyOptions = {};
        }

        if (typeof options.apiPropertyOptions.required !== "boolean") {
            (options.apiPropertyOptions.required as unknown as boolean) = true;
        }

        if (options.swaggerDocs === true) {
            const _options = options as IValidatorOption;

            if (_options['stringOptions'] && _options['stringOptions']['enum']) {
                if (typeof _options['apiPropertyOptions'] !== "object" || (typeof _options['apiPropertyOptions'] === "object" && !_options['apiPropertyOptions']['enum'])) {
                    _options['apiPropertyOptions']['enum'] = () => _options['stringOptions']['enum'];
                }
            }

            if (_options['arrayOptions']) {
                _options['apiPropertyOptions']['isArray'] = true;

                if (_options['arrayOptions']['type'] === "uuid" || typeof _options['arrayOptions']['enum'] !== "undefined") {
                    _options['apiPropertyOptions']['type'] = String;
                } else {
                    _options['apiPropertyOptions']['type'] = _options['arrayOptions']['type'];
                }
            }

            if (_options['apiPropertyOptions'].required === true) {
                ApiProperty(_options['apiPropertyOptions'])(target, propertyKey);
            } else {
                ApiPropertyOptional(_options['apiPropertyOptions'])(target, propertyKey);

                IsOptional({
                    always: true,
                    each: true,
                    message: (validationArguments: ValidationArguments): string => {
                        return JSON.stringify({
                            property: validationArguments.property,
                            messageCode: ErrorEnum.IS_OPTIONAL,
                            value: validationArguments.value,
                            args: [options.name ?? propertyKey],
                        });
                    },
                })(target, propertyKey);
            }
        }

        IsValidatorRules(options, target, propertyKey)
    };
}
