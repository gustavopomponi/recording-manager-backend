'use strict';

const db = require('../config/db');
const player = require('play-sound')({});
const ms = require('mediaserver');
//var play = require('play');

var sequelize = db.sequelize;


      //Primeira Função executada ao abrir a aplicação
      exports.listaPorRamal = function(req,res){

           sequelize.query('SELECT cast(calldate as date) as calldate, '
                           +'cast(calldate as time) as calltime,	'
                           +'src, dst,	duration,	disposition, recordingfile FROM cdr '
                           +'WHERE dst = :ramal AND '
                            +'cast(calldate as date) BETWEEN :dtInicial AND :dtFinal '
                           +'AND char_length(recordingfile) > 1 '
                           +'UNION '
                           +'SELECT cast(calldate as date) as calldate, '
                           +'cast(calldate as time) as calltime,	'
                           +'src, dst,	duration,	disposition, recordingfile FROM cdr '
                           +'WHERE src = :ramal AND '
                           +'cast(calldate as date) BETWEEN :dtInicial AND :dtFinal '
                           +'AND char_length(recordingfile) > 1 ',
                    {
                      replacements: { ramal: req.body.ramal, dtInicial: req.body.dtInicial , dtFinal: req.body.dtFinal },
                      type: sequelize.QueryTypes.SELECT
                    })
                       .then(recs => res.status(201).send(recs))
                       .catch(error => res.status(400).send(error));

        },

      // Função executada para listar todas as dispositions disponíveis para filtro
      exports.listaDisposition = function(req,res){

           sequelize.query('select DISTINCT(disposition) from cdr',{ type: sequelize.QueryTypes.SELECT })
                       .then(recs => res.status(201).send(recs))
                       .catch(error => res.status(400).send(error));

        },

      // Função executada para listar todas as origens disponíveis para filtro
      exports.listaOrigem = function(req,res){

             sequelize.query('select DISTINCT(src) from cdr WHERE dst <> "s" '
                             +' AND cast(calldate as date) between :inicial and :final'
                             +' AND dst = :ramal'
                             +' AND char_length(recordingfile) > 1',
                     { replacements: { inicial: req.params.dtInicial,
                                       final: req.params.dtFinal,
                                       ramal: req.params.ramal},
                                       type: sequelize.QueryTypes.SELECT
                     })
                         .then(recs => res.status(201).send(recs))
                         .catch(error => res.status(400).send(error));

          },

      // Função executada para listar todos os destinos disponíveis para filtro
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

            var querytext =  'select '
          	                      +'cast(cd.calldate as date) as calldate, '
                                  +'cast(cd.calldate as time) as calltime, '
          	                      +'cd.src, '
          	                      +'cd.dst, '
          	                      +'cd.duration, '
          	                      +'cd.disposition, '
                                  +'cd.recordingfile, '
                                  +'case '
                                  +'when length(cd.recordingfile) > 70 '
                                  +'then concat(' + "'" + 'http://recfiles.expocaccer.net/' + "'" + ',SUBSTRING_INDEX(cd.recordingfile,'+ "'" + '/' + "'" +',-4)) '
                                  +'else concat(' + "'" + 'http://recfiles.expocaccer.net/' + "'" + 
                                  ',SUBSTRING(SUBSTRING_INDEX(SUBSTRING_INDEX(cd.recordingfile,'+"'"+'-'+"'"+',-3),'+"'"+'-'+"'"+',1),1,4),'+'/'+
                                  ',SUBSTRING(SUBSTRING_INDEX(SUBSTRING_INDEX(cd.recordingfile,'+"'"+'-'+"'"+',-3),'+"'"+'-'+"'"+',1),5,2),'+'/'+
                                  ',SUBSTRING(SUBSTRING_INDEX(SUBSTRING_INDEX(cd.recordingfile,'+"'"+'-'+"'"+',-3),'+"'"+'-'+"'"+',1),7,2),'+'/'+
                                  ',cd.recordingfile) '
                                  +'end as filepath, '
                                  +'uniqueid '
                              +'from '
                              	+'cdr as cd '
                              +'where '
                              	+'(cd.src = :ramal or cd.dst = :ramal) and '
                              	+'(cast(cd.calldate as date) between :dtInicial and :dtFinal) and '
                              	+'length(cd.recordingfile) > 0 and '
                              	+'cd.disposition = ' + "'ANSWERED'" ;


            sequelize.query(querytext,
                                  { replacements: {          ramal: req.body.ramal,
                                                         dtInicial: req.body.dtInicial,
                                                           dtFinal: req.body.dtFinal },
                                                         type: sequelize.QueryTypes.SELECT })
                                  .then(recs => res.status(201).send(recs))
                                  .catch(error => res.status(400).send(error));


      }


//exports.findById = function() {};
//exports.add = function() {};
//exports.update = function() {};
//exports.delete = function() {};

//};
