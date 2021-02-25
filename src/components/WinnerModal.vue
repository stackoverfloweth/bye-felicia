<template>
    <b-modal v-bind="$attrs" v-on="$listeners" hide-footer title="Woot! 🎉" @shown="shown" @hidden="hidden">
        <h1>{{player.name}} Wins!</h1>
        <span>in the {{ordinalRound}} round</span>
    </b-modal>
</template>

<script lang="js">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import VueConfetti from 'vue-confetti'

Vue.use(VueConfetti)

@Component({
    inheritAttrs: false
})
export default class WinnerModal extends Vue {
    @Prop({ type: Object }) player

    get round(){
        return this.$store.state.round
    }

    get ordinalRound(){
        var modTen = this.round % 10
        var modHundred = this.round % 100

        if (modTen == 1 && modHundred != 11) {
            return this.round + 'st'
        }
        if (modTen == 2 && modHundred != 12) {
            return this.round + 'nd'
        }
        if (modTen == 3 && modHundred != 13) {
            return this.round + 'rd'
        }

        return this.round + 'th'
    }

    shown() {
        this.$confetti.start({ particles: [
            { type: 'rect', }
        ], })
    }

    hidden(){
        this.$confetti.stop()
    }
}
</script>