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
import CmsBlockQuery from 'Query/CmsBlock.query';
import { CmsBlockQueryOutput } from 'Query/CmsBlock.type';
import { ReactElement } from 'Type/Common.type';
import DataContainer from 'Util/Request/DataContainer';

import CmsBlock from './CmsBlock.component';
import { CmsBlockComponentProps, CmsBlockContainerProps, CmsBlockContainerState } from './CmsBlock.type';

/** @namespace Component/CmsBlock/Container */
export class CmsBlockContainer extends DataContainer<CmsBlockContainerProps, CmsBlockContainerState> {
    static defaultProps = {
        blockType: ''
    };

    state: CmsBlockContainerState = {
        cmsBlock: {}
    };

    __construct(props: CmsBlockContainerProps): void {
        super.__construct(props, 'CmsBlockContainer');
    }

    containerProps(): CmsBlockComponentProps {
        const { blockType, children } = this.props;
        const { cmsBlock } = this.state;

        return { cmsBlock, blockType, children };
    }

    componentDidMount(): void {
        this._getCmsBlock();
    }

    componentDidUpdate(prevProps: CmsBlockContainerProps): void {
        const { identifier } = this.props;
        const { identifier: prevIdentifier } = prevProps;

        if (identifier !== prevIdentifier) {
            this._getCmsBlock();
        }
    }

    _getCmsBlock(): void {
        const { identifier } = this.props;

        this.fetchData<CmsBlockQueryOutput>(
            [CmsBlockQuery.getQuery({ identifiers: [identifier] })],
            ({ cmsBlocks: { items } }) => {
                if (!items.length) {
                    return;
                }

                this.setState({ cmsBlock: items[0] });
            }
        );
    }

    render(): ReactElement {
        return (
            <CmsBlock
              { ...this.containerProps() }
            />
        );
    }
}

export default CmsBlockContainer;
