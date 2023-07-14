const { readdirSync } = require('fs');
const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const core = getDirectories('./src/core');
const features = getDirectories('./src/features');
const libraries = getDirectories('./src/lib');
const functions = [
  'adapter',
  'fixture',
  'model',
  'query',
  'service',
  'util',
  'ui-atom',
  'ui-molecule',
  'ui-organism',
  'ui-template',
  'ui-page',
];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'workspace', // anything applied to whole repo
        'deps', // related to dependencies
        'branding',
        'foundation',
        ...functions,
        ...features,
        ...core,
        ...libraries,
      ],
    ],
  },
};
