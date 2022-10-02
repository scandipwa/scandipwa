/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { connect } from 'react-redux';

import {
    mapDispatchToProps,
    mapStateToProps,
    MyAccountAddressTableContainer,
} from 'Component/MyAccountAddressTable/MyAccountAddressTable.container';
import { ReactElement } from 'Type/Common.type';

import CheckoutAddressTable from './CheckoutAddressTable.component';
import {
    CheckoutAddressTableContainerProps,
    CheckoutAddressTableContainerPropsKeys,
} from './CheckoutAddressTable.type';

/** @namespace Component/CheckoutAddressTable/Container */
export class CheckoutAddressTableContainer extends MyAccountAddressTableContainer<CheckoutAddressTableContainerProps> {
    static defaultProps = {
        ...MyAccountAddressTableContainer.defaultProps,
    };

    containerProps(): Pick<CheckoutAddressTableContainerProps, CheckoutAddressTableContainerPropsKeys> {
        const { isSelected, onClick } = this.props;

        return {
            isSelected,
            onClick,
            ...super.containerProps(),
        };
    }

    render(): ReactElement {
        return (
            <CheckoutAddressTable
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutAddressTableContainer);
