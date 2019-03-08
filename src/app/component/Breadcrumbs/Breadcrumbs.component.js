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
        const { breadcrumbs, areBreadcrumbsVisible } = this.props;

        if (!areBreadcrumbsVisible) return null;

        return (
            <ContentWrapper mix={ { block: 'Breadcrumbs' } } label="Breadcrumbs (current location)">
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
    areBreadcrumbsVisible: PropTypes.bool.isRequired
};

export default Breadcrumbs;
