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

import Html from 'Component/Html';
import Image from 'Component/Image';
import TextPlaceholder from 'Component/TextPlaceholder';
import { CategoryTreeType } from 'Type/Category';

import './CategoryDetails.style';

/**
 * Category details
 * @class CategoryDetails
 * @namespace Component/CategoryDetails/Component
 */
export class CategoryDetails extends PureComponent {
    static propTypes = {
        category: CategoryTreeType.isRequired
    };

    renderCategoryName() {
        const { category: { name, id } } = this.props;

        if (id && !name) {
            return null;
        }

        return (
            <h1 block="CategoryDetails" elem="Heading">
                <TextPlaceholder content={ name } />
            </h1>
        );
    }

    renderCategoryDescription() {
        const { category: { description, id } } = this.props;

        if (!id) {
            return this.renderCategoryDescriptionPlaceholder();
        }

        if (!description) {
            return null;
        }

        return <Html content={ description } />;
    }

    renderCategoryDescriptionPlaceholder() {
        return (
            <p>
                <TextPlaceholder length="long" />
            </p>
        );
    }

    renderCategoryImagePlaceholder() {
        return (
            <Image
              mix={ { block: 'CategoryDetails', elem: 'Picture' } }
              objectFit="cover"
              ratio="custom"
              isPlaceholder
            />
        );
    }

    renderCategoryImage() {
        const { category: { image, id } } = this.props;

        if (!id) {
            return this.renderCategoryImagePlaceholder();
        }

        if (!image) {
            return null;
        }

        return (
            <Image
              mix={ { block: 'CategoryDetails', elem: 'Picture' } }
              src={ image || '' }
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

export default CategoryDetails;
