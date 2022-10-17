import { CombinedField, Mutation, Query } from '../..';

describe('combined fields are built', () => {
    it('builds combined queries', () => {
        const firstQuery = new Query('first').addField('one');
        const secondQuery = new Query('second').addField('two');

        const combinedField = new CombinedField()
            .add(firstQuery)
            .add(secondQuery);

        expect(combinedField.getFields()).toHaveLength(2);
    });

    it('builds combined mutations', () => {
        const firstMutation = new Mutation('first').addField('one');
        const secondMutation = new Mutation('second').addField('two');

        const combinedField = new CombinedField()
            .add(firstMutation)
            .add(secondMutation);

        expect(combinedField.getFields()).toHaveLength(2);
    });

    it('throws on mixed combinations', () => {
        const mutation = new Mutation('mut').addField('one');
        const query = new Query('que').addField('two');

        expect(() => {
            const combinedField = new CombinedField()
                .add(mutation)
                .add(query);
        }).toThrow();
    });
});
