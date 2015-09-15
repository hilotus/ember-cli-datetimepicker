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
  format: "YYYY-MM-DD",

  __cache__: {},
  weekOptions: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

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
    return this.get('model')[1];
  }),

  date: Ember.computed('model', function () {
    return this.get('model')[2];
  }),

  value: Ember.computed('model', function () {
    var model = this.get('model');

    if (Ember.isArray(model) && model.length === 3) {
      return model[0] + '-' + leftPad(model[1], 2) + '-' + leftPad(model[2], 2);
    } else {
      return '';
    }
  }),

  monthName: Ember.computed('month', function () {
    return this.get('monthNames.%@'.fmt(this.get('month') - 1));
  }),

  weekDates: Ember.computed('year', 'month', function () {
    var dates;
    dates = this.get("__cache__." + this.get('year') + "-" + this.get('month'));
    if (dates) {
      return dates;
    }
    dates = generateDates(this.get('year'), this.get('month'));
    this.set("__cache__." + this.get('year') + "-" + this.get('month'), dates);
    return dates;
  }),

  /*
    click else where to close the popuped modal.
  */
  onClickElsewhere: function(event) {
    // send action to component.
    this.send('toggleOpen', event);
  },

  didInsertElement: function() {
    this._super.apply(this, arguments);
    return Ember.$(document).on('click', Ember.$.proxy(this.get('onClickElsewhere'), this));
  },

  willDestroyElement: function() {
    this._super.apply(this, arguments);
    Ember.$(document).off('click', Ember.$.proxy(this.get('onClickElsewhere'), this));
  },

  actions: {
    toggleOpen: function(event)  {
      var isOutside = false,
        $self;

      if (event && ($self = this.$()[0])) {
        isOutside = !$self.contains(event.target);
        if (isOutside) {
          this.set('isOpen', false);
        }
      } else {
        this.set('isOpen', !this.get('isOpen'));
      }
    },

    openPicker: function () {
      if (this.isOpen) {
        this.set('isOpen', false);
      } else {
        var top = this.$().offset().top,
          winHeight = Ember.$(window).height(),
          dpHeight = this.$().find('.dp').height();

        this.set('isUp', winHeight - top < dpHeight);

        if (this.isUp) {
          this.$().find('.dp').css({top: '-' + (dpHeight + 3)+ 'px'});
        } else {
          this.$().find('.dp').removeAttr('style');
        }

        this.set('isOpen', true);
      }
    },

    selectDate: function (date) {
      this.set('model', [date.get('year'), date.get('month'), date.get('date')]);
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
