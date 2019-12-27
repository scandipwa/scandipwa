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

describe('Field can be properly initialized', () => {
    test('Check if Field constructor was called', () => {
        const query = new Field('name');
        expect(query).toBeInstanceOf(Field);
    });

    test('Field class can be initialized and returns object', () => {
        expect(typeof new Field('Name')).toBe('object');
        expect(new Field('Name')).toBeInstanceOf(Field);
    });

    test('Constructor throws error on wrong argument', () => {
        expect(() => new Field()).toThrow();
        expect(() => new Field({ name: 'objname' })).toThrow();
        expect(() => new Field([])).toThrow();
        expect(() => new Field('')).toThrow();
        expect(() => new Field(123)).toThrow();
    });

    test('Field has properly set name', () => {
        expect(new Field('my-name').name).toBe('my-name');
    });
});

describe('Subfields are added correctly', () => {
    test('addField() does not accept simple objects', () => {
        const object = { first: '1', second: '2' };
        const field = new Field('name');
        expect(() => {
            field.addField(object);
        }).toThrow();
        expect(Object.keys(field.fieldList)).toHaveLength(0);
    });

    test('addField() accepts objects with name attribute', () => {
        const objectWithName = { name: 'fieldName', first: '1', second: '2' };
        const field = new Field('name');
        expect(() => field.addField(objectWithName)).not.toThrow();
        expect(field.fieldList).toMatchObject({ fieldName: objectWithName });
    });

    test('addField() does not accept arrays', () => {
        expect(() => new Field('name').addField([1, 2])).toThrow();
    });

    test('addField() accepts strings', () => {
        const fieldName = 'name';
        const childName = 'my-field';
        expect(() => new Field(fieldName).addField(childName)).not.toThrow();
        expect(new Field(fieldName).addField(childName).fieldList).toMatchObject({
            [ childName ]: {
                _name: childName,
                fieldList: {}
            }
        });
    });

    test('addFieldList() builds tree', () => {
        const field = new Field('fieldname');
        expect(field.addFieldList(['one', 'two', 'three'])).toMatchObject({
            _name: 'fieldname',
            _fieldList: {
                one: new Field('one'),
                two: new Field('two'),
                three: new Field('three')
            }
        });
    });

    test('addFieldList() throws error with non-array argument', () => {
        const field = new Field('name');
        expect(() => field.addFieldList({})).toThrow();
        expect(() => field.addFieldList('')).toThrow();
        expect(() => field.addFieldList(123)).toThrow();
    });

    test('addFieldList() throws error with array of empty strings', () => {
        const field = new Field('name');
        expect(() => field.addFieldList([''])).toThrow();
        expect(() => field.addFieldList(['arg1', 'arg2', ''])).toThrow();
    });

    test('addFieldList() throws error with array of non-string / non-Field object items', () => {
        const field = new Field('name');
        expect(() => field.addFieldList([1, 2, 'arg3'])).toThrow();

        const subField = new Field('field1');
        expect(() => field.addFieldList([subField, 1])).toThrow();
    });

    test('addFieldList() accepts array of non-empty strings and Objects', () => {
        const field = new Field('name');
        expect(() => field.addFieldList([])).not.toThrow();
        expect(() => field.addFieldList(['arg1', 'arg2', 'arg3'])).not.toThrow();

        const subField = new Field('field1');
        const subField2 = new Field('field2');
        expect(() => field.addFieldList([subField, subField2])).not.toThrow();

        expect(() => field.addFieldList(['one', subField])).not.toThrow();
        expect(field).toMatchObject({
            name: 'name',
            _fieldList: {
                'one': { name: 'one' },
                'arg1': { name: 'arg1' }
            }
        });
    });

    test('Adding the same field twice updates field', () => {
        const field = new Field('name');
        const subField = new Field('sub').setAlias('firstSub');
        const subField2 = new Field('sub').setAlias('secondSub');
        const expectedObject = {
            name: 'name',
            _fieldList: {
                sub: { _alias: 'firstSub' }
            }
        };
        expect(field.addField(subField)).toMatchObject(expectedObject);
        expect(field.addField(subField2)).toMatchObject({
            ...expectedObject,
            _fieldList: {
                sub: { _alias: 'secondSub' }
            }
        });
    })
})

describe('Build method and underlying private methods', () => {
    test('check _getVariableName()', () => {
        const [varName, varValue] = ['price', '124'];
        const field = new Field('new-field')
            .addArgument(varName, '!Integer', varValue);
        expect(field._getVariableName(varName,[])).toBe('_price_0');
    });

    test('check _getVariableName() with alias', () => {
        const [varName, varValue] = ['quantity', '124'];
        const fieldWithAlias = new Field('new-field')
            .addArgument(varName, '!Bool', varValue)
            .setAlias('field-with-alias');
        expect(fieldWithAlias._getVariableName(varName,[])).toBe('field-with-alias_quantity_0');
    });

    test('_getVariableName() index increments when argument already exists', () => {
        const [varName, varValue] = ['price', '124'];
        const field = new Field('new-field')
            .addArgument(varName, '!Integer', varValue);
        expect(field._getVariableName(varName,['_price_0'])).toBe('_price_1');
    });

    test('build() of simple field returns object with 2 empty parameters', () => {
        const field = new Field('name');
        expect(field.build()).toEqual({
            variableDefinitions: [],
            variableValues: {}
        });
    });

    test('build() should be called to convert arguments', () => {
        const field = new Field('name').setAlias('alias');
        field.addArgument('arg1', '!String', 'val1');
        expect(field._variableDefinitions).toEqual([]);
        expect(field._variableValues).toEqual({});

        field.build();
        expect(field._variableDefinitions).toEqual(['$alias_arg1_0:!String']);
        expect(field._variableValues).toEqual({'alias_arg1_0': 'val1'})
    });

    test('build() correctly converts argument', () => {
        const field = new Field('name').setAlias('alias');
        field.addArgument('arg1', '!String', 'val1');
        const { variableDefinitions, variableValues } = field.build();

        expect(variableDefinitions).toEqual(['$alias_arg1_0:!String']);
        expect(variableValues).toEqual({'alias_arg1_0': 'val1'})
    });

    test('build() correctly converts multiple arguments', () => {
        const field = new Field('name').setAlias('alias');
        field.addArgument('arg1', '!String', 'val1');
        field.addArgument('arg2', '!Boolean', 'val2');
        const { variableDefinitions, variableValues } = field.build();

        expect(variableDefinitions).toEqual(['$alias_arg1_0:!String', '$alias_arg2_0:!Boolean'])
        expect(variableValues).toEqual({
            'alias_arg1_0': 'val1',
            'alias_arg2_0': 'val2',
        });
    });

    test('build() correctly converts own and subfield\'s arguments', () => {
        const field = new Field('field').setAlias('alias');
        field.addArgument('arg1', '!String', 'val1');
        const subField = new Field('subf');
        subField.addArgument('subArg1', '!Boolean', 'val2');
        field.addField(subField);
        const { variableDefinitions, variableValues } = field.build();

        expect(variableDefinitions).toEqual(['$alias_arg1_0:!String', '$_subArg1_0:!Boolean'])
        expect(variableValues).toEqual({
            'alias_arg1_0': 'val1',
            '_subArg1_0': 'val2',
        });
    });

    test('argumentDefinitions are being set', () => {
        const field = new Field('name').setAlias('alias');
        field.addArgument('arg1', '!String', 'val1');
        field.addArgument('arg2', '!Boolean', 'val2');
        expect(field.argumentDefinitions).toEqual([]);
        field.build();
        expect(field.argumentDefinitions).toEqual([
            'arg1:$alias_arg1_0', 'arg2:$alias_arg2_0'
        ]);
    })

    test('argumentDefinitions ignore subfield', () => {
        const field = new Field('field').setAlias('alias');
        field.addArgument('arg1', '!String', 'val1');
        const subField = new Field('subf');
        subField.addArgument('subArg1', '!Boolean', 'val2');
        field.addField(subField);
        field.build();
        expect(field.argumentDefinitions).toEqual([
            'arg1:$alias_arg1_0'
        ]);
    })
});
