import Ember from 'ember';
import { arraysEqual } from 'ember-cli-datetimepicker/date-utils';

export default Ember.Component.extend({
  tagName: 'td',
  classNameBindings: ['model.isPastDate:date-picker-past-date', 'model.isNextDate:date-picker-next-date', 'modelIsToday:date-picker-today', 'modelIsSelected:date-picker-selected'],

  model: null,
  selected: null,
  today: null,

  modelIsToday: Ember.computed('model', 'today', function() {
    return this.datesIsEquals(this.get('model.dateArray'), this.get('today'));
  }),

  modelIsSelected: Ember.computed('model', 'selected', function() {
    return this.datesIsEquals(this.get('model.dateArray'), this.get('selected'));
  }),

  click: function() {
    this.sendAction('action', this.get('model'));
  },

  /*
    arguments:
      - date1
      - date2
  */
  datesIsEquals: function() {
    var checked,
      value1 = arguments[0],
      value2 = arguments[1];

    if (Ember.isArray(value1) && Ember.isArray(value2)) {
      checked = arraysEqual(value1, value2);
    } else {
      checked = value1 === value2;
    }
    return checked;
  }
});
