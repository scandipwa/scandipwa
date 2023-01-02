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

import { FieldType } from 'Component/Field/Field.config';
import { FieldReactEvents } from 'Component/Field/Field.type';
import Loader from 'Component/Loader';
import UploadIcon from 'Component/UploadIcon';
import { ReactElement } from 'Type/Common.type';

import { FieldFileComponentProps, FieldFileComponentState } from './FieldFile.type';

/**
 * Field File
 * @class FieldFile
 * @namespace Component/FieldFile/Component */
export class FieldFileComponent<
P extends Readonly<FieldFileComponentProps> = Readonly<FieldFileComponentProps>,
S extends FieldFileComponentState = FieldFileComponentState,
> extends PureComponent<P, S> {
    renderSubLabel(allowedTypes: string): ReactElement {
        return (
            <p block="FieldFile" elem="AllowedTypes">
                { __('Compatible file extensions to upload:') }
                <strong>{ ` ${allowedTypes}` }</strong>
            </p>
        );
    }

    renderFileLabel(): ReactElement {
        const {
            attr: { id = '', multiple = false } = {},
            fileName = '',
            isLoading = false,
            resetFieldValue,
        } = this.props;

        if (isLoading) {
            return <Loader isLoading />;
        }

        if (fileName) {
            return (
                <label htmlFor={ id }>
                    <p>{ fileName }</p>
                    <button onClick={ resetFieldValue as any }>
                    { __('Remove file') }
                    </button>
                </label>
            );
        }

        const dropLabel = multiple ? __('Drop files here or') : __('Drop file here or');
        const selectLabel = multiple ? __('Select files') : __('Select file');

        return (
            <label htmlFor={ id }>
                <UploadIcon />
                <p>{ dropLabel }</p>
                <span block="Field" elem="SelectFileBtn">{ selectLabel }</span>
            </label>
        );
    }

    render(): ReactElement {
        const {
            attr = {},
            attr: { accept = '' } = {},
            events = {},
            setRef,
        } = this.props;

        const allowedFieldTypes = (accept || '')
            .split(',')
            .map((type = '') => type.split('/').slice(-1)[0])
            .join(', ');

        return (
            <>
                <input
                  ref={ (elem) => setRef(elem) }
                  type={ FieldType.FILE }
                  // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
                  { ...attr }
                  // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
                  { ...events as FieldReactEvents<HTMLInputElement> }
                />
                { this.renderFileLabel() }
                { allowedFieldTypes.length > 0 && this.renderSubLabel(allowedFieldTypes) }
            </>
        );
    }
}

export default FieldFileComponent;
