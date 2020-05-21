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

import { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formatCurrency } from 'Util/Price';
import ProductCustomizableOptions from './ProductCustomizableOptions.component';

export const fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
});

export const encodeFormFiles = async filesFromForm => Object.values(filesFromForm).reduce(
    async (previousPromise, file) => {
        const acc = await previousPromise;
        acc.push({ encoded_file: await fileToBase64(file) });

        return acc;
    }, Promise.resolve([])
);

export class ProductCustomizableOptionsContainer extends PureComponent {
    static propTypes = {
        options: PropTypes.array,
        getRequiredCustomizableOptions: PropTypes.func.isRequired,
        getSelectedCustomizableOptions: PropTypes.func.isRequired
    };

    static defaultProps = {
        options: []
    };

    state = {
        isLoading: true,
        selectedCheckboxValues: [],
        selectedDropdownOptions: [],
        selectedFieldValue: [],
        selectedAreaValue: [],
        files: []
    };

    containerFunctions = {
        setCustomizableOptionFieldValue: this.setCustomizableOptionFieldValue.bind(this),
        setCustomizableOptionAreaValue: this.setCustomizableOptionAreaValue.bind(this),
        setSelectedDropdownValue: this.setSelectedDropdownValue.bind(this),
        getDropdownOptions: this.getDropdownOptions.bind(this),
        setSelectedCheckboxValues: this.setSelectedCheckboxValues.bind(this),
        handleAttachFile: this.onFileAttach.bind(this),
        handleRemoveFile: this.handleRemoveFile.bind(this)
    };

    constructor(props) {
        super(props);

        this.fileFormRef = createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        const { options } = this.props;
        const { options: prevOptions } = prevProps;
        const {
            selectedCheckboxValues,
            selectedDropdownOptions,
            selectedFieldValue,
            selectedAreaValue,
            files
        } = this.state;
        const {
            selectedCheckboxValues: prevSelectedCheckboxValues,
            selectedDropdownOptions: prevSelectedDropdownOptions,
            selectedFieldValue: prevFieldValue,
            selectedAreaValue: prevAreaValue,
            files: prevFiles
        } = prevState;

        if (options) {
            this.stopLoading();
        }

        if (options !== prevOptions) {
            this.getRequiredOptionsData(options);
        }

        if (selectedCheckboxValues !== prevSelectedCheckboxValues) {
            this.updateSelectedOptionsArray();
        }

        if (selectedFieldValue !== prevFieldValue
            || selectedAreaValue !== prevAreaValue
            || files !== prevFiles
            || selectedDropdownOptions !== prevSelectedDropdownOptions
        ) {
            this.updateSelectedOptions();
        }
    }

    containerProps = () => ({
        fileFormRef: this.fileFormRef
    });

    stopLoading() {
        this.setState({ isLoading: false });
    }

    async updateSelectedOptionsArray() {
        const { getSelectedCustomizableOptions } = this.props;
        const { selectedCheckboxValues } = this.state;
        const customizable_options = [];

        if (selectedCheckboxValues.length) {
            selectedCheckboxValues.map(item => customizable_options.push(item));
        }

        getSelectedCustomizableOptions(customizable_options, true);
    }

    async updateSelectedOptions() {
        const { getSelectedCustomizableOptions } = this.props;
        const {
            selectedDropdownOptions,
            selectedFieldValue,
            selectedAreaValue,
            files
        } = this.state;
        const customizable_options = [];

        if (selectedFieldValue.length) {
            selectedFieldValue.map(item => customizable_options.push(item));
        }

        if (selectedAreaValue.length) {
            selectedAreaValue.map(item => customizable_options.push(item));
        }

        if (selectedDropdownOptions.length) {
            selectedDropdownOptions.map(item => customizable_options.push(item));
        }

        if (files.length) {
            // const tests = await encodeFormFiles(newFiles);
            // const { encoded_file } = tests[0];
            files.map(item => customizable_options.push(item));
        }

        getSelectedCustomizableOptions(customizable_options);
    }

    getRequiredOptionsData(options) {
        const { getRequiredCustomizableOptions } = this.props;
        const optionData = [];

        options.map(({ option_id, required }) => {
            if (required) {
                return optionData.push({ option_id });
            }

            return null;
        });

        getRequiredCustomizableOptions(optionData);
    }

    setCustomizableOptionFieldValue(option_id, option_value) {
        if (option_value) {
            this.setState({ selectedFieldValue: [{ option_id, option_value }] });
        } else {
            this.setState({ selectedFieldValue: [] });
        }
    }

    setCustomizableOptionAreaValue(option_id, option_value) {
        if (option_value) {
            this.setState({ selectedAreaValue: [{ option_id, option_value }] });
        } else {
            this.setState({ selectedAreaValue: [] });
        }
    }

    setSelectedCheckboxValues(option_id, option_value) {
        const { selectedCheckboxValues } = this.state;
        const selectedValue = { option_id, option_value };

        if (selectedCheckboxValues.some(item => option_value === item.option_value)) {
            this.setState({
                selectedCheckboxValues: selectedCheckboxValues.filter(value => value.option_value !== option_value)
            });
        } else {
            this.setState({
                selectedCheckboxValues: [...selectedCheckboxValues, selectedValue]
            });
        }
    }

    setSelectedDropdownValue(value, option_id) {
        const { options } = this.props;
        const optionData = [];

        options.map(({ dropdownValues }) => {
            if (dropdownValues) {
                dropdownValues.map(({ option_type_id: option_value, price }) => {
                    if (price === value) {
                        return optionData.push({ option_id, option_value });
                    }

                    return null;
                });

                this.setState({ selectedDropdownOptions: optionData });
            }

            return null;
        });
    }

    getDropdownOptions(values) {
        const data = [];

        data.push({
            id: 0,
            name: 'Choose Option',
            value: 0,
            label: 'Choose Option'
        });

        values.map(({ option_type_id, title, price }) => {
            data.push({
                id: option_type_id,
                name: title,
                value: price,
                label: `${ title } + `,
                labelBold: `${ formatCurrency() }${ price }`
            });
        });

        return data;
    }

    async onFileAttach(option_id) {
        const { files } = this.state;
        const filesFromForm = this.fileFormRef.current.files || [];
        const { max_file_size, showNotification } = this.props;
        const oldFiles = [].concat(files);

        const newFiles = Object.values(filesFromForm).reduce(
            /** @param acc
             * @param {File} file */
            (acc, file) => {
                // Handle file size more than max allowed
                // But first transform from b to Kb
                if (file.size / 1024 > max_file_size) {
                    showNotification('error', __(
                        'File %s has exceeded the maximum file size limit of %s KB',
                        file.name,
                        max_file_size
                    ));

                    return acc;
                }

                acc.push(file);
                return acc;
            }, oldFiles
        );

        const tests = await encodeFormFiles(newFiles);
        const { encoded_file } = tests[0];

        this.setState(() => ({ files: [{ option_id, extension_files: encoded_file }] }));
        // this.setState(() => ({ files: filesData }));
    }

    handleRemoveFile(name) {
        const { files } = this.state;

        const newFiles = files.reduce(
            (acc, file) => {
                if (file.name !== name) {
                    acc.push(file);
                }

                return acc;
            }, []
        );

        this.setState(() => ({ files: newFiles }));
    }

    render() {
        return (
            <ProductCustomizableOptions
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(null)(ProductCustomizableOptionsContainer);
