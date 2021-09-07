type LoggerStyle = {
    file: (text: string) => string,
    command: (text: string) => string,
    misc: (text: string) => string
};

export interface ILogger {
    warn(...messages: string[]): void;
    error(...messages: string[]): void;
    note(...messages: string[]): void;
    log(...messages: string[]): void;

    style: LoggerStyle
}

export type EnquiryOption<Y> = { displayName: string, value: Y };

export interface IUserInteraction {
    singleSelect<T>(
        question: string,
        selectOptions: EnquiryOption<T>[]
    ): Promise<T | null>;

    multiSelect<T>(
        question: string,
        selectOptions: EnquiryOption<T>[]
    ): Promise<T[] | null>;

    yesNo(question: string): Promise<boolean>;
}


export type ReplacementInstruction = {
    pattern: RegExp | string,
    replacement: string
};
