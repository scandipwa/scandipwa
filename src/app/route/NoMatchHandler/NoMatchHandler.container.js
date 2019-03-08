import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NoMatchDispatcher } from 'Store/NoMatch';
import NoMatchHandler from './NoMatchHandler.component';

const mapStateToProps = state => ({
    noMatch: state.NoMatchReducer.noMatch
});

const mapDispatchToProps = dispatch => ({
    updateNoMatch: (options) => {
        NoMatchDispatcher.updateNoMatch(dispatch, options);
    }
});

const NoMatchHandlerContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(NoMatchHandler));

export default NoMatchHandlerContainer;
