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

var stemNames = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
var branchNames = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
var animalNames = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
var chineseMonthNames = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
var chineseDateNames = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十', '卅一'];
var principleTermNames = ["大寒", "雨水", "春分", "谷雨", "夏满", "夏至", "大暑", "处暑", "秋分", "霜降", "小雪", "冬至"];
var sectionalTermNames = ["小寒", "立春", "惊蛰", "清明", "立夏", "芒种", "小暑", "立秋", "白露", "寒露", "立冬", "大雪"];
var chineseMonths = [0x00, 0x04, 0xad, 0x08, 0x5a, 0x01, 0xd5, 0x54, 0xb4, 0x09, 0x64, 0x05, 0x59, 0x45, 0x95, 0x0a, 0xa6, 0x04, 0x55, 0x24, 0xad, 0x08, 0x5a, 0x62, 0xda, 0x04, 0xb4, 0x05, 0xb4, 0x55, 0x52, 0x0d, 0x94, 0x0a, 0x4a, 0x2a, 0x56, 0x02, 0x6d, 0x71, 0x6d, 0x01, 0xda, 0x02, 0xd2, 0x52, 0xa9, 0x05, 0x49, 0x0d, 0x2a, 0x45, 0x2b, 0x09, 0x56, 0x01, 0xb5, 0x20, 0x6d, 0x01, 0x59, 0x69, 0xd4, 0x0a, 0xa8, 0x05, 0xa9, 0x56, 0xa5, 0x04, 0x2b, 0x09, 0x9e, 0x38, 0xb6, 0x08, 0xec, 0x74, 0x6c, 0x05, 0xd4, 0x0a, 0xe4, 0x6a, 0x52, 0x05, 0x95, 0x0a, 0x5a, 0x42, 0x5b, 0x04, 0xb6, 0x04, 0xb4, 0x22, 0x6a, 0x05, 0x52, 0x75, 0xc9, 0x0a, 0x52, 0x05, 0x35, 0x55, 0x4d, 0x0a, 0x5a, 0x02, 0x5d, 0x31, 0xb5, 0x02, 0x6a, 0x8a, 0x68, 0x05, 0xa9, 0x0a, 0x8a, 0x6a, 0x2a, 0x05, 0x2d, 0x09, 0xaa, 0x48, 0x5a, 0x01, 0xb5, 0x09, 0xb0, 0x39, 0x64, 0x05, 0x25, 0x75, 0x95, 0x0a, 0x96, 0x04, 0x4d, 0x54, 0xad, 0x04, 0xda, 0x04, 0xd4, 0x44, 0xb4, 0x05, 0x54, 0x85, 0x52, 0x0d, 0x92, 0x0a, 0x56, 0x6a, 0x56, 0x02, 0x6d, 0x02, 0x6a, 0x41, 0xda, 0x02, 0xb2, 0xa1, 0xa9, 0x05, 0x49, 0x0d, 0x0a, 0x6d, 0x2a, 0x09, 0x56, 0x01, 0xad, 0x50, 0x6d, 0x01, 0xd9, 0x02, 0xd1, 0x3a, 0xa8, 0x05, 0x29, 0x85, 0xa5, 0x0c, 0x2a, 0x09, 0x96, 0x54, 0xb6, 0x08, 0x6c, 0x09, 0x64, 0x45, 0xd4, 0x0a, 0xa4, 0x05, 0x51, 0x25, 0x95, 0x0a, 0x2a, 0x72, 0x5b, 0x04, 0xb6, 0x04, 0xac, 0x52, 0x6a, 0x05, 0xd2, 0x0a, 0xa2, 0x4a, 0x4a, 0x05, 0x55, 0x94, 0x2d, 0x0a, 0x5a, 0x02, 0x75, 0x61, 0xb5, 0x02, 0x6a, 0x03, 0x61, 0x45, 0xa9, 0x0a, 0x4a, 0x05, 0x25, 0x25, 0x2d, 0x09, 0x9a, 0x68, 0xda, 0x08, 0xb4, 0x09, 0xa8, 0x59, 0x54, 0x03, 0xa5, 0x0a, 0x91, 0x3a, 0x96, 0x04, 0xad, 0xb0, 0xad, 0x04, 0xda, 0x04, 0xf4, 0x62, 0xb4, 0x05, 0x54, 0x0b, 0x44, 0x5d, 0x52, 0x0a, 0x95, 0x04, 0x55, 0x22, 0x6d, 0x02, 0x5a, 0x71, 0xda, 0x02, 0xaa, 0x05, 0xb2, 0x55, 0x49, 0x0b, 0x4a, 0x0a, 0x2d, 0x39, 0x36, 0x01, 0x6d, 0x80, 0x6d, 0x01, 0xd9, 0x02, 0xe9, 0x6a, 0xa8, 0x05, 0x29, 0x0b, 0x9a, 0x4c, 0xaa, 0x08, 0xb6, 0x08, 0xb4, 0x38, 0x6c, 0x09, 0x54, 0x75, 0xd4, 0x0a, 0xa4, 0x05, 0x45, 0x55, 0x95, 0x0a, 0x9a, 0x04, 0x55, 0x44, 0xb5, 0x04, 0x6a, 0x82, 0x6a, 0x05, 0xd2, 0x0a, 0x92, 0x6a, 0x4a, 0x05, 0x55, 0x0a, 0x2a, 0x4a, 0x5a, 0x02, 0xb5, 0x02, 0xb2, 0x31, 0x69, 0x03, 0x31, 0x73, 0xa9, 0x0a, 0x4a, 0x05, 0x2d, 0x55, 0x2d, 0x09, 0x5a, 0x01, 0xd5, 0x48, 0xb4, 0x09, 0x68, 0x89, 0x54, 0x0b, 0xa4, 0x0a, 0xa5, 0x6a, 0x95, 0x04, 0xad, 0x08, 0x6a, 0x44, 0xda, 0x04, 0x74, 0x05, 0xb0, 0x25, 0x54, 0x03];
var baseYear = 1901;
var baseMonth = 1;
var baseDate = 1;
var baseIndex = 0;
var baseChineseYear = 4598 - 1;
var baseChineseMonth = 11;
var baseChineseDate = 11;
var bigLeapMonthYears = [6, 14, 19, 25, 33, 36, 38, 41, 44, 52, 55, 79, 117, 136, 147, 150, 155, 158, 185, 193];
var sectionalTermMap = [[7, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 5, 5, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5], [5, 4, 5, 5, 5, 4, 4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 3, 3, 4, 4, 3, 3, 3], [6, 6, 6, 7, 6, 6, 6, 6, 5, 6, 6, 6, 5, 5, 6, 6, 5, 5, 5, 6, 5, 5, 5, 5, 4, 5, 5, 5, 5], [5, 5, 6, 6, 5, 5, 5, 6, 5, 5, 5, 5, 4, 5, 5, 5, 4, 4, 5, 5, 4, 4, 4, 5, 4, 4, 4, 4, 5], [6, 6, 6, 7, 6, 6, 6, 6, 5, 6, 6, 6, 5, 5, 6, 6, 5, 5, 5, 6, 5, 5, 5, 5, 4, 5, 5, 5, 5], [6, 6, 7, 7, 6, 6, 6, 7, 6, 6, 6, 6, 5, 6, 6, 6, 5, 5, 6, 6, 5, 5, 5, 6, 5, 5, 5, 5, 4, 5, 5, 5, 5], [7, 8, 8, 8, 7, 7, 8, 8, 7, 7, 7, 8, 7, 7, 7, 7, 6, 7, 7, 7, 6, 6, 7, 7, 6, 6, 6, 7, 7], [8, 8, 8, 9, 8, 8, 8, 8, 7, 8, 8, 8, 7, 7, 8, 8, 7, 7, 7, 8, 7, 7, 7, 7, 6, 7, 7, 7, 6, 6, 7, 7, 7], [8, 8, 8, 9, 8, 8, 8, 8, 7, 8, 8, 8, 7, 7, 8, 8, 7, 7, 7, 8, 7, 7, 7, 7, 6, 7, 7, 7, 7], [9, 9, 9, 9, 8, 9, 9, 9, 8, 8, 9, 9, 8, 8, 8, 9, 8, 8, 8, 8, 7, 8, 8, 8, 7, 7, 8, 8, 8], [8, 8, 8, 8, 7, 8, 8, 8, 7, 7, 8, 8, 7, 7, 7, 8, 7, 7, 7, 7, 6, 7, 7, 7, 6, 6, 7, 7, 7], [7, 8, 8, 8, 7, 7, 8, 8, 7, 7, 7, 8, 7, 7, 7, 7, 6, 7, 7, 7, 6, 6, 7, 7, 6, 6, 6, 7, 7]];
var sectionalTermYear = [[13, 49, 85, 117, 149, 185, 201, 250, 250], [13, 45, 81, 117, 149, 185, 201, 250, 250], [13, 48, 84, 112, 148, 184, 200, 201, 250], [13, 45, 76, 108, 140, 172, 200, 201, 250], [13, 44, 72, 104, 132, 168, 200, 201, 250], [5, 33, 68, 96, 124, 152, 188, 200, 201], [29, 57, 85, 120, 148, 176, 200, 201, 250], [13, 48, 76, 104, 132, 168, 196, 200, 201], [25, 60, 88, 120, 148, 184, 200, 201, 250], [16, 44, 76, 108, 144, 172, 200, 201, 250], [28, 60, 92, 124, 160, 192, 200, 201, 250], [17, 53, 85, 124, 156, 188, 200, 201, 250]];
var principleTermMap = [[21, 21, 21, 21, 21, 20, 21, 21, 21, 20, 20, 21, 21, 20, 20, 20, 20, 20, 20, 20, 20, 19, 20, 20, 20, 19, 19, 20], [20, 19, 19, 20, 20, 19, 19, 19, 19, 19, 19, 19, 19, 18, 19, 19, 19, 18, 18, 19, 19, 18, 18, 18, 18, 18, 18, 18], [21, 21, 21, 22, 21, 21, 21, 21, 20, 21, 21, 21, 20, 20, 21, 21, 20, 20, 20, 21, 20, 20, 20, 20, 19, 20, 20, 20, 20], [20, 21, 21, 21, 20, 20, 21, 21, 20, 20, 20, 21, 20, 20, 20, 20, 19, 20, 20, 20, 19, 19, 20, 20, 19, 19, 19, 20, 20], [21, 22, 22, 22, 21, 21, 22, 22, 21, 21, 21, 22, 21, 21, 21, 21, 20, 21, 21, 21, 20, 20, 21, 21, 20, 20, 20, 21, 21], [22, 22, 22, 22, 21, 22, 22, 22, 21, 21, 22, 22, 21, 21, 21, 22, 21, 21, 21, 21, 20, 21, 21, 21, 20, 20, 21, 21, 21], [23, 23, 24, 24, 23, 23, 23, 24, 23, 23, 23, 23, 22, 23, 23, 23, 22, 22, 23, 23, 22, 22, 22, 23, 22, 22, 22, 22, 23], [23, 24, 24, 24, 23, 23, 24, 24, 23, 23, 23, 24, 23, 23, 23, 23, 22, 23, 23, 23, 22, 22, 23, 23, 22, 22, 22, 23, 23], [23, 24, 24, 24, 23, 23, 24, 24, 23, 23, 23, 24, 23, 23, 23, 23, 22, 23, 23, 23, 22, 22, 23, 23, 22, 22, 22, 23, 23], [24, 24, 24, 24, 23, 24, 24, 24, 23, 23, 24, 24, 23, 23, 23, 24, 23, 23, 23, 23, 22, 23, 23, 23, 22, 22, 23, 23, 23], [23, 23, 23, 23, 22, 23, 23, 23, 22, 22, 23, 23, 22, 22, 22, 23, 22, 22, 22, 22, 21, 22, 22, 22, 21, 21, 22, 22, 22], [22, 22, 23, 23, 22, 22, 22, 23, 22, 22, 22, 22, 21, 22, 22, 22, 21, 21, 22, 22, 21, 21, 21, 22, 21, 21, 21, 21, 22]];
var principleTermYear = [[13, 45, 81, 113, 149, 185, 201], [21, 57, 93, 125, 161, 193, 201], [21, 56, 88, 120, 152, 188, 200, 201], [21, 49, 81, 116, 144, 176, 200, 201], [17, 49, 77, 112, 140, 168, 200, 201], [28, 60, 88, 116, 148, 180, 200, 201], [25, 53, 84, 112, 144, 172, 200, 201], [29, 57, 89, 120, 148, 180, 200, 201], [17, 45, 73, 108, 140, 168, 200, 201], [28, 60, 92, 124, 160, 192, 200, 201], [16, 44, 80, 112, 148, 180, 200, 201], [17, 53, 88, 120, 156, 188, 200, 201]];
var error = {
  outOfRange: 'Lunar calendar only support 1900-2100'
};

var computeChineseFields = function (calendar) {
  var daysDiff, i, j, k, lastDate, nextMonth, ref, ref1, ref2, ref3, startDate, startMonth, startYear;
  if (calendar.get('year') < 1901 || calendar.get('year') > 2100) {
    return 1;
  }
  startYear = baseYear;
  startMonth = baseMonth;
  startDate = baseDate;

  var chineseYear = baseChineseYear,
    chineseMonth = baseChineseMonth,
    chineseDate = baseChineseDate;

  if (calendar.get('year') >= 2000) {
    startYear = baseYear + 99;
    startMonth = 1;
    startDate = 1;
    chineseYear = baseChineseYear + 99;
    chineseMonth = 11;
    chineseDate = 25;
  }
  daysDiff = 0;
  for (i = j = ref = startYear, ref1 = calendar.get('year'); ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
    daysDiff += 365;
    if (isGregorianLeapYear(i)) {
      daysDiff += 1;
    }
  }
  for (i = k = ref2 = startMonth, ref3 = calendar.get('month'); ref2 <= ref3 ? k < ref3 : k > ref3; i = ref2 <= ref3 ? ++k : --k) {
    daysDiff += daysInGregorianMonth(calendar.get('year'), i);
  }
  daysDiff += calendar.get('date') - startDate;
  chineseDate += daysDiff;
  lastDate = daysInChineseMonth(chineseYear, chineseMonth);
  nextMonth = nextChineseMonth(chineseYear, chineseMonth);
  while (chineseDate > lastDate) {
    if (Math.abs(nextMonth) < Math.abs(chineseMonth)) {
      chineseYear++;
    }
    chineseMonth = nextMonth;
    chineseDate -= lastDate;
    lastDate = daysInChineseMonth(chineseYear, chineseMonth);
    nextMonth = nextChineseMonth(chineseYear, chineseMonth);
  }
  calendar.set('chineseYear', chineseYear);
  calendar.set('chineseMonth', chineseMonth);
  calendar.set('chineseDate', chineseDate);
  return calendar;
};

var daysInChineseMonth = function(year, month) {
  var d, i, index, j, l, ref, v;
  index = year - baseChineseYear + baseIndex;
  v = 0;
  l = 0;
  d = 30;
  if (month >= 1 && month <= 8) {
    v = chineseMonths[2 * index];
    l = month - 1;
    if (((v >> l) & 0x01) === 1) {
      d = 29;
    }
  } else if (month >= 9 && month <= 12) {
    v = chineseMonths[2 * index + 1];
    l = month - 9;
    if (((v >> l) & 0x01) === 1) {
      d = 29;
    }
  } else {
    v = chineseMonths[2 * index + 1];
    v = (v >> 4) & 0x0F;
    if (v !== Math.abs(month)) {
      d = 0;
    } else {
      d = 29;
      for (i = j = 0, ref = bigLeapMonthYears.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        if (bigLeapMonthYears[i] === index) {
          d = 30;
          break;
        }
      }
    }
  }
  return d;
};

var nextChineseMonth = function(year, month) {
  var index, n, v;
  n = Math.abs(month) + 1;
  if (month > 0) {
    index = year - baseChineseYear + baseIndex;
    v = chineseMonths[2 * index + 1];
    v = (v >> 4) & 0x0F;
    if (v === month) {
      n = -month;
    }
  }
  if (n === 13) {
    n = 1;
  }
  return n;
};

var computeSolarTerms = function(calendar) {
  if (calendar.get('year') < 1901 || calendar.get('year') > 2100) {
    return 1;
  }
  calendar.set('sectionalTerm', sectionalTerm(calendar.get('year'), calendar.get('month')));
  calendar.set('principleTerm', principleTerm(calendar.get('year'), calendar.get('month')));
  return calendar;
};

var sectionalTerm = function(year, month) {
  var index, ry, term;
  if (year < 1901 || year > 2100) {
    return 0;
  }
  index = 0;
  ry = year - baseYear + 1;
  while (ry >= sectionalTermYear[month - 1][index]) {
    index = index + 1;
  }
  term = sectionalTermMap[month - 1][4 * index + ry % 4];
  if (ry === 121 && month === 4) {
    term = 5;
  }
  if (ry === 132 && month === 4) {
    term = 5;
  }
  if (ry === 194 && month === 6) {
    term = 6;
  }
  return term;
};

var principleTerm = function(year, month) {
  var index, ry, term;
  if (year < 1901 || year > 2100) {
    return 0;
  }
  index = 0;
  ry = year - baseYear + 1;
  while (ry >= principleTermYear[month - 1][index]) {
    index = index + 1;
  }
  term = principleTermMap[month - 1][4 * index + ry % 4];
  if (ry === 171 && month === 3) {
    term = 21;
  }
  if (ry === 181 && month === 5) {
    term = 21;
  }
  return term;
};

export var Calendar = Ember.Object.extend({
  year: 0,
  month: 0,
  date: 0,
  isGregorianLeap: false,
  dayOfYear: 0,
  dayOfWeek: 0,

  isPastDate: false,
  isNextDate: false,

  chineseYear: 0,
  chineseMonth: 0,
  chineseDate: 0,
  sectionalTerm: 0,
  principleTerm: 0,

  dateArray: Ember.computed('year', 'month', 'date', function() {
    return [this.year, this.month, this.date];
  }),

  cnDate: Ember.computed('chineseMonth', 'chineseDate', 'sectionalTerm', 'principleTerm', function() {
    var chineseMonth = Math.abs(this.chineseMonth);
    if (this.date === this.sectionalTerm) {
      return sectionalTermNames[this.month - 1];
    } else if (this.date === this.principleTerm) {
      return principleTermNames[this.month - 1];
    } else {
      return (this.chineseMonth < 0 ? "闰" : "") + chineseMonthNames[chineseMonth - 1] + "月" + chineseDateNames[this.chineseDate - 1];
    }
  }),

  cnShortDate: Ember.computed('chineseMonth', 'chineseDate', 'sectionalTerm', 'principleTerm', function() {
    var chineseMonth = Math.abs(this.chineseMonth);
    if (this.date === this.sectionalTerm) {
      return sectionalTermNames[this.month - 1];
    } else if (this.date === this.principleTerm) {
      return principleTermNames[this.month - 1];
    } else {
      if (this.chineseDate === 1) {
        return (this.chineseMonth < 0 ? "闰" : "") + chineseMonthNames[chineseMonth - 1] + "月";
      } else {
        return chineseDateNames[this.chineseDate - 1];
      }
    }
  }),

  stemBranch: Ember.computed('chineseYear', function() {
    return "" + stemNames[(this.chineseYear - 1) % 10] + branchNames[(this.chineseYear - 1) % 12];
  }),

  animal: Ember.computed('chineseYear', function() {
    return animalNames[(this.chineseYear - 1) % 12];
  }),

  init: function() {
    this._super.apply(this, arguments);

    if (this.get('year') < 1901 || this.get('year') > 2100) {
      Ember.Logger.warn(error.outOfRange);
    }
  }
});

Calendar.reopenClass({
  /*
    type:
      - pastDate
      - nextDate
  */
  generate: function(year, month, date, type) {
    var calendar = this.create({
      year: year,
      month: month,
      date: date,
      isGregorianLeap: isGregorianLeapYear(year),
      dayOfYear: dayOfYear(year, month, date),
      dayOfWeek: dayOfWeek(year, month, date),
      isPastDate: Ember.isEqual(type, 'pastDate'),
      isNextDate: Ember.isEqual(type, 'nextDate'),
      chineseYear: 0,
      chineseMonth: 0,
      chineseDate: 0,
      sectionalTerm: 0,
      principleTerm: 0
    });
    computeChineseFields(calendar);
    computeSolarTerms(calendar);
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
  if (a === b) {
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
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

var dateRegex = /^(\d{4})-(0[1-9]{1}|1[0-2])-(0[1-9]{1}|[1-2]\d{1}|3[0-1])$/;

export var validateDateFormat = function (dateString) {
  return dateRegex.test(dateString);
};
