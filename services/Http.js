export default class Http {
    static axios = null;

    static register(item, it) {
        Http.services[item] = it;
    }

    static for(item, subs) {
        let service = Http.services[item];

        if (service) {
            return new Http.services[item](subs);
        }

        return new Http([], item);
    }

    constructor(subs, resource) {
        this.subs = subs;
        this.staticResource = resource;
    }

    resource() {
        return null;
    }

    async byID(id) {
        return Http.axios.get(this.url(id)).then(it => it.data);
    }

    async all() {
        return Http.axios.get(this.url('all')).then(it => it.data);
    }

    async create(model) {
        return Http.axios.post(this.url(), model).then(it => it.data);
    }

    async update(model) {
        return Http.axios.put(this.urlFor(model), model).then(it => it.data);
    }

    async delete(first) {
        if (typeof first === "object") {
            return Http.axios.delete(this.urlFor(first), first).then(it => it.data);
        } else {
            return Http.axios.delete(this.url(first)).then(it => it.data);
        }
    }

    async post(first, second, third) {
        if (typeof first === "object") {
            return Http.axios.post(this.url(), first, {params: second}).then(it => it.data);
        } else {
            return Http.axios.post(this.url(first), second, {params: third}).then(it => it.data);
        }
    }

    async put(first, second, third) {
        if (typeof first === "object") {
            return Http.axios.put(this.url(), first, {params: second}).then(it => it.data);
        } else {
            return Http.axios.put(this.url(first), second, {params: third}).then(it => it.data);
        }
    }

    async get(url, params) {
        if(typeof url === 'object') {
            return Http.axios.get(this.url(), {params: url}).then(it => it.data);
        }

        return Http.axios.get(this.url(url), {params}).then(it => it.data);
    }

    async save(model) {
        if (model && model.id) {
            return this.update(model);
        } else {
            return this.create(model);
        }
    }

    urlFor(model, rest = '') {
        return this.url(model.id + '/' + rest);
    }

    subsUrl() {
        let it = "";
        for (let key in this.subs) {
            let sub = this.subs[key];

            it += `${key}/${isNaN(sub) ? sub.id : sub}`;
        }

        return it;
    }

    urlFromParts(...parts) {
        return parts.filter(it => !!it).join('/');
    }

    url(rest = '') {
        return this.urlFromParts(this.subsUrl(), this.resource() || this.staticResource, rest);
    }
}

Http.services = {};
