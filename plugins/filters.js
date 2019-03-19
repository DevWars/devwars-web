import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import moment from 'moment';

Vue.filter('number', (input) => {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

Vue.filter('moment', (input, format) => {
    format = {
        'mediumDate': 'MMM D, YYYY',
        'longDate': 'MMMM D, YYYY',
        'fullDate': 'dddd, MMMM DD, YYYY',
        'fullDateWithTime': 'dddd, MMMM DD, YYYY @ HH:mm (UTC)',
    }[format] || format;

    return moment.utc(input).format(format);
});

Vue.mixin({
    methods: {
        close() {
            this.$emit('close');

            this.resolve(arguments);
        },

        $open(component, props) {
            return new Promise((resolve) => {
                props.resolve = resolve;

                this.$modal.show(component, props, {
                    transition: 'zoom',
                });
            });
        },
    },
});

Vue.use(Vue2Filters);
