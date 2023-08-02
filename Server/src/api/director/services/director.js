'use strict';

/**
 * director service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::director.director');
