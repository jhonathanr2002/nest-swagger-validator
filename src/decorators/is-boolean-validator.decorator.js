"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBooleanValidator = IsBooleanValidator;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var errors_enum_1 = require("../enums/errors.enum");
function IsBooleanValidator(options) {
    return function (target, propertyKey) {
        var _options = options !== null && options !== void 0 ? options : {};
        if (_options.swaggerDocs === true) {
            (0, swagger_1.ApiProperty)()(target, propertyKey);
        }
        (0, class_validator_1.IsBoolean)({
            always: true,
            message: function (validationArguments) {
                return JSON.stringify({
                    property: validationArguments.property,
                    messageCode: errors_enum_1.ErrorEnum.IS_NOT_BOOLEAN,
                    value: validationArguments.value,
                    args: {}
                });
            }
        })(target, propertyKey);
    };
}
