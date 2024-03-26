/* eslint-disable */
import buble from '@rollup/plugin-buble';
import nodeResolve from '@rollup/plugin-node-resolve';

export default {
	input: 'src/index.js',
	output: [
		{ format: 'esm', file: 'dist/svg-parser.esm.js', sourcemap: true },
		{
			format: 'umd', file: 'dist/svg-parser.umd.js', name: 'svgParser', sourcemap: true,
		},
	],
	plugins: [nodeResolve(), buble({ include: 'src/**' })],
};
