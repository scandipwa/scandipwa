import { customerType } from 'Type/Account';
import KeyValueTable from 'Component/KeyValueTable';
import './MyAccountCustomerTable.style';

class MyAccountCustomerTable extends KeyValueTable {
    static propTypes = {
        customer: customerType.isRequired
    };

    get dataPairArray() {
        const { customer } = this.props;

        return [
            {
                key: 'firstname',
                label: 'First name',
                source: customer
            },
            {
                key: 'lastname',
                label: 'Last name',
                source: customer
            },
            {
                key: 'email',
                label: 'Email',
                source: customer
            }
        ];
    }

    renderActions() {
        return (
            <>
                <button
                  block="Button"
                >
                    { __('Edit details') }
                </button>
                <button
                  block="Button"
                  mods={ { isHollow: true } }
                >
                    { __('Change Password') }
                </button>
            </>
        );
    }

    render() {
        return (
            <div block="MyAccountCustomerTable">
                { this.renderTable() }
                { this.renderActions() }
            </div>
        );
    }
}

export default MyAccountCustomerTable;
