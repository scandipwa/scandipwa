import { ActionType } from '../types';
import { selectModuleWithHistory } from '../util/cwd';

export const SOURCE_MODULE = 'sourceModule';
export const TARGET_MODULE = 'targetModule';

const SOURCE_MODULE_DESCRIPTION = 'source';
const TARGET_MODULE_DESCRIPTION = 'target';

const getModule = async (
    description: string, 
    moduleKey: string,
    skipOption?: string,
    additionalHistoryEntries?: string[],
    allowedModuleTypes?: string[]
): Promise<string | null | undefined> => {
    const modulePath = await selectModuleWithHistory(
        `Select ${description} module`,
        moduleKey,
        skipOption,
        additionalHistoryEntries,
        allowedModuleTypes
    );

    if (!modulePath && !skipOption) {
        throw new Error(`A ${description} module must have been selected!`);
    }

    return modulePath;
}

export const getTargetModule = (
    actionType: ActionType,
    additionalHistoryEntries?: string[],
    allowedModuleTypes?: string[]
) => {
    // If only one proposal - use it by default
    if (additionalHistoryEntries?.length === 1) {
        return additionalHistoryEntries[0];
    }

    return getModule(
        TARGET_MODULE_DESCRIPTION, 
        [actionType, TARGET_MODULE].join('').toUpperCase(), 
        undefined,
        additionalHistoryEntries,
        allowedModuleTypes
    );
}

export const getSourceModule = (
    actionType: ActionType,
    isSkippable?: boolean,
    additionalHistoryEntries?: string[]
) => getModule(
    SOURCE_MODULE_DESCRIPTION, 
    [actionType, SOURCE_MODULE].join('').toUpperCase(), 
    isSkippable ? 'Determine by Fallback plugin (recommended)' : undefined,
    additionalHistoryEntries
);