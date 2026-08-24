import postcss from 'rollup-plugin-postcss'
import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import svgr from '@svgr/rollup'

const commonPlugins = [
  svgr({
    exportType: 'default',
    svgoConfig: {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
            },
          },
        },
      ],
    },
  }),
  peerDepsExternal(),
  nodeResolve(),
  commonjs(),
  postcss({
    extract: 'react-tailwind.css',
    minimize: true,
    sourceMap: true,
  }),
]

const external = ['react', 'react-dom', 'tailwind-merge', '@headlessui/react', 'react-window']

const onwarn = (warning, warn) => {
  if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && /use client/.test(warning.message)) {
    return
  }
  warn(warning)
}

export default [
  // 1. ES Modules Build (Preserved modules for 100% tree-shaking)
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/es',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    plugins: [
      ...commonPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        outDir: 'dist/es',
        declaration: false,
        declarationDir: undefined,
        rootDir: 'src',
        exclude: ['**/*.test.ts', '**/*.test.tsx'],
      }),
    ],
    external,
    onwarn,
  },
  // 2. CommonJS Modules Build
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      exports: 'named',
    },
    plugins: [
      ...commonPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        outDir: 'dist/cjs',
        declaration: false,
        declarationDir: undefined,
        rootDir: 'src',
        exclude: ['**/*.test.ts', '**/*.test.tsx'],
      }),
    ],
    external,
    onwarn,
  },
  // 3. Monolithic Single-File Bundles (backward compatibility)
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/react-tailwind.es.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: 'dist/react-tailwind.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      ...commonPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        outDir: 'dist',
        declaration: false,
        declarationDir: undefined,
        rootDir: 'src',
        exclude: ['**/*.test.ts', '**/*.test.tsx'],
      }),
    ],
    external,
    onwarn,
  },
]
