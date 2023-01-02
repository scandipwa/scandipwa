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

import Image from 'Component/Image';
import Link from 'Component/Link';
import ProductAttributeValue from 'Component/ProductAttributeValue';
import TextPlaceholder from 'Component/TextPlaceholder';
import { TextPlaceHolderLength } from 'Component/TextPlaceholder/TextPlaceholder.config';
import { ReactElement } from 'Type/Common.type';

import { SearchItemComponentProps, SearchItemComponentState } from './SearchItem.type';

import './SearchItem.style';

/** @namespace Component/SearchItem/Component */
export class SearchItemComponent<
P extends Readonly<SearchItemComponentProps> = Readonly<SearchItemComponentProps>,
S extends SearchItemComponentState = SearchItemComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<SearchItemComponentProps> = {
        linkTo: { pathname: '' },
        imgSrc: '',
        customAttribute: null,
        product: {},
    };

    renderCustomAttribute(): ReactElement {
        const { customAttribute } = this.props;

        if (!customAttribute) {
            return null;
        }

        return (
            <div
              block="SearchItem"
              elem="CustomAttribute"
            >
                <ProductAttributeValue
                  attribute={ customAttribute }
                  isFormattedAsText
                />
            </div>
        );
    }

    renderContent(): ReactElement {
        const { product: { name } } = this.props;

        return (
            <figcaption block="SearchItem" elem="Content">
                { this.renderCustomAttribute() }
                <h4 block="SearchItem" elem="Title" mods={ { isLoaded: !!name } }>
                    <TextPlaceholder content={ name } length={ TextPlaceHolderLength.LONG } />
                </h4>
            </figcaption>
        );
    }

    renderImage(): ReactElement {
        const {
            product: { name },
            imgSrc,
        } = this.props;

        if (name && !imgSrc) {
            return (
                <div
                  block="SearchItem"
                  elem="Image"
                />
            );
        }

        return (
            <Image
              block="SearchItem"
              elem="Image"
              src={ imgSrc }
              alt={ __('Product %s thumbnail.', name) }
              isPlaceholder={ !name }
            />
        );
    }

    renderLink(): ReactElement {
        const { linkTo, onClick } = this.props;

        return (
            <Link
              block="SearchItem"
              elem="Link"
              to={ linkTo }
              onClick={ onClick }
            >
                <figure
                  block="SearchItem"
                  elem="Wrapper"
                >
                    { this.renderImage() }
                    { this.renderContent() }
                </figure>
            </Link>
        );
    }

    render(): ReactElement {
        return (
            <li block="SearchItem">
                { this.renderLink() }
            </li>
        );
    }
}

export default SearchItemComponent;
