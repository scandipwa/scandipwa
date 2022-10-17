import { Field, InlineFragment } from '../..';

describe('field is built', () => {
    it('adds array fields', () => {
        const field = new Field('person')
            .addField('friends', true);

        field.resultTypeHolder.friends;
    });

    it('adds non-array fields', () => {
        const field = new Field('person')
            .addField('a', false)
            .addField('b');

        field.resultTypeHolder.a;
        field.resultTypeHolder.b;
    });

    it('adds child fields one by one', () => {
        const field = new Field('some')
            .addField('one')
            .addField('two');

        field.resultTypeHolder.two;

        expect(field.children).toHaveLength(2);
        expect(field).toBeInstanceOf(Field);
    });

    it('adds childs fields as lists', () => {
        const field = new Field('some')
            .addFieldList([
                'one',
                'two'
            ]);

        field.resultTypeHolder.two;

        expect(field.children).toHaveLength(2);
        expect(field).toBeInstanceOf(Field);
    });

    it('adds nested fields', () => {
        const field = new Field('parent')
            .addField(new Field('child')
                .addField('age'));

        expect(field.children[0].children[0].name).toBe('age');
        expect(field).toBeInstanceOf(Field);
    });

    it('adds inline fragments', () => {
        const field = new Field('some')
            .addField(new InlineFragment('optional')
                .addField('thing'));

        field.resultTypeHolder;

        expect(field.children[0]).toBeInstanceOf(InlineFragment);
        expect(field.children[0].children[0].name).toBe('thing');
        expect(field).toBeInstanceOf(Field);
    });

    it('adds a transformer to the field', () => {
        const field = new Field('some')
            .addField('thing')
            .addTransformation((some) => 123 as const);
    });
});
