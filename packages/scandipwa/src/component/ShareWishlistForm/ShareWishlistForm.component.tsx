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

import { FieldContainerProps } from 'Component/Field/Field.type';
import FieldForm from 'Component/FieldForm';
import { FormContainerProps } from 'Component/Form/Form.type';
import Loader from 'Component/Loader';
import { ReactElement } from 'Type/Common.type';
import { GQLShareWishlistInput } from 'Type/Graphql.type';
import { FieldData } from 'Util/Form/Form.type';
import transformToNameValuePair from 'Util/Form/Transform';

import shareWishlistForm from './ShareWishlistForm.form';
import { ShareWishlistFormComponentProps } from './ShareWishlistForm.type';

/** @namespace Component/ShareWishlistForm/Component */
export class ShareWishlistForm extends FieldForm<ShareWishlistFormComponentProps> {
    __construct(props: ShareWishlistFormComponentProps): void {
        super.__construct?.(props);

        this.onFormSuccess = this.onFormSuccess.bind(this);
    }

    fieldMap(): Partial<FieldContainerProps>[] {
        return shareWishlistForm();
    }

    async onFormSuccess(form: HTMLFormElement, fields: FieldData[]): Promise<void> {
        const { onSave } = this.props;

        await onSave(transformToNameValuePair<GQLShareWishlistInput>(fields));
    }

    renderActions(): ReactElement {
        const { isFormLoading } = this.props;

        return (
            <>
                { isFormLoading && <Loader isLoading /> }
                <button type="submit" block="Button">
                    { __('Share Wishlist') }
                </button>
            </>
        );
    }

    getFormProps(): Partial<FormContainerProps> {
        return {
            onSubmit: this.onFormSuccess
        };
    }
}

export default ShareWishlistForm;
