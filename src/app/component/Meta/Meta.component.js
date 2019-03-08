import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

/**
 * Page Meta data
 * @class Meta
 */
class Meta extends Component {
    render() {
        const {
            metaObject: {
                name,
                title,
                meta_title,
                meta_description,
                meta_keyword
            }
        } = this.props;

        return (
            <Helmet
              title={ `ScandiPWA | ${ name || title || '...' }` }
              meta={ [
                  { name: 'title', content: meta_title },
                  { name: 'description', content: meta_description },
                  { name: 'keywords', content: meta_keyword }
              ] }
            />
        );
    }
}

Meta.propTypes = {
    metaObject: PropTypes.shape({
        name: PropTypes.string,
        meta_title: PropTypes.string,
        meta_description: PropTypes.string,
        meta_keyword: PropTypes.string
    }).isRequired
};

export default Meta;
