import PropTypes from 'prop-types';

import { addressType } from 'Type/Account';
import Loader from 'Component/Loader';
import KeyValueTable from 'Component/KeyValueTable';

import './MyAccountAddressTable.style';

class MyAccountAddressTable extends KeyValueTable {
    static propTypes = {
        getFormatedRegion: PropTypes.func.isRequired,
        address: addressType.isRequired,
        showAdditionalFields: PropTypes.bool,
        countries: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                id: PropTypes.string,
                available_regions: PropTypes.arrayOf(
                    PropTypes.shape({
                        code: PropTypes.string,
                        name: PropTypes.string,
                        id: PropTypes.number
                    })
                )
            })
        ).isRequired
    };

    static defaultProps = {
        showAdditionalFields: false
    };

    get dataPairArray() {
        const { address, getFormatedRegion, showAdditionalFields } = this.props;
        const regionData = getFormatedRegion(address);

        const additionalFields = [
            {
                key: 'country',
                label: 'County',
                source: regionData
            },
            {
                key: 'state',
                label: 'State',
                source: regionData
            },
            {
                key: 'city',
                label: 'City',
                source: address
            },
            {
                key: 'company',
                label: 'Company',
                source: address
            },
            {
                key: 'vat_id',
                label: 'VAT ID',
                source: address
            },
            {
                key: 'fax',
                label: 'Fax',
                source: address
            }
        ];

        return [
            {
                key: 'firstname',
                label: 'First name',
                source: address
            },
            {
                key: 'lastname',
                label: 'Last name',
                source: address
            },
            {
                key: 'street',
                label: 'Street',
                source: address
            },
            {
                key: 'postcode',
                label: 'Postal code',
                source: address
            },
            {
                key: 'telephone',
                label: 'Phone number',
                source: address
            },
            ...(showAdditionalFields ? additionalFields : [])
        ];
    }

    renderActions() {
        return (
            <>
                <button block="Button">
                    { __('Edit address') }
                </button>
                <button block="Button" mods={ { isHollow: true } }>
                    { __('Delete') }
                </button>
            </>
        );
    }

    render() {
        const { countries } = this.props;

        return (
            <div block="MyAccountAddressTable" elem="Wrapper">
                <Loader isLoading={ !countries.length } />
                { this.renderTable() }
                { this.renderActions() }
            </div>
        );
    }
}

export default MyAccountAddressTable;
