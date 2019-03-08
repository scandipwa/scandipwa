import { connect } from 'react-redux';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import NoMatch from './NoMatch.component';

const mapDispatchToProps = dispatch => ({
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.update(breadcrumbs, dispatch);
    }
});

const NoMatchContainer = connect(null, mapDispatchToProps)(NoMatch);

export default NoMatchContainer;
