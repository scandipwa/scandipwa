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

import './Loader.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/**
 * Loader component
 * Loaders overlay to identify loading
 * @class Loader
 */
export class Loader extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired
    };

    render() {
        const { isLoading } = this.props;

        if (!isLoading) {
            return null;
        }

        return (
            <div block="Loader">
                <div block="Loader" elem="Scale">
                    <div block="Loader" elem="Main">
                        <span />
                    </div>
                </div>
            </div>
        );
    }
}

export default Loader;
