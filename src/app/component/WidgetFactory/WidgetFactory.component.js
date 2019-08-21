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
import WidgetUtil from 'Util/Widget';

export default class WidgetFactory extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired
    }

    render() {
        const { type } = this.props;

        const util = new WidgetUtil();
        if (!util.has(type)) return null;

        const Widget = util.get(type);
        return <Widget { ...this.props } />;
    }
}
