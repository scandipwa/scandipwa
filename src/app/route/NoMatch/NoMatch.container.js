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

import NoMatch from './NoMatch.component';

const BreadcrumbsDispatcher = import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "dispatchers" */'Store/Breadcrumbs/Breadcrumbs.dispatcher');

export const mapDispatchToProps = dispatch => ({
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch));
    }
});

export default connect(null, mapDispatchToProps)(NoMatch);
