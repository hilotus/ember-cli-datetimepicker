import Ember from 'ember';

var __daysInGregorianMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var isGregorianLeapYear = function (year) {
  var isLeap;
  isLeap = false;
  if (year % 4 === 0) {
    isLeap = true;
  }
  if (year % 100 === 0) {
    isLeap = false;
  }
  if (year % 400 === 0) {
    isLeap = true;
  }
  return isLeap;
};

var dayOfYear = function (year, month, date) {
  var count, i, j, ref;
  count = 0;
  for (i = j = 1, ref = month; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
    count = count + daysInGregorianMonth(year, i);
  }
  return count + date;
};

export var daysInGregorianMonth = function (year, month) {
  var days;
  days = __daysInGregorianMonth[month - 1];
  if (month === 2 && isGregorianLeapYear(year)) {
    days = days + 1;
  }
  return days;
};

var dayOfWeek = function (year, month, date) {
  var commonYear, leapYear, weak;
  weak = 1;
  year = (year - 1) % 400 + 1;
  leapYear = parseInt((year - 1) / 4);
  leapYear = parseInt(leapYear - (year - 1) / 100);
  leapYear = parseInt(leapYear + (year - 1) / 400);
  commonYear = year - 1 - leapYear;
  weak = weak + commonYear;
  weak = weak + 2 * leapYear;
  weak = weak + dayOfYear(year, month, date);
  return (weak - 1) % 7 + 1;
};

var generateWeekTemplate = function () {
  return [null, null, null, null, null, null, null];
};

var Calendar = Ember.Object.extend({
  year: 0,
  month: 0,
  date: 0,
  isGregorianLeap: false,
  dayOfYear: 0,
  dayOfWeek: 0,

  isPastDate: false,
  isNextDate: false,

  dateArray: Ember.computed('year', 'month', 'date', function() {
    return [this.year, this.month, this.date];
  })
});

Calendar.reopenClass({
  // type: pastDate, lastDate
  generate: function(year, month, date, type) {
    var calendar = this.create();
    calendar.set('year', year);
    calendar.set('month', month);
    calendar.set('date', date);
    calendar.set('isGregorianLeap', isGregorianLeapYear(year));
    calendar.set('dayOfYear', dayOfYear(year, month, date));
    calendar.set('dayOfWeek', dayOfWeek(year, month, date));
    calendar.set('isPastDate', Ember.isEqual(type, 'pastDate'));
    calendar.set('isNextDate', Ember.isEqual(type, 'nextDate'));
    return calendar;
  }
});

/*
  Generate dates of month for calendar
*/
export var generateDates = function (year, month) {
  year = window.parseInt(year);
  month = window.parseInt(month);

  var rows = [], day, weeks = generateWeekTemplate();
  var days = daysInGregorianMonth(year, month);

  var pastYear, pastMonth;
  if (month === 1) {
    pastYear = year - 1;
    pastMonth = 12;
  } else {
    pastYear = year;
    pastMonth = month - 1;
  }
  var pastMonthDays = daysInGregorianMonth(pastYear, pastMonth);

  var nextYear, nextMonth;
  if (month === 12) {
    nextYear = year + 1;
    nextMonth = 1;
  } else {
    nextYear = year;
    nextMonth = month + 1;
  }

  for (var i = 1; i <= days; i++) {
    day = dayOfWeek(year, month, i);

    if (i === 1) {
      pastMonthDays = pastMonthDays - day + 2;
      for (var j = 1; j < day; j++, pastMonthDays++) {
        weeks[j - 1] = Calendar.generate(pastYear, pastMonth, pastMonthDays, 'pastDate');
      }
    }

    weeks[day - 1] = Calendar.generate(year, month, i);
    if (day === 7 || i === days) {
      if (i === days) {
        for (var z = day, d = 1; z < 7; z++, d++) {
          weeks[z] = Calendar.generate(nextYear, nextMonth, d, 'nextDate');
        }
      }

      rows.push(weeks);
      weeks = generateWeekTemplate();
    }
  }

  return rows;
};

/*
  array date is equal
*/
export var arraysEqual = function (a, b) {
  if (a == b) {
    return true;
  }
  if (Ember.isBlank(a) || Ember.isBlank(b)) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  var i;
  for (i = 0; i < a.length; ++i) {
    if (a[i] != b[i]) {
      return false;
    }
  }
  return true;
};

var dateRegex = /^(\d{4})-(0[1-9]{1}|1[0-2])-(0[1-9]{1}|[1-2]\d{1}|3[0-1])$/;

export var validateDateFormat = function (dateString) {
  return dateRegex.test(dateString);
};
