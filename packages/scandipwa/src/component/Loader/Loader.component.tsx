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

import { ReactElement } from 'Type/Common.type';

import { LoaderComponentProps } from './Loader.type';

import './Loader.style';

/**
 * Loader component
 * Loaders overlay to identify loading
 * @class Loader
 * @namespace Component/Loader/Component
 */
export class Loader extends PureComponent<LoaderComponentProps> {
    static defaultProps = {
        isLoading: true,
        mix: {}
    };

    renderMain(): ReactElement {
        return (
            <div block="Loader" elem="Main">
                <span />
            </div>
        );
    }

    render(): ReactElement {
        const { isLoading, mix } = this.props;

        if (!isLoading) {
            return null;
        }

        return (
            <div block="Loader">
                <div block="Loader" mix={ mix } elem="Scale">
                    { this.renderMain() }
                </div>
            </div>
        );
    }
}

export default Loader;
