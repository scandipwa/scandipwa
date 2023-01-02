/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';

import Html from 'Component/Html';
import { ReactElement } from 'Type/Common.type';

import { CmsBlockComponentProps, CmsBlockComponentState } from './CmsBlock.type';

import './CmsBlock.style';

/**
 * Cms Block
 * @class CmsBlock
 * @namespace Component/CmsBlock/Component
 */
export class CmsBlockComponent<
P extends Readonly<CmsBlockComponentProps> = Readonly<CmsBlockComponentProps>,
S extends CmsBlockComponentState = CmsBlockComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<CmsBlockComponentProps> = {
        cmsBlock: {},
        blockType: '',
    };

    renderPlaceholder(): ReactElement {
        const {
            children,
        } = this.props;

        if (children && (!Array.isArray(children) || children.length)) {
            return children;
        }

        return null;
    }

    render(): ReactElement {
        const {
            cmsBlock: {
                identifier,
                content,
                disabled,
            },
            blockType,
        } = this.props;

        if (!content || disabled) {
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

export default CmsBlockComponent;
