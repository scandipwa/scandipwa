import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import i18n from '../../util/i18n';

/** @namespace RuntimeI18n/Component/I18n/Component/I18nComponent */
export class I18nComponent extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    constructor(props) {
        super(props);

        i18n.init(this.forceUpdate.bind(this));
    }

    render() {
        const { children } = this.props;
        const currentLocale = i18n.getCurrentLocale();

        // Do not render anything while the translation is loading
        if (i18n.isLoading) {
            return null;
        }

        // Remount the application on locale change
        return (
            <div
              block="LocalizationWrapper"
              elem={ currentLocale }
              key={ currentLocale }
            >
                { children }
            </div>
        );
    }
}

export default I18nComponent;
