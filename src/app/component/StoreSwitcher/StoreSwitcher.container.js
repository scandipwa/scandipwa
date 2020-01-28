/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DataContainer from 'Util/Request/DataContainer';
import { showNotification } from 'Store/Notification';
import ConfigQuery from 'Query/Config.query';

import StoreSwitcher from './StoreSwitcher.component';

export const mapStateToProps = state => ({
    currentStoreCode: state.ConfigReducer.code
});

export const mapDispatchToProps = dispatch => ({
    showErrorNotification: message => dispatch(showNotification('error', message))
});

export class StoreSwitcherContainer extends DataContainer {
    static propTypes = {
        showErrorNotification: PropTypes.func.isRequired,
        currentStoreCode: PropTypes.string
    };

    static defaultProps = {
        currentStoreCode: 'default'
    };

    state = {
        storeList: []
    };

    containerFunctions = {
        handleStoreSelect: this._handleStoreSelect.bind(this)
    };

    componentDidMount() {
        this._getStoreList();
    }

    containerProps = () => {
        const { currentStoreCode } = this.props;
        return { currentStoreCode };
    };

    _getStoreList() {
        this.fetchData(
            [ConfigQuery.getStoreListField()],
            ({ storeList }) => this.setState({
                storeList: this._formatStoreList(storeList)
            })
        );
    }

    _formatStoreList(storeList) {
        return storeList.reduce((acc, {
            name, code, is_active, base_url
        }) => {
            if (!is_active) return acc;

            return [
                ...acc,
                {
                    id: `store_${ code }`,
                    value: code,
                    storeUrl: base_url,
                    label: name
                }
            ];
        }, []);
    }

    _handleStoreSelect(storeCode) {
        const { showErrorNotification } = this.props;
        const { storeList } = this.state;

        const store = storeList.find(
            ({ value }) => value === storeCode
        );

        if (!store) {
            showErrorNotification(__('This store can not be opened!'));
            return;
        }

        window.location = store.storeUrl;
    }

    render() {
        return (
            <StoreSwitcher
              { ...this.containerFunctions }
              { ...this.containerProps() }
              { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreSwitcherContainer);
