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

import React, { PureComponent } from 'react';
import Html from 'Component/Html';
import TextPlaceholder from 'Component/TextPlaceholder';
import Image from 'Component/Image';
import { CategoryTreeType } from 'Type/Category';
import './CategoryDetails.style';

/**
 * Category details
 * @class CategoryDetails
 */
class CategoryDetails extends PureComponent {
    renderCategoryName() {
        const { category: { name } } = this.props;

        return (
            <h1 block="CategoryDetails" elem="Heading">
                <TextPlaceholder content={ name } />
            </h1>
        );
    }

    renderCategoryDescription() {
        const { category: { description } } = this.props;

        if (description) {
            return <Html content={ description } />;
        }

        return (
            <p>
                <TextPlaceholder content={ description } length="long" />
            </p>
        );
    }

    renderCategoryImage() {
        const { category: { image } } = this.props;

        if (!image) {
            return (
                <Image
                  mix={ { block: 'CategoryDetails', elem: 'Picture' } }
                  objectFit="cover"
                  ratio="custom"
                  isPlaceholder
                />
            );
        }

        return (
            <Image
              mix={ { block: 'CategoryDetails', elem: 'Picture' } }
              src={ image && `/media/catalog/category/${image}` }
              ratio="custom"
              objectFit="cover"
            />
        );
    }

    render() {
        return (
            <article block="CategoryDetails">
                <div block="CategoryDetails" elem="Description">
                    { this.renderCategoryName() }
                    { this.renderCategoryDescription() }
                </div>
                { this.renderCategoryImage() }
            </article>
        );
    }
}

CategoryDetails.propTypes = {
    category: CategoryTreeType.isRequired
};

export default CategoryDetails;
