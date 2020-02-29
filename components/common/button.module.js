function parseTag(attrs) {
    const aTag = attrs.tag && String(attrs.tag).toLowerCase() === 'a';

    if (Object.prototype.hasOwnProperty.call(attrs, 'href') || aTag) {
        return 'a';
    }

    if (Object.prototype.hasOwnProperty.call(attrs, 'to')) {
        return 'nuxt-link';
    }

    return 'button';
}

export default {
    name: 'Button',

    render(h) {
        const tag = parseTag(this.$attrs);

        if (tag === 'a') {
            return h(
                tag,
                {
                    attrs: {
                        href: this.$attrs.href,
                    },
                },
                this.$slots.default,
            );
        }

        if (tag === 'nuxt-link') {
            return (
                <nuxt-link to={this.$attrs.to}>{this.$slots.default}</nuxt-link>
            );
        }

        return h(
            tag,
            {
                attrs: {
                    type: 'button',
                },
            },
            this.$slots.default,
        );
    },
};
