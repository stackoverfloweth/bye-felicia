<template>
    <div class="d-flex align-items-center">
        <b-form-checkbox v-if="round > 0" v-model="out" />
        <span :style="styles.name">
            {{player.name}}
        </span>
        <b-button v-if="playing" class="ml-auto xs-button" variant="danger" @click="remove">&times;</b-button>
        <b-button v-else class="ml-auto xs-button" variant="success" @click="add">&plus;</b-button>
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

    get playing(){
        return this.$store.state.players.findIndex(x => x.name == this.player.name) > -1
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
                textDecoration: this.out ? 'line-through' : 'none'
            }
        }
    }

    add(){
        this.$store.commit('addPlayer', this.player.name)
    }

    remove(){
        this.$store.commit('removePlayer', this.player.name)
    }
}
</script>
<style lang="scss">
    #app {
        .xs-button {
            font-size: 18px;
            line-height: 0;
            height: 16px;
            width: 16px;
            padding: 0;
        }
    }
</style>