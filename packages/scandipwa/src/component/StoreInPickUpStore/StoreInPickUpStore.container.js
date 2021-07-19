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
import { PureComponent } from 'react';

import StoreInPickUpStore from './StoreInPickUpStore.component';

export class StoreInPickUpStoreContainer extends PureComponent {
    static propTypes = {
        selectStore: PropTypes.func.isRequired,
        store: PropTypes.shape({
            city: PropTypes.string,
            country: PropTypes.string,
            description: PropTypes.string,
            name: PropTypes.string,
            phone: PropTypes.string,
            pickup_location_code: PropTypes.string,
            postcode: PropTypes.string,
            region: PropTypes.string,
            street: PropTypes.string
        }).isRequired
    };

    containerFunctions = {
        handleSelectStore: this.handleSelectStore.bind(this)
    };

    containerProps() {
        const { store } = this.props;

        return { store };
    }

    handleSelectStore() {
        const { selectStore, store } = this.props;

        selectStore(store);
    }

    render() {
        return (
            <StoreInPickUpStore
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default StoreInPickUpStoreContainer;
