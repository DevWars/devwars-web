import Vue from 'vue';

Vue.directive('closable', {
    inserted(el, binding) {
        const { outSideFrom, handler } = binding.value;
        const topContainer = document.body;
        const container = outSideFrom ? document.querySelector(outSideFrom) : el;

        binding.handler = (e) => {
            e.stopPropagation();
            if (!container.contains(e.target)) {
                document.body.removeEventListener('touch', binding.handler);
                document.body.removeEventListener('click', binding.handler);
                handler();
            }
        };

        setTimeout(() => {
            topContainer.addEventListener('touch', binding.handler);
            topContainer.addEventListener('click', binding.handler);
        }, 0);
    },
    unbind: (el, binding) => {
        document.body.removeEventListener('touch', binding.handler);
        document.body.removeEventListener('click', binding.handler);
    },
});

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
