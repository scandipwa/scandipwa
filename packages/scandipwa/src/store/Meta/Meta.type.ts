/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { AnyAction } from 'redux';

export enum MetaActionType {
    UPDATE_META = 'UPDATE_META'
}

export type PageMeta = {
    default_title: string;
    title: string;
    default_description: string;
    description: string;
    default_keywords: string;
    keywords: string;
    title_prefix: string;
    title_suffix: string;
    status_code: string;
    canonical_url: string;
    robots: string;
};

export interface UpdateMetaAction extends AnyAction {
    type: MetaActionType.UPDATE_META;
    payload: Partial<PageMeta>;
}

export type MetaStore = Partial<PageMeta>;

declare module 'Util/Store/type' {
    export interface RootState {
        MetaReducer: MetaStore;
    }
}
