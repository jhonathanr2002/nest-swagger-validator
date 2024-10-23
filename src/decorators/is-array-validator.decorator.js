"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayValidator = IsArrayValidator;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var errors_enum_1 = require("../enums/errors.enum");
function IsArrayValidator(options) {
    return function (target, propertyKey) {
        var _options = options !== null && options !== void 0 ? options : {};
        if (_options.swaggerDocs === true) {
            (0, swagger_1.ApiProperty)({
                isArray: true,
                type: _options.type,
                enum: _options.enum
            })(target, propertyKey);
        }
        (0, class_validator_1.IsArray)({
            always: true,
            message: function (validationArguments) {
                return JSON.stringify({
                    property: validationArguments.property,
                    messageCode: errors_enum_1.ErrorEnum.IS_NOT_ARRAY,
                    value: validationArguments.value,
                    args: {}
                });
            }
        })(target, propertyKey);
        if (typeof _options.min === "number") {
            (0, class_validator_1.ArrayMinSize)(_options.min, {
                //always: true,
                //each: true,
                message: function (validationArguments) {
                    return JSON.stringify({
                        property: validationArguments.property,
                        messageCode: errors_enum_1.ErrorEnum.MIN_ARRAY_LENGTH,
                        value: validationArguments.value,
                        args: [_options.min, validationArguments.value]
                    });
                }
            })(target, propertyKey);
        }
        if (typeof _options.max === "number") {
            (0, class_validator_1.ArrayMaxSize)(_options.max, {
                //always: true,
                //each: true,
                message: function (validationArguments) {
                    return JSON.stringify({
                        property: validationArguments.property,
                        messageCode: errors_enum_1.ErrorEnum.MAX_ARRAY_LENGTH,
                        value: validationArguments.value,
                        args: [_options.max, validationArguments.value]
                    });
                }
            })(target, propertyKey);
        }
    };
}
