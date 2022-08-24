/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

// ! TODO: Maybe we should move this to common types?
export interface Device {
    isMobile: boolean;
    android: boolean;
    ios: boolean;
    blackberry: boolean;
    opera: boolean;
    safari: boolean;
    windows: boolean;
    standaloneMode?: boolean;
}
