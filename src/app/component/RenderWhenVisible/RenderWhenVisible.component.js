import './RenderWhenVisible.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import { ChildrenType } from 'Type/Common';

export class RenderWhenVisible extends PureComponent {
    static propTypes = {
        children: ChildrenType.isRequired,
        fallback: PropTypes.func
    };

    static defaultProps = {
        fallback: () => {}
    };

    state = {
        wasVisible: false
    };

    constructor(props) {
        super(props);

        // a hack to determine if the element is on screen or not imidiatelly
        setTimeout(this.checkIsVisible, 0);
    }

    checkIsVisible = () => {
        if (!this.node) {
            return;
        }

        const rect = this.node.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

        if (!(rect.bottom < 0 || rect.top - viewHeight >= 0)) {
            this.setState({ wasVisible: true });
        }
    };

    shouldRender(isVisible) {
        return isVisible || this.wasVisible;
    }

    handleVisibilityToggle = (isVisible) => {
        if (!this.wasVisible && isVisible) {
            this.setState({ wasVisible: true });
        }
    };

    renderFallback() {
        const { fallback } = this.props;
        const fallbackRender = fallback();

        if (fallbackRender) {
            return fallbackRender;
        }

        return (
            <div block="RenderWhenVisible" elem="Detector" />
        );
    }

    renderVisibilitySensor() {
        return (
            <VisibilitySensor
              delayedCall
              partialVisibility={ ['top', 'bottom'] }
              minTopValue="1"
              onChange={ this.handleVisibilityToggle }
            >
                { this.renderFallback() }
            </VisibilitySensor>
        );
    }

    renderChildren() {
        const { children } = this.props;

        return children;
    }

    renderContent() {
        const { wasVisible } = this.state;

        if (!wasVisible) {
            return this.renderVisibilitySensor();
        }

        return this.renderChildren();
    }

    render() {
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
