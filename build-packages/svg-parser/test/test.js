const fs = require( 'fs' );
const path = require( 'path' );
const assert = require( 'assert' );
const svgParser = require( '..' );

require( 'source-map-support' ).install();

const SAMPLES = path.join( __dirname, 'samples' );

describe( 'svg-parser', () => {
	fs.readdirSync( SAMPLES ).forEach( dir => {
		( /-SOLO$/.test( dir ) ? it.only : it )( dir, () => {
			const input = fs.readFileSync( path.join( SAMPLES, dir, 'input.svg' ), 'utf-8' );
			const output = JSON.parse( fs.readFileSync( path.join( SAMPLES, dir, 'output.json' ), 'utf-8' ) );

			assert.deepStrictEqual( svgParser.parse( input ), output );
		});
	});

	it( 'errors on bad closing tags', () => {
		assert.throws( () => {
			svgParser.parse( '<svg></svg' );
		}, /Expected >/ );

		assert.throws( () => {
			svgParser.parse( '<svg></' );
		}, /Unexpected end of input/ );
	});

  it('replace tabs with spaces to show correct position in the line', () => {
		assert.throws(() => {
			svgParser.parse( '<svg>\n\t\t<path\td=" class="" />\n</svg>' );
    }, /\n    <path  d=/);
  })
});
