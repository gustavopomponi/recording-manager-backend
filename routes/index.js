'use strict'

const routes = [
    require('./recordings')
//  require('./pets')
];

// Add access to the app and db objects to each route
module.exports = function router(app, controller) {
  return routes.forEach((route) => {
    route(app, controller);
  });
};
