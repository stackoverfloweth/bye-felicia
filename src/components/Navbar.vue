<template>
    <b-navbar variant="faded" type="light" class="d-flex justify-content-center mb-4">
        <b-navbar-brand href="#">
            <h2>Bye Felicia 👋</h2>
        </b-navbar-brand>
    </b-navbar>
</template>

<script lang="js">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {}
</script>