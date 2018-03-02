import Http from "../services/Http";

export const state = () => ({
    latest: [],
    all: [],
});
export const mutations = {
    latest(state, latest) {
        state.latest = latest;
    }
};


export const actions = {
    async latest({commit}, count) {
        let posts = await Http.for('blog').get('latest', {count});

        commit('latest', posts);
    }
};
