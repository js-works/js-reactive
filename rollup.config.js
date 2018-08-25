import { eslint } from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import { uglify as uglifyJS} from 'rollup-plugin-uglify'
import uglifyES from 'rollup-plugin-uglify-es'
import gzip from 'rollup-plugin-gzip'

function createRollupConfig(platform, moduleFormat, productive, customDest = null) {
  return {
    input: `src/main/js-scenery.${platform}.js`,

    output: {
      file: customDest
        ? customDest
        : productive
          ? `dist/js-scenery.${platform}.${moduleFormat}.production.js`
          : `dist/js-scenery.${platform}.${moduleFormat}.development.js`,

      format: moduleFormat,
      name: `jsScenery.${platform}`, 
      sourcemap: productive ? false : 'inline',

      globals: {
        'js-spec': 'jsSpec',
        'react': 'React',
        'dio.js': 'dio'
      }
    },

    external: ['react', 'dio.js'],

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
        
        values: {
          'process.env.NODE_ENV': productive ? "'production'" : "'development'"
        }
      }),
      productive && (moduleFormat === 'esm' ? uglifyES() : uglifyJS()),
      productive && gzip()
    ],
  }
}

const configs = []

for (const platform of ['react', 'dio']) {
  for (const format of ['umd', 'cjs', 'amd', 'esm']) {
    for (const productive of [true, false]) {
      configs.push(createRollupConfig(platform, format, productive))
    }
  }

  configs.push(createRollupConfig(platform, 'umd', true, `dist/main/${platform}.js`))
}

export default configs
