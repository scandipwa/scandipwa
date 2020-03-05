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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { customerType } from 'Type/Account';
import MyAccountStoreCredit from './MyAccountStoreCredit.component';

export const mapStateToProps = state => ({
    customer: state.MyAccountReducer.customer
});

class MyAccountStoreCreditContainer extends PureComponent {
    static propTypes = {
        customer: customerType.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        const { customer: { store_credit } } = this.props;

        if (store_credit) {
            this.updateIsLoading();
        }
    }

    componentDidUpdate() {
        const { customer: { store_credit } } = this.props;
        const { isLoading } = this.state;

        if (store_credit && isLoading) {
            this.updateIsLoading();
        }
    }

    updateIsLoading() {
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <MyAccountStoreCredit
              { ...this.props }
              { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps)(MyAccountStoreCreditContainer);
