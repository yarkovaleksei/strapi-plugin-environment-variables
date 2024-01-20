import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import { getTrad } from './utils';
import pluginId from './pluginId';
import {
  Initializer,
  PluginIcon,
} from './components';

const name = pluginPkg.strapi.name;

export default {
  register({
    addMenuLink,
    registerPlugin,
  }: {
    addMenuLink: (...args: unknown[]) => void
    registerPlugin: (...args: unknown[]) => void
  }) {
    addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: getTrad('plugin.name'),
        defaultMessage: name,
      },
      Component: async () => {
        const component = await import('./pages/App');

        return component;
      },
      permissions: [],
    });

    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    registerPlugin(plugin);
  },

  async registerTrads({
    locales,
  }: {
    locales: string[]
  }) {
    const importedTrads = await Promise.all(
      (locales as string[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      }),
    );

    return Promise.resolve(importedTrads);
  },
};
