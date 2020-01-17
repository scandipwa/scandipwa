import { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import SharedTransitionContainer from './SharedTransition.unstated';

import './SharedTransition.style';
import CSS from 'Util/CSS';

class SharedTransition extends PureComponent {
    static propTypes = {
        // TODO: implement prop-types
    };

    sharedContainer = createRef();

    setAnimationSpeed() {
        // { top, height }, { top: dTop, height: dHeight }
        // const ms = Math.abs(top + height - dTop - dHeight) / screen.height * 300;
        const ms = 150;

        CSS.setVariable(
            this.sharedContainer,
            'shared-element-animation-speed',
            `${ ms }ms`
        );

        return ms;
    }

    setPositionToElement(position) {
        const {
            width,
            height,
            left,
            top
        } = position;

        CSS.setVariable(this.sharedContainer, 'shared-element-width', `${width}px`);
        CSS.setVariable(this.sharedContainer, 'shared-element-height', `${height}px`);
        CSS.setVariable(this.sharedContainer, 'shared-element-left', `${left}px`);
        CSS.setVariable(this.sharedContainer, 'shared-element-top', `${top}px`);
    }

    handleSharedTransition = ({ state, cleanUpTransition }) => {
        const { sharedElement } = state;
        console.log(state);

        this.renderCloneElement(state, cleanUpTransition);

        return (
            <div
              block="SharedTransition"
              mods={ { isVisible: !!sharedElement } }
              ref={ this.sharedContainer }
            />
        );
    };

    cleanUpTransition = (cleanUpTransition) => {
        const { current: wrapper } = this.sharedContainer;
        const range = document.createRange();
        range.selectNodeContents(wrapper);
        range.deleteContents();
        cleanUpTransition();
    };

    renderCloneElement(state, cleanUpTransition) {
        const {
            sharedElementDestination,
            sharedElement,
            statringPosition,
            destinationPosition
        } = state;

        const { current: wrapper } = this.sharedContainer;

        if (
            !sharedElement
            || !sharedElementDestination
            || !wrapper
        ) return;

        const duration = this.setAnimationSpeed(statringPosition, destinationPosition);
        this.setPositionToElement(statringPosition);
        wrapper.appendChild(sharedElement);
        setTimeout(() => this.setPositionToElement(destinationPosition), 0);
        setTimeout(() => this.cleanUpTransition(cleanUpTransition), duration);
    }

    render() {
        return (
            <Subscribe to={ [SharedTransitionContainer] }>
                { this.handleSharedTransition }
            </Subscribe>
        );
    }
}

export default SharedTransition;
