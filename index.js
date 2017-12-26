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
      player = require('play-sound');
      passport	= require('passport');

app.use(logger('dev'));

app.use(passport.initialize());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

routes(app,controllers);

db.sequelize.sync({ force:false }).then(() => {
    http.createServer(app).listen(config.port, function(){
          console.log('Express server listening on port ' + config.port);
    });
});
