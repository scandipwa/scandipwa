import { updateNoMatch } from 'Store/NoMatch';
/**
 * NoMatch Dispatcher
 * @class NoMatchDispatcher
 */
class NoMatchDispatcher {
    updateNoMatch(dispatch, options) {
        const { noMatch } = options;
        dispatch(updateNoMatch(noMatch));
    }
}

export default new NoMatchDispatcher();
