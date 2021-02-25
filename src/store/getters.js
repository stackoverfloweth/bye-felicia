const getters = {
    potentialPlayers: (state) => {
        return state.pool.filter(player => !state.players.includes(player))
    },
}

export default getters