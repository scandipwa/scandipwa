import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';

import { ValidationData } from './type';
import { ValidationResult } from './Validator';

/** @namespace Util/Validator/ValidateOneEvent/validateOnEvent */
export const validateOnEvent = (
    hook: (...hookArgs: any[]) => void,
    validate: (data?: ValidationData) => boolean | ValidationResult,
    formRef: HTMLElement | null,
    {
        attr,
        type
    }: {
        attr: Record<string, string>,
        type: FIELD_TYPE
    }
) => (): void => {
    if (hook) {
        const { value } = formRef as unknown as { value: string } || {};
        hook(...[{
            ...attr, formRef, value, type
        }]);
    }
    validate();
};
