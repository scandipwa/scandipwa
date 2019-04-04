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

import React, { Component } from 'react';
import Html from 'Component/Html';
import TextPlaceholder from 'Component/TextPlaceholder';
import Image from 'Component/Image';
import { CategoryTreeType } from 'Type/Category';
import './CategoryDetails.style';

/**
 * Category details
 * @class CategoryDetails
 */
class CategoryDetails extends Component {
    render() {
        const { category: { name, description, image } } = this.props;

        return (
            <div block="CategoryDetails">
                <Image src={ image && `/media/catalog/category/${image}` } ratio="16x9" arePlaceholdersShown />
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
    category: CategoryTreeType.isRequired
};

export default CategoryDetails;
