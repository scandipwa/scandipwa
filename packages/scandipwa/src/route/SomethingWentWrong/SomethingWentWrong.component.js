/* eslint-disable no-console */

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

import ContentWrapper from 'Component/ContentWrapper';
import { ErrorDetailsType } from 'Type/Error.type';

import './SomethingWentWrong.style';

/** @namespace Route/SomethingWentWrong/Component */
export class SomethingWentWrong extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        errorDetails: ErrorDetailsType.isRequired
    };

    renderErrorDetails() {
        const { errorDetails: { err, info: { componentStack } = {} } } = this.props;
        const errorString = err.toString();

        console.groupCollapsed('Suppressed error log:');
        console.error(errorString);
        console.groupEnd();

        if (process.env.NODE_ENV === 'production') {
            return null;
        }

        return (
            <div block="SomethingWentWrong" elem="Debug">
                { errorString }
                { componentStack }
            </div>
        );
    }

    render() {
        const { onClick } = this.props;

        return (
            <main block="SomethingWentWrong">
                <ContentWrapper label="Something went wrong on the page.">
                    <h1 block="SomethingWentWrong" elem="Heading">{ __('Ooops!') }</h1>
                    <h2 block="SomethingWentWrong" elem="SubHeading">{ __('Something went wrong!') }</h2>
                    { /* eslint-disable-next-line react/forbid-elements */ }
                    <a
                      href="/"
                      block="SomethingWentWrong"
                      elem="Button"
                      mix={ { block: 'Button' } }
                      onClick={ onClick }
                    >
                        { __('Back to homepage') }
                    </a>
                    { this.renderErrorDetails() }
                </ContentWrapper>
            </main>
        );
    }
}

export default SomethingWentWrong;
