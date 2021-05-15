const actions = {
    addPlayer({ state, commit }, name) {
        if (!state.pool.includes(name)) {
            commit('addToPool', name)
        }

        if (state.players.findIndex(x => x.name == name) == -1) {
            commit('addPlayer', name)
        }
    },
    shufflePlayers({ state, commit }) {
        const array = [...state.players.filter(x => !x.out)]
        let currentIndex = array.length, temporaryValue, randomIndex

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1
            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }

        commit('setPlayers', [...state.players.filter(x => x.out), ...array])
    },
    newGame({ commit }) {
        commit('clearPlayers')
        commit('setRound', 0)
        commit('setCurrentPlayerIndex', -1)
    },
    nextPlayer({ state, dispatch, commit }) {
        const nextPlayerIndex = state.players.findIndex((player, i) => i > state.currentPlayerIndex && !player.out)

        if (nextPlayerIndex > -1) {
            commit('setCurrentPlayerIndex', nextPlayerIndex)
        } else {
            dispatch('nextRound')
        }
    },
    nextRound({ state, getters, dispatch, commit }) {
        dispatch('shufflePlayers')
        commit('setRound', state.round + 1)
        commit('setCurrentPlayerIndex', getters.outPlayers.length)
    },
    startGame({ state, dispatch }) {
        if (state.round == 0 && state.players.length > 1) {
            dispatch('nextRound')
        }
    },
    endGame({ commit }) {
        commit('setCurrentPlayerIndex', -1)
    },
}

export default actions
