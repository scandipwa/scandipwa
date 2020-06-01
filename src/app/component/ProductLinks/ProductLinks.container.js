
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ProductType } from 'Type/ProductList';

import ProductLinks from './ProductLinks.component';

export const mapStateToProps = state => ({
    linkedProducts: state.LinkedProductsReducer.linkedProducts
});

export class ProductLinksContainer extends ExtensiblePureComponent {
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

// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = dispatch => ({});

export default connect(
    middleware(mapStateToProps, 'Component/ProductLinks/Container/mapStateToProps'),
    middleware(mapDispatchToProps, 'Component/ProductLinks/Container/mapDispatchToProps')
)(
    middleware(ProductLinksContainer, 'Component/ProductLinks/Container')
);
