/* eslint-disable */
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
import { createRef, PureComponent } from 'react';

import FieldSelect from './FieldSelect.component';
import { KEY_CODE } from 'Config/Keyboard.config';

export class FieldSelectContainer extends PureComponent {
    static propTypes = {
        // Field attributes
        attr: PropTypes.object.isRequired,
        events: PropTypes.object.isRequired,
        options: PropTypes.array.isRequired,
        setRef: PropTypes.func.isRequired,
        isDisabled: PropTypes.bool.isRequired
    };

    state = {
        valueIndex: -1,
        searchString: '',
        isExpanded: false
    };

    containerFunctions = {
        handleSelectExpand: this.handleSelectExpand.bind(this),
        handleSelectExpandedExpand: this.handleSelectExpandedExpand.bind(this),
        handleSelectListOptionClick: this.handleSelectListOptionClick.bind(this),
        handleSelectListKeyPress: this.handleSelectListKeyPress.bind(this),
        setRef: this.setRef.bind(this)
    }

    fieldRef = createRef();

    static getDerivedStateFromProps(props, state) {
        const { attr: { isExpanded } = {} } = props
        const { isExpanded: stateIsExpanded } = state;

        return { isExpanded: isExpanded || stateIsExpanded };
    }

    setRef(elem) {
        const { setRef } = this.props;
        setRef(elem);

        if (elem && this.fieldRef !== elem) {
            this.fieldRef = elem;
        }
    }

    getOptions() {
        const {
            options,
            attr: {
                id = 'select',
                selectPlaceholder = __('Select item...')
            } = {}
        } = this.props;

        return [
            {
                id: `${id}-placeholder`,
                name: `${id}-placeholder`,
                label: selectPlaceholder,
                value: '',
                sort_order: -100,
                isPlaceholder: true
            },
            ...options
        ]
    }

    handleSelectListOptionClick({ value }) {
        const { events: { onChange } = {} } = this.props;

        this.fieldRef.value = value;
        console.log(['field', value]);

        if (onChange) {
            onChange(value);
        }
    }

    isSelectDisabled() {
        const { options } = this.props;

        return options.length === 0;
    }

    handleSelectExpand() {
        if (!this.isSelectDisabled()) {
            this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }));
        }
    }

    handleSelectExpandedExpand() {
        const { isSelectExpanded } = this.state;

        if (isSelectExpanded) {
            this.handleSelectExpand();
        }
    }

    _getSelectedValueIndex(keyCode) {
        const { options } = this.props;
        const {
            searchString: prevSearchString,
            valueIndex: prevValueIndex
        } = this.state;

        const pressedKeyValue = String.fromCharCode(keyCode).toLowerCase();

        const searchString = (prevSearchString[prevSearchString.length - 1] !== pressedKeyValue)
            ? `${prevSearchString}${pressedKeyValue}`
            : pressedKeyValue;

        const nextValueIndex = options.findIndex(({ label }, i) => (
            label && label.toLowerCase().startsWith(searchString) && (
                i > prevValueIndex || prevSearchString !== searchString
            )
        ));

        if (nextValueIndex !== -1) {
            return { searchString, valueIndex: nextValueIndex };
        }

        // if no items were found, take only the latest letter of the search string
        const newSearchString = searchString[searchString.length - 1];

        const newValueIndex = options.findIndex(({ label }) => (
            label && label.toLowerCase().startsWith(newSearchString)
        ));

        if (newValueIndex !== -1) {
            return { searchString: newSearchString, valueIndex: newValueIndex };
        }

        // if there are no items starting with this letter
        return {};
    }

    handleSelectListKeyPress(event) {
        const { isExpanded } = this.state;
        const {
            options,
            events: { onChange } = {},
            attr: { id: selectId = '' } = {}
        } = this.props;
        const keyCode = event.which || event.keycode;

        // on Enter pressed
        if (keyCode === KEY_CODE.enter) {
            this.handleSelectExpand();

            return;
        }

        if (!isExpanded
            || !keyCode
            || keyCode < KEY_CODE.A
            || keyCode > KEY_CODE.z
            || (keyCode > KEY_CODE.Z && keyCode < KEY_CODE.a)
        ) {
            return;
        }

        const { searchString, valueIndex } = this._getSelectedValueIndex(keyCode);

        // valueIndex can be 0, so !valueIndex === true
        if (!searchString || valueIndex === null) {
            return;
        }

        this.setState({ searchString, valueIndex }, () => {
            const { id, value } = options[valueIndex];
            // converting to string for avoiding the error with the first select option
            if (onChange) {
                onChange(value.toString());
            }

            const selectedElement = document.getElementById(`o${id}`);
            if (selectedElement) {
                selectedElement.focus();
            }
        });
    }

    containerProps() {
        return {
            ...this.props,
            ...this.state,
            options: this.getOptions()
        }
    }

    render() {
        return <FieldSelect
            { ...this.containerProps() }
            { ...this.containerFunctions }
        />
    }
}

export default FieldSelectContainer;
