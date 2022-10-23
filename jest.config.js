module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest'
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios|v3-infinite-loading))",
  ],
}