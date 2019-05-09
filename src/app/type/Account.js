import PropTypes from 'prop-types';

export const region = PropTypes.oneOfType([
    PropTypes.shape({
        region_code: PropTypes.string,
        region: PropTypes.string,
        region_id: PropTypes.number
    })
]);

export const address = PropTypes.shape({
    city: PropTypes.string,
    company: PropTypes.string,
    country_id: PropTypes.string,
    customer_id: PropTypes.number,
    default_billing: PropTypes.bool,
    default_shipping: PropTypes.bool,
    fax: PropTypes.string,
    firstname: PropTypes.string,
    id: PropTypes.number,
    lastname: PropTypes.string,
    middlename: PropTypes.string,
    postcode: PropTypes.string,
    prefix: PropTypes.string,
    region,
    street: PropTypes.arrayOf(PropTypes.string),
    suffix: PropTypes.string,
    telephone: PropTypes.string,
    vat_id: PropTypes.string
});

export const addresses = PropTypes.arrayOf(address);

export const customerType = PropTypes.shape({
    addresses,
    created_at: PropTypes.string,
    default_billing: PropTypes.string,
    default_shipping: PropTypes.string,
    dob: PropTypes.date,
    email: PropTypes.string,
    firstname: PropTypes.string,
    group_id: PropTypes.number,
    id: PropTypes.number,
    is_subscribed: PropTypes.bool,
    lastname: PropTypes.string,
    middlename: PropTypes.string,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    taxvat: PropTypes.string
});
