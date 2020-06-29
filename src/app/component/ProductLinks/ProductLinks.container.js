
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ProductType } from 'Type/ProductList';

import ProductLinks from './ProductLinks.component';

/** @middleware Component/ProductLinks/Container/mapStateToProps */
export const mapStateToProps = state => ({
    linkedProducts: state.LinkedProductsReducer.linkedProducts
});

/** @middleware Component/ProductLinks/Container */
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

/** @middleware Component/ProductLinks/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductLinksContainer);
