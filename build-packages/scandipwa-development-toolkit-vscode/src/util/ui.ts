import { IUserInteraction, EnquiryOption } from '@scandipwa/scandipwa-development-toolkit-core';
import * as vscode from 'vscode';

type SelectItem<T> = {
    label: string;
    target: string | T;
}

const transformSelectOptions = <T>(
    selectOptions: (EnquiryOption<T>|string)[]
): SelectItem<T>[] => selectOptions.map(
    (val) => {
        if (typeof val === 'string') {
            return { label: val, target: val }
        }

        const { displayName, value } = val;
        return { label: displayName, target: value };
    }
);

class UI implements IUserInteraction {
    private async select<T>(
        question: string,
        selectOptions: (EnquiryOption<T>|string)[],
        isMultiSelect: boolean
    ): Promise<T | T[] | null | string> {
        if (!selectOptions.length) {
            throw new Error('Select options must have been supplied!');
        }

        const selected = await vscode.window.showQuickPick(
            transformSelectOptions(selectOptions), 
            {
                placeHolder: question,
                canPickMany: isMultiSelect
            }
        );

        if (!selected) {
            return null;
        }

        if (!Array.isArray(selected)) {
            if (typeof selected === 'string') {
                return selected;
            }

            return (selected).target;
        }

        return selected.map(
            (option: { label: string, target: T}) => option.target
        );
    }

    singleSelect<T>(
        question: string,
        selectOptions: EnquiryOption<T>[] | string[]
    ): Promise<T | null> {
        return this.select<T>(question, selectOptions, false) as Promise<T | null>;
    };

    multiSelect<T>(
        question: string,
        selectOptions: EnquiryOption<T>[] | string[]
    ): Promise<T[] | null> {
        return this.select<T>(question, selectOptions, true) as Promise<T[] | null>;
    };

    async yesNo(question: string): Promise<boolean> {
        const YES = 'Yes';
        const NO = 'No';

        const choice = await vscode.window.showQuickPick([YES, NO], {
            canPickMany: false,
            placeHolder: question
        })

        return choice === YES;
    };

    async input(question: string): Promise<string | null> {
        const result = await vscode.window.showInputBox({
            prompt: question
        });

        if (result === undefined) {
            return null;
        }

        return result;
    }
}

export default new UI();