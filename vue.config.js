const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3030
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/variables.scss";
        `,
      },
    },
  },
})

