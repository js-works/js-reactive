import typescript from 'rollup-plugin-typescript2'
import replace from 'rollup-plugin-replace'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'src/demo/demo.tsx',
  output: {
    file: './build/demo.js',
    format: 'iife'
  },
  
  external: ['react', 'react-dom', 'js-spec'],

  plugins: [
    typescript(),
    replace({
      exclude: 'node_modules/**',
      
      values: {
        'process.env.NODE_ENV': "'development'"
      }
    }),
    serve({
      open: true,
      contentBase: '.',
      openPage: '/src/demo/demo.html'
    }),
    livereload({
      watch: ['src/demo', 'build']
    })
  ]
}
