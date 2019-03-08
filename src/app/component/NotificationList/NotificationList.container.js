import { connect } from 'react-redux';
import { hideNotification } from 'Store/Notification';
import NotificationList from './NotificationList.component';

const mapStateToProps = state => ({
    notifications: state.NotificationReducer.notifications
});

const mapDispatchToProps = dispatch => ({
    onHideNotification: (id) => {
        dispatch(hideNotification(id));
    }
});

const NotificationListContainer = connect(mapStateToProps, mapDispatchToProps)(NotificationList);

export default NotificationListContainer;
