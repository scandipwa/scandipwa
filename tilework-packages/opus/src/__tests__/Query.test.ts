import { Query } from '../..';

describe('queries are built', () => {
    it('builds a query', () => {
        const query = new Query('someQuery')
            .addField('some')
            .addField('other');

        expect(query.children).toHaveLength(2);
        expect(query).toBeInstanceOf(Query);
    });
});
