import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tabType } from 'Type/Account';
import './MyAccountTabListItem.style';

class MyAccountTabListItem extends PureComponent {
    static propTypes = {
        tabEntry: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                tabType
            ])
        ).isRequired,
        isActive: PropTypes.bool,
        changeActiveTab: PropTypes.func.isRequired
    };

    static defaultProps = {
        isActive: false
    };

    changeActiveTab = () => {
        const { changeActiveTab, tabEntry: [key] } = this.props;
        changeActiveTab(key);
    };

    render() {
        const { tabEntry: [, { name }], isActive } = this.props;

        return (
            <li
              block="MyAccountTabListItem"
              mods={ { isActive } }
            >
                <button
                  block="MyAccountTabListItem"
                  elem="Button"
                  onClick={ this.changeActiveTab }
                  role="link"
                >
                    { name }
                </button>
            </li>
        );
    }
}

export default MyAccountTabListItem;
