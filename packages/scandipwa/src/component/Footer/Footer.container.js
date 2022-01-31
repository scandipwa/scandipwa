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
import { connect } from 'react-redux';

import { DeviceType } from 'Type/Device.type';
import { scrollToTop } from 'Util/Browser';

import Footer from './Footer.component';

/** @namespace Component/Footer/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    copyright: state.ConfigReducer.copyright,
    device: state.ConfigReducer.device,
    newsletterActive: state.ConfigReducer.newsletter_general_active
});

/** @namespace Component/Footer/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/Footer/Container */
export class FooterContainer extends PureComponent {
    static propTypes = {
        copyright: PropTypes.string,
        isVisibleOnMobile: PropTypes.bool,
        device: DeviceType.isRequired,
        newsletterActive: PropTypes.bool.isRequired
    };

    static defaultProps = {
        copyright: '',
        isVisibleOnMobile: false
    };

    containerFunctions = {
        onItemClick: this.onItemClick.bind(this)
    };

    containerProps() {
        const {
            copyright,
            isVisibleOnMobile,
            device,
            newsletterActive
        } = this.props;

        return {
            copyright,
            isVisibleOnMobile,
            device,
            newsletterActive
        };
    }

    onItemClick() {
        scrollToTop();
    }

    render() {
        return (
            <Footer
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);
