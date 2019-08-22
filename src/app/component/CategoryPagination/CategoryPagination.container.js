import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import { generateQuery } from 'Util/Url';
import { HistoryType } from 'Type/Common';
import { LocationType } from 'Type/Router';

import CategoryPagination from './CategoryPagination.component';

export class CategoryPaginationContainer extends PureComponent {
    static propTypes = {
        history: HistoryType.isRequired,
        location: LocationType.isRequired
    }

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

export default withRouter(CategoryPaginationContainer);
