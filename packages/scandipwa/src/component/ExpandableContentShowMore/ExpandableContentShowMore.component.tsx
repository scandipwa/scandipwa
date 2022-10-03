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

import { createRef, PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';

import {
    ExpandableContentShowMoreComponentProps,
    ExpandableContentShowMoreComponentState,
} from './ExpandableContentShowMore.type';

import './ExpandableContentShowMore.style';

/** @namespace Component/ExpandableContentShowMore/Component */
export class ExpandableContentShowMoreComponent extends PureComponent<
ExpandableContentShowMoreComponentProps,
ExpandableContentShowMoreComponentState
> {
    static defaultProps: Partial<ExpandableContentShowMoreComponentProps> = {
        showElemCount: 3,
    };

    ref = createRef<HTMLDivElement>();

    expandableRef = createRef<HTMLDivElement>();

    expandableContentHeight: number | string = 'auto';

    __construct(props: ExpandableContentShowMoreComponentProps): void {
        super.__construct?.(props);

        const { showElemCount, children: { length } } = this.props;

        this.handleShowAllButtonClick = this.handleShowAllButtonClick.bind(this);
        this.state = {
            isOpen: length > showElemCount,
            isExpanding: false,
        };
    }

    componentDidMount(): void {
        const { isOpen } = this.state;

        if (isOpen) {
            if (this.expandableRef.current) {
                this.expandableContentHeight = this.expandableRef.current.getBoundingClientRect().height;
            }
            this.setState({ isOpen: false });
        }
    }

    componentDidUpdate(prevProps: ExpandableContentShowMoreComponentProps): void {
        const { children: prevChildren } = prevProps;
        const { children: nextChildren } = this.props;

        if (prevChildren !== nextChildren) {
            if (this.expandableRef.current) {
            // eslint-disable-next-line react/no-did-update-set-state
                this.setState({ isOpen: true }, () => {
                    if (this.expandableRef.current) {
                        this.expandableRef.current.style.height = 'auto';
                    }
                });
            }
        }

        const { isExpanding } = this.state;

        if (isExpanding && this.expandableRef.current) {
            const ONE_SECOND_IN_MS = 1000;
            const transitionDurationCSStoMS = Number(window
                .getComputedStyle(this.expandableRef.current)
                .getPropertyValue('transition-duration')
                .slice(0, -1)) * ONE_SECOND_IN_MS;

            setTimeout(
                () => this.setState({ isExpanding: false }),
                transitionDurationCSStoMS,
            );
        }

        if (nextChildren !== prevChildren) {
            this.getExpandableContentHeight();
        }
    }

    getExpandableContentHeight(): void {
        const { isOpen } = this.state;
        const { showElemCount, children: { length } } = this.props;

        if (isOpen && length <= showElemCount) {
            this.setState({ isOpen: false });

            return;
        }

        this.expandableContentHeight = 'auto';
        this.setState({ isOpen: true }, () => {
            if (this.expandableRef.current) {
                this.expandableContentHeight = this.expandableRef.current.getBoundingClientRect().height;
            }
            this.setState({ isOpen: false });
        });
    }

    handleShowAllButtonClick(): void {
        const { isExpanding } = this.state;

        if (!isExpanding) {
            this.setState(({ isOpen }) => ({ isOpen: !isOpen, isExpanding: true }));
        }
    }

    renderShowAllButton(): ReactElement {
        const { showElemCount, children: { length } } = this.props;

        if (length <= showElemCount) {
            return null;
        }

        const { isOpen } = this.state;

        const mods = isOpen ? { state: 'isOpen' } : {};

        return (
            <button
              onClick={ this.handleShowAllButtonClick }
              mix={ { block: 'Button', mods: { likeLink: true } } }
              block="ExpandableContentShowMore"
              elem="ShowAllButton"
              mods={ mods }
            >
                { isOpen ? __('Show less') : __('Show more') }
            </button>
        );
    }

    renderExpandableChildren(): ReactElement {
        const { isOpen, isExpanding } = this.state;
        const { children, showElemCount } = this.props;

        const child = (isOpen || isExpanding) ? children.slice(showElemCount) : null;
        const style = {
            height: isOpen ? this.expandableContentHeight : 0,
        };

        return (
            <div
              ref={ this.expandableRef }
              block="ExpandableContentShowMore"
              elem="ExpandableChildren"
              style={ style }
            >
                { child }
            </div>
        );
    }

    renderContent(): ReactElement {
        const { children, showElemCount } = this.props;

        const child = children.slice(0, showElemCount);

        return (
            <>
                { child }
                { this.renderExpandableChildren() }
                { this.renderShowAllButton() }
            </>
        );
    }

    render(): ReactElement {
        const { children, isMobile } = this.props;

        if (isMobile) {
            return children;
        }

        return (
            <div block="ExpandableContentShowMore" ref={ this.ref }>
                { this.renderContent() }
            </div>
        );
    }
}
export default ExpandableContentShowMoreComponent;
