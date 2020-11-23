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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import ExpandableContent from 'Component/ExpandableContent';
import Html from 'Component/Html';
import { ProductType } from 'Type/ProductList';

import './ProductInformation.style';

/** @namespace Component/ProductInformation/Component */
export class ProductInformation extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired
    };

    renderDescription() {
        const { product: { description: { html } = {} } } = this.props;

        if (!html) {
            return null;
        }

        return (
            <div>
                <Html content={ html } />
            </div>
        );
    }

    renderContent() {
        const { areDetailsLoaded } = this.props;
        const heading = areDetailsLoaded ? __('Product information') : '';

        return (
            <ExpandableContent
              // show placeholder if the details are not loaded
              heading={ heading }
              mix={ { block: 'ProductInformation', elem: 'Content' } }
            >
                { this.renderDescription() }
            </ExpandableContent>
        );
    }

    render() {
        const {
            areDetailsLoaded,
            product: {
                description: { html } = {}
            }
        } = this.props;

        if (!html && areDetailsLoaded) {
            return null;
        }

        return (
            <ContentWrapper
              label="Product information"
              mix={ { block: 'ProductInformation' } }
              wrapperMix={ { block: 'ProductInformation', elem: 'Wrapper' } }
            >
                { this.renderContent() }
            </ContentWrapper>
        );
    }
}

export default ProductInformation;
