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
    }, isParent) {
        const { location, match } = this.props;
        const isSelected = getUrlParam(match, location) === url_path;

        return (
            <li block="CategoriesList" elem="Category" key={ id } mods={ { isSelected, isParent } }>
                { this.renderCategoryLabel(name, url_path) }
                { children && <ul>{ children.map(child => this.renderSubCategory(child)) }</ul> }
            </li>
        );
    }

    renderCategories(isLoadedOnce) {
        const { category: { children } } = this.props;

        if (isLoadedOnce) {
            if (children.length) {
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
        const { availableFilters, category } = this.props;
        const isLoadedOnce = availableFilters.length && Object.keys(category).length;

        return (
            <div block="CategoriesList">
                <h3><TextPlaceholder content={ isLoadedOnce ? 'Available categories' : '' } /></h3>
                { this.renderCategories(isLoadedOnce) }
            </div>
        );
    }
}

CategoriesList.propTypes = {
    availableFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
    category: CategoryTreeType.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    match: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired
};

export default CategoriesList;
