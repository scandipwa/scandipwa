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
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { updateMeta } from 'Store/Meta/Meta.action';
import { ReactElement } from 'Type/Common.type';

import SomethingWentWrong from './SomethingWentWrong.component';
import {
    SomethingWentWrongComponentProps,
    SomethingWentWrongContainerMapDispatchProps,
    SomethingWentWrongContainerMapStateToProps,
    SomethingWentWrongContainerProps,
    SomethingWentWrongContainerPropsKeys,
} from './SomethingWentWrong.type';

/** @namespace Route/SomethingWentWrong/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): SomethingWentWrongContainerMapDispatchProps => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
});

/** @namespace Route/SomethingWentWrong/Container */
export class SomethingWentWrongContainer<
P extends Readonly<SomethingWentWrongContainerProps> = Readonly<SomethingWentWrongContainerProps>,
S extends SomethingWentWrongContainerState = SomethingWentWrongContainerState,
> extends PureComponent<P, S> {
    componentDidMount(): void {
        const { updateMeta } = this.props;

        updateMeta({ title: __('Something went wrong!') });
    }

    containerProps(): Pick<SomethingWentWrongComponentProps, SomethingWentWrongContainerPropsKeys> {
        const { onClick, errorDetails } = this.props;

        return { onClick, errorDetails };
    }

    render(): ReactElement {
        return (
            <SomethingWentWrong
              { ...this.containerProps() }
            />
        );
    }
}

/** @namespace Route/SomethingWentWrong/Container/mapStateToProps */
export const mapStateToProps = (): SomethingWentWrongContainerMapStateToProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SomethingWentWrongContainer);
