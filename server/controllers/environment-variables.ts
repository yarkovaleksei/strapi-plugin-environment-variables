import { Strapi } from '@strapi/strapi';
import { Context } from 'koa';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx: Context) {
    ctx.body = strapi
      .plugin('environment-variables')
      .service('environmentVariablesService')
      .getEnvironmentVariables();
  },
});
