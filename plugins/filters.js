import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import moment from 'moment'

Vue.filter('number', (input) => {
  return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})

Vue.filter('moment', (input, format) => {
  format =
    {
      mediumDate: 'MMM D, YYYY',
      longDate: 'MMMM D, YYYY',
      fullDate: 'dddd, MMMM DD, YYYY',
      fullDateWithTime: 'dddd, MMMM DD, YYYY @ HH:mm (UTC)'
    }[format] || format

  return moment.utc(input).format(format)
})

Vue.use(Vue2Filters)
