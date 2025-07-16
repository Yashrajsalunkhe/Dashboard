import baseConfig from '@repo/eslint-config/vite'

export default [
  ...baseConfig,
  {
    ignores: ['dist/**'],
  },
]
