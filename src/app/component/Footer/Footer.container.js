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
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from './Footer.component';

export const mapStateToProps = state => ({
    copyright: state.ConfigReducer.copyright,
    header_logo_src: state.ConfigReducer.header_logo_src,
    logo_alt: state.ConfigReducer.logo_alt,
    logoSize: state.ConfigReducer.logoSize,
    isLoading: state.ConfigReducer.isLoading
});

export const LOGO_SIZE_FROM_ORIGINAL = 0.3;

export class FooterContainer extends PureComponent {
    static propTypes = {
        logoSize: PropTypes.shape({
            height: PropTypes.number,
            width: PropTypes.number
        })
    };

    static defaultProps = {
        logoSize: {}
    };

    containerProps = () => ({
        footerLogoSize: this._getFooterLogoSize()
    });

    _getFooterLogoSize() {
        const { logoSize } = this.props;
        if (Object.keys(logoSize).length) {
            return Object.entries(logoSize).reduce(
                (acc, [key, val]) => ({ ...acc, [key]: Math.round(val * LOGO_SIZE_FROM_ORIGINAL) }), {}
            );
        }

        return {};
    }

    render() {
        return (
            <Footer
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps)(FooterContainer);
