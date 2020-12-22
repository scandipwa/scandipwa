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

import PropTypes from 'prop-types';

import Loader from 'Component/Loader';
import MyAccountAddressTable from 'Component/MyAccountAddressTable/MyAccountAddressTable.component';

import './CheckoutAddressTable.style';

/** @namespace Component/CheckoutAddressTable/Component */
export class CheckoutAddressTable extends MyAccountAddressTable {
    static propTypes = {
        ...MyAccountAddressTable.propTypes,
        isSelected: PropTypes.bool,
        onClick: PropTypes.func.isRequired
    };

    static defaultProps = {
        ...MyAccountAddressTable.defaultProps,
        isSelected: false
    };

    onAddressClick = () => {
        const { address, onClick } = this.props;
        onClick(address);
    };

    renderTable() {
        const { isSelected } = this.props;

        return (
            <button
              block="CheckoutAddressTable"
              elem="Button"
              type="button"
              mods={ { isSelected } }
              onClick={ this.onAddressClick }
            >
                { super.renderTable() }
            </button>
        );
    }

    render() {
        const { countries } = this.props;

        return (
            <div block="CheckoutAddressTable">
                <Loader isLoading={ !countries.length } />
                { this.renderTable() }
            </div>
        );
    }
}

export default CheckoutAddressTable;
