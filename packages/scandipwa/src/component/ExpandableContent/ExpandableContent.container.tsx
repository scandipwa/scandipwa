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

import ExpandableContent from './ExpandableContent.component';
import {
    ExpandableContentContainerDispatchProps,
    ExpandableContentContainerMapStateProps
} from './ExpandableContent.type';

/** @namespace Component/ExpandableContent/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ExpandableContentContainerMapStateProps => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/ExpandableContent/Container/mapDispatchToProps */
export const mapDispatchToProps = (): ExpandableContentContainerDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ExpandableContent);
