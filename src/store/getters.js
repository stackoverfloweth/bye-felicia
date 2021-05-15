const getters = {
    activePlayers: (state) => {
        return state.players.filter(player => !player.out)
    },
    outPlayers: (state) => {
        return state.players.filter(player => player.out)
    },
    potentialPlayers: (state) => {
        return state.pool
            .filter(player => !state.players.includes(player))
            .sort((player1, player2) => (player1.name > player2.name) ? 1 : -1)
    },
}

export default getters