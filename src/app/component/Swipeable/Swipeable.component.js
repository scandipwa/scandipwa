import './Swipeable.style';

import PropTypes from 'prop-types';
import React from 'react';

const THRESHOLD_PERC = 50;
const TRANSITION_CSS = 'transition: transform 0.15s linear;';
const PERCENT = 100;

export class Swipeable extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        onRightSwipe: PropTypes.func.isRequired,
        rightSwipeText: PropTypes.string.isRequired
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

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    onTouchStart(e) {
        this.startX = e.touches[0].pageX;

        if (this.storedOffset !== 0) {
            this.startX -= this.storedOffset;
        }
        this.storedOffset = 0;

        this.elemWidth = this.swipeObjRef.current.getBoundingClientRect().width;

        this.swipeObjRef.current.style = `transition: none 0; transform: ${this.swipeObjRef.current.style.transform}`;
    }

    getDeltaXPercent() {
        return (this.deltaX / this.elemWidth) * PERCENT;
    }

    onTouchMove(e) {
        this.deltaX = e.touches[0].pageX - this.startX;
        if (this.deltaX > 0) {
            this.deltaX = 0;
        }

        this.swipeObjRef.current.style.transform = `translateX( ${ this.getDeltaXPercent() }% )`;
    }

    onTouchEnd() {
        const deltaXPerc = this.getDeltaXPercent();

        // right panel (swipe left)
        if (deltaXPerc < -THRESHOLD_PERC) {
            this.swipeObjRef.current.style = `${TRANSITION_CSS} transform: translateX(-100%);`;

            const { onRightSwipe } = this.props;
            onRightSwipe();
            return;
        }

        const rightChildWidth = parseFloat(
            window.getComputedStyle(this.rightChild.current).getPropertyValue('width').split('px')[0]
        );

        if (this.deltaX < -rightChildWidth) {
            this.storedOffset = -rightChildWidth;

            this.swipeObjRef.current.style = `${TRANSITION_CSS} transform: translateX(-${rightChildWidth}px);`;
            return;
        }

        this.swipeObjRef.current.style = `${TRANSITION_CSS} transform: translateX(0%);`;
    }

    render() {
        const {
            children,
            onRightSwipe,
            rightSwipeText
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
                    <div block="Swipeable" elem="Panel">
                        { children }
                    </div>

                    <div
                      mix={ {
                          block: 'Swipeable',
                          elem: 'Panel',
                          mods: { pos: 'right' }
                      } }
                    >
                        <div ref={ this.rightChild } block="Swipeable" elem="ChildPanelContainer">
                            <button onClick={ onRightSwipe }>
                                { rightSwipeText }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Swipeable;
