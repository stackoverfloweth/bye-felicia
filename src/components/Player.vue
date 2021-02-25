<template>
    <div class="d-flex mb-1 align-items-center">
        <b-form-checkbox v-if="round > 0" v-model="out" />
        <span :style="styles.name">
            {{player.name}}
        </span>
        <b-badge v-if="current" class="ml-1">Current</b-badge>
        <div class="ml-auto" v-if="round == 0">
            <b-button :pressed="playing" size="sm" class="ml-1" variant="light" @click="toggle">Playing</b-button>
            <b-button size="sm" class="ml-1" variant="danger" @click="deleteFromPool">Delete</b-button>
        </div>
    </div>
</template>

<script lang="js">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Player extends Vue {
    @Prop({ type: Object, required: true }) player

    get round(){
        return this.$store.state.round
    }

    get playerIndex(){
        return this.$store.state.players.findIndex(x => x.name == this.player.name)
    }

    get playing(){
        return this.playerIndex > -1
    }

    get current(){
        return this.playing && this.$store.state.currentPlayerIndex == this.playerIndex
    }

    get out(){
        return this.player.out
    }

    set out(value){
        this.$store.commit('setPlayerOut', { ...this.player, out: value })
    }

    get styles(){
        return {
            name: {
                textDecoration: this.out ? 'line-through' : 'none',
                color: this.playing ? 'black' : 'lightgray'
            }
        }
    }

    toggle(){
        if (this.playing){
            this.$store.commit('removePlayer', this.player.name)
        } else {
            this.$store.commit('addPlayer', this.player.name)
        }
    }

    deleteFromPool(){
        this.$store.commit('removeFromPool', this.player.name)
    }
}
</script>