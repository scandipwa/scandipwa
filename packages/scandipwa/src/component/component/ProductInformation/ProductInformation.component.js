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

import ContentWrapper from '../ContentWrapper';
import ExpandableContent from '../ExpandableContent';
import Html from '../Html';
import ProductAttributeValue from '../ProductAttributeValue';
import { AttributeType, ProductType } from '../../../../../../../123/src/app/type/ProductList';

import './ProductInformation.style';

/** @namespace Component/ProductInformation/Component */
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

    isHTMLWhiteSpaceOrUndefined(htmlString) {
        if (!htmlString || htmlString.trim() === '') {
            return true;
        }

        // creates a DOM object from string
        const parser = new DOMParser();
        const document = parser.parseFromString(htmlString.trim(), 'text/html');

        // handles the case of plain text
        if (document.body.children.length === 0) {
            return false;
        }

        // check if at least one HTML element has content
        const elementsWithContent = Array.from(document.body.children).filter((element) => element.innerText !== '');
        return elementsWithContent.length === 0;
    }

    render() {
        const {
            areDetailsLoaded,
            product: {
                description: { html } = {}
            }
        } = this.props;

        if (this.isHTMLWhiteSpaceOrUndefined(html) && areDetailsLoaded) {
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
