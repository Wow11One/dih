import * as migration_20261015_200707_initial from './20261015_200707_initial';

export const migrations = [
  {
    up: migration_20261015_200707_initial.up,
    down: migration_20261015_200707_initial.down,
    name: '20261015_200707_initial'
  },
];
