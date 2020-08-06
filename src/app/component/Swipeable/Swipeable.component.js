import './Swipeable.style';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import CSS from 'Util/CSS';

import {
    AUTO_MOVE_THRESHOLD_PERC,
    PERCENT,
    PERCENT_OFFSET,
    TRANSITION_CSS
} from './Swipeable.config';

export class Swipeable extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,

        onRightSwipe: PropTypes.func,
        rightSwipeText: PropTypes.string,

        onLeftSwipe: PropTypes.func,
        leftSwipeText: PropTypes.string
    };

    static defaultProps = {
        onRightSwipe: null,
        rightSwipeText: '',
        onLeftSwipe: null,
        leftSwipeText: ''
    };

    constructor(props) {
        super(props);

        this.swipeObjRef = React.createRef();
        this.leftChild = React.createRef();
        this.rightChild = React.createRef();

        this.startX = null;
        this.deltaX = null;
        this.storedOffset = 0;
        this.elemWidth = null;
    }

    componentDidMount() {
        CSS.setVariable(this.swipeObjRef, 'transitionCss', 'none');
        CSS.setVariable(this.swipeObjRef, 'translateX', '-100%');
    }

    onTouchStart = (e) => {
        this.startX = e.touches[0].pageX;

        if (this.storedOffset !== 0) {
            this.startX -= this.storedOffset;
        }
        this.storedOffset = 0;

        this.elemWidth = this.swipeObjRef.current.getBoundingClientRect().width;

        CSS.setVariable(this.swipeObjRef, 'transitionCss', 'none');
    };

    getDeltaXPercent() {
        return (this.deltaX / this.elemWidth) * PERCENT;
    }

    onTouchMove = (e) => {
        const {
            rightSwipeText,
            leftSwipeText
        } = this.props;

        this.deltaX = e.touches[0].pageX - this.startX;

        if (!rightSwipeText && this.deltaX > 0) {
            this.deltaX = 0;
        }

        if (!leftSwipeText && this.deltaX < 0) {
            this.deltaX = 0;
        }

        const realTranformPerc = PERCENT_OFFSET + this.getDeltaXPercent();

        CSS.setVariable(this.swipeObjRef, 'translateX', `${ realTranformPerc }%`);
    };

    onTouchEnd = () => {
        const deltaXPerc = this.getDeltaXPercent();
        CSS.setVariable(this.swipeObjRef, 'transitionCss', TRANSITION_CSS);

        const {
            onLeftSwipe,
            onRightSwipe
        } = this.props;

        // left panel (swipe right)
        if (deltaXPerc > AUTO_MOVE_THRESHOLD_PERC) {
            CSS.setVariable(this.swipeObjRef, 'translateX', '0%');

            if (onRightSwipe) {
                onRightSwipe();
            }

            return;
        }

        const leftChildWidth = parseFloat(
            window.getComputedStyle(this.leftChild.current).getPropertyValue('width').split('px')[0]
        );

        if (this.deltaX > leftChildWidth) {
            this.storedOffset = leftChildWidth;
            CSS.setVariable(this.swipeObjRef, 'translateX', `calc(-100% + ${leftChildWidth}px)`);
            return;
        }

        // right panel (swipe left)
        if (deltaXPerc < -AUTO_MOVE_THRESHOLD_PERC) {
            CSS.setVariable(this.swipeObjRef, 'translateX', '-200%');

            if (onLeftSwipe) {
                onLeftSwipe();
            }

            return;
        }

        const rightChildWidth = parseFloat(
            window.getComputedStyle(this.rightChild.current).getPropertyValue('width').split('px')[0]
        );

        if (this.deltaX < -rightChildWidth) {
            this.storedOffset = -rightChildWidth;
            CSS.setVariable(this.swipeObjRef, 'translateX', `calc(-100% - ${rightChildWidth}px)`);
            return;
        }

        CSS.setVariable(this.swipeObjRef, 'translateX', '-100%');
    };

    getMainPanel = () => {
        const {
            children
        } = this.props;

        return (
            <div block="Swipeable" elem="Panel">
                { children }
            </div>
        );
    };

    getSwipeActionPanel = (posText, refElem, swipeText, onSwipe) => (
        <div
          mix={ {
              block: 'Swipeable',
              elem: 'Panel',
              mods: {
                  pos: posText
              }
          } }
        >
            <div ref={ refElem } block="Swipeable" elem="ChildPanelContainer">
                <button block="Swipeable" elem="SwipeActionButton" onClick={ onSwipe }>
                    { swipeText }
                </button>
            </div>
        </div>
    );

    render() {
        const {
            onRightSwipe,
            rightSwipeText,
            onLeftSwipe,
            leftSwipeText
        } = this.props;

        return (
            <div block="Swipeable">
                <div
                  block="Swipeable"
                  elem="Container"
                  ref={ this.swipeObjRef }
                  onTouchStart={ this.onTouchStart }
                  onTouchMove={ this.onTouchMove }
                  onTouchEnd={ this.onTouchEnd }
                >
                    { this.getSwipeActionPanel('left', this.leftChild, rightSwipeText, onRightSwipe) }

                    { this.getMainPanel() }

                    { this.getSwipeActionPanel('right', this.rightChild, leftSwipeText, onLeftSwipe) }
                </div>
            </div>
        );
    }
}

export default Swipeable;
