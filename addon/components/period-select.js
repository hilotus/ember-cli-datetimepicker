import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'select',
  periods: ['AM', 'PM'],
  value: null,

  setup: function () {
    Ember.run.schedule('afterRender', this, function () {
      this.$().on('change', function (event) {
        this.set('value', event.target.value);
      }.bind(this));
    });
  }.on('didInsertElement')
});
