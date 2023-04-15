import service from '../service';

// initial state
const state = () => ({
    all: [],
    loading: false,
    selectedLeisureId: 0
});

// getters
const getters = {};

// actions
const actions = {
    async getLeisures({ commit }, { activityId, inputText }) {
        commit('setLoading', true);
        commit('setLeisures', []);
        await loopLeisures(commit, 2, 0, activityId, inputText);
        commit('setLoading', false);
    },
    selectLeisure({ commit }, leisureId) {
        commit('setSelectedLeisureId', leisureId);
    }
};

async function loopLeisures(commit, pageSize, offset, activityId, inputText) {
    const leisures = await service.getLeisures(pageSize, offset, activityId, inputText);
    commit('addLeisures', leisures);
    if (leisures.length === pageSize) {
        return loopLeisures(commit, pageSize, offset + pageSize, activityId, inputText);
    }
    return leisures;
}

// mutations
const mutations = {
    setLeisures(localState, leisures) {
        localState.all = leisures;
    },
    addLeisures(localState, leisures) {
        localState.all.push(...leisures);
    },
    setLoading(localState, value) {
        localState.loading = value;
    },
    setSelectedLeisureId(localState, value) {
        localState.selectedLeisureId = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
