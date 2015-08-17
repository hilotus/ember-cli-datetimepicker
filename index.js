/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-datetimepicker',

  included: function (app) {
    this._super.included(app);

    // css
    app.import(app.bowerDirectory + '/coreweb-css/css/datetimepicker-theme/default.css');

    // font awesome
    app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.ttf', {destDir: "fonts"});
    app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.eot', {destDir: "fonts"});
    app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.svg', {destDir: "fonts"});
    app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.woff', {destDir: "fonts"});
    app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.woff2', {destDir: "fonts"});
    app.import(app.bowerDirectory + '/font-awesome/fonts/FontAwesome.otf', {destDir: "fonts"});
    app.import(app.bowerDirectory + '/font-awesome/css/font-awesome.min.css');
  }
};
