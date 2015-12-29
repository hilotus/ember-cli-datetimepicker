import Ember from 'ember';

function leftPad(num, size) {
  var s = num + "";
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}

export default Ember.Component.extend({
  classNames: ['time-picker'],

  isFocus: false,

  /*
    [hour, minute, period]
    [11, 11, 'AM']
  */
  current: Ember.computed(function() {
    var t = new Date(),
      hour = t.getHours(),
      minute = t.getMinutes();

    if (hour / 12 < 1) {
      return [hour, minute, 'AM'];
    } else {
      return [hour - 12, minute, 'PM'];
    }
  }),

  selected: [],

  model: Ember.computed('selected', {
    get: function() {
      return this.get('selected');
    },

    set: function(key, value) {
      value = value || this.get('current');
      this.set('selected', value);
      return value;
    }
  }),

  hour: Ember.computed('model', function() {
    return leftPad(this.get('model')[0], 2);
  }),

  minute: Ember.computed('model', function() {
    return leftPad(this.get('model')[1], 2);
  }),

  period: Ember.computed('model', function() {
    return this.get('model')[2];
  }),

  keyDown: function(event) {
    var keyCode = event.which || event.keyCode,
      $ele = Ember.$(event.target),
      hour = parseInt(this.get('hour')),
      minute = parseInt(this.get('minute')),
      period = this.get('period'),
      isHourInput = $ele.hasClass('input-hour'),
      isMinInput = $ele.hasClass('input-minute'),
      isPeriodInput = $ele.hasClass('input-period');

    if (keyCode === 38) {  // up
      if (isHourInput) {
        hour = hour === 12 ? 1 : (hour + 1);
      } else if (isMinInput) {
        minute = minute === 59 ? 0 : (minute + 1);
      } else if (isPeriodInput) {
        period = period === 'AM' ? 'PM' : 'AM';
      }
      this.set('model', [hour, minute, period]);
    } else if (keyCode === 40) {  // down
      if (isHourInput) {
        hour = hour === 1 ? 12 : (hour - 1);
      } else if (isMinInput) {
        minute = minute === 0 ? 59 : (minute - 1);
      } else if (isPeriodInput) {
        period = period === 'AM' ? 'PM' : 'AM';
      }
      this.set('model', [hour, minute, period]);
    } else if (keyCode === 37 || keyCode === 39 || keyCode === 9) {  // left, right, tab
    } else {
      event.preventDefault();
    }
  },

  focusIn: function(event) {
    var $ele = Ember.$(event.target),
      hasInput = $ele.hasClass('input-hour') || $ele.hasClass('input-minute') || $ele.hasClass('input-period');

    if (hasInput) {
      this.set('isFocus', true);
    }
  },

  focusOut: function(event) {
    var $ele = Ember.$(event.target),
      hasInput = $ele.hasClass('input-hour') || $ele.hasClass('input-minute') || $ele.hasClass('input-period');

    if (hasInput) {
      this.set('isFocus', false);
    }
  },

  click: function(event) {
    if (/input-fake|time-picker/.test(event.target.className)) {
      this.$('input:first').focus();
    }
  }
});
