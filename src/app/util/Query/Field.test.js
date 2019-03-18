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
import Field from 'Util/Query/Field';

test('Field class can be initialized and return object', () => {
    expect(typeof new Field('Name')).toBe('object');
    expect(new Field('Name')).toBeInstanceOf(Field);
});

test('Constructor throws error on wrong argument', () => {
    expect(() => new Field()).toThrow();
    expect(() => new Field({ name: 'objname' })).toThrow();
    expect(() => new Field([])).toThrow();
});

test('Field has properly set name', () => {
    expect(new Field('my-name').name).toBe('my-name');
});

test('addField() do not accept simple objects', () => {
    const object = { first: '1', second: '2' };
    const field = new Field('name');
    expect(() => {
        field.addField(object);
    }).toThrow();
});

test('addField() do not accept arrays', () => {
    expect(() => new Field('name').addField(['1', '2'])).toThrow();
});

test('addField() accepts strings', () => {
    const childName = 'my-field';
    expect(new Field('name').addField(childName).fieldList).toEqual({
        [ childName ]: {
            _fieldList: {},
            _name: childName
        }
    });
});

test('addFieldList() builds tree', () => {
    const field = new Field('fieldname');
    expect(field.addFieldList(['one', 'two', 'three'])).toEqual({
        _name: 'fieldname',
        _fieldList: {
            one: new Field('one'),
            two: new Field('two'),
            three: new Field('three')
        }
    });
});

test('addFieldList() accepts array only', () => {
    const field = new Field('name');
    expect(() => field.addFieldList({})).toThrow();
    expect(() => field.addFieldList('')).toThrow();
    expect(() => field.addFieldList(123)).toThrow();
    expect(field.addFieldList([])).toEqual(field);
    expect(field.addFieldList(['one', 'two'])).toBeInstanceOf(Field);
});
