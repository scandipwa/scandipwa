import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Subscribe } from 'unstated';

import SharedTransitionContainer from 'Component/SharedTransition/SharedTransition.unstated';

import ProductPageTabs from './ProductPageTabs.component';

/** @namespace Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    product: state.ProductReducer.product
});

/** @namespace Container */
// eslint-disable-next-line @scandipwa/scandipwa-guidelines/derived-class-names
export class ProductPageTabsContainer extends PureComponent {
    static propTypes = {
        product: PropTypes.object.isRequired

    };

    __construct(props) {
        super.__construct(props);
    }

    render() {
        return (
            <Subscribe to={ [SharedTransitionContainer] }>
                { () => (
                    <ProductPageTabs
                      { ...this.props }
                    />
                ) }
            </Subscribe>
        );
    }
}

export default connect(mapStateToProps, {})(ProductPageTabsContainer);
