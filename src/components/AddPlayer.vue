<template>
    <b-form @submit.prevent="submit">
        <div class="d-flex">
            <div class="flex-grow-1 mr-1">
                <vue-bootstrap-typeahead ref="typeahead" v-model="name" :data="options" :min-matching-chars="1" placeholder="Add a player" @hit="submit" />
            </div>
            <b-button v-show="false" type="submit">Submit</b-button>
        </div>
    </b-form>
</template>

<script lang="js">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

@Component
export default class AddPlayer extends Vue {

    @Watch('name')
    setTypeAhead(value){
        this.$refs.typeahead.inputValue = value
    }

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