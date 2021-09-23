import * as fs from 'fs';
import ContextManager from './managers/context';
import { 
    SKIP as skipSymbol,
    NONE as noneSymbol,
    HALT as haltSymbol
} from './cwd/keys';
import UI from './ui';

export const getStorage = <T>(storageKey: string, defaultValue?: any): T => {
    const context = ContextManager.getInstance().getContext();

    return context.workspaceState.get(storageKey, defaultValue);
}

/**
 * Returns false if SKIP
 * Returns null if NONE
 * Returns value if value 
 */
export const proposeFromHistory = async (
    storageKey: string,
    message: string,
    noneOption?: string,
    skipOption?: string,
    additionalHistoryEntries: string[] = []
): Promise<string | Symbol | null> => {
    const targetHistory = getStorage<string>(storageKey, []);
    
    // Handle no history
    if (!targetHistory.length && !additionalHistoryEntries.length) {
        return null;
    }

    // Additional options initialization
    const NONE = noneOption || 'None of the above';
    const SKIP = skipOption;

    // Additional options addition
    const selectOptions: string[] = [...new Set([
        SKIP!,
        ...targetHistory,
        ...additionalHistoryEntries,
        NONE
    ].filter(Boolean))];

    // Attempt to serve option from the history
    const resultFromHistory = await UI.singleSelect<string>(message, selectOptions);

    if (resultFromHistory === null) {
        return haltSymbol;
    }

    // Handle "None from the above"
    if (resultFromHistory === NONE) {
        return noneSymbol;
    }

    // Handle skip option selected
    if (resultFromHistory === SKIP) {
        return skipSymbol;
    }

    // Proposed option has been selected => return
    return resultFromHistory;
}

const updateHistory = <T> (
    storageKey: string, 
    newValue: T, 
    updater: (history: T[], newValue: T) => T[]
) => {
    const context = ContextManager.getInstance().getContext();
    const targetHistory = getStorage<T[]>(storageKey, []);

    const updatedHistory = updater(targetHistory, newValue);

    return context.workspaceState.update(storageKey, updatedHistory);
}

export const pushToHistory = async <T> (storageKey: string, newValue: T) => {
    return updateHistory<T>(
        storageKey, 
        newValue, 
        (history: T[], newValue: T) => [...history, newValue]
    );
}

export const unshiftToHistory = async <T> (storageKey: string, newValue: T) => {
    return updateHistory<T>(
        storageKey, 
        newValue, 
        (history: T[], newValue: T) => [newValue, ...history]
    );
}

const dedupeHistory = <T> (history: T[]) => [...new Set(history)];

export const unshiftUniqueToHistory = async <T> (storageKey: string, newValue: T) => {
    return updateHistory<T>(
        storageKey, 
        newValue, 
        (history: T[], newValue: T) => dedupeHistory([newValue, ...history])
    );
}

export const pushUniqueToHistory = async <T> (storageKey: string, newValue: T) => {
    return updateHistory<T>(
        storageKey, 
        newValue, 
        (history: T[], newValue: T) => dedupeHistory([...history, newValue])
    );
}

export const removeDeadFsEntries = async (storageKey: string) => {
    return updateHistory<string>(
        storageKey,
        '',
        (history: string[]) => history.filter(
            (pathname: string) => fs.existsSync(pathname)
        )
    )
}