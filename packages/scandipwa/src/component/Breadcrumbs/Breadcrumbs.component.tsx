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

import Breadcrumb from 'Component/Breadcrumb';
import ContentWrapper from 'Component/ContentWrapper';
import { CheckoutStepUrl } from 'Route/Checkout/Checkout.config';
import { Breadcrumb as BreadcrumbType } from 'Store/Breadcrumbs/Breadcrumbs.type';
import { ReactElement } from 'Type/Common.type';
import { appendWithStoreCode, isHomePageUrl } from 'Util/Url';

import { BreadcrumbsComponentProps } from './Breadcrumbs.type';

import './Breadcrumbs.style';

/**
 * Breadcrumbs
 * @class Breadcrumbs
 * @namespace Component/Breadcrumbs/Component
 */
export class BreadcrumbsComponent extends PureComponent<BreadcrumbsComponentProps> {
    renderBreadcrumb({ url, name }: BreadcrumbType, i: number): ReactElement {
        const { breadcrumbs } = this.props;
        const isDisabled = !url || breadcrumbs.length - 1 === i;

        return (
            <Breadcrumb
              name={ name }
              url={ url }
              index={ i + 1 }
              key={ i }
              isDisabled={ isDisabled }
            />
        );
    }

    renderBreadcrumbList(breadcrumbs: BreadcrumbType[]): ReactElement {
        const breadcrumbsWithHome = [
            ...breadcrumbs,
            // Looks like a browser bug, temporary fixed with .toString()
            { url: '/', name: __('Home').toString() },
        ];

        return breadcrumbsWithHome.map((_, i) => this.renderBreadcrumb(breadcrumbsWithHome[breadcrumbsWithHome.length - 1 - i], i));
    }

    shouldHideBreadcrumbs(): boolean {
        const {
            areBreadcrumbsVisible,
            baseUrl = window.base_link_url,
        } = this.props;
        const { pathname = appendWithStoreCode('/', baseUrl) } = location;

        return !!(
            !areBreadcrumbsVisible
            || pathname.match(appendWithStoreCode(CheckoutStepUrl.CHECKOUT_URL, baseUrl))
            || isHomePageUrl(pathname, baseUrl)
        );
    }

    render(): ReactElement {
        const { breadcrumbs } = this.props;

        if (this.shouldHideBreadcrumbs()) {
            return null;
        }

        return (
            <ContentWrapper mix={ { block: 'Breadcrumbs' } } label={ __('Breadcrumbs (current location)...') }>
                <nav aria-label="Breadcrumbs navigation">
                    <ul
                      block="Breadcrumbs"
                      elem="List"
                      itemScope
                      itemType="http://schema.org/BreadcrumbList"
                    >
                        { (
                            breadcrumbs.length
                                ? this.renderBreadcrumbList(breadcrumbs)
                                : this.renderBreadcrumb({} as BreadcrumbType, 0)
                        ) }
                    </ul>
                </nav>
            </ContentWrapper>
        );
    }
}

export default BreadcrumbsComponent;
