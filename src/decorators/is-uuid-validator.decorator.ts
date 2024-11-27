import { IsUUID } from 'class-validator';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { ApiProperty } from '@nestjs/swagger';
import * as ValidatorJS from 'validator';
import { ErrorEnum } from '../enums/errors.enum';
import { IsUuidValidatorOption } from './is-uuid-validator-option.interface';

export function IsUuidValidator(uuidVersion: ValidatorJS.UUIDVersion, options?: IsUuidValidatorOption) {
    return function(target: NonNullable<unknown>, propertyKey: string) {
        const _options: IsUuidValidatorOption = options ?? {};

        if (_options.swaggerDocs === true) {
            ApiProperty()(target, propertyKey);
        }

        IsUUID(uuidVersion, {
            always: true,
            each: true,
            message: (validationArguments: ValidationArguments): string => {
                return JSON.stringify({
                    property: validationArguments.property,
                    messageCode: ErrorEnum.IS_NOT_UUID,
                    value: validationArguments.value,
                    args: {},
                });
            },
        })(target, propertyKey);
    };
}
