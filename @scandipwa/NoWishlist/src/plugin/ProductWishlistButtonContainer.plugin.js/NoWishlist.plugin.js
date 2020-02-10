import ProductWishlistButton from 'Component/ProductWishlistButton';

class NoWishListPlugin {
    static newRender() {
        return null;
    }
}

const config = {
    'Component/ProductWishlistButton/Container': {
        [ProductWishlistButton.prototype.render.name]: {
            around: [
                NoWishListPlugin.newRender
            ]
        }
    }
};

export default config;
