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
import { UrlRewritesDispatcher } from 'Store/UrlRewrites';
import UrlRewrites from './UrlRewrites.component';

/** @namespace Route/UrlRewrites/Container/mapStateToProps */
export const mapStateToProps = state => ({
    urlRewrite: state.UrlRewritesReducer.urlRewrite,
    isLoading: state.UrlRewritesReducer.isLoading
});

/** @namespace Route/UrlRewrites/Container/mapDispatchToProps */
export const mapDispatchToProps = dispatch => ({
    requestUrlRewrite: (urlParam) => {
        UrlRewritesDispatcher.handleData(dispatch, { urlParam });
    },
    clearUrlRewrites: () => {
        UrlRewritesDispatcher.clearUrlRewrites(dispatch);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UrlRewrites);
