/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

const renderIndex = (args) => {
    const [props] = args;

    return (
        <h1>
            <div>Override the index page!</div>
            <div>
                Props:
                { JSON.stringify(props) }
            </div>
        </h1>
    );
};

const getIndexComponentServerSideProps = () => ({
    props: {
        prop1: 'val1'
    }
});

const renderProduct = (args) => {
    const [props] = args;

    return (
        <h1>
            <div>Override the product page!</div>
            <div>
                Props:
                { JSON.stringify(props) }
            </div>
        </h1>
    );
};

const getProductComponentServerSideProps = (args) => new Promise((resolve) => {
    const n = 3000;

    setTimeout(() => {
        const [{ query }] = args;
        resolve({ props: query });
    }, n);
});

export default {
    'Pages/products/index/Page': {
        function: renderIndex
    },
    'Pages/products/index/getServerSideProps': {
        function: getIndexComponentServerSideProps
    },
    'Pages/products/[id]/Page': {
        function: renderProduct
    },
    'Pages/products/[id]/getServerSideProps': {
        function: getProductComponentServerSideProps
    }
};
