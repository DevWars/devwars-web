import Http from '../services/Http';
import Api from '../client/index';

export default function({ $axios }, inject) {
    Http.axios = $axios;

    const api = new Api($axios);
    return inject('api', api);
}
