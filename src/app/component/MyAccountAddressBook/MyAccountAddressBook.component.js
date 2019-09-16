import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { customerType } from 'Type/Account';
import MyAccountAddressTable from 'Component/MyAccountAddressTable';
import './MyAccountAddressBook.style';

class MyAccountAddressBook extends PureComponent {
    static propTypes = {
        customer: customerType.isRequired,
        getDefaultPostfix: PropTypes.func.isRequired
    };

    renderAddress = (address, index) => {
        const { getDefaultPostfix } = this.props;
        const { id } = address;
        const postfix = getDefaultPostfix(address);

        return (
            <MyAccountAddressTable
              title={ __('Address #%s%s', index + 1, postfix) }
              isHorizontal
              address={ address }
              key={ id }
            />
        );
    };

    renderNoAddresses() {
        return (
            <div>
                <p>{ __('You have no configured addresses.') }</p>
            </div>
        );
    }

    renderActions() {
        return (
            <button
              block="MyAccountAddressBook"
              elem="Button"
              mix={ { block: 'Button' } }
            >
                { __('Add new address') }
            </button>
        );
    }

    renderAddressList() {
        const { customer: { addresses = [] } } = this.props;
        if (!addresses.length) return this.renderNoAddresses();
        return addresses.map(this.renderAddress);
    }

    render() {
        return (
            <div block="MyAccountAddressBook">
                { this.renderActions() }
                { this.renderAddressList() }
            </div>
        );
    }
}

export default MyAccountAddressBook;
