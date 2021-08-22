/* eslint-disable */
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
import { connect } from 'react-redux';
import { PureComponent } from 'react';
import BundleOption from './BundleOption.component';
import { bundleOptionsToSelectTransform } from 'Util/Product/Transform';

export const mapStateToProps = (state) => ({
    currencyCode: state.ConfigReducer.currencyData.current_currency_code
});

export const mapDispatchToProps = () => ({
});

export class BundleOptionContainer extends PureComponent {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        isRequired: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        updateSelectedValues: PropTypes.func.isRequired,
        currencyCode: PropTypes.string.isRequired
    };

    state = {
        dropdownOptions: [],
        activeSelectUid: null,
        quantity: {}
    };

    containerFunctions = {
        updateActiveSelectUid: this.updateActiveSelectUid.bind(this)
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { options: prevOptions } = prevProps;
        const { options } = this.props;

        if (options !== prevOptions) {
            this.buildDropdownOptions();
        }
    }

    updateQuantity(uid, value) {
        const { quantity } = this.state;

        const rangedValue = value < 0 ? 0 : value;

        this.setState({
            quantity: {
                ...quantity,
                uid: rangedValue
            }
        });
    }

    updateActiveSelectUid(uid) {
        this.setState({
            activeSelectUid: uid
        });
    }

    buildDropdownOptions() {
        const { options, currencyCode } = this.props;
        const { quantity } = this.props;

        this.setState({
            dropdownOptions: bundleOptionsToSelectTransform(options, currencyCode, quantity)
        });
    }

    containerProps() {
        return {
            ...this.props,
            ...this.state,
        }
    }

    render() {
        return (
            <BundleOption
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BundleOptionContainer);
