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

import { ReactElement } from 'Type/Common.type';

import { ContentWrapperComponentProps } from './ContentWrapper.type';

import './ContentWrapper.style';

/**
 * Content Wrapper
 * @class ContentWrapper
 * @namespace Component/ContentWrapper/Component
 */
export class ContentWrapper extends PureComponent<ContentWrapperComponentProps> {
    static defaultProps: Partial<ContentWrapperComponentProps> = {
        mix: {},
        wrapperMix: {},
        children: null,
        isNotSection: false
    };

    renderContentWrapper(): ReactElement {
        const {
            children, wrapperMix
        } = this.props;

        return (
            <div block="ContentWrapper" mix={ wrapperMix }>
                { children }
            </div>
        );
    }

    render(): ReactElement {
        const {
            mix,
            label,
            isNotSection
        } = this.props;

        if (isNotSection) {
            return this.renderContentWrapper();
        }

        return (
            <section mix={ mix } aria-label={ label }>
                { this.renderContentWrapper() }
            </section>
        );
    }
}

export default ContentWrapper;
