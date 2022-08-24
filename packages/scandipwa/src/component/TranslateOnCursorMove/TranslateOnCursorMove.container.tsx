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

import TranslateOnCursorMove from './TranslateOnCursorMove.component';
import {
    TranslateOnCursorMoveMapDispatchProps,
    TranslateOnCursorMoveMapStateProps
} from './TranslateOnCursorMove.type';

/** @namespace Component/TranslateOnCursorMove/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): TranslateOnCursorMoveMapStateProps => ({
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/TranslateOnCursorMove/Container/mapDispatchToProps */
export const mapDispatchToProps = (): TranslateOnCursorMoveMapDispatchProps => ({});

// eslint-disable-next-line @scandipwa/scandipwa-guidelines/always-both-mappings
export default connect(mapStateToProps, mapDispatchToProps)(TranslateOnCursorMove);
