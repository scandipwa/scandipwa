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

import { RootState } from 'Util/Store/Store.type';

import Slider from './Slider.component';
import { SliderContainerMapDispatchProps, SliderContainerMapStateProps } from './Slider.type';

/** @namespace Component/Slider/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): SliderContainerMapStateProps => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/Slider/Container/mapDispatchToProps */
export const mapDispatchToProps = (): SliderContainerMapDispatchProps => ({});

// eslint-disable-next-line @scandipwa/scandipwa-guidelines/always-both-mappings
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Slider);
