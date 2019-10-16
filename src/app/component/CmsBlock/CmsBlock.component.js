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
import Html from 'Component/Html';
import { ChildrenType } from 'Type/Common';

/**
 * Cms Block
 * @class CmsBlock
 */
export default class CmsBlock extends PureComponent {
    static propTypes = {
        cmsBlocks: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            content: PropTypes.string
        })),
        children: ChildrenType
    };

    static defaultProps = {
        children: [],
        cmsBlocks: []
    };

    renderCmsBlock = this.renderCmsBlock.bind(this);

    renderCmsBlock(block) {
        const { id, content } = block;

        return (
            <div
              block="CmsBlock"
              elem="Wrapper"
              key={ id }
            >
                <Html content={ content } />
            </div>
        );
    }

    render() {
        const { cmsBlocks, children } = this.props;

        if (cmsBlocks.length) {
            return cmsBlocks.map(this.renderCmsBlock);
        }

        return children;
    }
}
