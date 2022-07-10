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

import ExpandableContentShowMore from './ExpandableContentShowMore.component';

/** @namespace Component/ExpandableContentShowMore/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/ExpandableContentShowMore/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ExpandableContentShowMore);
