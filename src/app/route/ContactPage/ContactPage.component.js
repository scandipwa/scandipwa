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

import ContactForm from 'Component/ContactForm';
import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';

import './ContactPage.style';

/** @namespace Route/ContactPage/Component */
export class ContactPage extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool
    };

    static defaultProps = {
        isLoading: false
    };

    render() {
        const { isLoading } = this.props;
        return (
            <div block="ContactPage">
                <ContentWrapper label="Contact Page">
                    <Loader isLoading={ isLoading } />
                    <h1 block="ContactPage" elem="Heading">
                        { __('Contact Us') }
                    </h1>
                    <div block="ContactPage" elem="ColumnWrapper">
                        <div block="ContactPage" elem="Column" mods={ { isContent: true } }>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ex quam, egestas lobortis accumsan vel, maximus nec felis. Vivamus ex lorem, pellentesque dapibus sem vitae, ultrices tempor turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin tincidunt, lorem id fermentum scelerisque, diam sem aliquet augue, sit amet sodales ligula velit sed mauris. Vestibulum felis sem, molestie sed leo at, bibendum venenatis purus. Integer sodales purus quis leo porta maximus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed vel tortor sed mi molestie commodo in mattis urna. Sed pretium neque ac orci pellentesque, non tristique dolor tincidunt. Curabitur id massa sagittis, ullamcorper justo eget, dictum ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque diam tellus, posuere vel risus quis, condimentum molestie dolor. Etiam ultricies est enim, non tempor est commodo nec. Suspendisse maximus at nunc ut cursus. Proin condimentum porta nibh viverra elementum.
                        </div>
                        <div block="ContactPage" elem="Column">
                            <ContactForm />
                        </div>
                    </div>
                </ContentWrapper>
            </div>
        );
    }
}

export default ContactPage;
