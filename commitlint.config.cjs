module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'workspace', // anything applied to whole repo
        'deps', // related to dependencies
        'app',
        'branding',
        'map',
        'http-client',
        'session-service',
        'measurement-unit',
        'dimension',
        'traccar',
        'vehicle-service',
        'web-share',
        'utils',
        'model',
        'ui-atom',
        'ui-molecule',
        'ui-organism',
        'ui-template',
        'ui-page',
      ],
    ],
  },
};
