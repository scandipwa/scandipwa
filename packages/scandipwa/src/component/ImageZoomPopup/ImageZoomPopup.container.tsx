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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Popup from 'Component/Popup';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import { RootState } from 'Util/Store/Store.type';

import ImageZoomPopup from './ImageZoomPopup.component';
import {
    ImageZoomPopupComponentProps,
    ImageZoomPopupContainerMapDispatchProps,
    ImageZoomPopupContainerMapStateProps,
    ImageZoomPopupContainerProps,
} from './ImageZoomPopup.type';

/** @namespace Component/ImageZoomPopup/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ImageZoomPopupContainerMapStateProps => ({
    isMobile: state.ConfigReducer.device.isMobile,
});

/** @namespace Component/ImageZoomPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ImageZoomPopupContainerMapDispatchProps => ({
    showPopup: (id, payload) => dispatch(showPopup(id, payload)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
});

/** @namespace Component/ImageZoomPopup/Container */
export class ImageZoomPopupContainer extends PureComponent<ImageZoomPopupContainerProps> {
    static defaultProps: Partial<ImageZoomPopupContainerProps> = {
        onClose: noopFn,
        mix: {},
    };

    componentDidUpdate(prevProps: ImageZoomPopupContainerProps): void {
        const { isActive: prevIsActive, popupId } = prevProps;
        const { isActive, showPopup } = this.props;

        if (prevIsActive !== isActive && isActive) {
            showPopup(popupId, {});
        }
    }

    containerProps(): ImageZoomPopupComponentProps {
        const {
            children,
            activeImageId,
        } = this.props;

        return {
            children,
            activeImageId,
        };
    }

    render(): ReactElement {
        const {
            isActive,
            children,
            mix,
            popupId,
            isMobile,
            onClose,
        } = this.props;

        if (!isActive || isMobile) {
            return children;
        }

        return (
            <Popup
              id={ popupId }
              isCloseOnOutsideClick={ false }
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
