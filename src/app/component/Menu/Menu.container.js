import { connect } from 'react-redux';
import Menu from './Menu.component';

const mapStateToProps = state => ({
    menu: state.HeaderAndFooterReducer.menu
});

const MenuContainer = connect(mapStateToProps)(Menu);

export default MenuContainer;
