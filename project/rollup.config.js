import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import { pathToFileURL } from 'node:url'

const url = pathToFileURL('src/../..')

const { href } = url

export default [
  {
    input: `src/js/index.js`,
    output: {
      file: `dist/js/main.min.js`,
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      nodeResolve({
        browser: true,
        dedupe: [
        ]
      }),
      {
        resolveImportMeta(property, { moduleId }) {
          if (property === null || property === 'url') {
            const path = pathToFileURL(moduleId).href.replace(href, '')
            const url = `new URL('${path}', globalThis.location).href`

            if (!property) {
              return `{ url: ${url} }`
            }

            return url
          }

          return null
        }
      },
      commonjs(),
      babel({
        babelHelpers: 'runtime'
      }),
      terser()
    ],
    external: [
      'core-js'
    ]
  }
]
