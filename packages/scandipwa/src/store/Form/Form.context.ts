import { createContext, useContext } from 'react';

export enum InputType {
    TEXT = 'text',
    CHECKBOX = 'checkbox',
    DATE = 'date',
    NUMBER = 'number',
    RANGE = 'range',
    RADIO = 'radio',
    EMAIL = 'email',
    TEXTAREA = 'textarea'
}

export interface HandleFormChangeOptions {
    name: string
    type: InputType
    required?: boolean
    validate?: (value: unknown) => boolean
}

export interface FormContextType {
    formValues: Record<string, unknown>
    handleFormChange: (options: HandleFormChangeOptions) => (e: Event) => void
}

export const FormContext = createContext<FormContextType>({
    formValues: {},
    handleFormChange: () => () => {}
});

/** @namespace Store/Form/Context/useFormContext */
export const useFormContext = (): FormContextType => useContext(FormContext);
