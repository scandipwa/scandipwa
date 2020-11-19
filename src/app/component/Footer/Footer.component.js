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

import CmsBlock from 'Component/CmsBlock';
import ContentWrapper from 'Component/ContentWrapper';
import Image from 'Component/Image';
import Link from 'Component/Link';
import { DeviceType } from 'Type/Device';
import media from 'Util/Media';

import { COLUMN_MAP } from './Footer.config';

import './Footer.style';

/**
 * Page footer
 * @class Footer
 * @namespace Component/Footer/Component
 */
export class Footer extends PureComponent {
    static propTypes = {
        copyright: PropTypes.string,
        isVisibleOnMobile: PropTypes.bool,
        device: DeviceType.isRequired
    };

    static defaultProps = {
        copyright: '',
        isVisibleOnMobile: false
    };

    renderColumnItemContent(src, title) {
        if (!src) {
            return title;
        }

        return (
            <Image
              mix={ { block: 'Footer', elem: 'ColumnItemImage' } }
              src={ media(src, '', false) }
            />
        );
    }

    renderColumnItem = ({ href = '/', title, src }) => {
        const mods = src ? { type: 'image' } : {};

        return (
            <Link
              block="Footer"
              elem="ColumnItem"
              to={ href }
              mods={ mods }
            >
                { this.renderColumnItemContent(src, title) }
            </Link>
        );
    };

    renderColumn = ({ title, items, isItemsHorizontal }) => {
        const contentMods = isItemsHorizontal ? { direction: 'horizontal' } : {};

        return (
            <div block="Footer" elem="Column">
                <h3 block="Footer" elem="ColumnTitle">
                    { title }
                </h3>
                <div
                  block="Footer"
                  elem="ColumnContent"
                  mods={ contentMods }
                >
                    { items.map(this.renderColumnItem) }
                </div>
            </div>
        );
    };

    renderColumns() {
        return (
            <ContentWrapper
              isNotSection
              wrapperMix={ { block: 'Footer', elem: 'Columns' } }
            >
                { COLUMN_MAP.map(this.renderColumn) }
            </ContentWrapper>
        );
    }

    renderContent() {
        const { footer_content: { footer_cms } = {} } = window.contentConfiguration;

        if (footer_cms) {
            return <CmsBlock identifier={ footer_cms } />;
        }

        return (
            <div block="Footer" elem="Content">
                { this.renderColumns() }
            </div>
        );
    }

    renderCopyrightContent() {
        const { copyright } = this.props;

        return (
            <ContentWrapper
              mix={ { block: 'Footer', elem: 'CopyrightContentWrapper' } }
              wrapperMix={ { block: 'Footer', elem: 'CopyrightContent' } }
            >
                <span block="Footer" elem="Copyright">
                    { copyright }
                    { ' Powered by ' }
                    <a href="https://scandipwa.com">
                        ScandiPWA
                    </a>
                </span>
            </ContentWrapper>
        );
    }

    render() {
        const { isVisibleOnMobile, device } = this.props;

        if (!isVisibleOnMobile && device.isMobile) {
            return null;
        }

        if (isVisibleOnMobile && !device.isMobile) {
            return null;
        }

        return (
            <footer block="Footer" aria-label="Footer">
                { this.renderContent() }
                { this.renderCopyrightContent() }
            </footer>
        );
    }
}

export default Footer;
