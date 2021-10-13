import { VALIDATION_INPUT_TYPE } from './Config';
import { ValidationResult } from './Validator';

export interface ValidationRule {
    isRequired?: boolean
    inputType: keyof VALIDATION_INPUT_TYPE
    match?: ((value?: string | boolean | { name: string; value: string | boolean, type: string }[]) => boolean) | RegExp
    range?: {
        min: number
        max: number
    }
    customErrorMessages?: {
        onRequirementFail?: string
        onInputTypeFail?: string
        onMatchFail?: string
        onRangeFailMin?: string
        onRangeFailMax?: string
        onGroupFail?: string
    }
    selector?: string
}

export interface ValidationData {
    errors: {
        name: string
        value: string
        type: string
    }[]
    detail?: {
        errors: (ValidationResult | boolean)[]
    }
}
