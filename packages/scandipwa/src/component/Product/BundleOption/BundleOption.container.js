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
import { connect } from 'react-redux';

import { bundleOptionsToSelectTransform, getEncodedBundleUid } from 'Util/Product/Transform';

import BundleOption from './BundleOption.component';

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
        activeSelectUid: null,
        quantity: {}
    };

    containerFunctions = {
        setQuantity: this.setQuantity.bind(this),
        setActiveSelectUid: this.setActiveSelectUid.bind(this),
        getUidWithQuantity: this.getUidWithQuantity.bind(this),
        getDropdownOptions: this.getDropdownOptions.bind(this)
    };

    componentDidUpdate(prevProps, prevState) {
        const { quantity } = this.state;
        const { quantity: prevQuantity } = prevState;

        if (quantity !== prevQuantity) {
            const { updateSelectedValues } = this.props;
            updateSelectedValues();
        }
    }

    getUidWithQuantity(uid, defaultQuantity = 1) {
        const { quantity: { [uid]: quantity = defaultQuantity } } = this.state;

        return getEncodedBundleUid(uid, quantity);
    }

    setQuantity(uid, value) {
        const { quantity } = this.state;
        const rangedValue = value < 1 ? 1 : value;
        this.setState({
            quantity: {
                ...quantity,
                [uid]: rangedValue
            }
        });
    }

    setActiveSelectUid(uid) {
        this.setState({
            activeSelectUid: uid
        });
    }

    getDropdownOptions() {
        const { options, currencyCode } = this.props;
        const { quantity } = this.state;

        return bundleOptionsToSelectTransform(options, currencyCode, quantity);
    }

    containerProps() {
        return {
            ...this.props,
            ...this.state
        };
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
