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
import './Minus.scss';

import PropTypes from 'prop-types';

export const MinusIcon = ({ isPrimary }) => (
    <svg block="MinusIcon" mods={ { isPrimary } } width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 11H19V13H5V11Z" />
    </svg>
);

MinusIcon.propTypes = {
    isPrimary: PropTypes.bool
};

MinusIcon.defaultProps = {
    isPrimary: false
};

export default MinusIcon;
