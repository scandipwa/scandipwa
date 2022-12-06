import PlaceholderQuery from 'Query/Placeholder.query';
import { showNotification } from 'Store/Notification/Notification.action';
// TODO update this import when action is done
import { action } from 'Store/Placeholder/Placeholder.action';
import { QueryDispatcher } from 'Util/Request';

export class PlaceholderDispatcher extends QueryDispatcher {
    constructor() {
        super('Placeholder');
    }

    onSuccess(data, dispatch, options) {
        // TODO implement state update
        // dispatch(action(data));
    }

    onError(error, dispatch, options) {
        dispatch(showNotification('error', 'Error fetching Placeholder!', error));
    }

    prepareRequest(options) {
        // TODO implement query retrieval
        // return PlaceholderQuery.getQuery(options);
    }
}

export default new PlaceholderDispatcher();
