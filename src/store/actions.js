const actions = {
    addPlayer({ state, commit }, name) {
        if (!state.pool.includes(name)) {
            commit('addToPool', name)
        }

        if (!state.players.includes(name)) {
            commit('addPlayer', name)
        }
    },
    newGame({ commit }) {
        commit('clearPlayers')
    },
}

export default actions
