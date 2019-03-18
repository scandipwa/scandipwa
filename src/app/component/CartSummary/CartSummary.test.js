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

import React from 'react';
import { shallow } from 'enzyme';
import TextPlaceholder from 'Component/TextPlaceholder';
import CartSummary from './CartSummary.componet';

describe('<CartSummary />', () => {
    let wrapper;
    const mockTotals = {
        subTotalPrice: '24',
        grandTotalPrice: '12',
        taxPrice: '56'
    };

    beforeEach(() => {
        wrapper = shallow(<CartSummary totals={ mockTotals } />);
    });

    it('Render the <CartSummary /> component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('List has all elements', () => {
        expect(wrapper.find('li')).toHaveLength(Object.keys(mockTotals).length);
    });

    it('All provided prices are rendered in a list', () => {
        Object.keys(mockTotals).forEach((key) => {
            const priceElement = <TextPlaceholder content={ mockTotals[key] } length="short" />;
            expect(wrapper.contains(priceElement)).toBe(true);
        });
    });

    it('Header', () => {
        expect(wrapper.contains(<h3>Summary</h3>)).toBe(true);
    });

    it('Link to Homepage', () => {
        expect(wrapper.find('Link').props().to).toBe('/');
    });

    it('Checkout button', () => {
        // TODO when available check button actions
        expect(wrapper.find('button')).toHaveLength(1);
    });
});
