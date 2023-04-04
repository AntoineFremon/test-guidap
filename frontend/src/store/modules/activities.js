import service from '../service';

// initial state
const state = () => ({
    all: []
});

// getters
const getters = {};

// actions
const actions = {
    async getAllActivites({ commit }) {
        const activities = await service.getActivities();
        commit('setActivities', activities);
    }
};

// mutations
const mutations = {
    setActivities(localState, activities) {
        localState.all = activities;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
