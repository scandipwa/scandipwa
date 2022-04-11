/* eslint-disable import/prefer-default-export */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { Mutation } from '@tilework/opus';

import { prepareMutation } from 'Util/Query';
import { executePost } from 'Util/Request/Request';

/** @namespace Util/Request/Mutation/fetchMutation */
export const fetchMutation = <S extends string, T>(
    rawMutations: Mutation<S, T, boolean> | Mutation<S, T, boolean>[]
): Promise<Record<S, T>> => {
    const queries = rawMutations instanceof Mutation ? [rawMutations] : rawMutations;

    return executePost(prepareMutation(queries));
};
