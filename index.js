/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-datetimepicker',

  included: function (app) {
    this._super.included(app);

    // css
    app.import(app.bowerDirectory + '/coreweb-css/css/datetimepicker-theme/date-picker.css');
    app.import(app.bowerDirectory + '/coreweb-css/css/datetimepicker-theme/time-picker.css');

    app.import(app.bowerDirectory + '/coreweb-css/css/modal.css');
    app.import(app.bowerDirectory + '/coreweb-css/css/datetimepicker-theme/date-picker-mobile.css');
  }
};
