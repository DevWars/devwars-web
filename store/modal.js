export const state = () => ({
    name: '',
    data: {},
});

export const mutations = {
    modal(state, {name, data}) {
        state.name = name;
        state.data = data;
    },
};
