import Api from '../client/index';

export default function({ $axios }, inject) {
    const api = new Api($axios);
    return inject('api', api);
}
