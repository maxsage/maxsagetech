<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>Handling State with Vuex</h2>
                </div>
                <div class="panel-body">
                    <h3>App Overview</h3>
                    <p>We just finished our last application but there's still a lot more for us to learn about Vue.
                        In this section we're going to generate a new project and then take a look at a couple of
                        mock-ups that will explain what we're trying to build.
                    </p>
                    <p>Use the vue cli to create a new project called images:</p>
                    <code class="prettyprint">vue create images</code>
                    <p>Accept the default presets. Vue cli will then start installing a couple of dependencies into
                        our new project. </p>
                    <p>The following mock-up describes what we are going to build:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig04-001.png"/>
                        <figcaption>Fig 04-001</figcaption>
                    </figure>
                    <p>The first mock-up is of the home screen we are going to create. We are going to create an
                        image upload and viewing application. When the user first visits our application we'll
                        prompt them to login to our app. This means we need some sort of authentication system in
                        place.</p>
                    <p>Once the user logs in they'll then be prompted with a screen to upload a couple of different
                        images:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig04-002.png"/>
                        <figcaption>Fig 04-002</figcaption>
                    </figure>
                    <p>This is going to be a drag and drop image upload widget. A user can either click on this big
                        button or panel and be prompted to upload an image or they can drag and drop images across
                        onto this big block as well.
                    </p>
                    <p>Once the user has uploaded some images they can browse the gallery page where they can view
                        all the different images that they have uploaded over time. </p>
                    <p>All the images that a user uploads should only be visible to them. There's not going to be
                        any built-in sharing of images here. We're going to be much more concerned with figuring out
                        how we handle upload and drag and drop functionality. </p>
                    <p>In the next section we will discuss some of the challenges that we will face whilst creating
                        this application.</p>
                    <h3>App Challenges</h3>
                    <p>In the last section we started talking about the next big application that we're going to be
                        working on.</p>
                    <p>Some of the challenges we may encounter whilst developing this application include:</p>
<figure>
  <img src="./images/vuejsessentials/Fig04-003.png"/>
  <figcaption>Fig 04-003</figcaption>
</figure>
                    <p>In the next section we will continue with our application configuration by adding some
                        additional dependencies.</p>
                    <h3>Additional Dependencies</h3>
                    <p>In the images directory we can install a couple of dependencies that we will need later on in
                    the application. Add the following dependencies using the following terminal command:</p>
                    <code class="prettyprint">npm install --save axios lodash qs vue-router vuex</code>
                    <p>In the next section we'll continue after the installation is complete.</p>
                    <h3>A Bit of Boilerplate</h3>
                    <h3>Building the Header</h3>
                    <h3>Including Semantic UI</h3>
                    <h3>Styling the Header</h3>
                    <h3>Imgur Overview</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VuejsEssentialsHandlingStateWithVuex.vue"
    }
</script>

<style scoped>

</style>