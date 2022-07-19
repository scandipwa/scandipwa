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
import { createRef, PureComponent } from 'react';

import AddIcon from 'Component/AddIcon';
import ChevronIcon from 'Component/ChevronIcon';
import { BOTTOM, TOP } from 'Component/ChevronIcon/ChevronIcon.config';
import MinusIcon from 'Component/MinusIcon';
import TextPlaceholder from 'Component/TextPlaceholder';
import { ChildrenType, MixType, ModsType } from 'Type/Common.type';
import { DeviceType } from 'Type/Device.type';
import { isCrawler, isSSR } from 'Util/Browser';
import { getFixedElementHeight } from 'Util/CSS';

import './ExpandableContent.style';

/** @namespace Component/ExpandableContent/Component */
export class ExpandableContent extends PureComponent {
    static propTypes = {
        isContentExpanded: PropTypes.bool,
        isArrow: PropTypes.bool,
        heading: PropTypes.string,
        children: ChildrenType,
        mix: MixType.isRequired,
        mods: ModsType,
        device: DeviceType.isRequired,
        onClick: (props, propName, componentName) => {
            const propValue = props[propName];

            if (propValue === null) {
                return;
            }

            if (typeof propValue === 'function') {
                return;
            }

            throw new Error(`${componentName} only accepts null or string`);
        }
    };

    static defaultProps = {
        heading: '',
        isContentExpanded: false,
        onClick: null,
        children: [],
        isArrow: false,
        mods: {}
    };

    expandableContentRef = createRef();

    toggleExpand = this.toggleExpand.bind(this);

    __construct(props) {
        super.__construct(props);
        const { isContentExpanded } = this.props;

        const isForceExpanded = isSSR() || isCrawler();

        this.state = {
            isContentExpanded: isForceExpanded || isContentExpanded,
            // eslint-disable-next-line react/no-unused-state
            prevIsContentExpanded: isContentExpanded
        };
    }

    static getDerivedStateFromProps({ isContentExpanded }, { prevIsContentExpanded }) {
        if (isContentExpanded !== prevIsContentExpanded) {
            return {
                prevIsContentExpanded: isContentExpanded,
                isContentExpanded
            };
        }

        return null;
    }

    scrollToExpandedContent() {
        const { isContentExpanded } = this.state;
        const elem = this.expandableContentRef && this.expandableContentRef.current;

        if (isContentExpanded && !elem) {
            return;
        }

        const elemToWindowTopDist = elem.getBoundingClientRect().top;
        const windowToPageTopDist = document.body.getBoundingClientRect().top;
        const topToElemDistance = elemToWindowTopDist - windowToPageTopDist;
        const {
            total: totalFixedElementHeight,
            bottom: bottomFixedElementHeight
        } = getFixedElementHeight();

        const elemMaxOffsetHeight = screen.height > elem.offsetHeight + bottomFixedElementHeight
            ? elem.offsetHeight
            : screen.height - totalFixedElementHeight;
        const scrollTo = topToElemDistance - (screen.height - bottomFixedElementHeight - elemMaxOffsetHeight);

        // checking if button is in a view-port
        if (-windowToPageTopDist >= scrollTo) {
            return;
        }

        window.scrollTo({ behavior: 'smooth', top: scrollTo });
    }

    toggleExpand() {
        const { onClick } = this.props;

        if (onClick) {
            onClick();

            return;
        }
        this.setState(
            ({ isContentExpanded }) => ({ isContentExpanded: !isContentExpanded }),
            () => this.scrollToExpandedContent()
        );
    }

    renderButton() {
        const { isContentExpanded } = this.state;
        const { heading, mix } = this.props;

        return (
            <div
              role="button"
              tabIndex={ 0 }
              block="ExpandableContent"
              elem="Button"
              mods={ { isContentExpanded } }
              mix={ { ...mix, elem: 'ExpandableContentButton' } }
              onClick={ this.toggleExpand }
              onKeyDown={ this.toggleExpand }
            >
                <div
                  block="ExpandableContent"
                  elem="Heading"
                  mix={ { ...mix, elem: 'ExpandableContentHeading' } }
                >
                    { typeof heading === 'string' ? (
                        <TextPlaceholder content={ heading } length="medium" />
                    ) : (
                        heading
                    ) }
                </div>
                { this.renderButtonIcon() }
            </div>
        );
    }

    renderButtonIcon() {
        const { isContentExpanded } = this.state;
        const { isArrow, device: { isMobile } } = this.props;

        if (!isMobile) {
            return null;
        }

        if (isArrow) {
            return <ChevronIcon direction={ isContentExpanded ? TOP : BOTTOM } />;
        }

        return this.renderTogglePlusMinus();
    }

    renderTogglePlusMinus() {
        const { isContentExpanded } = this.state;

        if (isContentExpanded) {
            return <MinusIcon />;
        }

        return <AddIcon />;
    }

    renderContent() {
        const { children, mix } = this.props;
        const { isContentExpanded } = this.state;
        const mods = { isContentExpanded };

        return (
            <div
              block="ExpandableContent"
              elem="Content"
              mods={ mods }
              mix={ { ...mix, elem: 'ExpandableContentContent', mods } }
            >
                { children }
            </div>
        );
    }

    render() {
        const { mix, mods } = this.props;

        return (
            <article
              block="ExpandableContent"
              mix={ mix }
              mods={ mods }
              ref={ this.expandableContentRef }
            >
                { this.renderButton() }
                { this.renderContent() }
            </article>
        );
    }
}
export default ExpandableContent;
