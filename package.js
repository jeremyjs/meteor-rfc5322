Package.describe({
  name: 'jjman505:rfc5322',
  version: '2.0.1',
  // Brief, one-line summary of the package.
  summary: 'Parse one or many email addresses using the RFC 5322 standard',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/n505/meteor-rfc5322',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.addFiles('both/email-addresses.js', ['client', 'server']);
  api.export('RFC5322');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('jjman505:rfc5322');
  api.addFiles('rfc5322-tests.js');
});
