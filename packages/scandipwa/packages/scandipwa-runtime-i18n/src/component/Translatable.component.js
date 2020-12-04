import PropTypes from 'prop-types';

import { I18nContext } from '../context/I18n.provider';

export class Translatable extends React.PureComponent {
    static propTypes = {
        string: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(PropTypes.oneOf([
            PropTypes.string,
            PropTypes.number
        ]))
    };

    static defaultProps = {
        values: []
    };

    static contextType = I18nContext;

    injectValues(string, ...values) {
        // eslint-disable-next-line fp/no-let
        let i = 0;
        return string.replace(/%s/g, () => values[i++]);
    }

    render() {
        const { string, values } = this.props;
        const {
            currentLocalization: {
                [string]: translatedString
            }
        } = this.context;

        return this.injectValues(translatedString || string, ...values);
    }
}

export default Translatable;