import i18n from '../util/i18n';

/** Initialize the i18n plugin on app start */
const componentDidMount = (args, callback, instance) => {
    i18n.init(instance.forceUpdate.bind(instance));

    return callback(...args);
};

/** Ensure full application remount on locale change */
const render = (args, callback) => {
    const currentLocale = i18n.getCurrentLocale();

    return (
        <div
          block="LocalizationWrapper"
          elem={ currentLocale }
          key={ currentLocale }
        >
            { callback(...args) }
        </div>
    )
}

export default {
    'Component/App/Component': {
        'member-function': {
            componentDidMount,
            render
        }
    }
};
