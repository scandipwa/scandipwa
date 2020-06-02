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
import Field from './Field.component';

export const mapStateToProps = state => ({
    customer: state.MyAccountReducer.customer
});

// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = dispatch => ({});

export default connect(
    middleware(mapStateToProps, 'Component/Field/Container/mapStateToProps'),
    middleware(mapDispatchToProps, 'Component/Field/Container/mapDispatchToProps')
)(Field);
