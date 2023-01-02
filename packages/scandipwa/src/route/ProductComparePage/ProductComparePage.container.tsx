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

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Page } from 'Component/Header/Header.config';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';
import history from 'Util/History';
import DataContainer from 'Util/Request/DataContainer';
import { RootState } from 'Util/Store/Store.type';

import ProductComparePage from './ProductComparePage.component';
import {
    ProductComparePageComponentProps,
    ProductComparePageContainerMapDispatchProps,
    ProductComparePageContainerMapStateProps,
    ProductComparePageContainerProps,
    ProductComparePageContainerState,
} from './ProductComparePage.type';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Route/ProductComparePage/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductComparePageContainerMapStateProps => ({
    device: state.ConfigReducer.device,
    isLoading: state.ProductCompareReducer.isLoading,
});

/** @namespace Route/ProductComparePage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ProductComparePageContainerMapDispatchProps => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    setHeaderState: (stateName) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, stateName)),
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch),
        );
    },
});

/** @namespace Route/ProductComparePage/Container */
export class ProductComparePageContainer<
P extends Readonly<ProductComparePageContainerProps> = Readonly<ProductComparePageContainerProps>,
S extends ProductComparePageContainerState = ProductComparePageContainerState,
> extends DataContainer<P, S> {
    static defaultProps: Partial<ProductComparePageContainerProps> = {
        isLoading: false,
    };

    __construct(props: P): void {
        super.__construct(props, 'ProductComparePageContainer');
    }

    componentDidMount(): void {
        scrollToTop();
        this.updateMeta();
        this.updateBreadcrumbs();
        this.updateHeaderState();
    }

    containerProps(): ProductComparePageComponentProps {
        const { isLoading } = this.props;

        return { isLoading };
    }

    updateMeta(): void {
        const { updateMeta } = this.props;

        updateMeta({ title: __('Product Compare') });
    }

    updateBreadcrumbs(): void {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '/compare',
                name: __('Product Compare'),
            },
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    updateHeaderState(): void {
        const { setHeaderState } = this.props;

        setHeaderState({
            name: Page.PRODUCT_COMPARE,
            title: __('Compare'),
            onBackClick: () => history.goBack(),
        });
    }

    render(): ReactElement {
        return (
            <ProductComparePage
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductComparePageContainer);
