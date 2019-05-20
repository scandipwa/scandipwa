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
    }, isParent) {
        const {
            currentCategory: {
                url_path: current_url_path
            }
        } = this.props;
        const isSelected = current_url_path === url_path;
        const isParentExpanded = current_url_path.substring(0, current_url_path.lastIndexOf('/')) === url_path
        || (isParent && isSelected);

        return (
            <li block="CategoriesList" elem="Category" key={ id } mods={ { isSelected } }>
                { this.renderCategoryLabel(name, url_path) }
                { isParentExpanded && children && <ul>{ children.map(child => this.renderSubCategory(child)) }</ul> }
            </li>
        );
    }

    renderCategories(isLoadedOnce) {
        const { category: { children } } = this.props;

        if (isLoadedOnce) {
            if (children && children.length) {
                return (
                    <ul>
                        { children.map(child => this.renderSubCategory(child, true)) }
                    </ul>
                );
            }

            return (<p>All products relate to current category!</p>);
        }

        return (
            <p><TextPlaceholder length="short" /></p>
        );
    }

    render() {
        const { availableFilters, category, currentCategory } = this.props;
        const isLoadedOnce = availableFilters.length
            && Object.keys(category).length
            && Object.keys(currentCategory).length;

        return (
            <div block="CategoriesList">
                <h3><TextPlaceholder content={ isLoadedOnce ? 'Categories' : '' } /></h3>
                { this.renderCategories(isLoadedOnce) }
            </div>
        );
    }
}

CategoriesList.propTypes = {
    availableFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
    category: CategoryTreeType.isRequired,
    currentCategory: CategoryTreeType.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    match: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired
};

export default CategoriesList;
