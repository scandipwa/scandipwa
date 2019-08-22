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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TestWidget from 'Component/TestWidget';

export const PAGE_LINK = 'TestWidget';
export default class WidgetFactory extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired
    }

    renderMap = {
        [PAGE_LINK]: {
            component: TestWidget
        }
    }

    render() {
        const { type } = this.props;
        const { component: Widget } = this.renderMap[type] || {};

        return Widget !== undefined ? <Widget { ...this.props } /> : null;
    }
}
