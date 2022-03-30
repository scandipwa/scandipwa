import {
    client,
    CombinedField,
    Field,
    InlineFragment,
    Mutation,
    Query
} from '../../src';

client.setEndpoint('https://api.spacex.land/graphql/');

const dragonsQuery = new Query('dragons', true)
    .addArgument('limit', 'Int', 5)
    .addFieldList(['name', 'active'])
    .addField(new Field('thrusters', true)
        .addField(new Field('thrust')
            .addField('kN')));

const capsulesQuery = new Query('capsules', true)
    .addArgument('limit', 'Int', 5)
    .addFieldList(['status', 'id']);

const combinedQuery = new CombinedField()
    .add(dragonsQuery)
    .add(capsulesQuery);

const insertUserMutation = new Mutation('insert_users')
    .addArgument('objects', '[users_insert_input!]!', {
        name: 'Yegor',
        rocket: 'SomeRocket'
    })
    .addField('affected_rows')
    .addField(new Field('returning', true)
        .addFieldList([
            'id',
            'name',
            'rocket',
            // @ts-ignore
            new InlineFragment('users').addField('timestamp')
        ]));

describe('data is fetched correctly', () => {
    it('is able to fetch queries', async () => {
        const result = await client.post(dragonsQuery);
        expect(result).toBeDefined();

        for (const dragon of result.dragons) {
            expect(dragon).toHaveProperty('name');
            expect(dragon).toHaveProperty('active');
            expect(dragon.thrusters).toBeInstanceOf(Array);
            expect(dragon.thrusters[0].thrust).toBeDefined();
        }
    });

    it('is able to fetch mutations', async () => {
        const result = await client.post(insertUserMutation);
        expect(result).toBeDefined();

        expect(result.insert_users.affected_rows).toBeGreaterThan(0);

        expect(result.insert_users.returning).toBeInstanceOf(Array);
        expect(result.insert_users.returning[0].name).toBe('Yegor');
        expect(result.insert_users.returning[0].rocket).toBe('SomeRocket');
    }, 15000);

    it('is able to fetch combined queries', async () => {
        const result = await client.post(combinedQuery);
        expect(result).toBeDefined();

        expect(result.capsules.length).toBeLessThanOrEqual(5);
        for (const capsule of result.capsules) {
            expect(capsule).toHaveProperty('status');
            expect(capsule).toHaveProperty('id');
        }

        expect(result.dragons.length).toBeLessThanOrEqual(5);
        for (const dragon of result.dragons) {
            expect(dragon).toHaveProperty('name');
            expect(dragon).toHaveProperty('active');
        }
    });

    it('ensures data immutability', async () => {
        const result = await client.post(dragonsQuery);

        expect(() => {
            // @ts-expect-error
            result.dragons = 0;
        }).toThrow();

        expect(() => {
            // @ts-expect-error
            result.dragons[0] = {};
        }).toThrow();

        expect(() => {
            // @ts-expect-error
            result.dragons[0].active = !result.dragons[0].active;
        }).toThrow();
    });
});
