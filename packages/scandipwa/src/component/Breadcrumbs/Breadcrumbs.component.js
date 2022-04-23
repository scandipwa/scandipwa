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

import Breadcrumb from 'Component/Breadcrumb';
import ContentWrapper from 'Component/ContentWrapper';
import { CHECKOUT_URL } from 'Route/Checkout/Checkout.config';
import { ACCOUNT_URL } from 'Route/MyAccount/MyAccount.config';
import { BreadcrumbsType } from 'Type/Breadcrumbs.type';
import { appendWithStoreCode, isHomePageUrl } from 'Util/Url';

import './Breadcrumbs.style';

/**
 * Breadcrumbs
 * @class Breadcrumbs
 * @namespace Component/Breadcrumbs/Component
 */
export class Breadcrumbs extends PureComponent {
    static propTypes = {
        breadcrumbs: BreadcrumbsType.isRequired,
        areBreadcrumbsVisible: PropTypes.bool.isRequired
    };

    renderBreadcrumb({ url, name }, i) {
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

    renderBreadcrumbList(breadcrumbs) {
        const breadcrumbsWithHome = [
            ...breadcrumbs,
            // Looks like a browser bug, temporary fixed with .toString()
            { url: '/', name: __('Home').toString() }
        ];

        return breadcrumbsWithHome.map((_, i) => this.renderBreadcrumb(
            breadcrumbsWithHome[breadcrumbsWithHome.length - 1 - i], i
        ));
    }

    shouldHideBreadcrumbs() {
        const { areBreadcrumbsVisible } = this.props;
        const { pathname = appendWithStoreCode('/') } = location;

        const shouldHide = (
            !areBreadcrumbsVisible
            || pathname.match(appendWithStoreCode(ACCOUNT_URL))
            || pathname.match(appendWithStoreCode(CHECKOUT_URL))
            || isHomePageUrl(pathname)
        );

        return shouldHide;
    }

    render() {
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
                                : this.renderBreadcrumb({}, 0)
                        ) }
                    </ul>
                </nav>
            </ContentWrapper>
        );
    }
}

export default Breadcrumbs;
