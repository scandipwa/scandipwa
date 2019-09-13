import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyAccountAddressTable from './MyAccountAddressTable.component';

export const mapStateToProps = state => ({
    countries: state.ConfigReducer.countries
});

export const mapDispatchToProps = dispatch => ({
    // addProduct: options => CartDispatcher.addProductToCart(dispatch, options)
});

export class MyAccountAddressTableContainer extends PureComponent {
    static propTypes = {
        countries: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                id: PropTypes.string,
                available_regions: PropTypes.arrayOf(
                    PropTypes.shape({
                        code: PropTypes.string,
                        name: PropTypes.string,
                        id: PropTypes.number
                    })
                )
            })
        ).isRequired
    };

    containerFunctions = {
        getFormatedRegion: this.getFormatedRegion.bind(this)
    };

    getFormatedRegion(address) {
        const { countries } = this.props;
        const { country_id, region: { region_id, region } } = address;

        const country = countries.find(({ id }) => id === country_id);
        if (!country) return {};

        const { label, available_regions } = country;
        const { name } = available_regions.find(({ id }) => id === region_id);

        return {
            country: label,
            state: name,
            region
        };
    }

    render() {
        return (
            <MyAccountAddressTable
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountAddressTableContainer);
