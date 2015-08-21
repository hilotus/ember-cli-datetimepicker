import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['tp'],

  model: [],
  isFocus: false,

  modelChanged: Ember.observer('model', function () { this.modelSetup(); }),

  init: function () {
    this._super.apply(this, arguments);
    this.modelSetup();
  },

  modelSetup: function () {
    var model = this.get('model');
    if (!model || !Ember.isArray(model) || model.length !== 3) {
      throw new Ember.Error("TimePicker's model must be an array of length 3.");
    }
    this.set('hour', window.parseInt(model[0]));
    this.set('minute', window.parseInt(model[1]));
    this.set('period', model[2]);
  },

  setup: function () {
    Ember.run.schedule('afterRender', this, function () {
      this.$().find('input')
        .on('focus', function () {
          this.set('isFocus', true);
        }.bind(this))
        .on('blur', function () {
          this.set('isFocus', false);
        }.bind(this));
    });
  }.on('didInsertElement'),

  actions: {
    hourKeyDown: function () {
      var hour = this.get('hour'),
        period = this.get('period');

      if (hour === 11) {
      }
    },

    minuteKeyDown: function () {

    }
  }
});
