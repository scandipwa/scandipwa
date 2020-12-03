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
import { connect } from 'react-redux';

import ProductCompare from './ProductCompare.component';

export const ProductCompareDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductCompare/ProductCompare.dispatcher'
);

/** @namespace Component/ProductCompare/Container/mapStateToProps  */
export const mapStateToProps = () => ({});

/** @namespace Component/ProductCompare/Container/mapDispatchToProps  */
export const mapDispatchToProps = (dispatch) => ({
    fetchCompareList: () => ProductCompareDispatcher.then(
        ({ default: dispatcher }) => dispatcher.handleData(dispatch)
    )
});

/** @namespace Component/ProductCompare/Container */
export class ProductCompareContainer extends PureComponent {
    static propTypes = {
        fetchCompareList: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.fetchCompareList();
    }

    fetchCompareList() {
        const { fetchCompareList } = this.props;
        fetchCompareList();
    }

    render() {
        return (
            <ProductCompare
              { ...this.props }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompareContainer);
