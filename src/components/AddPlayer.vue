<template>
    <b-form @submit.prevent="submit">
        <div class="d-flex">
            <div class="flex-grow-1 mr-1">
                <b-input v-model="name" placeholder="Add a player" autocomplete="off" />
            </div>
            <b-button v-show="false" type="submit">Submit</b-button>
        </div>
    </b-form>
</template>

<script lang="js">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class AddPlayer extends Vue {

    name = ''

    get options(){
        return this.$store.getters.potentialPlayers
    }

    submit(){
        if (this.name.length){
            this.$store.dispatch('addPlayer', this.name)
                .then(() => this.name = '')
        }
    }

}
</script>