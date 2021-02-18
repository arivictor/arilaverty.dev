
const state = {
    language: "en",
}

const getters = {
    posts(state) {
        return state.posts;
    },
    language(state) {
        return state.language;
    }
}

const actions = {
    changeLanguage({ commit }, language) {
        commit('setLanguage', language)
    }
}

const mutations = {
    setLanguage(state, language) {
        state.language = language;
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}