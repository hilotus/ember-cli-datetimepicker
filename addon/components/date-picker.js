import Ember from 'ember';
import { Calendar, generateDates, validateDateFormat } from 'ember-cli-datetimepicker/date-utils';
import datePickerMixin from 'ember-cli-datetimepicker/date-picker-mixin';

export default Ember.Component.extend(datePickerMixin, {
  classNames: ['date-picker'],

  isOpen: false,
  // 1. upward, 2. downward
  direction: 'downward',
  showLunarCalendar: false,

  __cache__: {},
  weekOptions: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  monthName: Ember.computed('month', function() {
    return this.get(`monthNames.${this.get('month') - 1}`);
  }),

  weekDates: Ember.computed('year', 'month', function() {
    var dates = this.get("__cache__." + this.get('year') + "-" + this.get('month'));
    if (dates) {
      return dates;
    }
    dates = generateDates(this.get('year'), this.get('month'));
    this.set("__cache__." + this.get('year') + "-" + this.get('month'), dates);
    return dates;
  }),

  isOpenChanged: Ember.observer('isOpen', function() {
    if (this.get('isOpen')) {
      // var top = this.$().offset().top,
        // winHeight = Ember.$(window).height(),
      var dpHeight = this.$().find('.date-picker-modal').height();

      // we now don't automatic set isUp, decide by user.
      // this.set('isUp', winHeight - top < dpHeight);

      if (this.get('direction') === 'upward') {
        this.$().find('.date-picker-modal').css({top: '-' + (dpHeight + 3)+ 'px'});
      } else {
        this.$().find('.date-picker-modal').removeAttr('style');
      }
    }
  }),

  modelChanged: Ember.observer('year', 'month', 'date', function() {
    this.set('calendar', Calendar.generate(this.get('year'), this.get('month'), this.get('date')));
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
    toggleOpen: function() {
      var isOutside = false,
        $self = this.$()[0],
        event = arguments[0];

      if (event) {
        isOutside = !$self.contains(event.target);
        if (isOutside) {
          this.set('isOpen', false);
        } else {
          if (Ember.$(event.target).hasClass('ember-text-field') || Ember.$(event.target).parents('.date-picker-cell').length > 0) {
            this.set('isOpen', !this.get('isOpen'));
          } else {
            this.set('isOpen', true);
          }
        }
      } else {
        throw Error('You should make sure the first argument is JQuery.Event');
        // this.set('isOpen', !this.get('isOpen'));
      }
    },

    /*
      We should make sure date is a 'yyyy-mm-dd' or an instance of Calendar Class.
    */
    selectDate: function(date) {
      if (typeof date === 'string') {
        this.set('model', date.split('-').map(i => parseInt(i)));
      } else {
        this.set('model', [date.get('year'), date.get('month'), date.get('date')]);
      }
    },

    inputDate: function() {
      var value = arguments[0],
        event = arguments[1],
        keyCode = event.which || event.keyCode;

      if (keyCode === 13 || keyCode === 32) {
        if (validateDateFormat(value)) {
          this.send('selectDate', value);
        }
        event.preventDefault();
      } else if (keyCode === 27) {
        this.set('isOpen', false);
      }
    },

    validatDate: function() {
      var value = arguments[0],
        event = arguments[1],
        keyCode = event.which || event.keyCode;

      if (keyCode !== 13 && keyCode !== 32 && keyCode !== 27) {
        this.set('valueValidation', validateDateFormat(value));
      }
    },

    pastMonth: function() {
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

    nextMonth: function() {
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
