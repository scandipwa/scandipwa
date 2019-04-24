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

import { connect } from 'react-redux';
import { CountryDispatcher } from 'Store/Country';
import Field from './Field.component';

const mapStateToProps = state => ({
    countries: state.CountryReducer.countries
});

const mapDispatchToProps = dispatch => ({
    getCountriesList() {
        return CountryDispatcher.getCountriesList(dispatch);
    }
});

const FieldContainer = connect(mapStateToProps, mapDispatchToProps)(Field);

export default FieldContainer;
