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
import { Fragment, PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import ExpandableContent from 'Component/ExpandableContent';
import ProductAttributeValue from 'Component/ProductAttributeValue';
import { AttributeType, ProductType } from 'Type/ProductList';

import './ProductInformationAttributes.style';

/** @namespace Component/ProductInformationAttributes/Component */
export class ProductInformationAttributes extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired,
        attributesWithValues: AttributeType.isRequired
    };

    renderAttribute = ([attributeLabel, valueLabel]) => (
        <Fragment key={ attributeLabel }>
            <dt block="ProductInformationAttributes" elem="AttributeLabel">
                { attributeLabel }
            </dt>
            <dd block="ProductInformationAttributes" elem="ValueLabel">
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
            <dl block="ProductInformationAttributes" elem="Attributes">
                { Object.entries(attributesWithValues).map(this.renderAttribute) }
            </dl>
        );
    }

    renderContent() {
        const { areDetailsLoaded } = this.props;
        const heading = areDetailsLoaded ? __('Product attributes') : '';

        return (
            <ExpandableContent
              // show placeholder if the details are not loaded
              heading={ heading }
              mix={ { block: 'ProductInformationAttributes', elem: 'Content' } }
            >
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
              label="Product information attributes"
              mix={ { block: 'ProductInformationAttributes' } }
              wrapperMix={ { block: 'ProductInformationAttributes', elem: 'Wrapper' } }
            >
                { this.renderContent() }
            </ContentWrapper>
        );
    }
}

export default ProductInformationAttributes;
