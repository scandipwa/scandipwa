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

import { CART_OVERLAY } from 'Component/Header/Header.config';
import Loader from 'Component/Loader';
import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import Overlay from 'Component/Overlay';

import { OVERLAY_PLACEHOLDER } from './PopupSuspense.config';

import './PopupSuspense.style';
// Import styles from different bundles
import 'Component/CartOverlay/CartOverlay.style';
import 'Component/MyAccountOverlay/MyAccountOverlay.style';

/** @namespace Component/PopupSuspense/Component */
export class PopupSuspense extends PureComponent {
    static propTypes = {
        /** Passed props */
        onVisible: PropTypes.func,
        actualOverlayKey: PropTypes.string.isRequired,

        /** Props from global state */
        showOverlay: PropTypes.func.isRequired
    };

    static defaultProps = {
        onVisible: () => {}
    };

    styleMap = {
        [CART_OVERLAY]: 'CartOverlay',
        [CUSTOMER_ACCOUNT_OVERLAY_KEY]: 'MyAccountOverlay'
    };

    componentDidMount() {
        const { showOverlay } = this.props;

        showOverlay(OVERLAY_PLACEHOLDER);
    }

    handleNoStyle() {
        const { actualOverlayKey } = this.props;

        throw new Error(
            `Please, provide a class in the stylemap for overlay ${actualOverlayKey} and import its style here.`
        );
    }

    render() {
        const {
            onVisible,
            actualOverlayKey
        } = this.props;

        const block = this.styleMap[actualOverlayKey];
        if (!block) {
            this.handleNoStyle();
        }

        return (
            <Overlay
              id={ OVERLAY_PLACEHOLDER }
              onVisible={ onVisible }
              mix={ { block, mix: { block: 'PopupSuspense' } } }
            >
                <Loader isLoading />
            </Overlay>
        );
    }
}

export default PopupSuspense;
