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

export interface Slide {
    slide_text: string;
    slide_id: number;
    mobile_image: string;
    desktop_image: string;
    title: string;
    is_active: boolean;
}

export interface Slider {
    slides: Slide[];
    slide_speed: number;
    slider_id: number;
    title: string;
}
