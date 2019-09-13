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

    renderAddressList() {
        const { customer: { addresses = [] } } = this.props;
        return addresses.map(this.renderAddress);
    }

    render() {
        return (
            <div block="MyAccountAddressBook">
                { this.renderAddressList() }
            </div>
        );
    }
}

export default MyAccountAddressBook;
