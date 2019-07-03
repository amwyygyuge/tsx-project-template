const {
  override,
  fixBabelImports,
  removeModuleScopePlugin,
  addBundleVisualizer
} = require('customize-cra')
// module.exports = override(
// 	fixBabelImports('import', {
// 		libraryName: 'antd',
// 		libraryDirectory: 'es',
// 		style: 'css'
// 	})
// )
module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }),
    removeModuleScopePlugin(),
    addBundleVisualizer(
      {
        analyzerMode: 'static',
        reportFilename: 'report.html'
      },
      true
    )
  ),
  jest: config => {
    config.testMatch = [ '<rootDir>/test/**/*.{spec,test}.{js,jsx,ts,tsx}' ]
    return config
  },
  paths: (paths, env) => {
    return paths
  }
}
