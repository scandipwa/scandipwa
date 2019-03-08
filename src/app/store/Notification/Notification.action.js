export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

/**
 * Show notification (append to notification to global notification map).
 * @param  {String} msgType
 * @param  {String} msgText
 * @param  {any} msgDebug
 * @return {void}
 */
const showNotification = (msgType, msgText, msgDebug) => ({
    type: SHOW_NOTIFICATION,
    msgType,
    msgText,
    msgDebug
});

/**
 * Hide notification with specific id (drop notification from global list).
 * @param  {number} id
 * @return {void}
 */
const hideNotification = id => ({
    type: HIDE_NOTIFICATION,
    id
});

export {
    showNotification,
    hideNotification
};
