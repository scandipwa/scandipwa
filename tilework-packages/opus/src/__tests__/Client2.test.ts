import {
    client,
    Field,
    Query,
} from '../../src';

/**
 *
query {
  allStarships {
    starships {
      name
      pilotConnection {
        pilots {
          name
          species {
            name
          }
        }
      }
    }
  }
}
 */

const allStarshipsQuery = new Query('allStarships')
    .addField(
        new Field('starships', true)
            .addFieldList(['name'])
            .addField(
                new Field('pilotConnection')
                    .addField(
                        new Field('pilots', true)
                            .addFieldList(['name'])
                            .addField(
                                new Field('species')
                                    .addFieldList(['name'])
                            )
                    )
            )
    );

// https://graphql.org/swapi-graphql/
client.setEndpoint('https://swapi-graphql.netlify.app/.netlify/functions/index');

describe('data is fetched correctly from sw api', () => {
    it('should be able to fetch query with nullable fields', async () => {
        const result = await client.post(allStarshipsQuery);
        expect(result).toBeDefined();

        for (const starship of result.allStarships.starships) {
            expect(starship).toHaveProperty('name');
            expect(starship.pilotConnection.pilots).toBeInstanceOf(Array);

            starship.pilotConnection.pilots.forEach((pilot) => {
                expect(pilot).toHaveProperty('name');
                expect(typeof pilot.species === 'object').toBeTruthy();
                if (pilot.species === null) {
                    expect(pilot.species).toBeNull();
                } else {
                    expect(pilot.species).toHaveProperty('name');
                }
            });
        }
    });
});
