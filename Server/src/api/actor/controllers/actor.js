'use strict';

/**
 * actor controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::actor.actor');
