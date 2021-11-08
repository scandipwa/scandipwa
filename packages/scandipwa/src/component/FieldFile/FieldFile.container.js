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

import { EventsType, FieldAttrType } from 'Type/Field.type';

import FieldFile from './FieldFile.component';

/**
 * Field File
 * @class FieldFileContainer
 * @namespace Component/FieldFile/Container */
export class FieldFileContainer extends PureComponent {
    static propTypes = {
        // Field attributes
        attr: FieldAttrType.isRequired,
        events: EventsType.isRequired,
        setRef: PropTypes.func.isRequired
    };

    containerFunctions = {
        setRef: this.setRef.bind(this)
    };

    state = {
        isLoading: false,
        fileName: '',
        value: ''
    };

    fieldRef = createRef();

    setRef(elem) {
        const { setRef } = this.props;
        setRef(elem);

        if (elem && this.fieldRef !== elem) {
            this.fieldRef = elem;
        }
    }

    onChange(value) {
        const { events: { onChange } = {} } = this.props;

        if (this.fieldRef) {
            const { files } = this.fieldRef;
            this.setState({ isLoading: true });

            const { name } = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.setState({
                    fileName: name,
                    isLoading: false,
                    value: reader.result
                });
                this.fieldRef.fileData = JSON.stringify({
                    file_data: reader.result,
                    file_name: name
                });

                if (typeof onChange === 'function') {
                    onChange(value);
                }
            };
            reader.onerror = () => {
                // TODO: Add showNotification('error', __('Failed to upload file'))
                this.setState({ fileName: '', isLoading: false });

                if (typeof onChange === 'function') {
                    onChange(value);
                }
            };
            reader.readAsDataURL(files[0]);
        }
    }

    containerProps() {
        const {
            events,
            attr: {
                autoComplete,
                autocomplete,
                ...attr
            } = {},
            setRef
        } = this.props;
        const { fileName, isLoading, value } = this.state;

        return {
            attr: {
                ...attr,
                autoComplete: autoComplete || autocomplete
            },
            setRef,
            events: {
                ...events,
                onChange: this.onChange.bind(this)
            },
            fileName,
            isLoading,
            value
        };
    }

    render() {
        return (
            <FieldFile
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default FieldFileContainer;
