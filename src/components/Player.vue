<template>
    <div class="d-flex align-items-center">
        <b-form-checkbox v-model="out" />
        <span :style="styles.name">
            {{player.name}}
        </span>
        <b-button class="ml-auto xs-button" variant="danger" @click="remove">&times;</b-button>
    </div>
</template>

<script lang="js">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Player extends Vue {
    @Prop({ type: Object, required: true }) player

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