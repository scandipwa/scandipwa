/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { Fragment, PureComponent } from 'react';

import ExpandableContent from 'Component/ExpandableContent';
import ProductAttributeValue from 'Component/ProductAttributeValue';
import { ReactElement } from 'Type/Common.type';
import { IndexedAttributeWithValue } from 'Util/Product/Product.type';

import { ProductAttributesComponentProps, ProductAttributesComponentState } from './ProductAttributes.type';

import './ProductAttributes.style';

/** @namespace Component/ProductAttributes/Component */
export class ProductAttributesComponent<
P extends Readonly<ProductAttributesComponentProps> = Readonly<ProductAttributesComponentProps>,
S extends ProductAttributesComponentState = ProductAttributesComponentState,
> extends PureComponent<P, S> {
    renderGroups(): ReactElement {
        const { attributesWithValues } = this.props;

        const groups = Object.values(attributesWithValues).map(
            (attribute) => ({
                attribute_group_id: attribute.attribute_group_id,
                attribute_group_name: attribute.attribute_group_name,
            }),
        );

        const uniqueGroups = groups.filter(
            (group, index, array) => (
                index === array.findIndex((g) => g.attribute_group_id === group.attribute_group_id)
            ),
        );

        return (
            uniqueGroups.map(
                (group) => (
                    <div block="ProductAttributes" elem="AttributeBlock" key={ group.attribute_group_name }>
                        <h2 block="ProductAttributes" elem="Group">
                            { group.attribute_group_name }
                        </h2>
                        { this.renderAttributes(group.attribute_group_id) }
                    </div>
                ),
            )
        );
    }

    renderAttribute(attribute: IndexedAttributeWithValue): ReactElement {
        return (
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
    }

    renderAttributes(attribute_group_id: string): ReactElement {
        const { attributesWithValues } = this.props;

        if (!Object.keys(attributesWithValues).length) {
            return null;
        }

        const filteredAttributesWithValues = Object.values(attributesWithValues).filter(
            (attribute) => attribute.attribute_group_id === attribute_group_id,
        );

        if (!filteredAttributesWithValues.length) {
            return null;
        }

        return (
            <dl block="ProductAttributes" elem="Attributes">
                { filteredAttributesWithValues.map(this.renderAttribute.bind(this)) }
            </dl>
        );
    }

    renderContent(): ReactElement {
        const { areDetailsLoaded } = this.props;
        const heading = areDetailsLoaded ? __('Details') : '';

        return (
            <ExpandableContent
              // show placeholder if the details are not loaded
              heading={ heading }
              mix={ { block: 'ProductAttributes', elem: 'Content' } }
            >
                    { this.renderGroups() }
            </ExpandableContent>
        );
    }

    render(): ReactElement {
        const {
            areDetailsLoaded,
        } = this.props;

        if (!areDetailsLoaded) {
            return null;
        }

        return this.renderContent();
    }
}

export default ProductAttributesComponent;
