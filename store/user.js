export const state = () => ({
    user: null,
    profile: null,
    stats: null,
    emailPermissions: {},
    count: 0,
    activities: [],
    linkedAccounts: [],
});

export const getters = {
    userCount(state) {
        return state.count;
    },

    isCompetitor({ profile, linkedAccounts }) {
        if (!profile) {
            return false;
        }

        const { firstName, lastName, country, skills } = profile;
        if ((!firstName, !lastName, !country, !skills)) {
            return false;
        }

        if (linkedAccounts.length <= 0) {
            return false;
        }

        const discordAccount = linkedAccounts.find(
            (account) => account.provider === 'discord',
        );
        if (!discordAccount) {
            return false;
        }

        return true;
    },

    getDiscord({ linkedAccounts }) {
        return linkedAccounts.find((account) => account.provider === 'discord');
    },
};

export const mutations = {
    user(state, user) {
        state.user = user;
    },

    profile(state, profile) {
        state.profile = profile;
    },

    activities(state, activities) {
        state.activities = activities;
    },

    profileUpdate(state, { key, values }) {
        state.profile[key] = values;
    },

    stats(state, stats) {
        state.stats = stats;
    },

    count(state, count) {
        state.count = count;
    },

    linkedAccounts(state, accounts) {
        state.linkedAccounts = accounts;
    },

    removeLinkedAccount(state, provider) {
        state.linkedAccounts = state.linkedAccounts.filter(
            (it) => it.provider !== provider,
        );
    },

    emailPermissions(state, permissions) {
        state.emailPermissions = permissions;
    },

    emailPermissionsUpdate(state, { key, values }) {
        state.emailPermissions[key] = values;
    },
};

export const actions = {
    async refresh({ commit, dispatch }) {
        try {
            const user = await this.$api.authentication.getCurrentUser();
            commit('user', user);

            await dispatch('profile');
            await dispatch('stats');
            await dispatch('linkedAccounts');
            await dispatch('activities');
        } catch (e) {
            commit('user', null);
        }
    },

    async activities({ state, commit, dispatch }) {
        try {
            const activities = await this.$api.users.getUserActivities(
                state.user.id,
            );

            commit('activities', activities);
        } catch (e) {
            dispatch('toast/error', e, { root: true });
            commit('user', null);
        }
    },

    async profile({ commit, state, dispatch }) {
        try {
            const profile = await this.$api.users.getUserProfile(state.user.id);
            commit('profile', profile);
        } catch (e) {
            dispatch('toast/error', e, { root: true });
            commit('user', null);
        }
    },

    async stats({ commit, state, dispatch }) {
        try {
            const statistics = await this.$api.users.getUserStatistics(
                state.user.id,
            );

            commit('stats', statistics);
        } catch (e) {
            dispatch('toast/error', e, { root: true });
            commit('user', null);
        }
    },

    async login({ commit, dispatch }, { username, password }) {
        try {
            await this.$api.authentication.login(username, password);

            await dispatch('refresh');

            dispatch('toast/success', 'Welcome back to DevWars!', {
                root: true,
            });

            await dispatch('nuxtServerInit', null, { root: true });
            dispatch('navigate', '/dashboard', { root: true });
        } catch (e) {
            dispatch('toast/error', e, { root: true });
            commit('user', null);
        }
    },

    async register({ dispatch }, registration) {
        try {
            const { email, username, password } = registration;
            await this.$api.authentication.register(email, username, password);

            await dispatch('refresh');

            dispatch('toast/success', 'Welcome to DevWars!', { root: true });

            await dispatch('nuxtServerInit', null, { root: true });

            dispatch('navigate', '/dashboard', { root: true });
        } catch (e) {
            dispatch('toast/error', e, { root: true });
        }
    },

    async logout({ commit, dispatch }) {
        await this.$api.authentication.logout();
        dispatch('navigate', '/', { root: true });

        commit('user', null);
    },

    async settings({ commit, dispatch, state }) {
        try {
            const updatedProfile = await this.$api.users.updateUsersProfile(
                state.user.id,
                state.profile,
            );

            commit('profile', updatedProfile);
            dispatch('toast/success', 'Profile Updated', { root: true });
        } catch (e) {
            dispatch('toast/error', e, { root: true });
        }
    },

    async updatePassword({ dispatch }, { oldPassword, password }) {
        try {
            await this.$api.authentication.updatePassword(
                oldPassword,
                password,
            );

            dispatch('toast/success', "We've updated your password!", {
                root: true,
            });
        } catch (e) {
            dispatch('toast/error', e, { root: true });
        }
    },

    /**
     * Requests to update the given users username on the server, if all goes
     * well, the username will be updated within the store and reflected around
     * the site. Otherwise the toast will show the related server error.
     *
     * @param username The new users username that is being updated.
     */
    async updateUsername({ dispatch, commit, state }, { username }) {
        try {
            await this.$api.users.updateUser(state.user.id, { username });
            commit('user', Object.assign(state.user, { username }));
            dispatch('toast/success', 'Updated username', { root: true });
        } catch (e) {
            dispatch('toast/error', e, { root: true });
        }
    },

    async updateEmail({ dispatch, commit, state }, { password, email }) {
        try {
            const data = await this.$api.authentication.initiateEmailReset(
                email,
                password,
            );

            dispatch('toast/success', "We've updated your email!.", {
                root: true,
            });

            // If the updated user requires going through the verification process once again, reset there
            // role state and redirect them to the pending page.
            if (data.verification) {
                commit('user', Object.assign(state.user, { role: 'PENDING' }));
                dispatch('navigate', '/pending', { root: true });
            } else {
                commit('user', Object.assign(state.user, { email }));
            }
        } catch (e) {
            dispatch('toast/error', e, { root: true });
        }
    },

    async getEmailPermissions({ dispatch, commit, state }) {
        try {
            const { id } = state.user;
            const userPermission = await this.$api.users.getUsersEmailPermissions(
                id,
            );

            commit('emailPermissions', userPermission);
        } catch (e) {
            dispatch('toast/error', e, { root: true });
            commit('emailPermissions', null);
        }
    },

    async updateEmailPermissions({ dispatch, commit, state }) {
        try {
            const permissions = state.emailPermissions;

            const { id } = state.user;
            const response = await this.$api.users.updateUsersEmailPermissions(
                id,
                permissions,
            );

            commit('emailPermissions', response);
            dispatch('toast/success', "We've updated your email permissions!", {
                root: true,
            });
        } catch (e) {
            dispatch('toast/error', e, { root: true });
            commit('emailPermissions', null);
        }
    },

    async forgot({ dispatch }, email) {
        try {
            await this.$api.authentication.initiatePasswordReset(email);

            dispatch(
                'toast/success',
                'Check your email for a guide to reset your password.',
                { root: true },
            );

            return true;
        } catch (e) {
            dispatch('toast/error', e, { root: true });

            return false;
        }
    },

    async resetByToken({ dispatch }, { token, password }) {
        await this.$api.authentication.processPasswordReset(token, password);

        dispatch(
            'toast/success',
            "We've updated your password, give it a go!",
            {
                root: true,
            },
        );
    },

    async avatar({ dispatch, state }, data) {
        const formData = new FormData();
        formData.append('avatar', data, 'avatar.jpg');

        await this.$axios({
            url: `/users/${state.user.id}/avatar`,
            method: 'PUT',
            data: formData,
            noTransform: true,
        });

        await dispatch('refresh');
    },

    async linkedAccounts({ state, commit }) {
        const { id } = state.user;
        const response = await this.$api.users.getUserConnections(id);
        commit('linkedAccounts', response);
    },

    async connectLinkedAccount({ dispatch, commit }, provider) {
        await this.$api.linkedAccounts.connectLinkedAccount(provider);
        commit('connectLinkedAccount', provider);

        await dispatch('refresh');
    },

    async disconnectLinkedAccount({ dispatch, commit }, provider) {
        await this.$api.linkedAccounts.disconnectLinkedAccount(provider);
        commit('removeLinkedAccount', provider);

        await dispatch('refresh');
    },
};
