'use strict';

const db = require('../config/db');

var sequelize = db.sequelize;

    exports.lista = function(req,res){

         sequelize.query('SELECT	calldate,	src, dst,	duration,	billsec FROM cdr WHERE LENGTH(dst) > 5')
                     .then(recs => res.status(201).send(recs))
                     .catch(error => res.status(400).send(error));

      },
     exports.busca = function(req,res){

          sequelize.query('SELECT	calldate,'
                                      +' src, dst,	duration,'
                                      +' billsec FROM cdr'
                                      +' WHERE cast(calldate as date)'
                                      +' between :inicial and :final and'
                                      +' LENGTH(dst) > 5',
                                { replacements: { inicial: req.params.dt_inicial,
                                                    final: req.params.dt_final },
                                                     type: sequelize.QueryTypes.SELECT })
                                .then(recs => res.status(201).send(recs))
                                .catch(error => res.status(400).send(error));

      }


//exports.findById = function() {};
//exports.add = function() {};
//exports.update = function() {};
//exports.delete = function() {};

//};
