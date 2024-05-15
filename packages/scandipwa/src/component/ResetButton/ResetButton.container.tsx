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
import { Dispatch } from 'redux';

import { resetFilters } from 'Store/ProductList/ProductList.action';
import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';
import CSS from 'Util/CSS';
import history from 'Util/History';
import { setQueryParams } from 'Util/Url';

import ResetButton from './ResetButton.component';
import {
    ResetButtonComponentContainerPropKeys,
    ResetButtonComponentProps,
    ResetButtonContainerFunctions,
    ResetButtonContainerMapDispatchProps,
    ResetButtonContainerProps,
} from './ResetButton.type';

/** @namespace Component/ResetButton/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ResetButtonContainerMapDispatchProps => ({
    resetFilters: () => dispatch(resetFilters()),
});

/** @namespace Component/ResetButton/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/ResetButton/Container */
export class ResetButtonContainer extends PureComponent<ResetButtonContainerProps> {
    static defaultProps: Partial<ResetButtonContainerProps> = {
        mix: {},
    };

    containerFunctions: ResetButtonContainerFunctions = {
        onClick: this.onClick.bind(this),
    };

    containerProps(): Pick<ResetButtonComponentProps, ResetButtonComponentContainerPropKeys> {
        const { mix, onClick } = this.props;

        return {
            mix,
            onClick,
            isContentFiltered: this.isContentFiltered(),
        };
    }

    resetFilters(): void {
        const { location } = history;
        const { resetFilters } = this.props;
        setQueryParams({
            customFilters: '',
            priceMin: '',
            priceMax: '',
            page: '',
        }, location, history);

        resetFilters();
    }

    isContentFiltered(): boolean {
        const { customFilters, priceMin, priceMax } = this.urlStringToObject();

        return !!(customFilters || priceMin || priceMax);
    }

    urlStringToObject(): Record<string, string> {
        const { location: { search = '' } } = history;

        return search.substr(1).split('&').reduce((acc, part) => {
            const [key, value] = part.split('=');

            return { ...acc, [ key ]: value };
        }, {});
    }

    onClick(): void {
        const { onClick, categoryPageRef } = this.props;

        CSS.setVariable(categoryPageRef, 'content-loader-display', 'block');
        setTimeout(() => {
            onClick();
            this.resetFilters();
            scrollToTop();
            CSS.setVariable(categoryPageRef, 'content-loader-display', 'none');
        }, 0);
    }

    render(): ReactElement {
        return (
            <ResetButton
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    ResetButtonContainer,
);
