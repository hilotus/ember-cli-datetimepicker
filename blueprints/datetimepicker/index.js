module.exports = {
  description: 'Blueprint for ember-cli-datetimepicker',

  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('coreweb-css', 'git://github.com/hilotus/coreweb-css.git');
  }
};
