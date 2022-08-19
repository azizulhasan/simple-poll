const mix = require('laravel-mix');

mix.js('src/dashboard/index.js', 'admin/js/pvs-poll-dashboard.js').react();

// mix.webpackConfig({

// });
