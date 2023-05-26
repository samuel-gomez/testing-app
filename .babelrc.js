const isProd = String(process.env.NODE_ENV) === 'production'

module.exports = {
  presets: [['@babel/preset-env', {modules: false}], '@babel/preset-react'],
  plugins: ['@babel/plugin-transform-runtime'],
}
