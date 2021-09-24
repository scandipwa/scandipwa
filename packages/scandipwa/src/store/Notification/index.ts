import { useDispatch } from 'react-redux';

import { hideNotification, showNotification } from './Notification.action';

export const useNotificationStore = () => {
    const dispatch = useDispatch();

    return {
        showNotification(messageType: string, messageText: string, debug?: string) {
            dispatch(showNotification(messageType, messageText, debug));
        },
        hideNotification(id: number) {
            dispatch(hideNotification(id));
        }
    };
};
