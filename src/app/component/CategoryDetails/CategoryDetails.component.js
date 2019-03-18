/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Html from 'Component/Html';
import TextPlaceholder from 'Component/TextPlaceholder';
import Image from 'Component/Image';
import { CategoryTreeType } from 'Type/Category';
import { BlockListType } from 'Type/CMS';
import './CategoryDetails.style';

/**
 * Category details
 * @class CategoryDetails
 */
class CategoryDetails extends Component {
    constructor() {
        super();

        this.options = {
            identifiers: ['category-promo'],
            fields: ['identifier']
        };
    }

    componentDidMount() {
        const { blocks: { items } } = this.props;
        const { identifiers } = this.options;

        if (!items
            || (items && !identifiers.every(block => (block in items)))) this.requestBlocks();
    }


    /**
     * Requests CMS Blocks for Promo
     * @return {void}
     */
    requestBlocks() {
        const { requestBlocks } = this.props;
        requestBlocks(this.options);
    }

    render() {
        const { category: { name, description, image }, blocks: { items } } = this.props;

        return (
            <div block="CategoryDetails">
                {/* TODO: Change to config */}
                <div block="CategoryDetails" elem="Promo">
                    { items && items['category-promo'] && <Html content={ items['category-promo'].content } /> }
                </div>
                <Image src={ image && `/media/catalog/category/${image}` } ratio="16x9" />
                <div block="CategoryDetails" elem="Description">
                    <h1 block="CategoryDetails" elem="Heading">
                        <TextPlaceholder content={ name } length="medium" />
                    </h1>
                    { description
                        ? <Html content={ description } />
                        : <p><TextPlaceholder content={ description } length="long" /></p>
                    }
                </div>

            </div>
        );
    }
}

CategoryDetails.propTypes = {
    blocks: BlockListType.isRequired,
    requestBlocks: PropTypes.func.isRequired,
    category: CategoryTreeType.isRequired
};

export default CategoryDetails;
