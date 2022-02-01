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

import Loader from 'Component/Loader';
import { MixType } from 'Type/Common.type';
import {
    invoke, register, subscribe, unsubscribe
} from 'Util/ObserverPool/ObserverPool';

/**
 * LoaderGroup container
 * Creates container for multiple <Loader> components in page.
 * This component handles whether one combined loader on multiple loaders should be rendered.
 * LoaderGroup can also contain other loader groups, thus splitting loading regions.
 * - Each group contains unique ID - groupCode
 * - To add loader or loaderGroup to group use prop - subscribeTo
 * @class Loader
 * @namespace Component/LoaderGroup/Container
 */
export class LoaderGroup extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/no-unused-prop-types
        groupCode: PropTypes.string.isRequired,
        subscribeTo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        // How many unloaded elements there can be, before uniting them into one
        loadingElementThreshold: PropTypes.number,
        mix: MixType
    };

    static defaultProps = {
        loadingElementThreshold: 1,
        mix: {},
        subscribeTo: false
    };

    state = {
        register: {},
        shouldRender: true,
        shouldChildrenRenderSeparate: true
    };

    poolUid = false;

    __construct(props) {
        super.__construct(props);
        const { groupCode, subscribeTo } = props;

        register(groupCode, {
            onSubscribe: this.registerLoader.bind(this),
            getInvokeData: this.shouldChildrenRender.bind(this)
        });

        if (!subscribeTo || this.poolUid !== false) {
            return;
        }

        const isLoading = !!this.getRendererCount();
        this.poolUid = subscribe(
            subscribeTo,
            this.shouldRender.bind(this),
            isLoading
        );

        if (this.poolUid !== false) {
            invoke(subscribeTo, [this.poolUid, isLoading]);
        }
    }

    componentWillUnmount() {
        const { subscribeTo } = this.props;

        if (!subscribeTo || this.poolUid === false) {
            return;
        }

        invoke(subscribeTo, [this.poolUid, false]);
        unsubscribe(subscribeTo, this.poolUid);
    }

    registerLoader(uid, isLoading) {
        const { register } = this.state;

        register[uid] = isLoading;
        this.setState({ register });
    }

    shouldRender(renderSeparately) {
        this.setState({ shouldRender: renderSeparately });
    }

    shouldChildrenRender(data) {
        const [uid, isLoading] = data;
        const { loadingElementThreshold, subscribeTo } = this.props;

        this.registerLoader(uid, isLoading);

        const shouldChildrenRenderSeparate = this.getRendererCount() <= loadingElementThreshold;
        this.setState({ shouldChildrenRenderSeparate });

        if (subscribeTo) {
            invoke(subscribeTo, [this.poolUid, !!this.getRendererCount()]);
        }

        const { shouldRender } = this.state;

        return shouldChildrenRenderSeparate && shouldRender;
    }

    getRendererCount() {
        const { register } = this.state;

        return Object.values(register).filter((isLoading) => isLoading).length;
    }

    render() {
        const { shouldChildrenRenderSeparate, shouldRender } = this.state;

        if (shouldChildrenRenderSeparate || (!shouldRender && this.poolUid)) {
            return null;
        }

        const { mix } = this.props;

        return (
            <Loader mix={ mix } isLoading />
        );
    }
}

export default LoaderGroup;
