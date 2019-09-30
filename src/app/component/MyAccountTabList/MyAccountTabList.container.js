import { connect } from 'react-redux';
import { MyAccountDispatcher } from 'Store/MyAccount';
import MyAccountTabList from './MyAccountTabList.component';

export const mapDispatchToProps = dispatch => ({
    logout: () => MyAccountDispatcher.logout(null, dispatch)
});

export default connect(null, mapDispatchToProps)(MyAccountTabList);
