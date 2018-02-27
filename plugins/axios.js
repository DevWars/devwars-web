import Http from "../services/Http";

export default function (ctx) {
    Http.axios = ctx.app.$axios;
}
