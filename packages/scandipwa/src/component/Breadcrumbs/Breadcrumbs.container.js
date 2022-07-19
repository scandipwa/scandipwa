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

import BreadcrumbsReducer from 'Store/Breadcrumbs/Breadcrumbs.reducer';
import { withReducers } from 'Util/DynamicReducer';

import Breadcrumbs from './Breadcrumbs.component';

/** @namespace Component/Breadcrumbs/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    breadcrumbs: state.BreadcrumbsReducer.breadcrumbs,
    areBreadcrumbsVisible: state.BreadcrumbsReducer.areBreadcrumbsVisible
});

/** @namespace Component/Breadcrumbs/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

export default withReducers({
    BreadcrumbsReducer
})(connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs));
