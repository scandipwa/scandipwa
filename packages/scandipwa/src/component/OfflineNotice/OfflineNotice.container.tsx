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

import { ComponentType, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';

import { updateOfflineStore } from 'Store/Offline/Offline.action';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import OfflineNotice from './OfflineNotice.component';
import {
    OfflineNoticeComponentProps,
    OfflineNoticeContainerMapDispatchProps,
    OfflineNoticeContainerMapStateProps,
    OfflineNoticeContainerProps,
    OfflineNoticeContainerPropsKeys,
} from './OfflineNotice.type';

/** @namespace Component/OfflineNotice/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): OfflineNoticeContainerMapStateProps => ({
    isOffline: state.OfflineReducer.isOffline,
    isBig: state.OfflineReducer.isBig,
});

/** @namespace Component/OfflineNotice/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): OfflineNoticeContainerMapDispatchProps => ({
    updateOfflineStore: (state) => dispatch(updateOfflineStore(state)),
});

/** @namespace Component/OfflineNotice/Container */
export class OfflineNoticeContainer extends PureComponent<OfflineNoticeContainerProps> {
    static defaultProps: Partial<OfflineNoticeContainerProps> = {
        isPage: false,
    };

    componentDidMount(): void {
        const { isPage } = this.props;

        if (!isPage) {
            this.handleNetworkChange();
            window.addEventListener('online', this.handleNetworkChange.bind(this));
            window.addEventListener('offline', this.handleNetworkChange.bind(this));
        }
    }

    componentDidUpdate(prevProps: OfflineNoticeContainerProps): void {
        const {
            location: { pathname },
            isBig,
            updateOfflineStore,
        } = this.props;

        const {
            isBig: prevIsBig,
            location: { pathname: prevPathname },
        } = prevProps;

        if (isBig !== prevIsBig && !navigator.onLine) {
            if (isBig) {
                document.documentElement.classList.add('bigOffline');
            } else {
                document.documentElement.classList.remove('bigOffline');
            }
        }

        if (pathname !== prevPathname) {
            if (isBig) {
                updateOfflineStore({ isBig: false });
            }
        }
    }

    componentWillUnmount(): void {
        const { isPage } = this.props;

        if (!isPage) {
            window.removeEventListener('online', this.handleNetworkChange);
            window.removeEventListener('offline', this.handleNetworkChange);
        }
    }

    containerProps(): Pick<OfflineNoticeComponentProps, OfflineNoticeContainerPropsKeys> {
        const {
            isBig,
            isPage,
        } = this.props;

        return {
            isBig,
            isPage,
        };
    }

    handleNetworkChange(): void {
        const {
            isBig,
            updateOfflineStore,
        } = this.props;

        if (navigator.onLine) {
            document.documentElement.classList.remove('offline');
            updateOfflineStore({ isOffline: false });
        } else {
            document.documentElement.classList.add('offline');
            updateOfflineStore({ isOffline: true });

            if (isBig) {
                updateOfflineStore({ isBig: false });
            }
        }
    }

    render(): ReactElement {
        return (
            <OfflineNotice
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(
        OfflineNoticeContainer as unknown as ComponentType<OfflineNoticeContainerProps>,
    ),
);
