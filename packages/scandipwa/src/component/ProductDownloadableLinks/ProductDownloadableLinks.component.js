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

import Field from 'Component/Field';
import Link from 'Component/Link';
import { formatPrice } from 'Util/Price';

/** @namespace Component/ProductDownloadableLinks/Component */
export class ProductDownloadableLinks extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        links: PropTypes.array,
        title: PropTypes.string.isRequired,
        setSelectedCheckboxValues: PropTypes.func.isRequired,
    };

    static defaultProps = {
        links: []
    };

    getLabel(link) {
        const { title, price } = link;

        return `${ title } (${ formatPrice(price) })`;
    }

    renderCheckBox(link) {
        const { sample_url, id } = link;
        const { setSelectedCheckboxValues } = this.props;

        return (
            <div>
                <Field
                    type='checkbox'
                    label={ this.getLabel(link) }
                    key={ id }
                    id={ `link-${id}` }
                    name={ `link-${id}` }
                    value={ id }
                    onChange={ setSelectedCheckboxValues }
                />
                <Link to={ sample_url } block="ProductDownloadableLinks" elem="SampleLink">
                    { __('Sample') }
                </Link>
            </div>
        );
    }

    renderCheckBoxes() {
        const { links } = this.props;

        return links.map((link) => this.renderCheckBox(link));
    }

    renderTitle() {
        const { title } = this.props;

        return (
            <h3 block="ProductDownloadableLinks" elem="Title">
                { title }
            </h3>
        );
    }

    renderContent() {
        return (
            <>
            { this.renderTitle() }
            { this.renderCheckBoxes() }
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
        const { isLoading } = this.props;

        if (isLoading) {
            return this.renderPlaceholder();
        }

        return this.renderContent();
    }
}

export default ProductDownloadableLinks;
