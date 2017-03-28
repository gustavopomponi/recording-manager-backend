'use strict';

const db = require('../config/db');

var sequelize = db.sequelize;

    exports.lista = function(req,res){

         sequelize.query('SELECT	calldate,	src, dst,	duration,	billsec FROM cdr WHERE LENGTH(dst) > 5',{ type: sequelize.QueryTypes.SELECT })
                     .then(recs => res.status(201).send(recs))
                     .catch(error => res.status(400).send(error));

      },

      exports.listaDisposition = function(req,res){

           sequelize.query('select DISTINCT(disposition) from cdr',{ type: sequelize.QueryTypes.SELECT })
                       .then(recs => res.status(201).send(recs))
                       .catch(error => res.status(400).send(error));

        },

      exports.listaOrigem = function(req,res){

             sequelize.query('select DISTINCT(src) from cdr WHERE dst <> "s"',{ type: sequelize.QueryTypes.SELECT })
                         .then(recs => res.status(201).send(recs))
                         .catch(error => res.status(400).send(error));

          },

      exports.listaDestino = function(req,res){

                 sequelize.query('select DISTINCT(dst) from cdr WHERE dst <> "s"',{ type: sequelize.QueryTypes.SELECT })
                             .then(recs => res.status(201).send(recs))
                             .catch(error => res.status(400).send(error));

              },

     exports.busca = function(req,res){

        var querytext =      'SELECT	calldate,'
                            +' src, dst,	duration,'
                            +' billsec, disposition FROM cdr'
                            +' WHERE cast(calldate as date)'
                            +' between :inicial and :final and'
                            +' dst <> "s"';

          if( req.src.length > 1){

            querytext = querytext + ' and src = :src';

          }

          if( req.dst.length > 1){

            querytext = querytext + ' and dst = :dst';

          }

          if( req.status.length > 1){

            querytext = querytext + ' and disposition = :status';

          }

          sequelize.query(querytext,
                                { replacements: { inicial: req.dt_inicial,
                                                    final: req.dt_final,
                                                      src: req.src,
                                                      dst: req.dst,
                                                   status: req.status },
                                                     type: sequelize.QueryTypes.SELECT })
                                .then(recs => res.status(201).send(recs))
                                .catch(error => res.status(400).send(error));

      }


//exports.findById = function() {};
//exports.add = function() {};
//exports.update = function() {};
//exports.delete = function() {};

//};
