import InternalValidatorOption from "./internal-validator-option.interface";

type ValidatorOption =
    InternalValidatorOption & {swaggerDocs: boolean};

export default ValidatorOption;