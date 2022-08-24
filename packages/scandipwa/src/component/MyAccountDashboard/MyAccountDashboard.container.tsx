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

import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { CustomerAddress } from 'Query/MyAccount.type';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import MyAccountDashboard from './MyAccountDashboard.component';
import {
    MyAccountDashboardComponentProps,
    MyAccountDashboardContainerFunctions,
    MyAccountDashboardContainerMapDispatchProps,
    MyAccountDashboardContainerMapStateProps,
    MyAccountDashboardContainerProps
} from './MyAccountDashboard.type';

/** @namespace Component/MyAccountDashboard/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountDashboardContainerMapStateProps => ({
    customer: state.MyAccountReducer.customer
});

/** @namespace Component/MyAccountDashboard/Container/mapDispatchToProps */
export const mapDispatchToProps = (): MyAccountDashboardContainerMapDispatchProps => ({});

/** @namespace Component/MyAccountDashboard/Container */
export class MyAccountDashboardContainer extends PureComponent<MyAccountDashboardContainerProps> {
    containerFunctions: MyAccountDashboardContainerFunctions = {
        getDefaultAddress: this.getDefaultAddress.bind(this)
    };

    containerProps(): Pick<MyAccountDashboardComponentProps, 'customer'> {
        const { customer } = this.props;

        return { customer };
    }

    getDefaultAddress(isBilling: boolean): CustomerAddress | undefined {
        const { customer: { addresses = [] } } = this.props;
        const key = isBilling ? 'default_billing' : 'default_shipping';

        return addresses.find(({ [ key ]: defaultAddress }) => defaultAddress);
    }

    render(): ReactElement {
        return (
            <MyAccountDashboard
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountDashboardContainer);
