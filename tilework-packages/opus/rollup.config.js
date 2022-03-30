import dts from 'rollup-plugin-dts';
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

const bundle = config => ({
    ...config,
    input: 'src/index.ts',
    external: id => !/^[./]/.test(id)
});

export default [
    bundle({
        plugins: [
            nodeResolve(),
            babel(),
            terser(),
            typescript({
                target: "es5"
            }),
        ],
        output: [
            {
                file: pkg.main,
                format: 'umd',
                name: 'Opus',
                sourcemap: false
            }
        ]
    }),
    bundle({
        plugins: [dts()],
        output: {
            file: pkg.typings,
            format: 'es'
        }
    })
];