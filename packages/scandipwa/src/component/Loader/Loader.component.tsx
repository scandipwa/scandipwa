/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';

import { LoaderComponentProps, LoaderComponentState } from './Loader.type';

import './Loader.style';

/**
 * Loader component
 * Loaders overlay to identify loading
 * @class Loader
 * @namespace Component/Loader/Component
 */
export class LoaderComponent<
P extends Readonly<LoaderComponentProps> = Readonly<LoaderComponentProps>,
S extends LoaderComponentState = LoaderComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<LoaderComponentProps> = {
        mix: {},
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

export default LoaderComponent;
