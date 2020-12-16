const app = require('express')();
const routes = require('./routes/index');

app.use('/', routes);

exports = module.exports = app;