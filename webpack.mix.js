const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.js('resources/js/world.js', 'public/js')
.webpackConfig({
    resolve: {
        alias: {
        'easystarjs': path.resolve(__dirname, 'node_modules/easystarjs') // Verifique o caminho correto aqui.
        }
    }
});
