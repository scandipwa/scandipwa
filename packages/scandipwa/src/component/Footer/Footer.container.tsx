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
import { connect } from 'react-redux';

import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';
import { RootState } from 'Util/Store/Store.type';

import Footer from './Footer.component';
import {
    FooterComponentProps,
    FooterContainerFunctions,
    FooterContainerMapDispatchProps,
    FooterContainerMapStateProps,
    FooterContainerProps,
    FooterContainerPropsKeys,
} from './Footer.type';

/** @namespace Component/Footer/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): FooterContainerMapStateProps => ({
    copyright: state.ConfigReducer.copyright,
    device: state.ConfigReducer.device,
    newsletterActive: state.ConfigReducer.newsletter_general_active,
});

/** @namespace Component/Footer/Container/mapDispatchToProps */
export const mapDispatchToProps = (): FooterContainerMapDispatchProps => ({});

/** @namespace Component/Footer/Container */
export class FooterContainer extends PureComponent<FooterContainerProps> {
    static defaultProps: Partial<FooterContainerProps> = {
        copyright: '',
        isVisibleOnMobile: false,
    };

    containerFunctions: FooterContainerFunctions = {
        onItemClick: this.onItemClick.bind(this),
    };

    containerProps(): Pick<FooterComponentProps, FooterContainerPropsKeys> {
        const {
            copyright,
            isVisibleOnMobile,
            device,
            newsletterActive,
        } = this.props;

        return {
            copyright,
            isVisibleOnMobile,
            device,
            newsletterActive,
        };
    }

    onItemClick(): void {
        scrollToTop();
    }

    render(): ReactElement {
        return (
            <Footer
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);
