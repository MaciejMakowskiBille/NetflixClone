'use strict';

/**
 * producer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::producer.producer');
