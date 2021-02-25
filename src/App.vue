<template>
    <div id="app">
        <navbar />
        <router-view />
    </div>
</template>

<script lang="js">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Navbar from '@/components/Navbar.vue'

@Component({
    components: {
        Navbar
    }
})
export default class App extends Vue {}
</script>