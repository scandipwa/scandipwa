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

import { ComponentType, PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { UTMOST_PAGES_COUNT } from 'Component/Pagination/Pagination.config';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';
import { generateQuery, getQueryParam } from 'Util/Url';

import Pagination from './Pagination.component';
import {
    PaginationComponentProps,
    PaginationContainerFunctions,
    PaginationContainerMapDispatchProps,
    PaginationContainerMapStateProps,
    PaginationContainerProps,
    PaginationContainerPropsKeys,
    PaginationContainerState,
} from './Pagination.type';

/** @namespace Component/Pagination/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): PaginationContainerMapStateProps => ({
    paginationFrame: state.ConfigReducer.pagination_frame,
    paginationFrameSkip: state.ConfigReducer.pagination_frame_skip,
    anchorTextPrevious: state.ConfigReducer.anchor_text_for_previous,
    anchorTextNext: state.ConfigReducer.anchor_text_for_next,
});

/** @namespace Component/Pagination/Container/mapDispatchToProps */
export const mapDispatchToProps = (): PaginationContainerMapDispatchProps => ({});

/** @namespace Component/Pagination/Container */
export class PaginationContainer<
P extends Readonly<PaginationContainerProps> = Readonly<PaginationContainerProps>,
S extends PaginationContainerState = PaginationContainerState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<PaginationContainerProps> = {
        isLoading: false,
        id: '',
        mix: {},
    };

    containerFunctions: PaginationContainerFunctions = {
        getSearchQuery: this.getSearchQuery.bind(this),
    };

    getSearchQuery(pageNumber: number): string {
        const { history, location } = this.props;
        const page = pageNumber !== 1 ? pageNumber : '';

        return generateQuery({ page }, location, history);
    }

    containerProps(): Pick<PaginationComponentProps, PaginationContainerPropsKeys> {
        const {
            anchorTextNext,
            anchorTextPrevious,
            id,
            isLoading,
            paginationFrame,
            totalPages,
            location: { pathname },
            mix,
        } = this.props;

        return {
            anchorTextNext,
            anchorTextPrevious,
            id,
            isLoading,
            paginationFrame,
            pathname,
            totalPages,
            mix,
            currentPage: this._getCurrentPage(),
            prevPageJump: this._getPrevPageJump(),
            nextPageJump: this._getNextPageJump(),
            firstFramePage: this._getFirstFramePage(),
            lastFramePage: this._getLastFramePage(),
            shouldRenderNextJump: this._shouldRenderNextJump(),
            shouldRenderPreviousJump: this._shouldRenderPreviousJump(),
            shouldRenderJumps: this._shouldRenderJumps(),
        };
    }

    _getCurrentPage(): number {
        const { location } = this.props;

        return +(getQueryParam('page', location) || 1);
    }

    // e.g. 5 for pagination like 1 ... 5 6 7 ... 14
    _getFirstFramePage(): number {
        const { paginationFrame, totalPages } = this.props;
        const maxFirstPage = this._getCurrentPage() - Math.ceil(paginationFrame / 2) + 1;
        const minFirstPage = totalPages - paginationFrame + 1;

        return Math.max(1, Math.min(maxFirstPage, minFirstPage));
    }

    // e.g. 7 for pagination like 1 ... 5 6 7 ... 14
    _getLastFramePage(): number {
        const { paginationFrame, totalPages } = this.props;

        return Math.min(totalPages, this._getFirstFramePage() + paginationFrame - 1);
    }

    // i.e. what page you go to on click on first '...'
    _getPrevPageJump(): number {
        const { paginationFrameSkip } = this.props;

        return Math.max(UTMOST_PAGES_COUNT, this._getFirstFramePage() - paginationFrameSkip);
    }

    // i.e. what page you go to on click on second '...'
    _getNextPageJump(): number {
        const { paginationFrameSkip, totalPages } = this.props;

        return Math.min(totalPages - 1, this._getLastFramePage() + paginationFrameSkip);
    }

    _shouldRenderJumps(): boolean {
        const { paginationFrameSkip } = this.props;

        return !(!paginationFrameSkip || paginationFrameSkip < 2);
    }

    _shouldRenderNextJump(): boolean {
        const { totalPages } = this.props;

        if (!this._shouldRenderJumps()) {
            return false;
        }

        return totalPages - this._getLastFramePage() >= UTMOST_PAGES_COUNT;
    }

    _shouldRenderPreviousJump(): boolean {
        if (!this._shouldRenderJumps()) {
            return false;
        }

        return this._getFirstFramePage() > UTMOST_PAGES_COUNT;
    }

    render(): ReactElement {
        return (
            <Pagination
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(
        PaginationContainer as unknown as ComponentType<RouteComponentProps & PaginationContainerProps>,
    ),
);
