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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { changeNavigationState } from 'Store/Navigation';
import { hideActiveOverlay } from 'Store/Overlay';
import { POPUP } from 'Component/Header';

import Popup from './Popup.component';

export const mapStateToProps = state => ({
    activeOverlay: state.OverlayReducer.activeOverlay,
    areOtherOverlaysOpen: state.OverlayReducer.areOtherOverlaysOpen,
    payload: state.PopupReducer.popupPayload
});

export const mapDispatchToProps = dispatch => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    changeHeaderState: state => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state))
});

export class PopupContainer extends PureComponent {
    static propTypes = {
        payload: PropTypes.objectOf(
            PropTypes.shape({
                title: PropTypes.string
            })
        ).isRequired,
        activeOverlay: PropTypes.string.isRequired,
        changeHeaderState: PropTypes.func.isRequired,
        onVisible: PropTypes.func
    };

    static defaultProps = {
        onVisible: () => {}
    };

    containerFunctions = {
        onVisible: this.onVisible.bind(this)
    };

    onVisible() {
        const { changeHeaderState, onVisible } = this.props;

        changeHeaderState({
            name: POPUP,
            title: this._getPopupTitle()
        });

        onVisible();
    }

    containerProps = () => ({
        title: this._getPopupTitle()
    });

    _getPopupTitle() {
        const { payload, activeOverlay } = this.props;
        const { title } = payload[activeOverlay] || {};
        return title;
    }

    render() {
        return (
            <Popup
              { ...this.props }
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupContainer);
