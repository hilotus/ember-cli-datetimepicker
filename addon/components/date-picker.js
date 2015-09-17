import Ember from 'ember';
import dateUtils from 'ember-cli-datetimepicker/date-utils';
import datePickerMixin from 'ember-cli-datetimepicker/mixins/date-picker';

// model is array, [2015, 01, 01]
export default Ember.Component.extend(datePickerMixin, {
  classNames: ['date-picker'],
  isOpen: false,
  isUp: false,

  __cache__: {},
  weekOptions: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  monthName: Ember.computed('month', function () {
    return this.get('monthNames.%@'.fmt(this.get('month') - 1));
  }),

  weekDates: Ember.computed('year', 'month', function () {
    var dates;
    dates = this.get("__cache__." + this.get('year') + "-" + this.get('month'));
    if (dates) {
      return dates;
    }
    dates = dateUtils['generateDates'](this.get('year'), this.get('month'));
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
          dpHeight = this.$().find('.date-picker-modal').height();

        this.set('isUp', winHeight - top < dpHeight);

        if (this.isUp) {
          this.$().find('.date-picker-modal').css({top: '-' + (dpHeight + 3)+ 'px'});
        } else {
          this.$().find('.date-picker-modal').removeAttr('style');
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
