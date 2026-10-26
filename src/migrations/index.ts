import * as migration_20261025_101824_initial from './20261025_101824_initial';
import * as migration_20261025_111718_seo_plugin from './20261025_111718_seo_plugin';

export const migrations = [
  {
    up: migration_20261025_101824_initial.up,
    down: migration_20261025_101824_initial.down,
    name: '20261025_101824_initial',
  },
  {
    up: migration_20261025_111718_seo_plugin.up,
    down: migration_20261025_111718_seo_plugin.down,
    name: '20261025_111718_seo_plugin'
  },
];
