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

import { CategoryPageLayout } from 'Route/CategoryPage/CategoryPage.config';
import { Mix } from 'Type/Common.type';

export interface AddToCartComponentProps {
    addProductToCart: () => void;
    isDisabled: boolean;
    isAdding:boolean;
    // Customization
    isIconEnabled: boolean;
    mix: Mix;
    layout: CategoryPageLayout;
}
