import { connect } from 'react-redux';
import Breadcrumbs from './Breadcrumbs.component';

const mapStateToProps = state => ({
    breadcrumbs: state.BreadcrumbsReducer.breadcrumbs,
    areBreadcrumbsVisible: state.BreadcrumbsReducer.areBreadcrumbsVisible
});

const BreadcrumbsContainer = connect(mapStateToProps)(Breadcrumbs);

export default BreadcrumbsContainer;
