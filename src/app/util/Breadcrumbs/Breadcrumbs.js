export const getCategoryBreadcrumbs = (categories) => {
    if (!Object.keys(categories).length) return {};

    return categories.reduce((selectedCategory, category) => {
        const { breadcrumbs: selectedBreadcrumbs } = selectedCategory;
        const { breadcrumbs, url_path } = category;

        // If brands or akcii - ignore it from Product breadcrumbs
        if (!url_path || /^(b\/|brendy\/|akcii\/)/g.test(url_path)) {
            return selectedCategory;
        }

        if (!Object.keys(selectedCategory).length) {
            return category;
        }

        return (breadcrumbs || []).length > (selectedBreadcrumbs || []).length
            ? category
            : selectedCategory;
    }, {});
};

export const getBreadcrumbsWithUrl = (breadcrumbs) => {
    const paths = breadcrumbs.map(({ category_url_key }) => category_url_key);

    return breadcrumbs.map((breadcrumb, i) => ({
        ...breadcrumb,
        name: breadcrumb.category_name,
        url: `/${paths.slice(0, i + 1).join('/')}`
    }));
};

export const getBreadcrumbs = (categories = {}) => {
    const category = getCategoryBreadcrumbs(categories);
    const breadcrumbs = getBreadcrumbsWithUrl(category.breadcrumbs || []);

    return { ...category, breadcrumbs };
};
