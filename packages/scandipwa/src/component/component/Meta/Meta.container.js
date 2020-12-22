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

import Meta from './Meta.component';

/** @namespace Component/Meta/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    default_description: state.MetaReducer.default_description,
    default_keywords: state.MetaReducer.default_keywords,
    default_title: state.MetaReducer.default_title,
    canonical_url: state.MetaReducer.canonical_url,
    title_prefix: state.MetaReducer.title_prefix,
    title_suffix: state.MetaReducer.title_suffix,
    description: state.MetaReducer.description,
    keywords: state.MetaReducer.keywords,
    title: state.MetaReducer.title,
    robots: state.MetaReducer.robots,
    status_code: state.MetaReducer.status_code
});

/** @namespace Component/Meta/Container */
export class MetaContainer extends PureComponent {
    static propTypes = {
        default_description: PropTypes.string,
        default_keywords: PropTypes.string,
        default_title: PropTypes.string,
        canonical_url: PropTypes.string,
        title_prefix: PropTypes.string,
        title_suffix: PropTypes.string,
        description: PropTypes.string,
        keywords: PropTypes.string,
        title: PropTypes.string,
        robots: PropTypes.string,
        status_code: PropTypes.string
    };

    static defaultProps = {
        default_description: '',
        default_keywords: '',
        default_title: '',
        canonical_url: '',
        title_prefix: '',
        title_suffix: '',
        description: '',
        keywords: '',
        title: '',
        robots: '',
        status_code: ''
    };

    containerProps = () => ({
        metadata: this._getMetadata()
    });

    _generateMetaFromMetadata(metadata, param = 'name') {
        return Object.entries(metadata).reduce((acc, [key, value]) => (
            value
                ? [...acc, { [param]: key, content: `${value}` }]
                : acc
        ), []);
    }

    _getTitle() {
        const { title, default_title } = this.props;

        return title || default_title;
    }

    _getDescription() {
        const { description, default_description } = this.props;

        return description || default_description;
    }

    _getKeywords() {
        const { keywords, default_keywords } = this.props;

        return keywords || default_keywords;
    }

    _getRobots() {
        const { robots } = this.props;

        return robots;
    }

    _getStatusCode() {
        const { status_code } = this.props;

        return status_code;
    }

    _getMetadata() {
        const meta = {
            title: this._getTitle(),
            description: this._getDescription(),
            keywords: this._getKeywords(),
            robots: this._getRobots(),
            'render:status_code': this._getStatusCode()
        };

        return this._generateMetaFromMetadata(meta);
    }

    render() {
        return (
            <Meta
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}

/** @namespace Component/Meta/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MetaContainer);
