import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { generateQuery, getQueryParam } from 'Util/Url';
import { HistoryType } from 'Type/Common';
import { LocationType } from 'Type/Router';

import CategoryPagination from './CategoryPagination.component';

export const mapStateToProps = state => ({
    totalPages: state.ProductListReducer.totalPages
});

export class CategoryPaginationContainer extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        onPageSelect: PropTypes.func,
        history: HistoryType.isRequired,
        location: LocationType.isRequired,
        totalPages: PropTypes.number.isRequired
    };

    static defaultProps = {
        isLoading: false,
        onPageSelect: () => {}
    };

    containerFunctions = {
        getSearchQuery: this.getSearchQuery.bind(this)
    };

    getSearchQuery(pageNumber) {
        const { history, location } = this.props;
        const page = pageNumber !== 1 ? pageNumber : '';
        return generateQuery({ page }, location, history);
    }

    containerProps = () => ({
        pathname: this._getPathname(),
        currentPage: this._getCurrentPage()
    });

    _getPathname() {
        const { location: { pathname } } = this.props;

        return pathname;
    }

    _getCurrentPage() {
        const { location } = this.props;

        return +(getQueryParam('page', location) || 1);
    }

    render() {
        return (
            <CategoryPagination
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(connect(mapStateToProps)(CategoryPaginationContainer));
