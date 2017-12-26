'use strict';

module.exports = (sequelize, DataTypes) => {

  const Recordings = sequelize.define('recordings', {
    ramal: { type: DataTypes.STRING },
    dtInicial: { type: DataTypes.STRING },
    dtFinal: { type: DataTypes.STRING }
  });

  return Recordings;
};
