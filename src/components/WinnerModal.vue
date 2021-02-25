<template>
    <b-modal v-bind="$attrs" v-on="$listeners" hide-footer title="Woot! 🎉" @shown="shown" @hidden="hidden">
        <h1>{{player.name}} Wins!</h1>
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