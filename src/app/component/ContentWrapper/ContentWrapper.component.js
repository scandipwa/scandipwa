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
import { MixType, ChildrenType } from 'Type/Common';
import './ContentWrapper.style';

/**
 * Content Wrapper
 * @class ContentWrapper
 */
export default class ContentWrapper extends PureComponent {
    static propTypes = {
        children: ChildrenType,
        mix: MixType,
        wrapperMix: PropTypes.shape({
            block: PropTypes.string,
            elem: PropTypes.string
        }),
        label: PropTypes.string.isRequired
    };

    static defaultProps = {
        mix: {},
        wrapperMix: {},
        children: null
    };

    render() {
        const {
            children, mix, wrapperMix, label
        } = this.props;

        return (
            <section mix={ mix } aria-label={ label }>
                <div block="ContentWrapper" mix={ wrapperMix }>
                    { children }
                </div>
            </section>
        );
    }
}
