import { GraphQlResponse } from '.';

export const checkForErrors = (res: GraphQlResponse): unknown | never => {
    const { errors, data } = res;

    if (errors) {
        throw errors;
    }

    return data;
};

interface IError {
    message: string
}

export const parseError = (error: string | IError | IError[]): string => {
    if (typeof error === 'string') {
        return error;
    }

    if (Array.isArray(error)) {
        return error[0].message;
    }

    if (error.message) {
        return error.message;
    }

    return 'Something went wrong';
};

export const parseResponse = (response: GraphQlResponse): any => {
    try {
        return checkForErrors(response);
    } catch (e) {
        // throw new, formatted error instead
        throw new Error(parseError(e as Error));
    }
};
