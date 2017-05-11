'use strict';

const db = require('../config/db');
const player = require('play-sound')({});
const ms = require('mediaserver');
//var play = require('play');

var sequelize = db.sequelize;

   exports.playaudio = function(req,res){

      ms.pipe(req, res, "./audio/out-0999553028-2010-20170502-090412-1493726652.1057.wav");

   }

//	player.play('../audio/out-0999553028-2010-20170502-090412-1493726652.1057.wav', function(err){
  		//if (err) throw err
//	});

	//play.usePlayer('mplayer');
	//play.sound('../audio/out-0999553028-2010-20170502-090412-1493726652.1057.wav');

//    },

    exports.lista = function(req,res){

         sequelize.query('SELECT cast(calldate as date) as calldate,	src, dst,	duration,	disposition FROM cdr WHERE LENGTH(dst) > 5',
                  {
                    type: sequelize.QueryTypes.SELECT
                  })
                     .then(recs => res.status(201).send(recs))
                     .catch(error => res.status(400).send(error));

      },

      exports.listaDisposition = function(req,res){

           sequelize.query('select DISTINCT(disposition) from cdr',{ type: sequelize.QueryTypes.SELECT })
                       .then(recs => res.status(201).send(recs))
                       .catch(error => res.status(400).send(error));

        },

      exports.listaOrigem = function(req,res){

             sequelize.query('select DISTINCT(src) from cdr WHERE dst <> "s" AND cast(calldate as date) between :inicial and :final AND length(recordingfile) > 1',
                     { replacements: { inicial: req.params.dtInicial,
                                       final: req.params.dtFinal },
                                       type: sequelize.QueryTypes.SELECT
                     })
                         .then(recs => res.status(201).send(recs))
                         .catch(error => res.status(400).send(error));

          },

      exports.listaDestino = function(req,res){

                 sequelize.query('select DISTINCT(dst) from cdr WHERE dst <> "s" AND cast(calldate as date) between :inicial and :final AND src = :source and length(recordingfile) > 1',
                         { replacements: { inicial: req.params.dtInicial,
                                           final: req.params.dtFinal,
                                           source: req.params.source },
                                           type: sequelize.QueryTypes.SELECT
                         })
                             .then(recs => res.status(201).send(recs))
                             .catch(error => res.status(400).send(error));

              },

     exports.busca = function(req,res){

        var querytext =      'SELECT	calldate,'
                            +' src, dst,	duration,'
                            +' billsec, disposition, recordingfile FROM cdr'
                            +' WHERE cast(calldate as date)'
                            +' between :inicial and :final and'
                            +' dst <> "s" and'
                            +' length(recordingfile) > 1';

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
