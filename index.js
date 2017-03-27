const express = require('express'),
      http = require('http'),
      pg = require('pg'),
      config = require('./config')(),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      app = express();
      db = require('./config/db'),
      env = require('./config/env'),
      controllers = require('./controllers'),
      routes = require('./routes'),

app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app,controllers);

db.sequelize.sync({ force:true }).then(() => {
    http.createServer(app).listen(config.port, function(){
          console.log('Express server listening on port ' + config.port);
    });
});
