import Vue from 'vue';

Vue.mixin({
    methods: {
        close(args) {
            this.$emit('close');

            // Not sure what resolve is used for but prevents 500 error when missing
            if (!this.resolve) {
                return;
            }
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
