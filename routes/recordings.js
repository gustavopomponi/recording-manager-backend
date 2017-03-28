'use strict';

const recordingController = require('../controllers').recordings;

module.exports = (app, db) => {

  // GET All Calls
  app.get('/recordings', recordingController.lista);

  app.get('/dispositions', recordingController.listaDisposition);

  app.get('/origens', recordingController.listaOrigem);

  app.get('/destinos', recordingController.listaDestino);

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

/*
  // POST single owner
  app.post('/cliente', (req, res) => {
    const name = req.body.name;
    const role = req.body.role;
    db.cliente.create({
      name: name,
      role: role
    })
      .then(newOwner => {
        res.json(newOwner);
      })
  });

  // PATCH single owner
  app.patch('/owner/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    db.owners.find({
      where: { id: id }
    })
      .then(owner => {
        return owner.updateAttributes(updates)
      })
      .then(updatedOwner => {
        res.json(updatedOwner);
      });
  });

  // DELETE single owner
  app.delete('/owner/:id', (req, res) => {
    const id = req.params.id;
    db.owners.destroy({
      where: { id: id }
    })
      .then(deletedOwner => {
        res.json(deletedOwner);
      });
  });
  */
};
