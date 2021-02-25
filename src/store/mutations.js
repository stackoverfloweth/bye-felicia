
const mutations = {
    clearPlayers: (state) => {
        state.players = []
    },
    addPlayer: (state, name) => {
        state.players.push({ name, out: false })
    },
    removePlayer: (state, name) => {
        const index = state.players.findIndex(x => x.name == name)
        state.players.splice(index, 1)
    },
    setPlayers: (state, players) => {
        state.players = players
    },
    setPlayerOut: (state, { name, out }) => {
        const index = state.players.findIndex(x => x.name == name)
        state.players.splice(index, 1, { name, out })
    },
    addToPool: (state, name) => {
        state.pool.push(name)
    },
    removeFromPool: (state, name) => {
        const index = state.pool.indexOf(name)
        state.pool.splice(index, 1)
    },
    setRound: (state, round) => {
        state.round = round
    },
    setCurrentPlayerIndex: (state, currentPlayerIndex) => {
        state.currentPlayerIndex = currentPlayerIndex
    },
}

export default mutations