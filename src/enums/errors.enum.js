"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorEnum = void 0;
var ErrorEnum;
(function (ErrorEnum) {
    ErrorEnum["IS_NOT_STRING"] = "isNotString";
    ErrorEnum["MIN_LENGTH"] = "minLength";
    ErrorEnum["MAX_LENGTH"] = "maxLength";
    ErrorEnum["ONLY_OPTIONS"] = "onlyOptions";
    ErrorEnum["IS_NOT_NUMBER"] = "isNotNumber";
    ErrorEnum["IS_NOT_UUID"] = "isNotUuid";
    ErrorEnum["IS_NOT_BOOLEAN"] = "isNotBoolean";
    ErrorEnum["IS_ARRAY"] = "isArray";
    ErrorEnum["IS_NOT_ARRAY"] = "isNotArray";
    ErrorEnum["MIN_ARRAY_LENGTH"] = "minArrayLength";
    ErrorEnum["MAX_ARRAY_LENGTH"] = "maxArrayLength";
    ErrorEnum["IS_NOT_DATE"] = "isNotDate";
})(ErrorEnum || (exports.ErrorEnum = ErrorEnum = {}));
