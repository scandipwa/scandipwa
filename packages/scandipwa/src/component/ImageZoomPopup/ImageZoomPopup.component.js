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

import TranslateOnCursorMove from 'Component/TranslateOnCursorMove';
import { ChildrenType } from 'Type/Common';

import './ImageZoomPopup.style';

/** @namespace Component/ImageZoomPopup/Component */
export class ImageZoomPopup extends PureComponent {
    static propTypes = {
        children: ChildrenType.isRequired,
        activeImageId: PropTypes.number.isRequired
    };

    render() {
        const {
            children,
            activeImageId
        } = this.props;

        return (
            <div block="ImageZoomPopup">
                <TranslateOnCursorMove
                  activeImageId={ activeImageId }
                  itemSelector=".ProductGallery-SliderImage"
                  targetSelector=".Image-Image"
                >
                    { children }
                </TranslateOnCursorMove>
            </div>
        );
    }
}

export default ImageZoomPopup;
