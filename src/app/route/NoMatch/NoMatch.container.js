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
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import NoMatch from './NoMatch.component';

export const mapDispatchToProps = dispatch => ({
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.update(breadcrumbs, dispatch);
    }
});

// eslint-disable-next-line no-unused-vars
export const mapStateToProps = state => ({});

export default connect(
    middleware(mapStateToProps, 'Route/NoMatch/Container/mapStateToProps'),
    middleware(mapDispatchToProps, 'Route/NoMatch/Container/mapDispatchToProps')
)(NoMatch);
