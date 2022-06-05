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

import { PureComponent } from 'react';

import ExpandableContent from 'Component/ExpandableContent';
import Link from 'Component/Link';
import { ReactElement } from 'Type/Common.type';

import { ProductDownloadableSamplesComponentProps } from './ProductDownloadableSamples.type';

import './ProductDownloadableSamples.style';

/** @namespace Component/ProductDownloadableSamples/Component */
export class ProductDownloadableSamples extends PureComponent<ProductDownloadableSamplesComponentProps> {
    static defaultProps: Partial<ProductDownloadableSamplesComponentProps> = {
        isOpenInNewTab: false
    };

    renderDownloadableProductSampleItems(): ReactElement {
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

    render(): ReactElement {
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
