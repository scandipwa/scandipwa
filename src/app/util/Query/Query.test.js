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
import Field from './Field';

describe('Arguments are added correctly', () => {
    test('Argument can be added', () => {
        const query = new Field('name');
        const argName = 'arg';
        query.addArgument(argName, 'val');
        expect(query._argumentList).toHaveProperty(argName);
        expect(query._argumentList[argName]).toHaveProperty('type', 'val');
        expect(query._argumentList).toEqual({ arg: { type: 'val' } });
    });

    test('addArgument() throws on incorrect arguments', () => {
        const query = new Field('name');
        expect(() => query.addArgument(124)).toThrow();
        expect(() => query.addArgument([])).toThrow();
        expect(() => query.addArgument('a', 124)).toThrow();
        expect(() => query.addArgument('', '')).toThrow();
        expect(() => query.addArgument({'124': 124})).toThrow();
    });
})

describe('Alias works correctly', () => {
    test('Alias can be added', () => {
        const query = new Field('name');
        query.alias = 'PRODUCT';
        expect(query._alias).toBe('PRODUCT');
    });

    test('Alias can be re-set', () => {
        const query = new Field('name');
        query.alias = 'PRODUCT';
        expect(query._alias).toBe('PRODUCT');
        query.alias = 'CATEGORY';
        expect(query._alias).toBe('CATEGORY');
    });

    test('setAlias() of empty string', () => {
        const field = new Field('name');
        expect(() => field.setAlias('')).not.toThrow();
    });

    test('setAlias() of wrong type throws error', () => {
        const field = new Field('name');
        expect(() => field.setAlias([])).toThrow();
        expect(() => field.alias = []).toThrow();
        expect(() => field.setAlias({})).toThrow();
        expect(() => field.alias = {}).toThrow();
        expect(() => field.setAlias()).toThrow();
    });
});

describe('component type tests', () => {
    test('component by defaults is query', () => {
        const field = new Field('field');
        expect(field._component).toBe('query');
    });

    test('field accepts only non-empty string for component', () => {
        const field = new Field('field');
        expect(() => field.setComponentType('mutation')).not.toThrow();
        expect(field._component).toBe('mutation');
        expect(() => field.setComponentType('')).toThrow();
        expect(() => field.setComponentType(['something'])).toThrow();
        expect(() => field.setComponentType({a: 124})).toThrow();
    });
})

describe('toString() tests', () => {
    test('_aliasToString() with given alias', () => {
        const query = new Field('original-name');
        query.setAlias('alias-name');
        expect(query._aliasToString()).toBe('alias-name:')
    });

    test('_aliasToString() without alias', () => {
        const query = new Field('original-name');
        expect(query._aliasToString()).toBe('');
    });

    test('arguments are empty before build()', () => {
        const query = new Field('name');
        query.addArgument('arg1', 'String!', 'val1');
        expect(query._argumentDefinitions).toEqual([]);
        expect(query.argumentDefinitions).toEqual([]);
        expect(query._argumentsToString()).toBe('');
    });

    test('Argument is added after build()', () => {
        const expected = 'arg1:$_arg1_0';
        const query = new Field('name');
        query.addArgument('arg1', 'String!', 'val1').build();

        expect(query._argumentDefinitions).toEqual([expected]);
        expect(query.argumentDefinitions).toEqual([expected]);
        expect(query._argumentsToString()).toBe(`(${expected})`);
    });

    test('Several arguments are added after build()', () => {
        const expected = ['arg1:$_arg1_0', 'arg2:$_arg2_0'];
        const query = new Field('name');
        query.addArgument('arg1', 'String!', 'val1');
        query.addArgument('arg2', 'Boolean', 'val2').build();

        expect(query._argumentDefinitions).toEqual(expected);
        expect(query.argumentDefinitions).toEqual(expected);
        expect(query._argumentsToString()).toBe(`(${expected[0]}, ${expected[1]})`);
    });

    test('_bodyToString() of empty field', () => {
        const query = new Field('name');
        expect(query.toString()).toBe('name');
    });

    test('_bodyToString() of field with subfield', () => {
        const query = new Field('name');
        query.addField('subfield');
        expect(query.fieldList['subfield'].toString()).toBe('subfield');
        expect(query.toString()).toBe('name{ subfield }');

        query.setAlias('nameAlias');
        query.fieldList['subfield'].setAlias('subAlias');
        expect(query.toString()).toBe('nameAlias:name{ subAlias:subfield }');
    });

    test('toString() forms a correct query string', () => {
        const query = new Field('name');
        query.alias = 'product';
        query.addArgument('arg1', '!String', 'val1')
        query.addField('myfield')
            .build();
        expect(query.toString()).toBe('product:name(arg1:$product_arg1_0){ myfield }');
    });

    test('toString() for field includes subField\'s toString()', () => {
        const field = new Field('field').setAlias('alias');
        field.addArgument('arg1', '!String', 'val1');
        const subField = new Field('subf');
        subField.addArgument('subArg1', '!Boolean', 'val2');
        field.addField(subField).build();
        const subFieldQuery = subField.toString();
        expect(field.toString()).toBe(`alias:field(arg1:$alias_arg1_0){ ${ subFieldQuery } }`);
    })
});
