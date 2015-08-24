import Ember from 'ember';

function leftPad(num, size) {
  var s = num + "";
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}

export default Ember.Component.extend({
  classNames: ['tp'],

  model: [],
  isFocus: false,

  modelChanged: Ember.observer('model', function () { this.modelSetup(); }),

  init: function () {
    this._super.apply(this, arguments);
    this.modelSetup();
  },

  modelSetup: function () {
    var model = this.get('model');

    if (!model || !Ember.isArray(model) || model.length !== 3) {
      throw new Ember.Error("TimePicker's model must be an array of length 3.");
    }

    this.set('hour', leftPad(model[0], 2));
    this.set('minute', leftPad(model[1], 2));
    this.set('period', model[2]);
  },

  setup: function () {
    Ember.run.schedule('afterRender', this, function () {
      this.$().find('input')
        .on('focus', function () {
          this.set('isFocus', true);
        }.bind(this))
        .on('blur', function () {
          this.set('isFocus', false);
        }.bind(this));
    });
  }.on('didInsertElement'),

  keyDown: function (event) {
    var keyCode = event.which || event.keyCode,
      $ele = Ember.$(event.target),
      hour = parseInt(this.get('hour')),
      minute = parseInt(this.get('minute')),
      period = this.get('period'),
      isHourInput = $ele.hasClass('input-hour'),
      isMinInput = $ele.hasClass('input-minute');

    if (keyCode === 38) {  // up
      if (isHourInput) {
        hour = hour === 11 ? 0 : (hour + 1);
      } else if (isMinInput) {
        minute = minute === 59 ? 0 : (minute + 1);
      }
      this.set('model', [hour, minute, period]);
    } else if (keyCode === 40) {  // down
      if (isHourInput) {
        hour = hour === 0 ? 11 : (hour - 1);
      } else if (isMinInput) {
        minute = minute === 0 ? 59 : (minute - 1);
      }
      this.set('model', [hour, minute, period]);
    } else if (keyCode === 37 || keyCode === 39 || keyCode === 9) {  // left, right, tab
      return true;
    } else {
      return false;
    }
  }
});
