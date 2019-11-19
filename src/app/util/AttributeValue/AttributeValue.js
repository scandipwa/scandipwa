export const getOptionLabel = (givenvalue, { attribute_options = {} }) => {
    const index = attribute_options.findIndex(({ value }) => value === givenvalue);
    const { label = null } = attribute_options[index] || {};
    return label;
};

export const getSelectValue = (attribute) => {
    const { attribute_value } = attribute;

    return getOptionLabel(attribute_value, attribute);
};

export const getMultiSelectValue = (attribute) => {
    const { attribute_value } = attribute;

    return attribute_value.split(',').reduce((labels, value) => {
        const label = getOptionLabel(value, attribute);
        if (label) labels.push(label);

        return labels;
    }, []).join(', ');
};

export const getDirectValue = ({ attribute_value }) => attribute_value;

export const getAttributeValueByType = (attribute) => {
    const { attribute_type } = attribute;

    switch (attribute_type) {
    case 'select':
        return getSelectValue(attribute);
    case 'boolean':
        return getDirectValue(attribute);
    case 'text':
        return getDirectValue(attribute);
    case 'multiselect':
        return getMultiSelectValue(attribute);
    default:
        return null;
    }
};
