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

import { createRef, PureComponent, ReactElement } from 'react';

import AddIcon from 'Component/AddIcon';
import ChevronIcon from 'Component/ChevronIcon';
import { Directions } from 'Component/ChevronIcon/ChevronIcon.config';
import MinusIcon from 'Component/MinusIcon';
import TextPlaceholder from 'Component/TextPlaceholder';
import { TextPlaceHolderLength } from 'Component/TextPlaceholder/TextPlaceholder.config';
import { isCrawler, isSSR } from 'Util/Browser';
import { getFixedElementHeight } from 'Util/CSS';

import { ExpandableContentComponentProps, ExpandableContentComponentState } from './ExpandableContent.type';

import './ExpandableContent.style';

/** @namespace Component/ExpandableContent/Component */
export class ExpandableContentComponent extends PureComponent<ExpandableContentComponentProps, ExpandableContentComponentState> {
    static defaultProps: Partial<ExpandableContentComponentProps> = {
        heading: '',
        isContentExpanded: false,
        onClick: undefined,
        children: [],
        isArrow: false,
        mods: {},
    };

    expandableContentRef = createRef<HTMLElement>();

    __construct(props: ExpandableContentComponentProps): void {
        super.__construct?.(props);
        const { isContentExpanded } = this.props;

        const isForceExpanded = isSSR() || isCrawler();

        this.toggleExpand = this.toggleExpand.bind(this);

        this.state = {
            isContentExpanded: isForceExpanded || isContentExpanded,
            // eslint-disable-next-line react/no-unused-state
            prevIsContentExpanded: isContentExpanded,
        };
    }

    static getDerivedStateFromProps(
        { isContentExpanded }: Pick<ExpandableContentComponentProps, 'isContentExpanded'>,
        { prevIsContentExpanded }: Pick<ExpandableContentComponentState, 'prevIsContentExpanded'>,
    ): ExpandableContentComponentState | null {
        if (isContentExpanded !== prevIsContentExpanded) {
            return {
                prevIsContentExpanded: isContentExpanded,
                isContentExpanded,
            };
        }

        return null;
    }

    scrollToExpandedContent(): void {
        const { isContentExpanded } = this.state;
        const elem = this.expandableContentRef && this.expandableContentRef.current;

        if ((isContentExpanded && !elem) || !elem) {
            return;
        }

        const elemToWindowTopDist: number = elem.getBoundingClientRect().top;
        const windowToPageTopDist: number = document.body.getBoundingClientRect().top;
        const topToElemDistance: number = elemToWindowTopDist - windowToPageTopDist;
        const {
            total: totalFixedElementHeight,
            bottom: bottomFixedElementHeight,
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

    toggleExpand(): void {
        const { onClick } = this.props;

        if (onClick) {
            onClick();

            return;
        }
        this.setState(
            ({ isContentExpanded }) => ({ isContentExpanded: !isContentExpanded }),
            () => this.scrollToExpandedContent(),
        );
    }

    renderButton(): ReactElement {
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
                        <TextPlaceholder content={ heading } length={ TextPlaceHolderLength.MEDIUM } />
                    ) : (
                        heading
                    ) }
                </div>
                { this.renderButtonIcon() }
            </div>
        );
    }

    renderButtonIcon(): ReactElement | null {
        const { isContentExpanded } = this.state;
        const { isArrow, device: { isMobile } } = this.props;

        if (!isMobile) {
            return null;
        }

        if (isArrow) {
            return <ChevronIcon direction={ isContentExpanded ? Directions.TOP : Directions.BOTTOM } />;
        }

        return this.renderTogglePlusMinus();
    }

    renderTogglePlusMinus(): ReactElement {
        const { isContentExpanded } = this.state;

        if (isContentExpanded) {
            return <MinusIcon />;
        }

        return <AddIcon />;
    }

    renderContent(): ReactElement {
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
                <div block="ExpandableContent" elem="Expand">
                    { children }
                </div>
            </div>
        );
    }

    render(): ReactElement {
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
export default ExpandableContentComponent;
