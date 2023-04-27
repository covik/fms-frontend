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
        'http-client',
        'session-service',
        'measurement-unit',
        'dimension',
        'traccar',
        'vehicle-service',
        'web-share',
      ],
    ],
  },
};
