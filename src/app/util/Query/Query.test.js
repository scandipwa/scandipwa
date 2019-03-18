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

/* eslint-disable */
import Field from './Query';

it('We check if Field constructor was called', () => {
    const query = new Field('name');
    expect(query).toBeInstanceOf(Field);
});


it('Argument can be added', () => {
    const query = new Field('name');
    query.addArgument('arg', 'val');
    expect(query._argumentList).toHaveProperty('arg', 'val');
});

it('Alias can be added', () => {
    const query = new Field('name');
    query.alias = 'PRODUCT';
    expect(query._alias).toBe('PRODUCT');
});

it('Alias can be re-set', () => {
    const query = new Field('name');
    query.alias = 'PRODUCT';
    expect(query._alias).toBe('PRODUCT');
    query.alias = 'CATEGORY';
    expect(query._alias).toBe('CATEGORY');
});

it('Formats the string', () => {
    const query = new Field('name');
    query.alias = 'product';
    query
        .addArgument('arg1', 'val1')
        .addArgumentList({ key2: 'val2', key3: 'val3' });
    expect(() => query.toString()).toThrow();
    query.addField('myfield');
    expect(query.toString()).toBe('product: name (arg1:val1, key2:val2, key3:val3) { myfield }');
});
