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

import parser from 'html-react-parser';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import TextPlaceholder from 'Component/TextPlaceholder';
import { TextPlaceHolderLength } from 'Component/TextPlaceholder/TextPlaceholder.config';
import { UrlRewritePageType } from 'Route/UrlRewrites/UrlRewrites.config';
import { ReactElement } from 'Type/Common.type';

import { FallbackComponentProps } from './Fallback.type';

import './Fallback.style';

/** @namespace Component/Fallback/Component */
export class FallbackComponent extends PureComponent<FallbackComponentProps> {
    static defaultProps: Partial<FallbackComponentProps> = {
        type: '',
    };

    fallbackMap: Record<string, ReactElement> = {
        [UrlRewritePageType.CATEGORY]: this.renderCategoryFallback(),
        [UrlRewritePageType.PRODUCT]: this.renderProductFallback(),
    };

    renderCategoryName(): ReactElement {
        const {
            actionName: {
                id,
                name,
            } = {},
        } = window;

        if (id && !name) {
            return null;
        }

        return (
            <h1 block="Fallback" elem="Heading">
                { name }
            </h1>
        );
    }

    renderCategoryDescription(): ReactElement {
        const {
            actionName: {
                id,
                description,
            } = {},
        } = window;

        if (!id) {
            return (
                <p>
                    <TextPlaceholder length={ TextPlaceHolderLength.LONG } />
                </p>
            );
        }

        if (!description) {
            return null;
        }

        return (
            <div block="Fallback" elem="CategoryDescription">
                { parser(description) }
            </div>
        );
    }

    renderCategoryFallback(): ReactElement {
        const { actionName: { type } = {} } = window;

        if (type !== UrlRewritePageType.CATEGORY) {
            return this.renderDefaultFallback();
        }

        return (
            <main
              block="Fallback"
              elem="CategoryPagePlaceholder"
            >
                <ContentWrapper
                  wrapperMix={ { block: 'Fallback', elem: 'CategoryWrapper' } }
                  label="Category page"
                >
                    <div
                      block="Fallback"
                      elem="CategoryFilterOverlay"
                      mix={ { block: 'Fallback', elem: 'Placeholder' } }
                    />
                    <article block="Fallback" elem="CategoryDetails">
                        { this.renderCategoryName() }
                        { this.renderCategoryDescription() }
                    </article>
                    <div block="Fallback" elem="DefaultPlaceholder" />
                </ContentWrapper>
            </main>
        );
    }

    renderProductFallback(): ReactElement {
        const { actionName: { name, type } = {} } = window;

        if (type !== UrlRewritePageType.PRODUCT) {
            return this.renderDefaultFallback();
        }

        return (
            <main
              block="Fallback"
              elem="ProductPagePlaceholder"
              aria-label="Product page"
            >
                <ContentWrapper
                  wrapperMix={ { block: 'Fallback', elem: 'ProductWrapper' } }
                  label={ __('Main product details') }
                >
                    <div block="Fallback" elem="ProductDetails">
                        <h1 block="Fallback" elem="Heading">
                            { name }
                        </h1>
                    </div>
                    <div block="Fallback" elem="ProductGallery">
                        <div block="Fallback" elem="ProductGallerySlider" />
                    </div>
                    <article block="Fallback" elem="ProductActions">
                        <h1 block="Fallback" elem="Title">
                            { name }
                        </h1>
                    </article>
                </ContentWrapper>
            </main>
        );
    }

    renderDefaultFallback(): ReactElement {
        return (
            <main block="Fallback" elem="DefaultPlaceholder" />
        );
    }

    render(): ReactElement {
        const { type } = this.props;

        return this.fallbackMap[type] || this.renderDefaultFallback();
    }
}

export default FallbackComponent;
