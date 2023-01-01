/* eslint-disable max-len */

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

import Image from 'Component/Image/Image.component';
import {
    ImageState,
} from 'Component/Image/Image.config';
import { ImageRatio } from 'Component/Image/Image.type';
import logo from 'Style/icons/logos/mainLogo.svg';
import { ReactElement } from 'Type/Common.type';

import { LogoComponentProps } from './Logo.type';

import './Logo.style';

/** @namespace Component/Logo/Component */
export class LogoComponent<
P extends Readonly<LogoComponentProps> = Readonly<LogoComponentProps>,
S extends LogoComponentState = LogoComponentState,
> extends Image<P, S> {
    renderPlaceholderLogo(): ReactElement {
        const { onImageLoad } = this.props;

        return (
            <div
              block="Logo"
              elem="Placeholder"
            >
                <Image
                  src={ logo }
                  alt="LogoPlaceholder"
                  ratio={ ImageRatio.IMG_CUSTOM }
                  onImageLoad={ onImageLoad }
                />
            </div>
        );
    }

    renderImage(): ReactElement {
        const { imageStatus } = this.state;
        const { src } = this.props;

        if (!src) {
            return this.renderPlaceholderLogo();
        }

        switch (imageStatus) {
        case ImageState.IMAGE_NOT_FOUND:
        case ImageState.IMAGE_NOT_SPECIFIED:
            return this.renderPlaceholderLogo();
        default:
            return super.renderImage();
        }
    }

    render(): ReactElement {
        const { imageStatus } = this.state;

        return (
            <div
              block="Image"
              mods={ { imageStatus } }
              mix={ { block: 'Logo' } }
            >
                { this.renderImage() }
            </div>
        );
    }
}

export default LogoComponent;
