import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Event, { EVENT_GTM_IMPRESSIONS_LINKED } from 'Util/Event';
import { ProductType } from 'Type/ProductList';

import ProductLinks from './ProductLinks.component';

export const mapStateToProps = state => ({
    linkedProducts: state.LinkedProductsReducer.linkedProducts
});

export class ProductLinksContainer extends PureComponent {
    static propTypes = {
        linkedProducts: PropTypes.objectOf(ProductType).isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired,
        linkType: PropTypes.string.isRequired
    };

    componentDidUpdate(prevProps) {
        const { areDetailsLoaded } = this.props;
        const { areDetailsLoaded: wereDetailsLoaded } = prevProps;

        if (areDetailsLoaded && wereDetailsLoaded) {
            const { linkType = '', linkedProducts = {} } = this.props;
            const { items = {} } = linkedProducts[linkType] || {};

            if (items.length) {
                Event.dispatch(EVENT_GTM_IMPRESSIONS_LINKED, { items });
            }
        }
    }

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
