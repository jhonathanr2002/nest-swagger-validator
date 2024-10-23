import { DefaultValidatorOption } from "./default-validator-option.interface";

export interface IsNumberValidatorOption extends DefaultValidatorOption {
    allowNaN?: boolean,
    allowInfinity?: boolean,
    maxDecimalPlaces?: number
}
