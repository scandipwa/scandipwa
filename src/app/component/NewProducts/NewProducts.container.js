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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class NewProducts extends PureComponent {
    static propTypes = {
        productsCount: PropTypes.number,
        productsPerPage: PropTypes.number
    }

    static defaultProps = {
        productsCount: 10,
        productsPerPage: 5
    }

    render() {
        return (
            <div />
        );
    }
}

export default NewProducts;
