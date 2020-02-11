import { ProductWishlistButtonContainer } from 'Component/ProductWishlistButton/ProductWishlistButton.container';

class NoWishListPlugin {
    static doNotRender(/* args, callback, originalInstance */) {
        console.log('It will not render!');
        return null;
    }

    static logSomething(args, callback /* originalInstance */) {
        console.log('I log something before the other around.');
        return callback(...args);
    }
}

const config = {
    'Component/ProductWishlistButton/Container': {
        [ProductWishlistButtonContainer.prototype.render.name]: [
            {
                position: 200,
                implementation: NoWishListPlugin.doNotRender
            },
            {
                position: 100,
                implementation: NoWishListPlugin.logSomething
            }
        ]
    }
};

export default config;
