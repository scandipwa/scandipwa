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

import ExpandableContent from './ExpandableContent.component';

/** @namespace Component/ExpandableContent/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/ExpandableContent/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ExpandableContent);
