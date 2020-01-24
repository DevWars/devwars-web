import Http from '../services/Http'

export default function(ctx) {
  const { $axios } = ctx.app
  Http.axios = $axios
}
