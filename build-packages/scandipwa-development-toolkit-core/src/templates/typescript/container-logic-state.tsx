import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from 'Util/Store/Store.type';

import Placeholder from './Placeholder.component';
import {
    PlaceholderComponentProps,
    PlaceholderContainerFunctions,
    PlaceholderContainerMapDispatchProps,
    PlaceholderContainerMapStateProps,
    PlaceholderContainerProps,
    PlaceholderContainerPropsKeys,
} from './Placeholder.type';

export const mapStateToProps = (_state: RootState): PlaceholderContainerMapStateProps => ({
    // wishlistItems: state.WishlistReducer.productsInWishlist
});

export const mapDispatchToProps = (_dispatch: Dispatch): PlaceholderContainerMapDispatchProps => ({
    // addProduct: options => CartDispatcher.addProductToCart(dispatch, options)
});

export class PlaceholderContainer extends PureComponent<PlaceholderContainerProps> {
    containerFunctions: PlaceholderContainerFunctions = {
        // getData: this.getData.bind(this)
    };

    containerProps(): Pick<PlaceholderComponentProps, PlaceholderContainerPropsKeys> {
        return {
            // isDisabled: this._getIsDisabled()
        };
    }

    render() {
        return (
            <Placeholder
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceholderContainer);
