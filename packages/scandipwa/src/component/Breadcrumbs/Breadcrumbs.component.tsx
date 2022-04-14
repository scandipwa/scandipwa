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

import Breadcrumb from 'Component/Breadcrumb';
import ContentWrapper from 'Component/ContentWrapper';
import { Breadcrumb as BreadcrumbType } from 'Type/Breadcrumbs.type';
import { ReactElement } from 'Type/Common.type';
import { appendWithStoreCode, isHomePageUrl } from 'Util/Url';

import { BreadcrumbsComponentProps } from './Breadcrumbs.type';

import './Breadcrumbs.style';

/**
 * Breadcrumbs
 * @class Breadcrumbs
 * @namespace Component/Breadcrumbs/Component
 */
export class Breadcrumbs extends PureComponent<BreadcrumbsComponentProps> {
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
            { url: '/', name: __('Home').toString() }
        ];

        return breadcrumbsWithHome.map((_, i) => this.renderBreadcrumb(
            breadcrumbsWithHome[breadcrumbsWithHome.length - 1 - i], i
        ));
    }

    render(): ReactElement {
        const { breadcrumbs, areBreadcrumbsVisible } = this.props;
        const { pathname = appendWithStoreCode('/') } = location;

        if (
            !areBreadcrumbsVisible
            || pathname.match(appendWithStoreCode('/account'))
            || isHomePageUrl(pathname)
        ) {
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

export default Breadcrumbs;
