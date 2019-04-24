import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Overlay from 'Component/Overlay';
import './SearchOverlay.style';

class SearchOverlay extends Component {
    requestSearchBar() {

    }

    componentDidUpdate(prevProps) {
        const { searchCriteria: prevSearchCriteria } = prevProps;
        const { searchCriteria } = this.props;

        if (this.timeout) clearTimeout(this.timeout);

        if (searchCriteria !== prevSearchCriteria) {
            this.timeout = setTimeout(() => {
                this.requestSearchBar();
            }, 500);
        }
    }

    render() {
        const { searchCriteria } = this.props;

        return (
            <Overlay
              id="search"
              mix={ { block: 'SearchOverlay' } }
            >
                Searching for:
                <span>{ searchCriteria }</span>
            </Overlay>
        );
    }
}

SearchOverlay.propTypes = {
    searchCriteria: PropTypes.string
};

SearchOverlay.defaultProps = {
    searchCriteria: ''
};

export default SearchOverlay;
