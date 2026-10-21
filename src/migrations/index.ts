import * as migration_20261015_200707_initial from './20261015_200707_initial';
import * as migration_20261021_201913_add_assessments from './20261021_201913_add_assessments';

export const migrations = [
  {
    up: migration_20261015_200707_initial.up,
    down: migration_20261015_200707_initial.down,
    name: '20261015_200707_initial',
  },
  {
    up: migration_20261021_201913_add_assessments.up,
    down: migration_20261021_201913_add_assessments.down,
    name: '20261021_201913_add_assessments'
  },
];
