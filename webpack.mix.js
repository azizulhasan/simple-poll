const mix = require('laravel-mix');

mix.js('src/dashboard/index.js', 'admin/js/simple-poll-dashboard.js').react();

// mix.webpackConfig({

// });
