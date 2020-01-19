import Http from '../services/Http';

export const state = () => ({
    users: {
        data: [],
        offset: 0,
        limit: 10,
        searching: false,
    },
});

export const getters = {
    users(state) {
        return state.users.data;
    },

    usersSearching(state) {
        return state.users.searching;
    },

    userPaging(state) {
        return {
            page: state.users.offset === 0 ? 0 : Math.round(state.users.offset / state.users.limit),
            offset: state.users.offset,
            limit: state.users.limit,
        };
    },
};

export const mutations = {
    users(state, users) {
        state.users.data = users;
    },

    resetUsers(state) {
        state.users.data = [];
        state.users.offset = 0;
    },

    pageUsers(state, forward) {
        if (forward) state.users.offset += state.users.limit;
        else state.users.offset -= state.users.limit;
    },

    updateUsersSearching(state, searching) {
        state.users.searching = searching;
    },
};

export const actions = {
    /**
     * Gathers all the current most users via /users and sets them to the state. This will use the
     * given states offset and limit.
     */
    async users({ commit, state }) {
        try {
            const { offset, limit } = state.users;
            const users = await Http.for(`users`).get(`?offset=${offset}&limit=${limit}`);
            commit('users', users);
        } catch (error) {
            console.error(error.response.data);
        }
    },

    async pageUsers({ commit, dispatch }, forward) {
        commit('pageUsers', forward);
        dispatch('users');
    },

    /**
     *  Performs a user lookup and based on the lookup result, gathers all the related users by id.
     *  The lookup is based on a username search.
     *
     *  @param {*} username The username that will be used in the lookup query. Cannot be empty.
     */
    async usersBySearch({ commit }, username) {
        try {
            commit('resetUsers');
            commit('updateUsersSearching', true);
            const users = await Http.for(`users/lookup`).get(`?username=${username}&full=true`);
            commit('users', users);
        } catch (error) {
            console.error(error.response.data);
        } finally {
            commit('updateUsersSearching', false);
        }
    },
};
