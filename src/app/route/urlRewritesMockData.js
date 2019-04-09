export default {
    data: {
        products: {
            items: [
                {
                    url_key: 'n-black-chino',
                    url_rewrites: [
                        {
                            url: '/joust-duffle-bag',
                            parameters: [
                                {
                                    name: 'id',
                                    value: '1'
                                }
                            ]
                        },
                        {
                            url: '/gear/joust-duffle-bag',
                            parameters: [
                                {
                                    name: 'id',
                                    value: '1'
                                },
                                {
                                    name: 'category',
                                    value: '3'
                                }
                            ]
                        },
                        {
                            url: '/gear/bags/joust-duffle-bag',
                            parameters: [
                                {
                                    name: 'id',
                                    value: '1'
                                },
                                {
                                    name: 'category',
                                    value: '4'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        categories: {
            items: [
                {
                    url_key: 'women/women-trousers',
                    url_rewrites: [
                        {
                            url: '/very-cool-category'
                        }
                    ]
                }
            ]
        },
        cms: {
            items: [
                {
                    url_key: 'privacy-policy-cookie-restriction-mode',
                    url_rewrites: [
                        {
                            url: '/mock-cms'
                        }
                    ]
                }
            ]
        }
    }
};
