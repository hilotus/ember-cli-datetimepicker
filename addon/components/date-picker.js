import Ember from 'ember';
import generateDates from 'ember-cli-datetimepicker/generate-dates';

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
    if (Ember.isArray(this.model) && this.model.length === 3) {
      return this.model[0] + '-' + this.model[1] + '-' + this.model[2];
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

    if (!this.model || !Ember.isArray(this.model) || this.model.length !== 3) {
      throw new Ember.Error("Datepicker's model must be an array of length 3.");
    }

    var model = this.get('model');
    this.set('year', model[0]);
    this.set('month', model[1]);
    this.set('date', model[2]);

    var today = new Date();
    this.set('currentYear', today.getFullYear());
    this.set('currentMonth', today.getMonth() + 1);
    this.set('currentDate', today.getDate());
  },

  resetModel: function (year, month, date) {
    this.set('model', [year, month, date]);
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
      var top = this.$().position().top,
        winHeight = Ember.$(window).height(),
        height = this.$().find('.dp').height();

      this.set('isUp', top > winHeight && winHeight - top < height);

      if (this.isUp) {
        this.$().find('.dp').css({top: '-' + (height + 1)+ 'px'});
      } else {
        this.$().find('.dp').removeAttr('style');
      }

      this.set('isOpen', !this.isOpen);
    },

    selectDate: function (date) {
      this.set('year', date.get('year'));
      this.set('month', date.get('month'));
      this.set('date', date.get('date'));
      this.set('model', [this.year, this.month, this.date]);
      this.set('selectedDate', [this.year, this.month, this.date]);
      this.set('isOpen', false);
    },

    pastMonth: function () {
      var month = window.parseInt(this.get('month')),
        year = window.parseInt(this.get('year'));

      if (month === 1) {
        this.set('month', 12);
        this.set('year', year - 1);
      } else {
        this.set('month', month - 1);
      }
      this.resetModel(this.year, this.month, this.date);
    },

    nextMonth: function () {
      var month = window.parseInt(this.get('month')),
        year = window.parseInt(this.get('year'));

      if (month === 12) {
        this.set('month', 1);
        this.set('year', year + 1);
      } else {
        this.set('month', month + 1);
      }
      this.resetModel(this.year, this.month, this.date);
    }
  }
});
