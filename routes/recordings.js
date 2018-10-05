'use strict';

const recordingController = require('../controllers').recordings;

module.exports = (app, db) => {

  //app.get('/api/gravacoes/ramal/:ramal/dataInicial/:dtInicial/dataFinal/:dtFinal', recordingController.busca);

  app.get('/dispositions', recordingController.listaDisposition);

  app.get('/origens/:ramal/:dtInicial/:dtFinal', recordingController.listaOrigem);

  app.get('/destinos/:dtInicial/:dtFinal/:source', recordingController.listaDestino);

  // GET Calls by date interval
  //app.get('/recordings/:dt_inicial/:dt_final/:src?/:dst?/:status?', recordingController.busca);

  app.get(/\/recordings\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)/, function(req, res) {

    var parametros = [];

    parametros.dt_inicial = req.params[0];
    parametros.dt_final = req.params[1];
    parametros.src = req.params[2];
    parametros.dst = req.params[3];
    parametros.status = req.params[4];

    recordingController.busca(parametros,res);

  });

};
