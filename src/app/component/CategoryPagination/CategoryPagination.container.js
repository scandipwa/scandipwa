import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { generateQuery } from 'Util/Url';
import { HistoryType } from 'Type/Common';
import { LocationType } from 'Type/Router';

import CategoryPagination from './CategoryPagination.component';

export const mapStateToProps = state => ({
    totalPages: state.ProductListReducer.totalPages
});

export class CategoryPaginationContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.containerFunctions = {
            getSearchQueryForPage: this.getSearchQueryForPage.bind(this)
        };

        this.containerProps = () => ({
            pathname: this._getPathname()
        });
    }

    getSearchQueryForPage(pageNumber) {
        const { history, location } = this.props;
        const page = pageNumber !== 1 ? pageNumber : '';
        return generateQuery({ page }, location, history);
    }

    _getPathname() {
        const { location: { pathname } } = this.props;

        return pathname;
    }

    render() {
        return (
            <CategoryPagination
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

CategoryPaginationContainer.propTypes = {
    history: HistoryType.isRequired,
    location: LocationType.isRequired,
    totalPages: PropTypes.number.isRequired
};

export default withRouter(CategoryPaginationContainer);
