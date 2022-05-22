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
import 'intersection-observer';

import { PureComponent } from 'react';
import { InView } from 'react-intersection-observer';

import { ChildrenType, ReactElement } from 'Type/Common.type';
import { isCrawler, isSSR } from 'Util/Browser';
import { noopFn } from 'Util/Common';

import './RenderWhenVisible.style';

/** @namespace Component/RenderWhenVisible/Component */
export class RenderWhenVisible extends PureComponent {
    static propTypes = {
        children: ChildrenType.isRequired,
        fallback: PropTypes.func
    };

    static defaultProps = {
        fallback: noopFn
    };

    state = {
        wasVisible: false
    };

    handleVisibilityToggle = this.handleVisibilityToggle.bind(this);

    __construct(props): void {
        super.__construct(props);

        // a hack to determine if the element is on screen or not immediately
        setTimeout(this.checkIsVisible, 0);
    }

    checkIsVisible() {
        if (!this.node) {
            return;
        }

        const rect = this.node.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

        if (!(rect.bottom < 0 || rect.top - viewHeight >= 0)) {
            this.setState({ wasVisible: true });
        }
    }

    shouldrender(): ReactElement {
        const { wasVisible } = this.state;

        return !wasVisible && !isSSR() && !isCrawler();
    }

    handleVisibilityToggle(isVisible) {
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

    renderContent(): ReactElement {
        if (this.shouldRender()) {
            return this.renderVisibilitySensor();
        }

        return this.renderChildren();
    }

    render(): ReactElement {
        return (
            <div
              block="RenderWhenVisible"
              ref={ (node) => {
                  this.node = node;
              } }
            >
                { this.renderContent() }
            </div>
        );
    }
}

export default RenderWhenVisible;