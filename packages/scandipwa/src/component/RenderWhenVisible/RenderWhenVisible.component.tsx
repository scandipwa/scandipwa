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
import { InView } from 'react-intersection-observer';

import { ReactElement } from 'Type/Common.type';
import { isCrawler, isSSR } from 'Util/Browser';
import { noopFn } from 'Util/Common';

import { RenderWhenVisibleComponentProps, RenderWhenVisibleComponentState } from './RenderWhenVisible.type';

import 'intersection-observer';
import './RenderWhenVisible.style';

/** @namespace Component/RenderWhenVisible/Component */
export class RenderWhenVisibleComponent extends PureComponent<RenderWhenVisibleComponentProps, RenderWhenVisibleComponentState> {
    static defaultProps: Partial<RenderWhenVisibleComponentProps> = {
        fallback: noopFn,
    };

    node: HTMLElement | null = null;

    state: RenderWhenVisibleComponentState = {
        wasVisible: false,
    };

    __construct(props: RenderWhenVisibleComponentProps): void {
        super.__construct?.(props);

        this.handleVisibilityToggle = this.handleVisibilityToggle.bind(this);

        // a hack to determine if the element is on screen or not immediately
        setTimeout(this.checkIsVisible, 0);
    }

    checkIsVisible(): void {
        if (!this.node) {
            return;
        }

        const rect = this.node.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

        if (!(rect.bottom < 0 || rect.top - viewHeight >= 0)) {
            this.setState({ wasVisible: true });
        }
    }

    shouldRender(): boolean {
        const { wasVisible } = this.state;

        return !wasVisible && !isSSR() && !isCrawler();
    }

    handleVisibilityToggle(isVisible: boolean): void {
        const { wasVisible } = this.state;

        if (!wasVisible && isVisible) {
            this.setState({ wasVisible: true });
        }
    }

    renderFallback(): ReactElement {
        const { fallback } = this.props;
        const fallbackRender = fallback();

        if (fallbackRender) {
            return fallbackRender;
        }

        return (
            <div block="RenderWhenVisible" elem="Detector" />
        );
    }

    renderVisibilitySensor(): ReactElement {
        return (
            <InView onChange={ this.handleVisibilityToggle }>
                { this.renderFallback() }
            </InView>
        );
    }

    renderChildren(): ReactElement {
        const { children } = this.props;

        return children;
    }

    render(): ReactElement {
        if (this.shouldRender()) {
            return this.renderVisibilitySensor();
        }

        return this.renderChildren();
    }
}

export default RenderWhenVisibleComponent;
