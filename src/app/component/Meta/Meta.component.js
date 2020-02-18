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
        meta: PropTypes.arrayOf(
            PropTypes.objectOf(PropTypes.string)
        ).isRequired,
        title_prefix: PropTypes.string.isRequired,
        title_suffix: PropTypes.string.isRequired,
        metaObject: PropTypes.shape({
            name: PropTypes.string,
            meta_title: PropTypes.string,
            meta_description: PropTypes.string,
            meta_keyword: PropTypes.string
        }).isRequired
    };


    render() {
        const {
            metaObject,
            title_prefix,
            title_suffix,
            meta
        } = this.props;

        const {
            url,
            name,
            title,
            canonical_url = url
        } = metaObject;

        return (
            <Helmet
              title={ `${ title_prefix } ${ name || title || '...' } ${ title_suffix }` }
              meta={ meta }
              link={ [
                  { ...(canonical_url && { rel: 'canonical', href: canonical_url }) }
              ] }
            />
        );
    }
}
