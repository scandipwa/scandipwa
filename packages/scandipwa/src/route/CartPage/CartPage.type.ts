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

import { Device } from 'Type/Device.type';
import { History } from 'Type/Router.type';

export interface CartPageContainerProps {
    updateBreadcrumbs: () => void;
    changeHeaderState: () => void;
    updateCrossSellProducts: () => void;
    showOverlay: () => void;
    showNotification: () => void;
    updateMeta: () => void;
    guest_checkout: boolean;
    history: History;
    totals: GQLTotalsItem;
    device: Device;
}
