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

import { ReactElement } from 'Type/Common.type';

import { ErrorHandlerComponentProps, ErrorHandlerComponentState } from './ErrorHandler.type';

/** @namespace Component/ErrorHandler/Component */
export class ErrorHandler extends PureComponent<ErrorHandlerComponentProps, ErrorHandlerComponentState> {
    static defaultProps: Partial<ErrorHandlerComponentProps> = {
        children: []
    };

    static getDerivedStateFromError(): Partial<ErrorHandlerComponentState> {
        return { hasError: true };
    }

    state: ErrorHandlerComponentState = {
        hasError: false,
        pathname: ''
    };

    componentDidMount(): void {
        this.setState({ pathname: window.location.pathname });
    }

    componentDidUpdate(_: ErrorHandlerComponentProps, prevState: ErrorHandlerComponentState): void {
        const { setBigOfflineNotice } = this.props;
        const { hasError, pathname = '' } = this.state;
        const { hasError: prevHasError } = prevState;

        if (window.location.pathname !== pathname && hasError) {
            this.setState({
                hasError: false,
                pathname: window.location.pathname
            });
        }

        if (hasError && hasError !== prevHasError && !navigator.onLine) {
            setBigOfflineNotice(true);
        }
    }

    render(): ReactElement {
        const { children } = this.props;
        const { hasError } = this.state;

        if (hasError && !navigator.onLine) {
            return null;
        }

        return children;
    }
}

export default ErrorHandler;
