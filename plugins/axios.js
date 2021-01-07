import Api from 'devwars-api-client';

export default function({ $axios }, inject) {
    const api = new Api($axios);
    return inject('api', api);
}
