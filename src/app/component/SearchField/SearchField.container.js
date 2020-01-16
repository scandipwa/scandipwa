import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SearchField from './SearchField.component';

class SearchFieldContainer extends PureComponent {
    static propTypes = {
        // TODO: implement prop-types
    };

    containerFunctions = {
        // getData: this.getData.bind(this)
    };

    containerProps = () => {
        // isDisabled: this._getIsDisabled()
    };

    render() {
        return (
            <SearchField
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default SearchFieldContainer;
