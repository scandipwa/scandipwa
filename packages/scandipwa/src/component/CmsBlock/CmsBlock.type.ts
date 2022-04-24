/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { CmsBlock } from 'Query/CmsBlock.type';
import { Children } from 'Type/Common.type';

export interface CmsBlockContainerProps {
    identifier: string;
    blockType?: string;
}

export interface CmsBlockContainerState {
    cmsBlock: Partial<CmsBlock>;
}

export interface CmsBlockComponentProps {
    cmsBlock: Partial<CmsBlock>;
    blockType?: string;
    children: Children;
}
