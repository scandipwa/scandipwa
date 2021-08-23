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

import FieldFile from './FieldFile.component';

export class FieldFileContainer extends PureComponent {
    static propTypes = {
        // Field attributes
        attr: PropTypes.object.isRequired,
        events: PropTypes.object.isRequired,
        setRef: PropTypes.func.isRequired
    };

    containerFunctions = {
        setRef: this.setRef.bind(this)
    }

    state = {
        isLoading: false,
        fileName: '',
        value: ''
    }

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

            const name = files[0].name;
            const reader = new FileReader();
            reader.onload = () => {
                this.setState({
                    fileName: name,
                    isLoading: false,
                    value: reader.result
                });
                this.fieldRef.fileData = reader.result;
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
            }
            reader.readAsDataURL(files[0]);
        }
    }

    containerProps() {
        const { events } = this.props;

        return {
            ...this.props,
            events: {
                ...events,
                onChange: this.onChange.bind(this)
            },
            ...this.state
        }
    }

    render() {
        return <FieldFile
            { ...this.containerProps() }
            { ...this.containerFunctions }
        />
    }
}

export default FieldFileContainer;
