/**
 * /* craco.config.js
 *
 * @format
 */

const CracoLessPlugin = require('craco-less')
const defaultOptions = require('./defaultOptions')
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    webpack: {
        alias: {
            '@': resolve('src'),
            '@/utils': resolve('src/utils'),
        },
        plugins: [],
       
        configure: (webpackConfig, {env, paths}) => {
            return webpackConfig
        },
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                source: 'tsconfig',
                baseUrl: './src',
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: defaultOptions,
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
}
