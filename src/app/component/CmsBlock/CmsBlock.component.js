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
import React, { PureComponent } from 'react';
import Html from 'Component/Html';
import { BlockListType } from 'Type/CMS';
import { ChildrenType } from 'Type/Common';

/**
 * Cms Block
 * @class CmsBlock
 */
class CmsBlock extends PureComponent {
    render() {
        const { identifiers, blocks: { items = {} }, children } = this.props;

        const cmsBlocks = identifiers.reduce((acc, id) => (items[id]
            ? [...acc, (
                <Html key={ id } content={ items[id].content } />
            )]
            : acc), []);

        if (cmsBlocks.length) {
            return (
                <>
                    { cmsBlocks }
                </>
            );
        }

        if (!children) return null;

        return (
            <>
                { children }
            </>
        );
    }
}

CmsBlock.propTypes = {
    identifiers: PropTypes.arrayOf(PropTypes.string).isRequired,
    blocks: BlockListType.isRequired,
    children: ChildrenType
};

CmsBlock.defaultProps = {
    children: []
};

export default CmsBlock;
