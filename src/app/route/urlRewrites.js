export default {
    data: {
        products: {
            items: [
                {
                    name: 'Joust Duffle Bag',
                    sku: '24-MB01',
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
        }
    }
};
