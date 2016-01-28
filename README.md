# Ember-cli-datetimepicker

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Usages

```hbs
{{!-- date = ['2014', '12', '12'] --}}
{{date-picker model=date}}
```

```hbs
{{!-- date = null --}}
{{date-picker model=date class="customeClass" direction="upward" showLunarCalendar=true}}
```

```hbs
{{!-- time = ['04', '05', 'AM'] --}}
{{time-picker model=time class="customeClass"}}
```

```hbs
{{!-- time = null --}}
{{time-picker model=time}}
```
