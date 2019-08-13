import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { generateQuery } from 'Util/Url';
import CategoryPagination from './CategoryPagination.component';

export class CategoryPaginationContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.containerFunctions = {
            getSearchQueryForPage: this.getSearchQueryForPage.bind(this)
        };
    }

    getSearchQueryForPage(pageNumber) {
        const { history, location } = this.props;
        const page = pageNumber !== 1 ? pageNumber : '';
        return generateQuery({ page }, location, history);
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
    history: PropTypes.shape({
        location: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default withRouter(CategoryPaginationContainer);
