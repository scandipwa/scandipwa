import { Container } from 'unstated';

export const sharedTransitionInitialState = {
    sharedElementDestination: null,
    sharedElement: null,
    destinationPosition: {},
    startingPosition: {}
};

export class SharedTransitionContainer extends Container {
    state = sharedTransitionInitialState;

    _parseRectangle = val => JSON.parse(JSON.stringify(val));

    cleanUpTransition = () => {
        this.setState(sharedTransitionInitialState);
    };

    registerSharedElementDestination = ({ current }) => {
        if (current) {
            console.log('to');

            this.setState(({ sharedElementDestination }) => {
                if (sharedElementDestination) return {};

                return {
                    sharedElementDestination: current,
                    destinationPosition: this._parseRectangle(current.getBoundingClientRect())
                };
            });
        }
    };

    registerSharedElement = ({ current }) => {
        if (current) {
            console.log('from');
            const clone = current.cloneNode(true);

            this.setState({
                sharedElement: clone,
                sharedElementDestination: null,
                destinationPosition: {},
                startingPosition: this._parseRectangle(current.getBoundingClientRect())
            });
        }
    };
}

export default new SharedTransitionContainer();
