Package.describe({
  name: 'philippspo:tree',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'folder structure style tree built for mongo collections',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/PhilippSpo/tree',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');

  // Client
  api.use(['templating'], 'client');
  api.use('mquandalle:stylus@1.0.9', 'client');
  api.use("fourseven:scss@1.0.0", 'client');
  api.imply("fourseven:scss");

  // Client Files
  api.addFiles([
    'client/PlanificaTree.js',
    'client/tree.html',
    'client/tree.js',
    'client/tree.styl'
    ], 'client');
  
  api.export("PlanificaTree");
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('philippspo:tree');
  api.addFiles('philippspo:tree-tests.js');
});
