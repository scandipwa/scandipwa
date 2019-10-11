export const trimCustomerAddress = (customerAddress) => {
    const {
        city,
        company,
        country_id,
        email,
        firstname,
        lastname,
        method,
        postcode,
        street,
        telephone,
        region
    } = customerAddress;

    return {
        city,
        company,
        country_id,
        email,
        firstname,
        lastname,
        method,
        postcode,
        street,
        telephone,
        ...region
    };
};

export const trimAddressFields = (fields) => {
    const {
        region_string: region,
        ...fieldsData
    } = fields;

    return { ...fieldsData, region };
};
