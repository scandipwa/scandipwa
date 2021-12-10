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

import ExpandableContent from 'Component/ExpandableContent';
import FieldContainer from 'Component/Field';
import { FIELD_TYPE } from 'Component/Field/Field.config';
import FieldGroup from 'Component/FieldGroup';
import Link from 'Component/Link';
import { DownloadableLinksType } from 'Type/Downloadable.type';
import { formatPrice } from 'Util/Price';

import './ProductDownloadableLinks.style';

/** @namespace Component/ProductDownloadableLinks/Component */
export class ProductDownloadableLinks extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        isRequired: PropTypes.bool.isRequired,
        links: DownloadableLinksType,
        title: PropTypes.string.isRequired,
        setSelectedCheckboxValues: PropTypes.func.isRequired,
        setRef: PropTypes.func.isRequired,
        isOpenInNewTab: PropTypes.bool.isRequired,
        currencyCode: PropTypes.string.isRequired
    };

    static defaultProps = {
        links: []
    };

    renderLabel(link) {
        const { title, price } = link;
        const { isRequired, currencyCode = 'USD' } = this.props;

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

    renderCheckBox(link) {
        const { setSelectedCheckboxValues, isRequired } = this.props;
        const { uid } = link;

        if (!isRequired) {
            return null;
        }

        return (
            <FieldContainer
              type={ FIELD_TYPE.checkbox }
              attr={ {
                  id: `link-${ uid }`,
                  value: uid,
                  name: `link-${ uid }`,
                  key: { uid }
              } }
              events={ {
                  onChange: setSelectedCheckboxValues
              } }
            />
        );
    }

    renderLink(link) {
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

    renderDownloadableLink(link) {
        const { id } = link;

        return (
            <div block="ProductDownloadableLink" key={ id }>
                { this.renderCheckBox.call(this, link) }
                { this.renderLabel(link) }
                { this.renderLink(link) }
            </div>
        );
    }

    renderLinks() {
        const { links, isRequired, setRef } = this.props;

        return (
            <FieldGroup
              validationRule={ {
                  isRequired
              } }
              validateOn={ ['onBlur'] }
            >
                <div ref={ (elem) => setRef(elem) }>
                    { links.map(this.renderDownloadableLink.bind(this)) }
                </div>
            </FieldGroup>
        );
    }

    renderTitle() {
        const { title, isRequired } = this.props;

        return (
            <p block="ProductDownloadableLinks" elem="Title">
                { title }
                { isRequired && <strong block="ProductDownloadableLinks" elem="Required"> *</strong> }
            </p>
        );
    }

    renderContent() {
        return (
            <>
            { this.renderTitle() }
            { this.renderLinks() }
            </>
        );
    }

    renderPlaceholder() {
        const { isLoading } = this.props;

        return (
            <div
              block="ProductDownloadableLinks"
              mods={ { isLoading, isPlaceholder: true } }
            />
        );
    }

    render() {
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

export default ProductDownloadableLinks;
