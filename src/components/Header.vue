<template>
    <ul class="nav nav-pills" style="margin-bottom: 10px">
        <router-link to="/" tag="li" active-class="active" exact><a>Home</a></router-link>
        <router-link to="/vuejs" tag="li" active-class="active"><a>Vue.js</a></router-link>
        <router-link to="/wpf" tag="li" active-class="active" exact><a>WPF</a></router-link>
        <router-link to="/xamarin" tag="li" active-class="active"><a>Xamarin</a></router-link>
        <router-link to="/sqlite" tag="li" active-class="active"><a>SQLite</a></router-link>
        <router-link to="/editors" tag="li" active-class="active"><a>Editors</a></router-link>
    </ul>
</template>