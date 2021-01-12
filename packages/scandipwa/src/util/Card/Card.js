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

/* eslint-disable import/prefer-default-export */
import NONE from '../../../../public/assets/images/cc/NONE.png';
import { CARD_ICON_MAP } from './Card.config';

/** @namespace Util/Card/getCardIconByType */
export const searchIcon = (type) => CARD_ICON_MAP.find(((card) => card.type === type));

export const getCardIconByType = (type) => {
    const result = searchIcon(type);

    if (!result) {
        return NONE;
    }

    const { src } = result;

    return src;
};
