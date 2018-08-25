import Http from "../services/Http";
import JSOG from 'jsog';

export default function (ctx) {
    const $axios = ctx.app.$axios;

    Http.axios = $axios;

    $axios.onResponse(response => {
        if (process.browser) {
            response.data = JSOG.decode(response.data);
        }
    });

    $axios.onRequest(config => {
        if (!config.noTransform)
            config.data = JSOG.encode(config.data);
    });
}
