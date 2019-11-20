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
import './Braintree.style';

export const BRAINTREE_CONTAINER_ID = 'BRAINTREE_CONTAINER_ID';

class Braintree extends PureComponent {
    static propTypes = {
        init: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { init } = this.props;
        init();
    }

    render() {
        return (
            <div
              block="Braintree"
              id={ BRAINTREE_CONTAINER_ID }
            />
        );
    }
}

export default Braintree;
