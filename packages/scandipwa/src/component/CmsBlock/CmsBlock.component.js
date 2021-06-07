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

import './CmsBlock.style';

/**
 * Cms Block
 * @class CmsBlock
 * @namespace Component/CmsBlock/Component
 */
export class CmsBlock extends PureComponent {
    static propTypes = {
        cmsBlock: PropTypes.shape({
            identifier: PropTypes.string,
            content: PropTypes.string,
            disabled: PropTypes.bool
        }),
        blockType: PropTypes.string,
        children: ChildrenType
    };

    static defaultProps = {
        cmsBlock: {},
        children: [],
        blockType: ''
    };

    renderPlaceholder() {
        const {
            children
        } = this.props;

        if (children.length) {
            return children;
        }

        return null;
    }

    render() {
        const {
            cmsBlock: {
                identifier,
                content,
                disabled
            },
            blockType
        } = this.props;

        if (disabled) {
            return null;
        }

        if (identifier === undefined) {
            return this.renderPlaceholder();
        }

        return (
            <div
              block="CmsBlock"
              elem="Wrapper"
              mods={ { type: blockType } }
            >
                <Html content={ content } />
            </div>
        );
    }
}

export default CmsBlock;
