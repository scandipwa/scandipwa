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
import { AttributeType } from 'Type/ProductList';

import './ProductAttributes.style';

/** @namespace Component/ProductAttributes/Component */
export class ProductAttributes extends PureComponent {
    static propTypes = {
        areDetailsLoaded: PropTypes.bool.isRequired,
        attributesWithValues: AttributeType.isRequired
    };

    renderGroups() {
        const { attributesWithValues } = this.props;

        const groups = Object.values(attributesWithValues).map(
            (attribute) => ({
                attribute_group_id: attribute.attribute_group_id,
                attribute_group_name: attribute.attribute_group_name,
                attribute_group_code: attribute.attribute_group_code
            })
        );

        const uniqueGroups = groups.filter(
            (group, index, array) => (
                index === array.findIndex((g) => g.attribute_group_id === group.attribute_group_id)
            )
        );

        return (
            uniqueGroups.map(
                (group) => (
<Fragment key={ group.attribute_group_id }>
                    <p block="ProductAttributes" elem="Group">
                        { group.attribute_group_name }
                    </p>
                    { this.renderAttributes(group.attribute_group_id) }
</Fragment>
                )
            )
        );
    }

    renderAttribute = (attribute) => (
        <Fragment key={ attribute.attribute_label }>
            <dt block="ProductAttributes" elem="AttributeLabel">
                { attribute.attribute_label }
            </dt>
            <dd block="ProductAttributes" elem="ValueLabel">
                <ProductAttributeValue
                  key={ attribute.attribute_label }
                  attribute={ attribute }
                  isFormattedAsText
                />
            </dd>
        </Fragment>
    );

    renderAttributes(attribute_group_id) {
        const { attributesWithValues } = this.props;

        if (!Object.keys(attributesWithValues).length) {
            return null;
        }

        const filteredAttributesWithValues = Object.values(attributesWithValues).filter(
            (attribute) => attribute.attribute_group_id === attribute_group_id
        );

        if (!filteredAttributesWithValues.length) {
            return null;
        }

        return (
            <dl block="ProductAttributes" elem="Attributes">
                { filteredAttributesWithValues.map(this.renderAttribute) }
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
              mix={ { block: 'ProductAttributes', elem: 'Content' } }
            >
                <div>
                    { this.renderGroups() }
                </div>
            </ExpandableContent>
        );
    }

    render() {
        const {
            areDetailsLoaded
        } = this.props;

        if (!areDetailsLoaded) {
            return null;
        }

        return (
            <ContentWrapper
              label="Product attributes"
              mix={ { block: 'ProductAttributes' } }
              wrapperMix={ { block: 'ProductAttributes', elem: 'Wrapper' } }
            >
                { this.renderContent() }
            </ContentWrapper>
        );
    }
}

export default ProductAttributes;
