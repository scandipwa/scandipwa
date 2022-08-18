/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import { ReactElement } from 'Type/Common.type';

import { SomethingWentWrongComponentProps } from './SomethingWentWrong.type';

import './SomethingWentWrong.style';

/** @namespace Route/SomethingWentWrong/Component */
export class SomethingWentWrong extends PureComponent<SomethingWentWrongComponentProps> {
    renderErrorDetails(): ReactElement {
        const { errorDetails: { err, info: { componentStack } = {} } } = this.props;
        const errorString = err.toString();

        // eslint-disable-next-line no-console
        console.groupCollapsed('Suppressed error log:');
        // eslint-disable-next-line no-console
        console.error(errorString);
        // eslint-disable-next-line no-console
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

    render(): ReactElement {
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
