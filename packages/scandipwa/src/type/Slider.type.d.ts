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

export interface SlideType {
    slide_id?: string;
    image?: string;
    slide_text?: string;
}

export interface SliderType {
    slider_id?: string;
    slides?: SlideType[];
}
