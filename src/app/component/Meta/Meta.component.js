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
        metadata: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                property: PropTypes.string,
                content: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ])
            })
        ).isRequired,
        canonical_url: PropTypes.string.isRequired,
        title_prefix: PropTypes.string.isRequired,
        title_suffix: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    };

    render() {
        const {
            canonical_url,
            title_prefix,
            title_suffix,
            metadata,
            title
        } = this.props;

        return (
            <Helmet
              title={ `${ title_prefix } ${ title } ${ title_suffix }` }
              meta={ metadata }
              link={ [
                  { ...(canonical_url && { rel: 'canonical', href: canonical_url }) }
              ] }
            />
        );
    }
}
