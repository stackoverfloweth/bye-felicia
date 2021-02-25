<template>
    <b-container>
        <b-row>
            <b-col md="6" class="pb-3">
                <timer />
            </b-col>
            <b-col md="6">
                <add-player />
                <div class="py-3">
                    <div v-if="players.length == 0" class="text-center">
                        <em>No Players</em>
                    </div>
                    <player v-for="(player, index) in shuffledPlayers" :key="index" :player="player" />
                </div>
                <div class="d-flex justify-content-center">
                    <b-button variant="light" :disabled="players.length == 0" @click="shuffle">Shuffle</b-button>
                    <b-button variant="light" class="ml-1" @click="reset">New Game</b-button>
                </div>
            </b-col>
        </b-row>
        <winner-modal :visible="Boolean(winner)" :player="winner" />
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

    lastFetch = null

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

    get shuffledPlayers() {
        if (this.lastFetch){
            this.lastFetch = Date.now()
        }
        const array = [...this.players]
        let currentIndex = array.length, temporaryValue, randomIndex

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1
            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }

        return array
    }

    shuffle(){
        this.lastFetch = Date.now
    }

    reset(){
        this.$store.dispatch('newGame')
    }

}
</script>