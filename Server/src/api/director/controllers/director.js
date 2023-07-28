'use strict';

/**
 * director controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::director.director');
