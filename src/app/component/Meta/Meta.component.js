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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

/**
 * Page Meta data
 * @class Meta
 */
export default class Meta extends PureComponent {
    static propTypes = {
        title_prefix: PropTypes.string,
        title_suffix: PropTypes.string,
        default_description: PropTypes.string,
        default_keywords: PropTypes.string,
        default_title: PropTypes.string,
        metaObject: PropTypes.shape({
            name: PropTypes.string,
            meta_title: PropTypes.string,
            meta_description: PropTypes.string,
            meta_keyword: PropTypes.string
        }).isRequired
    };

    static defaultProps = {
        title_prefix: '',
        title_suffix: '',
        default_description: '',
        default_keywords: '',
        default_title: ''
    };

    render() {
        const {
            metaObject: {
                name,
                title,
                meta_title,
                meta_keyword,
                meta_keywords,
                meta_description,
                canonical_url
            },
            title_prefix = '',
            title_suffix = '',
            default_description = '',
            default_keywords = '',
            default_title = ''
        } = this.props;

        return (
            <Helmet
              title={ `${ title_prefix } ${ name || title || '...' } ${ title_suffix }` }
              meta={ [
                  { name: 'title', content: meta_title || default_title },
                  { name: 'description', content: meta_description || default_description },
                  { name: 'keywords', content: meta_keyword || meta_keywords || default_keywords }
              ] }
              link={ [
                  { ...(canonical_url && { rel: 'canonical', href: canonical_url }) }
              ] }
            />
        );
    }
}
