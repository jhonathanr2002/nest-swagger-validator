import * as ValidatorJS from 'validator';
import {ApiPropertyOptions} from "@nestjs/swagger";
import {IsNumberOptions} from "class-validator";

export interface IValidatorOption {
    ruleType: "boolean" | "date" | "number" | "string" | "uuid" | "array" | "property";
    name?: string
    apiPropertyOptions?: ApiPropertyOptions
}

export interface IBooleanValidatorOption extends IValidatorOption {
    ruleType: "boolean";
}

export interface IPropertyValidatorOption extends IValidatorOption {
    ruleType: "property";
    apiPropertyOptions: ApiPropertyOptions
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
        type?: Function;
        itemsRules?: InternalValidatorOption;
        min?: number;
        max?: number;
    }
}

type InternalValidatorOption =
    IArrayValidatorOption
    | IBooleanValidatorOption
    | IDateValidatorOption
    | INumberValidatorOption
    | IStringValidatorOption
    | IUuidValidatorOption
    | IPropertyValidatorOption;

export default InternalValidatorOption;