import Http from "../services/Http";

export default async function (ctx) {
    const {$axios} = ctx.app;
    Http.axios = $axios;
}
