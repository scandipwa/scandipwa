import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import ProductCard from 'Component/ProductCard';
import TextPlaceholder from 'Component/TextPlaceholder';
import { ItemsType } from 'Type/ProductList';
import './CategoryProductList.style';

// TODO: known bug – when switching catgories rapidly & <VisibilitySensor> is left in viewport it breaks

/**
 * List of category products
 * @class CategoryProductList
 */
class CategoryProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prevItemsLength: 0
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { items } = props;
        const { prevItemsLength } = state;

        if (items.length !== prevItemsLength) return { prevItemsLength: 0 };
        return null;
    }

    /**
     * Show loading placeholders while products are fetching
     * @return {void}
     */
    showLoading() {
        const { items, increasePage } = this.props;
        this.setState({ prevItemsLength: items.length });
        increasePage();
    }

    renderProducts() {
        const { items, customFilters } = this.props;

        return items.map(product => (
            <ProductCard
              product={ product }
              key={ product.id }
              customFilters={ customFilters }
            />
        ));
    }

    renderVisibiltySensor() {
        const { prevItemsLength } = this.state;
        const { items } = this.props;

        return (
            <VisibilitySensor
              partialVisibility
              offset={ { top: 600 } }
              onChange={ (isVisible) => {
                  const canShowLoading = isVisible
                    && prevItemsLength !== items.length
                    && items.length !== 0;

                  if (canShowLoading) this.showLoading();
              } }
            >
                { this.renderPlaceholders() }
            </VisibilitySensor>
        );
    }

    renderPlaceholders() {
        return (
            <>
                <ProductCard product={ {} } />
                <ProductCard product={ {} } />
                <ProductCard product={ {} } />
            </>
        );
    }

    render() {
        const { items, totalItems, isLoading } = this.props;
        const showLoadMore = items.length < totalItems && !isLoading;

        return (
            <ul block="CategoryProductList" mods={ { isLoading } }>
                { !isLoading && this.renderProducts() }
                { showLoadMore && this.renderVisibiltySensor() }
                { isLoading && this.renderPlaceholders() }
            </ul>
        );
    }
}

CategoryProductList.propTypes = {
    items: ItemsType.isRequired,
    totalItems: PropTypes.number.isRequired,
    increasePage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    customFilters: PropTypes.objectOf(PropTypes.array)
};

CategoryProductList.defaultProps = {
    customFilters: {}
};

export default CategoryProductList;
