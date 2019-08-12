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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContentWrapper from 'Component/ContentWrapper';
import './NoMatch.style';

class NoMatch extends Component {
    componentDidMount() {
        this.updateBreadcrumbs();
    }

    /**
     * Dispatch breadcrumbs update
     * @return {void}
     */
    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '',
                name: __('Not Found')
            },
            {
                url: '/',
                name: __('Home')
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    render() {
        return (
            <main block="NoMatch" aria-label={ __('Page Not Found') }>
                <ContentWrapper
                  mix={ { block: 'NoMatch' } }
                  wrapperMix={ { block: 'NoMatch', elem: 'Wrapper' } }
                  label={ __('Page Not Found Content') }
                >
                    <h1>
                        404
                    </h1>
                    <p block="NoMatch" elem="Subtitle">
                        { __('Page not found') }
                    </p>
                    <p>
                        { /* eslint-disable-next-line max-len */ }
                        { __('Sorry, we can`t find the page you are looking for! Please press a big orange button to come back to homepage.') }
                    </p>
                    <Link to="/">
                        <button>
                            { __('Back to homepage') }
                        </button>
                    </Link>
                </ContentWrapper>
            </main>
        );
    }
}

NoMatch.propTypes = {
    updateBreadcrumbs: PropTypes.func.isRequired
};

export default NoMatch;
