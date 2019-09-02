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
import { ChildrenType } from 'Type/Common';

/**
 * Cms Block
 * @class CmsBlock
 */
class CmsBlock extends PureComponent {
    render() {
        const { cmsBlocks, children } = this.props;

        if (cmsBlocks.length) {
            return (
                <div block="CmsBlock" elem="Wrapper">
                    { cmsBlocks.map(({ id, content }) => <Html key={ id } content={ content } />) }
                </div>
            );
        }

        return children;
    }
}

CmsBlock.propTypes = {
    cmsBlocks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        content: PropTypes.string
    })),
    children: ChildrenType
};

CmsBlock.defaultProps = {
    children: [],
    cmsBlocks: []
};

export default CmsBlock;
