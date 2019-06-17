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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ContentWrapper from 'Component/ContentWrapper';
import { BreadcrumbsType } from 'Type/Breadcrumbs';
import './Breadcrumbs.style';
import TextPlaceholder from 'Component/TextPlaceholder';

/**
 * Breadcrumbs
 * @class Breadcrumbs
 */
class Breadcrumbs extends Component {
    renderBreadcrumb({ url, name }, i) {
        const { breadcrumbs } = this.props;
        const isDisabled = !url || breadcrumbs.length - 1 === i;

        return (
            <li block="Breadcrumbs" elem="Crumb" key={ i }>
                <Link to={ url || '' } tabIndex={ isDisabled ? '-1' : '0' }>
                    <TextPlaceholder content={ name } />
                </Link>
            </li>
        );
    }

    renderBreadcrumbList(breadcrumbs) {
        return breadcrumbs
            .reverse()
            .map((breadcrumb, i) => this.renderBreadcrumb(breadcrumb, i));
    }

    render() {
        const { breadcrumbs, areBreadcrumbsVisible, isHeaderAndFooterVisible } = this.props;

        if (!areBreadcrumbsVisible || !isHeaderAndFooterVisible) return null;

        return (
            <ContentWrapper mix={ { block: 'Breadcrumbs' } } label={ __('Breadcrumbs (current location)...') }>
                <nav aria-label="Breadcrumbs navigation">
                    <ul block="Breadcrumbs" elem="List">
                        { breadcrumbs.length
                            ? this.renderBreadcrumbList(breadcrumbs)
                            : this.renderBreadcrumb({}, 0)
                        }
                    </ul>
                </nav>
            </ContentWrapper>
        );
    }
}

Breadcrumbs.propTypes = {
    breadcrumbs: BreadcrumbsType.isRequired,
    areBreadcrumbsVisible: PropTypes.bool.isRequired,
    isHeaderAndFooterVisible: PropTypes.bool.isRequired
};

export default Breadcrumbs;
