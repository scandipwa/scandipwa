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

import { GQLCustomerInput } from 'Type/Graphql.type';

export type CategoryQueryOptions = {
    categoryIds: number;
};

export type CmsPage = {
    id: number;
    url_key: string;
    identifier: string;
};

export type ResetPasswordOptions = {
    token: string;
    password: string;
    password_confirmation: string;
};

export type SignInOptions = {
    email: string;
    password: string;
};

export type ConfirmAccountOptions = SignInOptions & {
    key: string;
};

export type ChangeCustomerPasswordOptions = {
    password: string;
    newPassword: string;
};

export type CreateAccountOptions = {
    customer: Omit<GQLCustomerInput, 'password'>;
    password: string;
};

export type OrdersOptions = {
    orderId: number;
    page: number;
};

export type ProductListOptions = {
    isSingleProduct: boolean;
    isPlp: boolean;
    isForWishlist: boolean;
    isForLinkedProducts: boolean;
    noAttributes: boolean;
    noVariants: boolean;
    noVariantAttributes: boolean;
    requireInfo: boolean;
    notRequireInfo: boolean;
    categoryIds: number[];
    args: Record<string, unknown>;
};
