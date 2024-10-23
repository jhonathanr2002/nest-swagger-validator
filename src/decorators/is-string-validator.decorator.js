"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStringValidator = IsStringValidator;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var errors_enum_1 = require("../enums/errors.enum");
function IsStringValidator(options) {
    return function (target, propertyKey) {
        var _options = options !== null && options !== void 0 ? options : {};
        if (_options.swaggerDocs === true) {
            if (Array.isArray(_options.options)) {
                (0, swagger_1.ApiProperty)({
                    enum: _options.options,
                    type: _options.options
                })(target, propertyKey);
            }
            else if (_options.enum) {
                _options.options = Object.values(_options.enum);
                (0, swagger_1.ApiProperty)({
                    enum: _options.enum
                })(target, propertyKey);
            }
            else {
                (0, swagger_1.ApiProperty)()(target, propertyKey);
            }
        }
        (0, class_validator_1.IsString)({
            //always: true,
            each: true,
            message: function (validationArguments) {
                return JSON.stringify({
                    property: validationArguments.property,
                    messageCode: errors_enum_1.ErrorEnum.IS_NOT_STRING,
                    value: validationArguments.value,
                    args: []
                });
            }
        })(target, propertyKey);
        if (Array.isArray(_options.options)) {
            (0, class_validator_1.IsIn)(_options.options, {
                always: true,
                message: function (validationArguments) {
                    var _a;
                    return JSON.stringify({
                        property: validationArguments.property,
                        messageCode: errors_enum_1.ErrorEnum.ONLY_OPTIONS,
                        value: validationArguments.value,
                        args: [(_a = _options.options) === null || _a === void 0 ? void 0 : _a.join(", ")]
                    });
                }
            })(target, propertyKey);
        }
        if (typeof _options.minLength === "number") {
            (0, class_validator_1.MinLength)(_options.minLength, {
                always: true,
                message: function (validationArguments) {
                    return JSON.stringify({
                        property: validationArguments.property,
                        messageCode: errors_enum_1.ErrorEnum.MIN_LENGTH,
                        value: validationArguments.value,
                        args: [_options.minLength, validationArguments.value]
                    });
                }
            })(target, propertyKey);
        }
        if (typeof _options.maxLength === "number") {
            (0, class_validator_1.MaxLength)(_options.maxLength, {
                always: true,
                message: function (validationArguments) {
                    return JSON.stringify({
                        property: validationArguments.property,
                        messageCode: errors_enum_1.ErrorEnum.MAX_LENGTH,
                        value: validationArguments.value,
                        args: [_options.maxLength, validationArguments.value]
                    });
                }
            })(target, propertyKey);
        }
    };
}
