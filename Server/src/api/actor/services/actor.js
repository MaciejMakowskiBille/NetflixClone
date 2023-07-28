'use strict';

/**
 * actor service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::actor.actor');
