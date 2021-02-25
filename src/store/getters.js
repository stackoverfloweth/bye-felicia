const getters = {
    activePlayers: (state) => {
        return state.players.filter(player => !player.out)
    },
    outPlayers: (state) => {
        return state.players.filter(player => player.out)
    },
    potentialPlayers: (state) => {
        return state.pool.filter(player => !state.players.includes(player))
    },
}

export default getters