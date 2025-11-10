import path from 'path'
import postcss from 'rollup-plugin-postcss'
import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import svgr from '@svgr/rollup'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/react-tailwind.es.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/react-tailwind.cjs.js',
      format: 'cjs',
      sourcemap: true
    }
  ],
  plugins: [
    svgr({
      exportType: "default",
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          }
        ]
      }
    }),
    peerDepsExternal(), // prevents bundling react/react-dom
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types',
      rootDir: 'src',
      exclude: ['**/*.test.ts', '**/*.test.tsx']
    }),
    postcss({
      extract: 'react-tailwind.css',
      minimize: true,
      sourceMap: true
    })
  ],
  external: [
    'react',
    'react-dom',
    'tailwind-merge',
    '@headlessui/react'
  ],
  onwarn(warning, warn) {
    if (
      warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
      /use client/.test(warning.message)
    ) {
      return;
    }
    warn(warning);
  },
}
