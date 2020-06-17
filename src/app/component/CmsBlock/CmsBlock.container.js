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
import DataContainer from 'Util/Request/DataContainer';
import { CmsBlockQuery } from 'Query';

import CmsBlock from './CmsBlock.component';

export class CmsBlockContainer extends DataContainer {
    propTypes = {
        identifier: PropTypes.string.isRequired
    };

    state = {
        cmsBlock: {}
    };

    containerProps = () => {
        const { cmsBlock } = this.state;
        return { cmsBlock };
    };

    componentDidMount() {
        this._getCmsBlock();
    }

    _getCmsBlock() {
        const { identifier } = this.props;

        this.fetchData(
            [CmsBlockQuery.getQuery({ identifiers: [identifier] })],
            ({ cmsBlocks: [cmsBlock] }) => this.setState({ cmsBlock })
        );
    }

    render() {
        return (
            <CmsBlock
              { ...this.containerProps() }
            />
        );
    }
}

export default CmsBlockContainer;
