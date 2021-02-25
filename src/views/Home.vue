<template>
    <b-container>
        <b-row>
            <b-col md="6" class="pb-3">
                <h3 v-if="round == 0">Build Phase</h3>
                <h3 v-else class="d-flex align-items-start">
                    Round {{round}}
                </h3>
                <timer ref="timer" />
            </b-col>
            <b-col md="6">
                <add-player />
                <div class="py-3">
                    <b-overlay :show="confirm" variant="transparent" no-wrap>
                        <div class="text-center" slot="overlay">
                            <p><strong>Are you sure?</strong></p>
                            <div class="d-flex">
                                <b-button variant="light" class="mr-1" @click="confirm = false">Cancel</b-button>
                                <b-button variant="danger" @click="reset">Reset</b-button>
                            </div>
                        </div>
                    </b-overlay>
                    <div class="text-center">
                        <em v-if="players.length == 0">No Players</em>
                        <em v-else>{{$store.getters.activePlayers.length}} Players</em>
                    </div>
                    <template v-if="round > 0">
                        <player v-for="(player, index) in players" :key="index" :player="player" />
                    </template>
                    <template v-else>
                        <player v-for="(player, index) in pool" :key="index" :player="{name: player}" />
                    </template>
                </div>
                <div class="d-flex justify-content-center">
                    <b-button v-if="round > 0" variant="light" :disabled="round == 0" @click="next">👍</b-button>
                    <b-button v-if="round > 0" variant="light" class="ml-1" :disabled="round == 0" @click="out">👎</b-button>
                    <span v-if="round == 0" id="start-button">
                        <b-button :disabled="players.length < 2" variant="light" class="mr-1" @click="start">Begin</b-button>
                        <b-popover v-if="players.length < 2" target="start-button" content="Not enough players!" triggers="hover" placement="bottom" />
                    </span>
                    <b-button variant="light" class="ml-1" @click="confirm = true">New Game</b-button>
                </div>
            </b-col>
        </b-row>
        <winner-modal v-if="Boolean(winner)" :visible="true" :player="winner" />
    </b-container>
</template>

<script lang="js">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Player from '@/components/Player.vue'
import Timer from '@/components/Timer.vue'
import AddPlayer from '@/components/AddPlayer.vue'
import WinnerModal from '@/components/WinnerModal.vue'

@Component({
    components: {
        Player,
        Timer,
        AddPlayer,
        WinnerModal,
    }
})
export default class Home extends Vue {

    confirm = false

    get winner(){
        if (this.players.length < 2){
            return null
        }

        const remaining = this.players.filter(x => x.out == false)

        return remaining.length == 1 ? remaining[0] : null
    }

    get players(){
        return this.$store.state.players
    }

    get pool(){
        return this.$store.state.pool.sort()
    }

    get round(){
        return this.$store.state.round
    }

    get currentPlayer(){
        return this.players[this.$store.state.currentPlayerIndex]
    }

    start(){
        this.$refs.timer.start()
    }

    next(){
        this.$store.dispatch('nextPlayer')
    }

    out(){
        this.$store.commit('setPlayerOut', { ...this.currentPlayer, out: true })
        this.next()
    }

    reset(){
        this.confirm = false
        this.$store.dispatch('newGame')
    }

}
</script>