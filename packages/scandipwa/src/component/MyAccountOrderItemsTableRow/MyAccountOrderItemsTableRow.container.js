/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import MyAccountOrderItemsTableRow from './MyAccountOrderItemsTableRow.component';

/** @namespace Component/MyAccountOrderItemsTableRow/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/MyAccountOrderItemsTableRow/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/MyAccountOrderItemsTableRow/Container */
export class MyAccountOrderItemsTableRowContainer extends PureComponent {
    static propTypes = {
        product: PropTypes.object.isRequired,
        activeTab: PropTypes.string.isRequired,
        selectedOptions: PropTypes.array,
        enteredOptions: PropTypes.array,
        isMobile: PropTypes.bool.isRequired
    };

    static defaultProps = {
        selectedOptions: [],
        enteredOptions: []
    };

    containerProps() {
        const {
            product,
            activeTab,
            enteredOptions,
            selectedOptions,
            isMobile
        } = this.props;

        return {
            product,
            activeTab,
            enteredOptions,
            selectedOptions,
            isMobile
        };
    }

    render() {
        return (
            <MyAccountOrderItemsTableRow
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderItemsTableRowContainer);
