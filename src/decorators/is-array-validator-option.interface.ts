import { Type } from '@nestjs/common';
import { DefaultValidatorOption } from "./default-validator-option.interface";

export interface IsArrayValidatorOption extends DefaultValidatorOption {
    type?: Type<unknown> | Function | [Function] | string | Record<string, any>;
    enum?: any[] | Record<string, any> | (() => (any[] | Record<string, any>));
    min?: number;
    max?: number
}
