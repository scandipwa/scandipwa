import { connect } from 'react-redux';

import {
    MyAccountAddressTableContainer,
    mapDispatchToProps,
    mapStateToProps
} from 'Component/MyAccountAddressTable/MyAccountAddressTable.container';

import CheckoutAddressTable from './CheckoutAddressTable.component';

export class CheckoutAddressTableContainer extends MyAccountAddressTableContainer {
    render() {
        return (
            <CheckoutAddressTable
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutAddressTableContainer);
