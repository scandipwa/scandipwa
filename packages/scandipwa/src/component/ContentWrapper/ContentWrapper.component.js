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

import { ChildrenType, MixType } from 'Type/Common';

import './ContentWrapper.style';

/**
 * Content Wrapper
 * @class ContentWrapper
 * @namespace Component/ContentWrapper/Component
 */
export class ContentWrapper extends PureComponent {
    static propTypes = {
        children: ChildrenType,
        mix: MixType,
        wrapperMix: PropTypes.shape({
            block: PropTypes.string,
            elem: PropTypes.string
        }),
        label: PropTypes.string.isRequired,
        isNotSection: PropTypes.bool
    };

    static defaultProps = {
        mix: {},
        wrapperMix: {},
        children: null,
        isNotSection: false
    };

    renderContentWrapper() {
        const {
            children, wrapperMix
        } = this.props;

        return (
            <div block="ContentWrapper" mix={ wrapperMix }>
                { children }
            </div>
        );
    }

    render() {
        const {
            mix, label, isNotSection
        } = this.props;

        if (isNotSection) {
            return this.renderContentWrapper();
        }

        return (
            <section mix={ mix } aria-label={ label }>
                { this.renderContentWrapper() }
            </section>
        );
    }
}

export default ContentWrapper;
