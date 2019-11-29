import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Field from 'Component/Field';

import './StoreSwitcher.style';

class StoreSwitcher extends PureComponent {
    static propTypes = {
        storeList: PropTypes.arrayOf(
            PropTypes.objectOf(
                PropTypes.string
            )
        ).isRequired,
        currentStoreCode: PropTypes.string.isRequired,
        handleStoreSelect: PropTypes.func.isRequired
    };

    render() {
        const {
            storeList,
            handleStoreSelect,
            currentStoreCode
        } = this.props;

        if (storeList.length <= 1) return null;

        return (
            <div block="StoreSwitcher">
                <Field
                  id="StoreSwitcher"
                  name="StoreSwitcher"
                  type="select"
                  label={ __('Current store:') }
                  placeholder={ __('Select store') }
                  selectOptions={ storeList }
                  value={ currentStoreCode }
                  onChange={ handleStoreSelect }
                />
            </div>
        );
    }
}

export default StoreSwitcher;
