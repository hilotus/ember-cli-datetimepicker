module.exports = {
  description: 'Blueprint for ember-cli-datetimepicker',

  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('coreweb-css', 'git://github.com/hilotus/coreweb-css.git').then(function () {
      return this.addBowerPackageToProject('font-awesome', '~4.4.0');
    }.bind(this));
  }
};
