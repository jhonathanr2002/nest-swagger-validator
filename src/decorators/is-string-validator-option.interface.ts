import { DefaultValidatorOption } from "./default-validator-option.interface";

export interface IsStringValidatorOption extends DefaultValidatorOption {
    minLength?: number,
    maxLength?: number,
    enum?: any[] | Record<string, any> | (() => (any[] | Record<string, any>)),
    options?: string[]
}
