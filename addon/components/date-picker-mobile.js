import Ember from 'ember';
import datePickerMixin from 'ember-cli-datetimepicker/mixins/date-picker';
import dateUtils from 'ember-cli-datetimepicker/date-utils';

// model is array, [2015, 01, 01]
export default Ember.Component.extend(datePickerMixin, {
  classNames: ['date-picker-mobile'],
  isActive: false,

  actions: {
    toggleActive: function () {
      this.set('isActive', !this.get('isActive'));
    },

    plus: function (type) {
      var year = parseInt(this.get('model')[0]),
        month = parseInt(this.get('model')[1]),
        date = parseInt(this.get('model')[2]);

      if (type === 'year') {
        year = year + 1;
      } else if (type === 'month') {
        if (month < 12) {
          month = month + 1;
        } else {
          month = 1;
          year = year + 1;
        }
      } else if (type === 'date') {
        var days = dateUtils['daysInGregorianMonth'](year, month);
        if (date < days) {
          date = date + 1;
        } else {
          date = 1;
          if (month < 12) {
            month = month + 1;
          } else {
            month = 1;
            year = year + 1;
          }
        }
      }
      this.set('model', [year, month, date]);
    },

    minus: function (type) {
      var year = parseInt(this.get('model')[0]),
        month = parseInt(this.get('model')[1]),
        date = parseInt(this.get('model')[2]);

      if (type === 'year') {
        year = year - 1;
      } else if (type === 'month') {
        if (month > 1) {
          month = month - 1;
        } else {
          month = 12;
          year = year - 1;
        }
      } else if (type === 'date') {
        if (date > 1) {
          date = date - 1;
        } else {
          if (month > 1) {
            month = month - 1;
            date = dateUtils['daysInGregorianMonth'](year, month);
          } else {
            month = 12;
            year = year - 1;
            date = dateUtils['daysInGregorianMonth'](year, month);
          }
        }
      }
      this.set('model', [year, month, date]);
    }
  }
});
