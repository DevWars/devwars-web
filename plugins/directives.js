import Vue from 'vue';

Vue.directive('asyncClick', {
    bind(el, binding) {
        const func = binding.value[0];
        const args = binding.value.slice(1);

        el.addEventListener('click', async () => {
            el.classList.add('loading');
            el.disabled = true;


            try {
                await func(...args);
            } catch (e) {
                console.error(e);
            }

            el.classList.remove('loading');
            el.disabled = false;
        });

    },
});

Vue.directive('asyncSubmit', {
    bind(el, binding) {
        const func = binding.value[0];
        const args = binding.value.slice(1);

        el.addEventListener('submit', async event => {
            event.preventDefault();

            const buttons = el.querySelectorAll('button:not([type="button"])');

            if (buttons.length < 1) return;

            buttons.forEach(button => {
                button.classList.add('loading');
                button.disabled = true;
            });

            try {
                await func(...args);
            } catch (e) {
                console.error(e);
            }

            buttons.forEach(button => {
                button.classList.remove('loading');
                button.disabled = false;
            });
        });

    },
});
