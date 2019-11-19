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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { CompareDispatcher } from 'Store/Compare';
import { ItemsType } from 'Type/ProductList';
import Compare from './Compare.component';

export const isCompareEnabled = true;

export const mapStateToProps = state => ({
    products: state.CompareReducer.comparedProducts,
    areCompareProductsLoading: state.CompareReducer.areCompareProductsLoading
});

export const mapDispatchToProps = dispatch => ({
    updateBreadcrumbs: breadcrumbs => BreadcrumbsDispatcher.update(breadcrumbs, dispatch),
    getComparedProducts: () => CompareDispatcher.updateInitialCompareData(dispatch),
    removeAllProductsFromCompare: () => CompareDispatcher.removeAllProductsFromCompare(dispatch),
    removeProductFromCompare: options => CompareDispatcher.removeProductFromCompare(options, dispatch)
});

export class CompareContainer extends PureComponent {
    static propTypes = {
        updateBreadcrumbs: PropTypes.func.isRequired,
        products: ItemsType,
        areCompareProductsLoading: PropTypes.bool
    };

    static defaultProps = {
        products: [],
        areCompareProductsLoading: false
    };

    state = { isEditing: false };

    componentDidMount() {
        this._updateBreadcrumbs();
    }

    _updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            { url: '/compare', name: __('Compare') },
            { url: '/', name: __('Home') }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    render() {
        return (
            <Compare
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareContainer);
