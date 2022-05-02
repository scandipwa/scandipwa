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
import { TextPlaceHolderLength } from 'Component/TextPlaceholder/TextPlaceholder.config';
import { CategoryTreeType } from 'Type/Category.type';
import { ReactElement } from 'Type/Common.type';

import './CategoryDetails.style';

/**
 * Category details
 * @class CategoryDetails
 * @namespace Component/CategoryDetails/Component
 */
export class CategoryDetails extends PureComponent {
    static propTypes = {
        category: CategoryTreeType.isRequired,
        isCurrentCategoryLoaded: PropTypes.bool
    };

    static defaultProps = {
        isCurrentCategoryLoaded: true
    };

    renderCategoryText(): ReactElement {
        const {
            category: { name },
            isCurrentCategoryLoaded
        } = this.props;

        if (isCurrentCategoryLoaded) {
            return (
                <TextPlaceholder content={ name } />
            );
        }

        return (
            <TextPlaceholder />
        );
    }

    renderCategoryName(): ReactElement {
        const {
            category: { name, id }
        } = this.props;

        if (id && !name) {
            return null;
        }

        return (
            <h1 block="CategoryDetails" elem="Heading">
                { this.renderCategoryText() }
            </h1>
        );
    }

    renderCategoryDescription(): ReactElement {
        const {
            category: { description, id },
            isCurrentCategoryLoaded
        } = this.props;

        if (!id || !isCurrentCategoryLoaded) {
            return this.renderCategoryDescriptionPlaceholder();
        }

        if (!description) {
            return null;
        }

        return <Html content={ description } />;
    }

    renderCategoryDescriptionPlaceholder(): ReactElement {
        return (
            <p>
                <TextPlaceholder length={ TextPlaceHolderLength.LONG } />
            </p>
        );
    }

    renderCategoryImagePlaceholder(): ReactElement {
        return (
            <Image
              mix={ { block: 'CategoryDetails', elem: 'Picture' } }
              objectFit="cover"
              ratio="custom"
              isPlaceholder
            />
        );
    }

    renderCategoryImage(): ReactElement {
        const {
            category: { image, id },
            isCurrentCategoryLoaded
        } = this.props;

        if (!id || !isCurrentCategoryLoaded) {
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

    render(): ReactElement {
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
