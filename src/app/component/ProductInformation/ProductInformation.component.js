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

import './ProductInformation.style';

import PropTypes from 'prop-types';
import { Fragment, PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import ExpandableContent from 'Component/ExpandableContent';
import Html from 'Component/Html';
import ProductAttributeValue from 'Component/ProductAttributeValue';
import { AttributeType, ProductType } from 'Type/ProductList';

export class ProductInformation extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired,
        attributesWithValues: AttributeType.isRequired
    };

    renderAttribute = ([attributeLabel, valueLabel]) => (
        <Fragment key={ attributeLabel }>
            <dt block="ProductInformation" elem="AttributeLabel">
                { attributeLabel }
            </dt>
            <dd block="ProductInformation" elem="ValueLabel">
                <ProductAttributeValue
                  key={ attributeLabel }
                  attribute={ valueLabel }
                  isFormattedAsText
                />
            </dd>
        </Fragment>
    );

    renderAttributes() {
        const { attributesWithValues } = this.props;

        if (!Object.keys(attributesWithValues).length) {
            return null;
        }

        return (
            <dl block="ProductInformation" elem="Attributes">
                { Object.entries(attributesWithValues).map(this.renderAttribute) }
            </dl>
        );
    }

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
                { this.renderAttributes() }
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
