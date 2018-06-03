<template>
    <div class="container">
        <router-view name="header-top"></router-view>

        <router-view>

        </router-view>

    </div>
</template>

<script>
    import Header from './components/Header.vue';
    export default {
        components: {
            appHeader: Header
        }
    }


</script>

<style>
    figcaption {
        font-weight: bold;
        padding: 10px 0px 20px 0px;
    }
</style>
