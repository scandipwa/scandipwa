import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { customerType } from 'Type/Account';
import './MyAccountDashboard.style';
import Loader from 'Component/Loader';

class MyAccountDashboard extends PureComponent {
    static propTypes = {
        customer: customerType.isRequired
        // TODO: implement prop-types
    };

    renderHeading() {
        const { customer: { email } } = this.props;

        return (
            <h1 block="MyAccount" elem="Heading">
                { __('My profile - ') }
                <strong>{ email }</strong>
            </h1>
        );
    }

    renderCustomerDataRow(key, label) {
        const { customer: { [key]: value } } = this.props;

        if (!value) return null;

        return (
            <tr>
                <th>{ label }</th>
                <td>{ value }</td>
            </tr>
        );
    }

    renderCustomerDataTable() {
        return (
            <table block="MyAccountDashboard" elem="DataTable">
                <tbody>
                    { this.renderCustomerDataRow('firstname', 'First name') }
                    { this.renderCustomerDataRow('lastname', 'Last name') }
                    { this.renderCustomerDataRow('email', 'Email') }
                </tbody>
            </table>
        );
    }

    render() {
        const { customer: { id } } = this.props;

        return (
            <div block="MyAccountDashboard">
                <Loader isLoading={ !id } />
                { this.renderHeading() }
                { this.renderCustomerDataTable() }
            </div>
        );
    }
}

export default MyAccountDashboard;
