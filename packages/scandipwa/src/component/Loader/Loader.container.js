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

import Loader from 'Component/Loader/Loader.component';
import { MixType } from 'Type/Common.type';
import { invoke, subscribe, unsubscribe } from 'Util/ObserverPool/ObserverPool';

/**
 * Loader component
 * Loaders overlay to identify loading
 * @class Loader
 * @namespace Component/Loader/Container
 */
export class LoaderContainer extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        mix: MixType,
        subscribeTo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    };

    static defaultProps = {
        isLoading: true,
        mix: {},
        subscribeTo: false
    };

    state = {
        shouldRender: true
    };

    poolUid = false;

    __construct(props) {
        super.__construct(props);
        const { subscribeTo, isLoading } = props;

        if (!subscribeTo) {
            return;
        }

        if (this.poolUid) {
            unsubscribe(subscribeTo, this.poolUid);
        }

        this.poolUid = subscribe(subscribeTo, this.shouldRender.bind(this), isLoading);

        if (this.poolUid !== false) {
            this.setState({ shouldRender: false });
            invoke(subscribeTo, [this.poolUid, isLoading]);
        }
    }

    componentDidUpdate(prevProps) {
        const { isLoading, subscribeTo } = this.props;
        const { isLoading: prevPropsIsLoading } = prevProps;

        if (this.poolUid !== false && subscribeTo && isLoading !== prevPropsIsLoading) {
            invoke(subscribeTo, [this.poolUid, isLoading]);
        }
    }

    componentWillUnmount() {
        const { subscribeTo } = this.props;

        if (!subscribeTo || this.poolUid === false) {
            return;
        }

        this.shouldRender(false);

        invoke(subscribeTo, [this.poolUid, false]);
        unsubscribe(subscribeTo, this.poolUid);
    }

    shouldRender(renderSeparately) {
        const { isLoading } = this.props;
        const render = renderSeparately && isLoading;
        this.setState({ shouldRender: render });
        this.state.shouldRender = render;
    }

    render() {
        const { isLoading, mix, subscribeTo } = this.props;
        const { shouldRender } = this.state;

        if (subscribeTo && !shouldRender) {
            return null;
        }

        return (
            <Loader mix={ mix } isLoading={ isLoading } />
        );
    }
}

export default LoaderContainer;
