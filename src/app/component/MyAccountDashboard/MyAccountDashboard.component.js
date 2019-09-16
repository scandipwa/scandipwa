import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { customerType, ADDRESS_BOOK } from 'Type/Account';
import MyAccountAddressTable from 'Component/MyAccountAddressTable';
import MyAccountCustomerTable from 'Component/MyAccountCustomerTable';
import Loader from 'Component/Loader';
import Link from 'Component/Link';

import { MY_ACCOUNT_URL } from 'Route/MyAccount/MyAccount.container';
import './MyAccountDashboard.style';

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
                <div>
                    <p block="MyAccountDashboard" elem="Info">{ __('You have no configured addresses.') }</p>
                    <p block="MyAccountDashboard" elem="Info">
                        <Link to={ `${MY_ACCOUNT_URL}/${ADDRESS_BOOK}` }>
                            { __('Go to "Address Book", to configure them!') }
                        </Link>
                    </p>
                </div>
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
