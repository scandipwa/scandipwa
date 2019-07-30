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
import ProductCard from 'Component/ProductCard';
import './CategoryProductListPlaceholder.style';

/**
 * Placeholder for List of category product
 * @class CategoryProductListPlaceholder
 */
class CategoryProductListPlaceholder extends Component {
    componentDidUpdate() {
        const { updatePages } = this.props;

        if (this.node && 'IntersectionObserver' in window) {
            const options = {
                rootMargin: '0px',
                threshold: 0.1
            };

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(({ intersectionRatio }) => {
                    if (intersectionRatio > 0) {
                        this.stopObserving();
                        updatePages();
                    }
                });
            }, options);

            this.observer.observe(this.node);
        }
    }

    stopObserving() {
        if (this.observer) {
            if (this.observer.unobserve && this.node) {
                this.observer.unobserve(this.node);
            }

            if (this.observer.disconnect) {
                this.observer.disconnect();
            }

            this.observer = null;
        }
    }

    render() {
        const { isLoading, isVisible } = this.props;

        const renderPlaceholders = () => (
            <>
                <ProductCard product={ {} } />
                <ProductCard product={ {} } />
                <ProductCard product={ {} } />
            </>
        );

        if (isLoading) {
            return (
                <div block="CategoryProductListPlaceholder">
                    { renderPlaceholders() }
                </div>
            );
        }

        if (isVisible) {
            return (
                <div
                  block="CategoryProductListPlaceholder"
                  ref={ (node) => { this.node = node; } }
                >
                    { renderPlaceholders() }
                </div>
            );
        }

        return null;
    }
}

CategoryProductListPlaceholder.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isVisible: PropTypes.bool.isRequired,
    updatePages: PropTypes.func.isRequired
};

export default CategoryProductListPlaceholder;
