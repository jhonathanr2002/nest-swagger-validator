"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNumberValidator = IsNumberValidator;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var errors_enum_1 = require("../enums/errors.enum");
function IsNumberValidator(options) {
    return function (target, propertyKey) {
        var _a, _b, _c;
        var _options = options !== null && options !== void 0 ? options : {};
        if (_options.swaggerDocs === true) {
            (0, swagger_1.ApiProperty)()(target, propertyKey);
        }
        (0, class_validator_1.IsNumber)({
            allowNaN: (_a = _options.allowNaN) !== null && _a !== void 0 ? _a : false,
            allowInfinity: (_b = _options.allowInfinity) !== null && _b !== void 0 ? _b : false,
            maxDecimalPlaces: (_c = _options.maxDecimalPlaces) !== null && _c !== void 0 ? _c : 0
        }, {
            message: function (validationArguments) {
                return JSON.stringify({
                    property: validationArguments.property,
                    messageCode: errors_enum_1.ErrorEnum.IS_NOT_NUMBER,
                    value: validationArguments.value,
                    args: {}
                });
            }
        })(target, propertyKey);
    };
}
