/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Link from 'Component/Link';
import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';

import { NoMatchComponentProps } from './NoMatch.type';

import './NoMatch.style';

/** @namespace Route/NoMatch/Component */
export class NoMatchComponent extends PureComponent<NoMatchComponentProps> {
    componentDidMount(): void {
        this.updateBreadcrumbs();
        this.cleanUpTransition();
        scrollToTop();
    }

    cleanUpTransition(): void {
        const { cleanUpTransition } = this.props;

        cleanUpTransition();
    }

    updateBreadcrumbs(): void {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '',
                name: __('Not Found'),
            },
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    render(): ReactElement {
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

export default NoMatchComponent;
