import { ProductWishlistButtonContainer } from 'Component/ProductWishlistButton/ProductWishlistButton.container';

class NoWishListPlugin {
    static newRender() {
        return null;
    }
}

const config = {
    'Component/ProductWishlistButton/Container': {
        [ProductWishlistButtonContainer.prototype.render.name]: {
            around: [
                NoWishListPlugin.newRender
            ]
        }
    }
};

export default config;
