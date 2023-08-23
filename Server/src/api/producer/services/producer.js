'use strict';

/**
 * producer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::producer.producer');
