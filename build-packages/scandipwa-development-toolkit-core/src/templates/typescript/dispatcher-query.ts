import { Query } from '@tilework/opus';
import { Dispatch } from 'redux';

import PlaceholderQuery from 'Query/Placeholder.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
// TODO update this import when action is done
import { action } from 'Store/Placeholder/Placeholder.action';
import { NetworkError } from 'Type/Common.type';
import { QueryDispatcher } from 'Util/Request';

import { PlaceholderDispatcherData } from './Placeholder.type';

export class PlaceholderDispatcher extends QueryDispatcher<string, PlaceholderDispatcherData> {
    __construct() {
        super.__construct('Placeholder');
    }

    onSuccess(data: PlaceholderDispatcherData, dispatch: Dispatch, options: unknown): void {
        // TODO implement state update
        dispatch(action(data));
    }

    onError(error: NetworkError | NetworkError[], dispatch: Dispatch, options: unknown): void {
        dispatch(showNotification(NotificationType.ERROR, 'Error fetching Placeholder!', error));
    }

    prepareRequest(options: unknown): Query<'', unknown> {
        // TODO implement query retrieval
        // return PlaceholderQuery.getQuery(options);
    }
}

export default new PlaceholderDispatcher();
