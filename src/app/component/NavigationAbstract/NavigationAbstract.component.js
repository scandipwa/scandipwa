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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { DEFAULT_STATE_NAME } from './NavigationAbstract.config';

class NavigationAbstract extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/no-unused-prop-types
        navigationState: PropTypes.object.isRequired
    };

    defaultStateName = DEFAULT_STATE_NAME;

    stateMap = {
        [DEFAULT_STATE_NAME]: {}
    };

    renderMap = {};

    renderNavigationState() {
        const { navigationState: { name } } = this.props;

        const source = this.stateMap[name]
            ? this.stateMap[name]
            : this.stateMap[this.defaultStateName];

        return Object.entries(this.renderMap).map(
            ([key, renderFunction]) => renderFunction(source[key], key)
        );
    }

    render() {
        throw new Error('Please re-define "render" method.');
    }
}

export default NavigationAbstract;
