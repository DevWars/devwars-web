import Api from 'DevwarsClient';

export default function({ $axios }, inject) {
    const api = new Api($axios);
    return inject('api', api);
}
