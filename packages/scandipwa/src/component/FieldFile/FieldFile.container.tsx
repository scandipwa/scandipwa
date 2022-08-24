/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';

import FieldFile from './FieldFile.component';
import {
    FieldContainerPropsKeys,
    FieldFileComponentProps,
    FieldFileContainerFunctions,
    FieldFileContainerProps,
    FieldFileContainerState
} from './FieldFile.type';

/**
 * Field File
 * @class FieldFileContainer
 * @namespace Component/FieldFile/Container */
export class FieldFileContainer extends PureComponent<FieldFileContainerProps, FieldFileContainerState> {
    containerFunctions: FieldFileContainerFunctions = {
        setRef: this.setRef.bind(this)
    };

    state: FieldFileContainerState = {
        isLoading: false,
        fileName: ''
    };

    fieldRef: HTMLInputElement | null = null;

    setRef(elem: HTMLInputElement | null): void {
        const { setRef } = this.props;

        setRef(elem);

        if (elem && this.fieldRef !== elem) {
            this.fieldRef = elem;
        }
    }

    onChange(value: string): void {
        const { events: { onChange } = {}, validate } = this.props;

        if (this.fieldRef) {
            const { files } = this.fieldRef;

            this.setState({ isLoading: true });
            const { name } = files[0] || {};

            validate();

            if (!name) {
                this.setState({
                    fileName: '',
                    isLoading: false
                });

                return;
            }

            const reader = new FileReader();

            reader.onload = () => {
                this.setState({
                    fileName: name,
                    isLoading: false
                });

                if (this.fieldRef) {
                    this.fieldRef.fileData = JSON.stringify({
                        file_data: reader.result,
                        file_name: name
                    });
                }

                if (typeof onChange === 'function') {
                    onChange(value);
                }
            };
            reader.onerror = () => {
                // TODO: Add showNotification(NotificationType.ERROR, __('Failed to upload file'))
                this.setState({ fileName: '', isLoading: false });

                if (typeof onChange === 'function') {
                    onChange(value);
                }
            };
            reader.readAsDataURL(files[ 0 ]);
        }
    }

    containerProps(): Pick<FieldFileComponentProps, FieldContainerPropsKeys> {
        const {
            events,
            attr: {
                autoComplete,
                ...attr
            } = {},
            setRef,
            resetFieldValue
        } = this.props;
        const { fileName, isLoading } = this.state;

        return {
            attr,
            setRef,
            events: {
                ...events,
                onChange: this.onChange.bind(this)
            },
            resetFieldValue: resetFieldValue.bind(this, { setState: (val) => this.setState(val) }),
            fileName,
            isLoading
        };
    }

    render(): ReactElement {
        return (
            <FieldFile
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default FieldFileContainer;
