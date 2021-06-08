module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    // GraphQL Loader
    config.module
        .rule('bpmn')
        .test(/\.bpmn$/)
        .use('raw-loader')
        .loader('raw-loader')
        .end()
  }
}
