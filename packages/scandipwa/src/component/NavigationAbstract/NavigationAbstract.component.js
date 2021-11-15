/* eslint-disable react/require-render-return */

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

import { Component } from 'react';

import { NavigationStateHistoryType } from 'Type/Router.type';

import { DEFAULT_STATE_NAME } from './NavigationAbstract.config';

/** @namespace Component/NavigationAbstract/Component */
export class NavigationAbstract extends Component {
    static propTypes = {
        navigationState: NavigationStateHistoryType.isRequired
    };

    defaultStateName = DEFAULT_STATE_NAME;

    stateMap = {
        [DEFAULT_STATE_NAME]: {}
    };

    renderMap = {};

    renderNavigationState() {
        const { navigationState: { name, hiddenElements = [] } } = this.props;

        // Get current page/state render methods
        const source = this.stateMap[name]
            ? this.stateMap[name]
            : this.stateMap[this.defaultStateName];

        // Return defined render methods for current page/state
        // * Don't render methods which ids are passed inside hiddenElements
        return Object.entries(this.renderMap).map(
            ([key, renderFunction]) => renderFunction(source[key] && !hiddenElements.includes(key), key)
        );
    }

    render() {
        throw new Error('Please redefine "render" method.');
    }
}

export default NavigationAbstract;
