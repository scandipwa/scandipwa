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

import './NoMatch.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Link from 'Component/Link';
import { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.config';

export class NoMatch extends PureComponent {
    static propTypes = {
        updateBreadcrumbs: PropTypes.func.isRequired,
        cleanUpTransition: PropTypes.func.isRequired,
        changeHeaderState: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.updateBreadcrumbs();
        this.updateHeaderState();
        this.cleanUpTransition();
    }

    cleanUpTransition() {
        const { cleanUpTransition } = this.props;

        cleanUpTransition();
    }

    updateHeaderState() {
        const { changeHeaderState } = this.props;

        changeHeaderState({
            name: DEFAULT_STATE_NAME,
            isHiddenOnMobile: true
        });
    }

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
            <main block="NoMatch" aria-label={ __('Page not found') }>
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
                        { __('Sorry, we can`t find the page you are looking for! Please press a button below to go back to homepage.') }
                    </p>
                    <Link
                      to="/"
                      block="NoMatch"
                      elem="Button"
                      mix={ { block: 'Button' } }
                    >
                        { __('Back to homepage') }
                    </Link>
                </ContentWrapper>
            </main>
        );
    }
}

export default NoMatch;
