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

import NoMatch from 'Route/NoMatch';
import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';

import { NoMatchHandlerComponentProps } from './NoMatchHandler.type';

/** @namespace Route/NoMatchHandler/Component */
export class NoMatchHandlerComponent extends PureComponent<NoMatchHandlerComponentProps> {
    componentDidMount(): void {
        scrollToTop();
    }

    componentDidUpdate(prevProps: NoMatchHandlerComponentProps): void {
        const { location: { pathname: newPathname } } = this.props;
        const { location: { pathname } } = prevProps;

        if (newPathname !== pathname) {
            scrollToTop();
            this.onRouteChanged();
        }
    }

    componentWillUnmount(): void {
        const {
            noMatch,
            updateNoMatch,
        } = this.props;

        if (noMatch) {
            updateNoMatch({ noMatch: false });
        }
    }

    /**
     * On browser route change
     * @return {void}
     */
    onRouteChanged(): void {
        const {
            noMatch,
            updateNoMatch,
        } = this.props;

        if (noMatch) {
            updateNoMatch({ noMatch: false });
        }
    }

    render(): ReactElement {
        const { children, noMatch } = this.props;

        if (noMatch) {
            return <NoMatch />;
        }

        return children;
    }
}

export default NoMatchHandlerComponent;
