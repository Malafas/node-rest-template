'use strict';

var log = require('./infrastructure/logger');

// -----------------------------------------------------------------------------
// Start the database
// -----------------------------------------------------------------------------
var persistence = require('./application/persistence');
log.info('Database Started');

// -----------------------------------------------------------------------------
// Start the HTTP Server and expose the RESTful API
// -----------------------------------------------------------------------------
var port = process.env.PORT || 8082;

var api = require('./adapter/rest/api');
var server = require('http').createServer(api);

// Start listening to HTTP requests
server.listen(port, function() {
    log.info('Listening on port ' + port);
});