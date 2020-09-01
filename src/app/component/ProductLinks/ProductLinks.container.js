import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { ProductType } from 'Type/ProductList';

import ProductLinks from './ProductLinks.component';

export const mapStateToProps = (state) => ({
    linkedProducts: state.LinkedProductsReducer.linkedProducts
});

export class ProductLinksContainer extends PureComponent {
    static propTypes = {
        linkedProducts: PropTypes.objectOf(ProductType).isRequired,
        linkType: PropTypes.string.isRequired
    };

    render() {
        const {
            linkType,
            linkedProducts: {
                [linkType]: {
                    items = []
                } = {}
            }
        } = this.props;

        if (items.length === 0) {
            return null;
        }

        return (
            <ProductLinks
              { ...this.props }
            />
        );
    }
}

export default connect(mapStateToProps)(ProductLinksContainer);
