import * as ValidatorJS from 'validator';
import { Type } from '@nestjs/common';
import { ApiPropertyOptions } from "@nestjs/swagger";
import { IsNumberOptions } from "class-validator";

export interface IValidatorOption {
    swaggerDocs: boolean;
    ruleType: "boolean" | "date" | "number" | "string" | "uuid" | "array";
    apiPropertyOptions?: ApiPropertyOptions
}

export interface IBooleanValidatorOption extends IValidatorOption {
    ruleType: "boolean";
}

export interface IDateValidatorOption extends IValidatorOption {
    ruleType: "date";
}

export interface INumberValidatorOption extends IValidatorOption {
    ruleType: "number";
    numberOptions: IsNumberOptions;
}

export interface IStringValidatorOption extends IValidatorOption {
    ruleType: "string";
    stringOptions: {
        minLength?: number,
        maxLength?: number,
        enum?: any[] | Record<string, any> | (() => (any[] | Record<string, any>)),
    },
}

export interface IUuidValidatorOption extends IValidatorOption {
    ruleType: "uuid";
    uuidOptions: {
        version: ValidatorJS.UUIDVersion
    }
}

export interface IArrayValidatorOption extends IValidatorOption {
    ruleType: "array";
    arrayOptions: {
        type: Type<unknown> | Function | [Function] | string | Record<string, any> | "uuid";
        min?: number;
        max?: number;
    }
}

type ValidatorOption =
    IArrayValidatorOption
    | IBooleanValidatorOption
    | IDateValidatorOption
    | INumberValidatorOption
    | IStringValidatorOption
    | IUuidValidatorOption;

export default ValidatorOption;