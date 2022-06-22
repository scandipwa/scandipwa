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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { ChildrenType } from 'Type/Common.type';

/** @namespace Component/ErrorHandler/Component */
export class ErrorHandler extends PureComponent {
    static propTypes = {
        children: ChildrenType,
        setBigOfflineNotice: PropTypes.func.isRequired
    };

    static defaultProps = {
        children: []
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    state = {
        hasError: false,
        pathname: ''
    };

    componentDidMount() {
        this.setState({ pathname: window.location.pathname });
    }

    componentDidUpdate(_, prevState) {
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

    render() {
        const { children } = this.props;
        const { hasError } = this.state;

        if (hasError && !navigator.onLine) {
            return null;
        }

        return children;
    }
}

export default ErrorHandler;
