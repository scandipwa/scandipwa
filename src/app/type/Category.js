import PropTypes from 'prop-types';

export const BreadcrumbsType = PropTypes.arrayOf(
    PropTypes.shape({
        category_name: PropTypes.string,
        category_url_key: PropTypes.string,
        category_level: PropTypes.number
    })
);

export const CategoryFragment = {
    id: PropTypes.number,
    breadcrumbs: BreadcrumbsType,
    description: PropTypes.string,
    image: PropTypes.string,
    meta_description: PropTypes.string,
    meta_title: PropTypes.string,
    name: PropTypes.string,
    product_count: PropTypes.number,
    url_key: PropTypes.string,
    url_path: PropTypes.string
};


export const CategoryTreeType = PropTypes.shape({
    ...CategoryFragment,
    children: PropTypes.arrayOf(PropTypes.shape(CategoryFragment))
});
