import { client, Field, Query } from '../..';

const ONE_KG_IN_LBS = 2.20462;

client.setEndpoint('https://api.spacex.land/graphql/');

describe('calculated fields are working OK', () => {
    it('calculates fields', async () => {
        const query = new Query('dragons', true)
            .addField('active')
            .addField(new Field('launch_payload_mass')
                .addField('kg')
                .addField('lb')
                .addCalculatedField('lb_calculated', (result) => result.kg * ONE_KG_IN_LBS))
            .addField(new Field('return_payload_mass')
                .addField('kg'))
            .addCalculatedField('payload_delta', (result) => result.launch_payload_mass.kg - result.return_payload_mass.kg);

        const result = await client.post(query);

        for (const dragon of result.dragons) {
            expect(dragon.payload_delta).toBeDefined();
            expect(dragon.payload_delta).toBeGreaterThan(0);
            expect(dragon.payload_delta).toBe(dragon.launch_payload_mass.kg - dragon.return_payload_mass.kg);

            expect(dragon.launch_payload_mass.lb_calculated).toBeDefined();
            expect(dragon.launch_payload_mass.lb_calculated).toBeCloseTo(dragon.launch_payload_mass.lb, 0);
        }
    }, 3000);

    it('transforms fields', async () => {
        const query = new Query('dragons', true)
            .addField('active')
            .addField(new Field('launch_payload_mass')
                .addField('kg')
                .addTransformation((launchPayload) => launchPayload.kg))
            .addField(new Field('return_payload_mass')
                .addField('kg')
                .addTransformation((returnPayload) => returnPayload.kg));

        const result = await client.post(query);

        for (const dragon of result.dragons) {
            expect(typeof dragon.launch_payload_mass).toBe('number');
            expect(typeof dragon.return_payload_mass).toBe('number');
        }
    }, 3000);

    it('does not allow adding props through processors', async () => {
        const query = new Query('dragons', true)
            .addField('active')
            .addField(new Field('launch_payload_mass')
                .addField('kg')
                .addTransformation((launchPayload) => {
                    // @ts-expect-error
                    launchPayload.lbs = launchPayload.kg * 2.20462;

                    return launchPayload;
                }));

        await expect(async () => {
            const result = await client.post(query);
        }).rejects.toThrowError(TypeError);
    }, 3000);
});
