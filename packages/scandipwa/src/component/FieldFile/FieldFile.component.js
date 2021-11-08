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
import { PureComponent } from 'react';

import { FIELD_TYPE } from 'Component/Field/Field.config';
import Loader from 'Component/Loader';
import UploadIcon from 'Component/UploadIcon';
import { EventsType, FieldAttrType } from 'Type/Field.type';

/**
 * Field File
 * @class FieldFile
 * @namespace Component/FieldFile/Component */
export class FieldFile extends PureComponent {
    static propTypes = {
        attr: FieldAttrType.isRequired,
        events: EventsType.isRequired,
        setRef: PropTypes.func.isRequired,
        fileName: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    renderSubLabel(allowedTypes) {
        return (
            <p block="FieldFile" elem="AllowedTypes">
                { __('Compatible file extensions to upload:') }
                <strong>{ ` ${allowedTypes}` }</strong>
            </p>
        );
    }

    renderFileLabel() {
        const {
            attr: { id = '', multiple = false } = {},
            fileName = '',
            isLoading = false
        } = this.props;

        if (isLoading) {
            return <Loader isLoading />;
        }

        if (fileName) {
            return (
                <label htmlFor={ id }>
                    <p>{ fileName }</p>
                </label>
            );
        }

        const dropLabel = multiple ? __('Drop files here or') : __('Drop file here or');
        const selectLabel = multiple ? __('Select files') : __('Select file');

        return (
            <label htmlFor={ id }>
                <UploadIcon />
                <p>{ dropLabel }</p>
                <span>{ selectLabel }</span>
            </label>
        );
    }

    render() {
        const {
            attr = {},
            attr: { accept = '' } = {},
            events = {},
            setRef
        } = this.props;

        const allowedFieldTypes = (accept || '')
            .split(',')
            .map((type = '') => type.split('/').slice(-1)[0])
            .join(', ');

        return (
            <>
                <input
                  ref={ (elem) => setRef(elem) }
                  type={ FIELD_TYPE.file }
                  // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
                  { ...attr }
                  // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
                  { ...events }
                />
                { this.renderFileLabel() }
                { allowedFieldTypes.length > 0 && this.renderSubLabel(allowedFieldTypes) }
            </>
        );
    }
}

export default FieldFile;
