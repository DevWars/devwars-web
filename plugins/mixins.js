import Vue from 'vue'

Vue.mixin({
    methods: {
        close(args) {
            this.$emit('close');

            this.resolve(args);
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