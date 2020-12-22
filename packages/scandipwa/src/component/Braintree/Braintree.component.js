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

import Loader from 'Component/Loader';

import { BRAINTREE_CONTAINER_ID } from './Braintree.config';

import './Braintree.style';

/** @namespace Component/Braintree/Component */
export class Braintree extends PureComponent {
    static propTypes = {
        init: PropTypes.func.isRequired
    };

    state = {
        isLoading: true
    };

    componentDidMount() {
        const { init } = this.props;

        init().then(
            /** @namespace Component/Braintree/Component/initThen */
            () => this.setState({ isLoading: false })
        );
    }

    render() {
        const { isLoading } = this.state;

        return (
            <div block="Braintree">
                <Loader isLoading={ isLoading } />
                <div
                  block="Braintree"
                  elem="Form"
                  id={ BRAINTREE_CONTAINER_ID }
                />
            </div>
        );
    }
}

export default Braintree;
