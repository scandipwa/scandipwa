import React from 'react';
import { shallow } from 'enzyme';
import CartItem from 'Component/CartItem';
import CartSummary from 'Component/CartSummary';
import CartPage from './CartPage.component';

const mockProducts = {
    1: {
        id: 1
    },
    2: {
        id: 2
    }
};

const mockTotals = {
    count: 1,
    subTotalPrice: '1'
};

const mockBreadcrumbs = jest.fn();

describe('<CartPage /> with products', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
        <CartPage products={ mockProducts } totals={ mockTotals } updateBreadcrumbs={ mockBreadcrumbs } />
        );
    });

    it('render the <CartPage /> component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('check products are loaded to the Component', () => {
        expect(wrapper.instance().props.products).toEqual(mockProducts);
    });

    it('check totals are loaded to the Component', () => {
        expect(wrapper.instance().props.totals).toEqual(mockTotals);
    });

    it('main block exists', () => {
        expect(wrapper.find('main')).toHaveLength(1);
    });

    it('All provided products are rendered in a list', () => {
        Object.keys(mockProducts).forEach((key) => {
            const cartItem = (
            <CartItem
              key={ mockProducts[key].id }
              product={ mockProducts[key] }
            />
            );
            expect(wrapper.contains(cartItem)).toBe(true);
        });
    });

    it('Summary block is rendered', () => {
        const totals = <CartSummary totals={ mockTotals } />;
        expect(wrapper.contains(totals)).toBe(true);
    });

    it('Header', () => {
        expect(wrapper.contains(<h1>Shopping cart</h1>)).toBe(true);
    });
});


describe('<CartPage /> without products', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CartPage updateBreadcrumbs={ mockBreadcrumbs } />);
    });

    it('render the <CartPage /> component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('check that default value is loaded to products', () => {
        expect(wrapper.instance().props.products).toEqual({});
    });

    it('check that default value is loaded to totals', () => {
        expect(wrapper.instance().props.totals).toEqual({});
    });

    it('Cart does not have any items', () => {
        expect(wrapper.find(CartItem).exists()).toBe(false);
    });

    it('Header', () => {
        expect(wrapper.contains(<h1>Shopping cart</h1>)).toBe(true);
    });

    it('Summary block is rendered', () => {
        const totals = <CartSummary totals={ {} } />;
        expect(wrapper.contains(totals)).toBe(true);
    });

    it('Empty cart message is shown', () => {
        const emptyCartMessage = (
            <li block="MiniCart" elem="Empty" key={ 1 }>
                    You have no items in your shopping cart.
            </li>
        );
        expect(wrapper.contains(emptyCartMessage)).toBe(true);
    });
});
