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
import TextPlaceholder from 'Component/TextPlaceholder';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CategoryTreeType } from 'Type/Category';
import { getUrlParam } from 'Util/Url';
import './CategoriesList.style';

/**
 * List of all categories and subcategories
 * @class CategoriesList
 */
class CategoriesList extends Component {
    renderCategoryLabel(label, link) {
        return (
            <Link to={ `/category/${link}` } onClick={ () => window.scrollTo(0, 0) }>
                { label }
            </Link>
        );
    }

    renderSubCategory({
        id,
        name,
        url_path,
        children
    }) {
        const { location, match } = this.props;
        const currentPath = getUrlParam(match, location);
        const isSelected = currentPath === url_path;
        const isParentExpanded = (currentPath.indexOf(url_path) === 0);

        return (
            <li
              block="CategoriesList"
              elem="Category"
              key={ id }
              mods={ { isSelected } }
            >
                {this.renderCategoryLabel(name, url_path)}
                {isParentExpanded && children && (
                    <ul>
                        { children.map(child => this.renderSubCategory(child)) }
                    </ul>
                )}
            </li>
        );
    }

    renderCategories(isLoading) {
        const { currentCategory: { children } } = this.props;

        if (isLoading) return <p><TextPlaceholder length="short" /></p>;
        if (!children || !children.length) return (<p>{ __('All products relate to current category!') }</p>);

        return (
            <ul>
                { children.map(child => this.renderSubCategory(child)) }
            </ul>
        );
    }

    render() {
        const { currentCategory: { id: isLoaded } } = this.props;

        return (
            <div block="CategoriesList">
                <h3><TextPlaceholder content={ !isLoaded ? '' : __('Sub Categories') } /></h3>
                { this.renderCategories(!isLoaded) }
            </div>
        );
    }
}

CategoriesList.propTypes = {
    currentCategory: CategoryTreeType.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    match: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired
};

export default CategoriesList;
