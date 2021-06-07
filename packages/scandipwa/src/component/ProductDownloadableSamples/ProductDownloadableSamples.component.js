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
import Link from 'Component/Link';
import { DownloadableSamplesType } from 'Type/ProductList';

import './ProductDownloadableSamples.style.scss';

/** @namespace Component/ProductDownloadableSamples/Component */
export class ProductDownloadableSamples extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        samples: DownloadableSamplesType.isRequired,
        isOpenInNewTab: PropTypes.bool.isRequired
    };

    renderDownloadableProductSampleItems() {
        const {
            samples,
            isOpenInNewTab
        } = this.props;

        return samples.map((item, i) => {
            const { title, sample_url } = item;

            return (
                <dd
                  block="ProductDownloadableSamples"
                  elem="Link"
                  // eslint-disable-next-line react/no-array-index-key
                  key={ i }
                >
                    <Link
                      to={ sample_url }
                      isOpenInNewTab={ isOpenInNewTab }
                    >
                        { title }
                    </Link>
                </dd>
            );
        });
    }

    render() {
        const { title } = this.props;

        return (
            <ExpandableContent
              heading={ title }
              mix={ { block: 'ProductDownloadableSamples', elem: 'Wrapper' } }
            >
                <dl block="ProductDownloadableSamples">
                    <dt block="ProductDownloadableSamples" elem="Title">
                        { title }
                    </dt>
                    { this.renderDownloadableProductSampleItems() }
                </dl>
            </ExpandableContent>
        );
    }
}

export default ProductDownloadableSamples;
