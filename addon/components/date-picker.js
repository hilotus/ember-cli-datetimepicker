import Ember from 'ember';
import generateDates from 'ember-cli-datetimepicker/generate-dates';

function leftPad(num, size) {
  var s = num + "";
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}

export default Ember.Component.extend({
  classNames: ['dp-wrapper'],
  isOpen: false,
  isUp: false,
  format: "yyyy-mm-dd",

  __cache__: {},
  weekOptions: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  model: [],

  selectedDate: [],

  value: Ember.computed('model', function () {
    var model = this.get('model');

    if (Ember.isArray(model) && model.length === 3) {
      return model[0] + '-' + leftPad(model[1], 2) + '-' + leftPad(model[2], 2);
    } else {
      return '';
    }
  }),

  monthName: Ember.computed('month', function () {
    return this.monthNames[this.get('month') - 1];
  }),

  weekDates: Ember.computed('year', 'month', function () {
    var dates;
    dates = this.get("__cache__." + this.year + "-" + this.month);
    if (dates) {
      return dates;
    }
    dates = generateDates(this.year, this.month);
    this.set("__cache__." + this.year + "-" + this.month, dates);
    return dates;
  }),

  today: Ember.computed('currentYear', 'currentMonth', 'currentDate', function() {
    return [this.currentYear, this.currentMonth, this.currentDate];
  }),

  init: function () {
    this._super.apply(this, arguments);

    var today = new Date();
    this.set('currentYear', today.getFullYear());
    this.set('currentMonth', today.getMonth() + 1);
    this.set('currentDate', today.getDate());

    this.modelSetup();
  },

  modelChanged: Ember.observer('model', function () { this.modelSetup(); }),

  modelSetup: function () {
    var model = this.get('model');

    if (!model || !Ember.isArray(model) || model.length !== 3) {
      throw new Ember.Error("DatePicker's model must be an array of length 3.");
    }

    this.set('year', model[0]);
    this.set('month', model[1]);
    this.set('date', model[2]);
  },

  // TODO: use jquery ui position.
  // setup: function () {
  //   this.$().find('.dp').position({
  //     my: "center top",
  //     at: "center bottom",
  //     of: this.$().find('button'),
  //     collision: 'flipfit'
  //   });
  // }.on('didInsertElement'),

  actions: {
    openPicker: function () {
      if (this.isOpen) {
        this.set('isOpen', false);
      } else {
        var top = this.$().position().top,
          winHeight = Ember.$(window).height(),
          height = this.$().find('.dp').height();

        this.set('isUp', winHeight - top < height);

        if (this.isUp) {
          this.$().find('.dp').css({top: '-' + (height + 1)+ 'px'});
        } else {
          this.$().find('.dp').removeAttr('style');
        }

        this.set('isOpen', true);
      }
    },

    selectDate: function (date) {
      this.set('model', [date.get('year'), date.get('month'), date.get('date')]);
      this.set('selectedDate', this.get('model'));
      this.set('isOpen', false);
    },

    pastMonth: function () {
      var month = window.parseInt(this.get('month')),
        year = window.parseInt(this.get('year')),
        date = window.parseInt(this.get('date'));

      if (month === 1) {
        month = 12;
        year = year - 1;
      } else {
        month = month - 1;
      }
      this.set('model', [year, month, date]);
    },

    nextMonth: function () {
      var month = window.parseInt(this.get('month')),
        year = window.parseInt(this.get('year')),
        date = window.parseInt(this.get('date'));

      if (month === 12) {
        month = 1;
        year = year + 1;
      } else {
        month = month + 1;
      }
      this.set('model', [year, month, date]);
    }
  }
});
