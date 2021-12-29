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
import { withRouter } from 'react-router-dom';

import { UTMOST_PAGES_COUNT } from 'Component/Pagination/Pagination.config';
import { HistoryType, LocationType } from 'Type/Router.type';
import { generateQuery, getQueryParam } from 'Util/Url';

import Pagination from './Pagination.component';

/** @namespace Component/Pagination/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    paginationFrame: state.ConfigReducer.pagination_frame,
    paginationFrameSkip: state.ConfigReducer.pagination_frame_skip,
    anchorTextPrevious: state.ConfigReducer.anchor_text_for_previous,
    anchorTextNext: state.ConfigReducer.anchor_text_for_next
});

/** @namespace Component/Pagination/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/Pagination/Container */
export class PaginationContainer extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        history: HistoryType.isRequired,
        location: LocationType.isRequired,
        totalPages: PropTypes.number.isRequired,
        paginationFrame: PropTypes.number,
        paginationFrameSkip: PropTypes.number,
        anchorTextPrevious: PropTypes.string,
        anchorTextNext: PropTypes.string,
        id: PropTypes.string
    };

    static defaultProps = {
        isLoading: false,
        paginationFrame: 5,
        paginationFrameSkip: null,
        anchorTextPrevious: '',
        anchorTextNext: '',
        id: ''
    };

    containerFunctions = {
        getSearchQuery: this.getSearchQuery.bind(this)
    };

    getSearchQuery(pageNumber) {
        const { history, location } = this.props;
        const page = pageNumber !== 1 ? pageNumber : '';

        return generateQuery({ page }, location, history);
    }

    containerProps() {
        const {
            anchorTextNext,
            anchorTextPrevious,
            id,
            isLoading,
            paginationFrame,
            totalPages,
            location: { pathname }
        } = this.props;

        return {
            anchorTextNext,
            anchorTextPrevious,
            id,
            isLoading,
            paginationFrame,
            pathname,
            totalPages,
            currentPage: this._getCurrentPage(),
            prevPageJump: this._getPrevPageJump(),
            nextPageJump: this._getNextPageJump(),
            firstFramePage: this._getFirstFramePage(),
            lastFramePage: this._getLastFramePage(),
            shouldRenderNextJump: this._shouldRenderNextJump(),
            shouldRenderPreviousJump: this._shouldRenderPreviousJump(),
            shouldRenderJumps: this._shouldRenderJumps()
        };
    }

    _getCurrentPage() {
        const { location } = this.props;

        return +(getQueryParam('page', location) || 1);
    }

    // e.g. 5 for pagination like 1 ... 5 6 7 ... 14
    _getFirstFramePage() {
        const { paginationFrame, totalPages } = this.props;
        const maxFirstPage = this._getCurrentPage() - Math.ceil(paginationFrame / 2) + 1;
        const minFirstPage = totalPages - paginationFrame + 1;

        return Math.max(1, Math.min(maxFirstPage, minFirstPage));
    }

    // e.g. 7 for pagination like 1 ... 5 6 7 ... 14
    _getLastFramePage() {
        const { paginationFrame, totalPages } = this.props;
        return Math.min(totalPages, this._getFirstFramePage() + paginationFrame - 1);
    }

    // i.e. what page you go to on click on first '...'
    _getPrevPageJump() {
        const { paginationFrameSkip } = this.props;

        return Math.max(UTMOST_PAGES_COUNT, this._getFirstFramePage() - paginationFrameSkip);
    }

    // i.e. what page you go to on click on second '...'
    _getNextPageJump() {
        const { paginationFrameSkip, totalPages } = this.props;

        return Math.min(totalPages - 1, this._getLastFramePage() + paginationFrameSkip);
    }

    _shouldRenderJumps() {
        const { paginationFrameSkip } = this.props;

        return !(!paginationFrameSkip || paginationFrameSkip < 2);
    }

    _shouldRenderNextJump() {
        const { totalPages } = this.props;

        if (!this._shouldRenderJumps()) {
            return false;
        }

        return totalPages - this._getLastFramePage() >= UTMOST_PAGES_COUNT;
    }

    _shouldRenderPreviousJump() {
        if (!this._shouldRenderJumps()) {
            return false;
        }

        return this._getFirstFramePage() > UTMOST_PAGES_COUNT;
    }

    render() {
        return (
            <Pagination
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PaginationContainer)
);
