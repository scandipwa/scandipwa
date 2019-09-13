import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { customerType } from 'Type/Account';
import MyAccountAddressTable from 'Component/MyAccountAddressTable';
import Loader from 'Component/Loader';

import './MyAccountDashboard.style';
import MyAccountCustomerTable from 'Component/MyAccountCustomerTable';

class MyAccountDashboard extends PureComponent {
    static propTypes = {
        customer: customerType.isRequired,
        getDefaultAddress: PropTypes.func.isRequired
    };

    renderDefaultAddressTable(isBilling) {
        const { getDefaultAddress } = this.props;
        const name = isBilling ? __('billing') : __('shipping');
        const address = getDefaultAddress(isBilling);

        if (!address) return <p>{ __('No %s address configured.', name) }</p>;

        return (
            <div
              key={ name }
              block="MyAccountDashboard"
              elem="DefaultAddress"
            >
                <MyAccountAddressTable
                  address={ address }
                  showAdditionalFields
                  title={ __('Default %s address', name) }
                />
            </div>
        );
    }

    renderDefaultAddressTables() {
        const { customer: { addresses = [] } } = this.props;

        if (!addresses.length) {
            return (
                <p>{ __('You have no configured addresses.') }</p>
            );
        }

        return [
            this.renderDefaultAddressTable(),
            this.renderDefaultAddressTable(true)
        ];
    }

    renderCustomerTable() {
        const { customer } = this.props;

        return (
            <div block="MyAccountDashboard" elem="CustomerData">
                <MyAccountCustomerTable
                  customer={ customer }
                  title={ __('My profile') }
                />
            </div>
        );
    }

    render() {
        const { customer: { id } } = this.props;

        return (
            <div block="MyAccountDashboard">
                <Loader isLoading={ !id } />
                { this.renderCustomerTable() }
                { this.renderDefaultAddressTables() }
            </div>
        );
    }
}

export default MyAccountDashboard;
