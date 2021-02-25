<template>
    <div :class="classes.container" class="rounded p-3">
        <h1 :class="classes.timer">{{seconds}}:{{milliseconds}}</h1>
        <div>
            <b-button v-if="!running" size="sm" variant="light" class="mr-1" @click="start">Start</b-button>
            <b-button v-if="running" size="sm" variant="light" class="mr-1" @click="stop">Stop</b-button>
            <b-button size="sm" variant="light" class="mr-1" @click="reset">Reset</b-button>
        </div>
    </div>
</template>

<script lang="js">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Timer extends Vue {
    starting = 4500
    remaining = 0
    running = false

    get classes(){
        return {
            container: {
                'bg-danger': this.remaining == 0,
            },
            timer: {
                'text-danger': this.remaining < 1000 && this.remaining > 0,
                'text-white': this.remaining == 0,
            },
        }
    }

    get seconds(){
        return this.padClock.substring(0, 2)
    }

    get milliseconds(){
        return this.padClock.substring(2)
    }

    get padClock(){
        let result = this.remaining.toString()
        while (result.length < 4){
            result = '0' + result
        }

        return result
    }

    created(){
        this.reset()
    }

    reset() {
        this.stop()
        this.remaining = this.starting
    }

    start() {
        this.running = true
        this.timer = setInterval(() => {
            if (this.remaining == 0){
                return this.stop()
            }

            this.remaining--
        }, 10)
    }

    stop() {
        this.running = false
        clearTimeout(this.timer)
    }
}
</script>
<style lang="scss">
    #app {
        h1 {
            font-size: 80px;
        }
    }
</style>