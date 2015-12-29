import Ember from 'ember';

function leftPad(num, size) {
  var s = num + "";
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}

export default Ember.Mixin.create({
  // yyyy-mm-dd
  format: "%@-%@-%@",

  /*
    [year, month, date]
    [2014, 10, 10]
  */
  today: Ember.computed(function () {
    var t = new Date();
    return [t.getFullYear(), t.getMonth() + 1, t.getDate()];
  }),

  selected: [],

  model: Ember.computed('selected', {
    get: function () {
      return this.get('selected');
    },

    set: function (key, value) {
      value = value || this.get('today');
      this.set('selected', value);
      return value;
    }
  }),

  year: Ember.computed('model', function () {
    return this.get('model')[0];
  }),

  month: Ember.computed('model', function () {
    return leftPad(this.get('model')[1], 2);
  }),

  date: Ember.computed('model', function () {
    return leftPad(this.get('model')[2], 2);
  }),

  value: Ember.computed('model', function () {
    var model = this.get('model');
    return this.format.fmt(model[0], leftPad(model[1], 2), leftPad(model[2], 2));
  })
});
