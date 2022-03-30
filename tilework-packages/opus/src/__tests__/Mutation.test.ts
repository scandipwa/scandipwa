import { Mutation } from '../..';

describe('mutations are built', () => {
    it('builds a mutation', () => {
        const mutation = new Mutation('someMutation')
            .addField('some')
            .addField('other');

        expect(mutation.children).toHaveLength(2);
        expect(mutation).toBeInstanceOf(Mutation);
    });
});
