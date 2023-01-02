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

import ExpandableContent from 'Component/ExpandableContent';
import FieldContainer from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import FieldGroup from 'Component/FieldGroup';
import Link from 'Component/Link';
import { DownloadableProductLinks } from 'Query/ProductList.type';
import { ReactElement } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { formatPrice } from 'Util/Price';

import { ProductDownloadableLinksComponentProps, ProductDownloadableLinksComponentState } from './ProductDownloadableLinks.type';

import './ProductDownloadableLinks.style';

/** @namespace Component/ProductDownloadableLinks/Component */
export class ProductDownloadableLinksComponent<
P extends Readonly<ProductDownloadableLinksComponentProps> = Readonly<ProductDownloadableLinksComponentProps>,
S extends ProductDownloadableLinksComponentState = ProductDownloadableLinksComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<ProductDownloadableLinksComponentProps> = {
        links: [],
    };

    renderLabel(link: DownloadableProductLinks): ReactElement {
        const { title, price } = link;
        const { isRequired, currencyCode = GQLCurrencyEnum.USD } = this.props;

        if (!isRequired) {
            return (
            <span block="ProductDownloadableLink" elem="SampleTitle">
                { title }
            </span>
            );
        }

        return (
            <span block="ProductDownloadableLink" elem="SampleTitle">
                { title }
                <strong>{ ` + ${ formatPrice(price, currencyCode) }` }</strong>
            </span>
        );
    }

    renderCheckBox(link: DownloadableProductLinks): ReactElement {
        const { setSelectedCheckboxValues, isRequired } = this.props;
        const { uid = '' } = link;
        const label = this.renderLabel(link);

        if (!isRequired) {
            return null;
        }

        return (
            <FieldContainer
              type={ FieldType.CHECKBOX }
              attr={ {
                  id: `link-${ uid }`,
                  value: uid,
                  name: `link-${ uid }`,
                  key: uid,
              } }
              events={ {
                  onChange: setSelectedCheckboxValues,
              } }
              label={ label }
            />
        );
    }

    renderLink(link: DownloadableProductLinks): ReactElement {
        const { isOpenInNewTab } = this.props;
        const { sample_url } = link;

        if (!sample_url) {
            return null;
        }

        return (
            <Link
              to={ sample_url }
              isOpenInNewTab={ isOpenInNewTab }
              block="ProductDownloadableLink"
              elem="SampleLink"
            >
                { __('Sample') }
            </Link>
        );
    }

    renderDownloadableLink(link: DownloadableProductLinks): ReactElement {
        const { isRequired } = this.props;
        const { id } = link;

        return (
            <div block="ProductDownloadableLink" key={ id }>
                { isRequired ? this.renderCheckBox.call(this, link) : this.renderLabel(link) }
                { this.renderLink(link) }
            </div>
        );
    }

    renderLinks(): ReactElement {
        const { links, isRequired, setRef } = this.props;

        return (
            <FieldGroup
              validationRule={ {
                  isRequired,
              } }
              validateOn={ ['onSubmit', 'onChange'] }
            >
                <div ref={ (elem) => setRef(elem) }>
                    { links.map(this.renderDownloadableLink.bind(this)) }
                </div>
            </FieldGroup>
        );
    }

    renderTitle(): ReactElement {
        const { title, isRequired } = this.props;

        return (
            <p block="ProductDownloadableLinks" elem="Title">
                { title }
                { isRequired && <strong block="ProductDownloadableLinks" elem="Required"> *</strong> }
            </p>
        );
    }

    renderContent(): ReactElement {
        return (
            <>
            { this.renderTitle() }
            { this.renderLinks() }
            </>
        );
    }

    renderPlaceholder(): ReactElement {
        const { isLoading } = this.props;

        return (
            <div
              block="ProductDownloadableLinks"
              mods={ { isLoading, isPlaceholder: true } }
            />
        );
    }

    render(): ReactElement {
        const { isLoading, title } = this.props;

        if (isLoading) {
            return this.renderPlaceholder();
        }

        return (
            <ExpandableContent
              block="ProductDownloadableLinks"
              heading={ title }
              mix={ { block: 'ProductDownloadableLinks' } }
            >
                { this.renderContent() }
            </ExpandableContent>
        );
    }
}

export default ProductDownloadableLinksComponent;
