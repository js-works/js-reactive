import { eslint } from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'

function createRollupJsSceneryConfig(platform, productive) {
  return {
    input: `src/main/js-scenery.${platform}.js`,

    output: {
      file: productive
        ? `build/js-scenery.test.${platform}.umd.production.js`
        : `build/js-scenery.test.${platform}.umd.development.js`,

      format: 'umd',
      name: `jsScenery.${platform}`, 
      sourcemap: 'inline',

      globals: {
        'js-spec': 'jsSpec',
        'react': 'React',
        'dio.js': 'dio'
      }
    },

    external: ['js-spec', 'react', 'dio.js'],

    plugins: [
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs({
        namedExports: {
          'node_modules/js-spec/index.js': ['Spec']
        }
      }),
      eslint({
        exclude: [
          'src/styles/**',
        ]
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      replace({
        exclude: 'node_modules/**',
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      })
    ],
  }
}

const configs = []

for (const platform of ['react', 'dio']) {
  for (const productive of [true, false]) {
    configs.push(createRollupJsSceneryConfig(platform, productive))
  }
}

export default configs