/* eslint-disable react/require-render-return */

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

import { Component } from 'react';

import { ObjectEntries, ReactElement } from 'Type/Common.type';

import { DEFAULT_STATE_NAME } from './NavigationAbstract.config';
import { NavigationAbstractComponentProps, NavigationAbstractComponentState } from './NavigationAbstract.type';

/** @namespace Component/NavigationAbstract/Component */
export class NavigationAbstractComponent<
P extends Readonly<NavigationAbstractComponentProps> = Readonly<NavigationAbstractComponentProps>,
S extends NavigationAbstractComponentState = NavigationAbstractComponentState,
> extends Component<P, S> {
    defaultStateName = DEFAULT_STATE_NAME;

    stateMap: Record<string, Record<string, boolean>> = {
        [DEFAULT_STATE_NAME]: {},
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    renderMap: Record<string, (isVisible?: boolean, key?: string) => ReactElement> = {};

    renderNavigationState(): ReactElement {
        const { navigationState: { name, hiddenElements = [] } } = this.props;

        // Get current page/state render methods
        const source = this.stateMap[name]
            ? this.stateMap[name]
            : this.stateMap[this.defaultStateName];

        const renderMapEntries: ObjectEntries<typeof this.renderMap>[] = Object.entries(this.renderMap);

        // Return defined render methods for current page/state
        // * Don't render methods which ids are passed inside hiddenElements
        return renderMapEntries.map(
            ([key, renderFunction]) => renderFunction(source[key] && !hiddenElements.includes(key), key),
        );
    }

    render(): ReactElement {
        throw new Error('Please redefine "render" method.');
    }
}

export default NavigationAbstractComponent;
