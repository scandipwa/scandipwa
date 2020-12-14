import i18n from '../../util/i18n';

/** @namespace RuntimeI18n/Component/I18n/Component/I18nComponent */
export class I18nComponent extends PureComponent {
    componentDidMount() {
        i18n.init(this.forceUpdate.bind(this));
    }

    render() {
        const { children } = this.props;
        const currentLocale = i18n.getCurrentLocale();

        return (
            <div
              block="LocalizationWrapper"
              elem={ currentLocale }
              key={ currentLocale }
            >
                { children }
            </div>
        )
    }
}

export default I18nComponent;