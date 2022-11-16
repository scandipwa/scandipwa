/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { AnyAction } from 'redux';

import { CategoryTree } from 'Query/Category.type';
import { Merge } from 'Type/Common.type';

export enum MetaActionType {
    UPDATE_META_STORE = 'UPDATE_META_STORE',
}

export interface PageMeta {
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
}

export interface UpdateMetaStoreAction extends AnyAction {
    type: MetaActionType.UPDATE_META_STORE;
    state: Partial<MetaStore>;
}

export type MetaStore = Partial<PageMeta>;

declare module 'Util/Store/Store.type' {
    export interface RootState {
        MetaReducer: MetaStore;
    }
}

export type Category = Merge<Partial<CategoryTree>, {
    meta_robots: string;
}>;

export interface ProductMeta {
    name: string;
    meta_title: string;
    meta_keyword: string;
    canonical_url?: string;
    meta_description: string;
}
