import { Dispatch } from 'redux';

// TODO update this import when renamed
import { action } from 'Store/Placeholder/Placeholder.action';

export class PlaceholderDispatcher {
    // TODO update payload type
    update(payload: unknown, dispatch: Dispatch): void {
        // TODO implement

        dispatch(action(payload));
    }
}

export default new PlaceholderDispatcher();
