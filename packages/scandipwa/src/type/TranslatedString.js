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
import { TranslatedValue } from '@scandipwa/webpack-i18n-runtime/src/util/__';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const TranslatedStringType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(TranslatedValue)
]);
