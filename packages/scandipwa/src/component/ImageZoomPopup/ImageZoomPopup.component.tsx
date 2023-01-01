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

import TranslateOnCursorMove from 'Component/TranslateOnCursorMove';
import { ReactElement } from 'Type/Common.type';

import { ImageZoomPopupComponentProps } from './ImageZoomPopup.type';

import './ImageZoomPopup.style';

/** @namespace Component/ImageZoomPopup/Component */
export class ImageZoomPopupComponent<
P extends Readonly<ImageZoomPopupComponentProps> = Readonly<ImageZoomPopupComponentProps>,
S extends ImageZoomPopupComponentState = ImageZoomPopupComponentState,
> extends PureComponent<P, S> {
    render(): ReactElement {
        const {
            children,
            activeImageId,
        } = this.props;

        return (
            <div block="ImageZoomPopup">
                <TranslateOnCursorMove
                  activeImageId={ activeImageId }
                  itemSelector=".ProductGallery-SliderImage, .VideoThumbnail"
                  targetSelector=".Image-Image"
                >
                    { children }
                </TranslateOnCursorMove>
            </div>
        );
    }
}

export default ImageZoomPopupComponent;
