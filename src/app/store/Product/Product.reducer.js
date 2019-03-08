import {
    UPDATE_PRODUCT_DETAILS
} from './Product.action';

const initialState = {
    product: {}
};

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_PRODUCT_DETAILS:
        const { product, filters } = action;

        return {
            ...state,
            product,
            filters
        };

    default:
        return state;
    }
};

export default ProductReducer;
