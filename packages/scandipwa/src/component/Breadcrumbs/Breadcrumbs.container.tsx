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
import { connect } from 'react-redux';

import { RootState } from 'Util/Store/Store.type';

import BreadcrumbsComponent from './Breadcrumbs.component';
import {
    BreadcrumbsComponentProps, BreadcrumbsContainerMapDispatchProps, BreadcrumbsContainerMapStateProps, BreadcrumbsContainerProps, BreadcrumbsContainerPropsKeys,
} from './Breadcrumbs.type';

/** @namespace Component/Breadcrumbs/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): BreadcrumbsContainerMapStateProps => ({
    breadcrumbs: state.BreadcrumbsReducer.breadcrumbs,
    areBreadcrumbsVisible: state.BreadcrumbsReducer.areBreadcrumbsVisible,
    baseUrl: state.ConfigReducer.base_link_url,
});

/** @namespace Component/Breadcrumbs/Container/mapDispatchToProps */
export const mapDispatchToProps = (): BreadcrumbsContainerMapDispatchProps => ({});

/**
 * Breadcrumbs
 * @class Breadcrumbs
 * @namespace Component/Breadcrumbs/Container
 */
export class BreadcrumbsContainer extends PureComponent<BreadcrumbsContainerProps> {
    containerFunctions = {};

    containerProps(): Pick<BreadcrumbsComponentProps, BreadcrumbsContainerPropsKeys> {
        const {
            breadcrumbs,
            areBreadcrumbsVisible,
            baseUrl,
        } = this.props;

        return {
            breadcrumbs,
            areBreadcrumbsVisible,
            baseUrl,
        };
    }

    render() {
        return (
            <BreadcrumbsComponent
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BreadcrumbsContainer);
