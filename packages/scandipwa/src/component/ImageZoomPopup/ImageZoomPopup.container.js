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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import Popup from 'Component/Popup';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { ChildrenType, MixType } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import ImageZoomPopup from './ImageZoomPopup.component';

/** @namespace Component/ImageZoomPopup/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/ImageZoomPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showPopup: (id, payload) => dispatch(showPopup(id, payload)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay())
});

/** @namespace Component/ImageZoomPopup/Container */
export class ImageZoomPopupContainer extends PureComponent {
    static propTypes = {
        children: ChildrenType.isRequired,
        showPopup: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        onClose: PropTypes.func,
        popupId: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired,
        isMobile: PropTypes.bool.isRequired,
        activeImageId: PropTypes.number.isRequired,
        mix: MixType
    };

    static defaultProps = {
        onClose: noopFn,
        mix: {}
    };

    componentDidUpdate(prevProps) {
        const { isActive: prevIsActive, popupId } = prevProps;
        const { isActive, showPopup } = this.props;

        if (prevIsActive !== isActive && isActive) {
            showPopup(popupId, {});
        }
    }

    containerProps() {
        const {
            children,
            activeImageId
        } = this.props;

        return {
            children,
            activeImageId
        };
    }

    render() {
        const {
            isActive,
            children,
            mix,
            popupId,
            isMobile,
            onClose
        } = this.props;

        if (!isActive || isMobile) {
            return children;
        }

        return (
            <Popup
              id={ popupId }
              clickOutside={ false }
              mix={ { block: 'ImageZoomPopup', mix } }
              contentMix={ { block: 'ImageZoomPopup', elem: 'PopupContent' } }
              onClose={ onClose }
              onHide={ onClose }
            >
                <ImageZoomPopup
                  { ...this.containerProps() }
                />
            </Popup>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageZoomPopupContainer);
