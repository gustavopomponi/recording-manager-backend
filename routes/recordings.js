'use strict';

const recordingController = require('../controllers').recordings;

module.exports = (app, db) => {

  // GET All Calls
  app.get('/recordings', recordingController.lista);

  // GET Calls by date interval
  app.get('/recordings/:dt_inicial/:dt_final', recordingController.busca);

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
