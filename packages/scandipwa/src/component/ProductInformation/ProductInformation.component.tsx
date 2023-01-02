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

import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import ExpandableContent from 'Component/ExpandableContent';
import Html from 'Component/Html';
import TextPlaceholder from 'Component/TextPlaceholder';
import { TextPlaceHolderLength } from 'Component/TextPlaceholder/TextPlaceholder.config';
import { ReactElement } from 'Type/Common.type';

import { ProductInformationComponentProps, ProductInformationComponentState } from './ProductInformation.type';

import './ProductInformation.style';

/** @namespace Component/ProductInformation/Component */
export class ProductInformationComponent<
P extends Readonly<ProductInformationComponentProps> = Readonly<ProductInformationComponentProps>,
S extends ProductInformationComponentState = ProductInformationComponentState,
> extends PureComponent<P, S> {
    renderDescription(): ReactElement {
        const { htmlDescription } = this.props;

        if (!htmlDescription) {
            return (
                <TextPlaceholder length={ TextPlaceHolderLength.LONG } />
            );
        }

        const cleanDescription = htmlDescription.replace(/<\/?[^>]+(>|$)/g, '');

        return (
            <div block="ProductInformation" elem="Description">
                <meta itemProp="description" content={ cleanDescription } />
                <Html content={ htmlDescription } />
            </div>
        );
    }

    renderContent(): ReactElement {
        const { areDetailsLoaded } = this.props;
        const heading = areDetailsLoaded ? __('About') : '';

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

    isHTMLWhiteSpaceOrUndefined(htmlString: string): boolean {
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
        const elementsWithContent = Array.from(
            document.body.children as HTMLCollectionOf<HTMLElement>,
        ).filter(
            (element) => element.innerText !== '' || element.nodeName === 'IMG',
        );

        return elementsWithContent.length === 0;
    }

    render(): ReactElement {
        const {
            areDetailsLoaded,
            htmlDescription,
        } = this.props;

        if (this.isHTMLWhiteSpaceOrUndefined(htmlDescription) && areDetailsLoaded) {
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

export default ProductInformationComponent;
