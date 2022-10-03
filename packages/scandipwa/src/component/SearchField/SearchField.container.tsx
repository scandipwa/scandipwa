/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { connect } from 'react-redux';

import { RootState } from 'Util/Store/Store.type';

import SearchField from './SearchField.component';
import { SearchFieldContainerMapDispatchToProps, SearchFieldContainerMapStateToProps } from './SearchField.type';

/** @namespace Component/SearchField/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): SearchFieldContainerMapStateToProps => ({
    device: state.ConfigReducer.device,
});

/** @namespace Component/SearchField/Container/mapDispatchToProps */
export const mapDispatchToProps = (): SearchFieldContainerMapDispatchToProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchField);
