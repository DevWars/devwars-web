import Vue from 'vue';
import Vue2Filters from 'vue2-filters';
import moment from 'moment';

Vue.filter('formatNumber', (number) => {
    return number.toLocaleString();
});

Vue.filter('moment', (date, format) => {
    format =
        {
            mediumDate: 'MMM D, YYYY',
            longDate: 'MMMM D, YYYY',
            fullDate: 'dddd, MMMM DD, YYYY',
            fullDateWithTime: 'dddd, MMMM DD, YYYY @ HH:mm (UTC)',
        }[format] || format;

    return moment.utc(date).format(format);
});

Vue.use(Vue2Filters);
