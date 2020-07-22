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
import Link from './Link.component';

export const buildBaseUrlPrefix = (state) => {
    const { ConfigReducer: { base_link_url, base_url } } = state;
    const prefix = base_link_url.replace(base_url, '').replace(/\/$/, '');

    return prefix[0] === '/' ? prefix : `/${ prefix }`;
};

export const mapStateToProps = (state) => ({
    baseUrlPrefix: buildBaseUrlPrefix(state)
});

// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Link);
