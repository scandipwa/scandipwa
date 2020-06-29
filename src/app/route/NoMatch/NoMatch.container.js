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

/** @middleware Route/NoMatch/Container/mapDispatchToProps */
export const mapDispatchToProps = dispatch => ({
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.update(breadcrumbs, dispatch);
    }
});

/** @middleware Route/NoMatch/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars
export const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NoMatch);
