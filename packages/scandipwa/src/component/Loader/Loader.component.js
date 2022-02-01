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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { MixType } from 'Type/Common.type';

import './Loader.style';

/**
 * Loader component
 * Loaders overlay to identify loading
 * @class Loader
 * @namespace Component/Loader/Component
 */
export class Loader extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        mix: MixType
    };

    static defaultProps = {
        isLoading: true,
        mix: {}
    };

    renderMain() {
        return (
            <div block="Loader" elem="Main">
                <span />
            </div>
        );
    }

    render() {
        const { isLoading, mix } = this.props;

        if (!isLoading) {
            return null;
        }

        return (
            <div block="Loader" mix={ mix }>
                <div block="Loader" elem="Scale">
                    { this.renderMain() }
                </div>
            </div>
        );
    }
}

export default Loader;
