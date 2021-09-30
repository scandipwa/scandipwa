import I18nComponent from '../component/I18n';

import '../util/propTypesFix';

/** Ensure full application remount on locale change */
const render = (args, callback) => (
    <I18nComponent>
        { callback(...args) }
    </I18nComponent>
);

export default {
    'Component/App/Component': {
        'member-function': {
            render
        }
    }
};
