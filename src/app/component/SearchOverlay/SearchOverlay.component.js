import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Overlay from 'Component/Overlay';
// import Store from 'Store';
// import { changeHeaderState } from 'Store/Header';
import './SearchOverlay.style';

class SearchOverlay extends Component {
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
