const actions = {
    addPlayer({ state, commit }, name) {
        if (!state.pool.includes(name)) {
            commit('addToPool', name)
        }

        if (state.players.findIndex(x => x.name == name) == -1) {
            commit('addPlayer', name)
        }
    },
    shufflePlayers({ state, commit }){
        const array = [...state.players]
        let currentIndex = array.length, temporaryValue, randomIndex

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1
            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }

        commit('setPlayers', array)
    },
    newGame({ commit }) {
        commit('clearPlayers')
        commit('setRound', 1)
    },
    nextRound({ state, dispatch, commit }){
        dispatch('shufflePlayers')
        commit('setRound', ++state.round)
    }
}

export default actions
