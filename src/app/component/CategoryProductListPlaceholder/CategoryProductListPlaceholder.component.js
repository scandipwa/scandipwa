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
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCard from 'Component/ProductCard';
import { MixType } from 'Type/Common';

import './CategoryProductListPlaceholder.style';

export const DEFAULT_PLACEHOLDER_COUNT = 4;

/**
 * Placeholder for List of category product
 * @class CategoryProductListPlaceholder
 */
export class CategoryProductListPlaceholder extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        isVisible: PropTypes.bool.isRequired,
        updatePages: PropTypes.func.isRequired,
        numberOfPlaceholders: PropTypes.number,
        mix: MixType
    };

    static defaultProps = {
        numberOfPlaceholders: DEFAULT_PLACEHOLDER_COUNT,
        mix: {}
    };

    componentDidMount() {
        this.startObserving();
    }

    componentDidUpdate() {
        this.startObserving();
    }

    componentWillUnmount() {
        this.stopObserving();
    }

    startObserving() {
        const { updatePages } = this.props;

        if (this.node && !this.observer && 'IntersectionObserver' in window) {
            const options = {
                rootMargin: '0px',
                threshold: 0.1
            };

            this.observer = new IntersectionObserver(([{ intersectionRatio }]) => {
                if (intersectionRatio > 0) {
                    this.stopObserving();
                    updatePages();
                }
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

    renderPlaceholders() {
        const { numberOfPlaceholders } = this.props;

        return Array.from(
            { length: numberOfPlaceholders },
            (_, i) => <ProductCard key={ i } product={ {} } />
        );
    }

    render() {
        const {
            isLoading,
            isVisible,
            mix
        } = this.props;

        if (!isLoading && !isVisible) {
            return null;
        }

        return (
            <ul
              block="CategoryProductList"
              elem="Page"
              mix={ {
                  block: 'CategoryProductListPlaceholder',
                  mix: { ...mix, elem: 'Page' }
              } }
            >
                <li
                  block="CategoryProductListPlaceholder"
                  elem="Offset"
                  ref={ isVisible ? (node) => {
                      this.node = node;
                  } : undefined }
                />
                { this.renderPlaceholders() }
            </ul>
        );
    }
}

export default withRouter(CategoryProductListPlaceholder);
