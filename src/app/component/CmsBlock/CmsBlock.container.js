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
import { connect } from 'react-redux';
import { BlockListType } from 'Type/CMS';
import CmsBlock from './CmsBlock.component';

/** @middleware Component/CmsBlock/Container/mapStateToProps */
export const mapStateToProps = state => ({
    blocks: state.CmsBlocksAndSliderReducer.blocks
});

/** @middleware Component/CmsBlock/Container */
export class CmsBlockContainer extends ExtensiblePureComponent {
    constructor(props) {
        super(props);

        this.containerProps = () => ({
            cmsBlocks: this._getBlocks()
        });
    }

    _getBlocks() {
        const { identifiers, blocks: { items = {} } } = this.props;
        return identifiers.reduce((acc, id) => (items[id]
            ? [...acc, (
                { id, content: items[id].content }
            )]
            : acc), []);
    }

    render() {
        return (
            <CmsBlock
              { ...this.containerProps() }
              { ...this.props }
            />
        );
    }
}

CmsBlockContainer.propTypes = {
    identifiers: PropTypes.arrayOf(PropTypes.string).isRequired,
    blocks: BlockListType.isRequired
};

/** @middleware Component/CmsBlock/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CmsBlockContainer);
