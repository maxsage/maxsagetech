<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>Editors</h2>
                </div>
                <div class="panel-body">
                    <h3>Visual Studio</h3>
                    <router-link to="/editors/visual-studio" active-class="active"><a>Visual Studio</a></router-link>
                    <h3>Visual Studio Code</h3>
                    <router-link to="/editors/visual-studio-code" active-class="active"><a>Visual Studio Code</a></router-link>
                    <h3>Webstorm</h3>
                    <router-link to="/editors/webstorm" active-class="active"><a>Webstorm</a></router-link>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Editors'
}
</script>

<style scoped>

</style>
