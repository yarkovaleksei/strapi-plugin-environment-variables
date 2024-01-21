import { Strapi } from '@strapi/strapi';
import permissionsActions  from './permissions-actions';

export default async function bootstrap({ strapi }: { strapi: Strapi }) {
  await strapi
    .admin
    .services
    .permission
    .actionProvider
    .registerMany(
      permissionsActions.actions,
    );
}
