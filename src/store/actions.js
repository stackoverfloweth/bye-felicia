const actions = {
    addPlayer({ state, commit }, name) {
        if (!state.pool.find(x => x.name == name)) {
            commit('addToPool', name)
        }

        if (!state.players.find(x => x.name == name)) {
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
    },
}

export default actions
