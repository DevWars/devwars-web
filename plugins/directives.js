import Vue from 'vue';

/* eslint-disable */
Vue.directive('closable', {
    inserted (el, binding) {
        const {outSideFrom, handler} = binding.value;
        const topContainer = document.body;
        const container = outSideFrom ? document.querySelector(outSideFrom) : el;

        binding.handler = e => {
            e.stopPropagation();
            if (!container.contains(e.target)) {
                document.body.removeEventListener("touch", binding.handler );
                document.body.removeEventListener("click", binding.handler );
                handler();
            }
        }

        topContainer.addEventListener("touch", binding.handler );
        topContainer.addEventListener("click", binding.handler );
    },
    unbind: (el, binding)  => {
        console.log("asjkddhaskjdhajksdh")
         document.body.removeEventListener("touch", binding.handler );
         document.body.removeEventListener("click", binding.handler );
    },
})

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
