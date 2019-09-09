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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Loader.style';

/**
 * Loader component
 * Loaders overlay to identify loading
 * @class Loader
 */
export default class Loader extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired
    };

    render() {
        const { isLoading } = this.props;

        if (!isLoading) return null;

        return (
            <div block="Loader" elem="LoaderWrapper">
                <div block="Loader" elem="Main">
                    <span />
                </div>
            </div>
        );
    }
}
