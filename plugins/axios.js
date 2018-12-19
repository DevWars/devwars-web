import Http from "../services/Http";

export default async function (ctx) {
    const $axios = ctx.app.$axios;
    Http.axios = $axios;
}
