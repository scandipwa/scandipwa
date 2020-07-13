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

export const isMobile = {
    android: () => navigator.userAgent.match(/Android/i),
    blackBerry: () => navigator.userAgent.match(/BlackBerry/i),
    iOS: () => navigator.userAgent.match(/iPhone|iPod/i),
    opera: () => navigator.userAgent.match(/Opera Mini/i),
    windows: () => navigator.userAgent.match(/IEMobile/i),
    // eslint-disable-next-line max-len
    any: () => (isMobile.android() || isMobile.blackBerry() || isMobile.iOS() || isMobile.opera() || isMobile.windows()),
    // eslint-disable-next-line max-len
    tablet: () => navigator.userAgent.match(/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i),
    standaloneMode: () => window.matchMedia('(display-mode: standalone)').matches
};

export default isMobile;
