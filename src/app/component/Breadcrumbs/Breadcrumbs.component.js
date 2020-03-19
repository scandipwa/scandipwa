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
import PropTypes from 'prop-types';

import TextPlaceholder from 'Component/TextPlaceholder';
import ContentWrapper from 'Component/ContentWrapper';
import { BreadcrumbsType } from 'Type/Breadcrumbs';
import Link from 'Component/Link';

import './Breadcrumbs.style';

/**
 * Breadcrumbs
 * @class Breadcrumbs
 */
export default class Breadcrumbs extends PureComponent {
    static propTypes = {
        breadcrumbs: BreadcrumbsType.isRequired,
        areBreadcrumbsVisible: PropTypes.bool.isRequired
    };

    renderBreadcrumb({ url, name }, i) {
        const { breadcrumbs } = this.props;
        const isDisabled = !url || breadcrumbs.length - 1 === i;

        return (
            <li
              block="Breadcrumbs"
              elem="Crumb"
              key={ i }
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
                <Link
                  block="Breadcrumbs"
                  elem="Link"
                  to={ url || '' }
                  tabIndex={ isDisabled ? '-1' : '0' }
                >
                    <meta itemProp="item" content={ window.location.origin + (url || '') } />
                    <span itemProp="name">
                        <TextPlaceholder content={ name } />
                    </span>
                    <meta itemProp="position" content={ i } />
                </Link>
            </li>
        );
    }

    renderBreadcrumbList(breadcrumbs) {
        return breadcrumbs.map((_, i) => this.renderBreadcrumb(
            breadcrumbs[breadcrumbs.length - 1 - i], i
        ));
    }

    render() {
        const { breadcrumbs, areBreadcrumbsVisible } = this.props;

        if (!areBreadcrumbsVisible || location.pathname === '/') {
            return null;
        }

        return (
            <ContentWrapper mix={ { block: 'Breadcrumbs' } } label={ __('Breadcrumbs (current location)...') }>
                <nav aria-label="Breadcrumbs navigation">
                    <ul
                      block="Breadcrumbs"
                      elem="List"
                      itemScope
                      itemType="https://schema.org/BreadcrumbList"
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
