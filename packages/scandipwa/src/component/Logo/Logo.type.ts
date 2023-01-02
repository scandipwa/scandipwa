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

import {
    ImageComponentProps, ImageComponentState, ImageContainerProps, ImageContainerState,
} from 'Component/Image/Image.type';

export type LogoContainerProps = ImageContainerProps;

export type LogoComponentProps = ImageComponentProps;

export interface LogoComponentState extends ImageComponentState {}

export interface LogoContainerState extends ImageContainerState {}
