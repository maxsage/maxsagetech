<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>Moving on with Vue CLI</h2>
                </div>
                <div class="panel-body">
                    <h3>App Overview</h3>
                    <p>In the last section we wrapped up our identicon project and in this video we're going to start
                        talking about the next application which we will be working on in this course. The next
                        application will be a lot more ambitious with more features and complexity to it.
                    </p>
                    <p>First let's take a look at a mock up of what we're going to build:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig02-001.png"/>
                        <figcaption>Fig 02-001</figcaption>
                    </figure>
                    <p>So we're going to make a sort of YouTube browsing application. This application is going to
                        allow users to enter a search term at the top of the page in the text input field. They might
                        search for a term like say "archery". Once they submit their search criteria we will use the
                        YouTube API to search for the term they just entered. We will receive a list of videos that
                        match that search term.
                    </p>
                    <p>We will display the list of videos on the right hand side of the screen over here. Then any
                        time a user click on one of these videos we will display a larger detail on the left hand
                        side where the user can play the video and view a quick description of the video itself.</p>
                    <p>This application will test our knowledge of Vue and ensure that we learn many different
                        aspects of working with Vue inside an application.</p>
                    <p>Let's continue in the next section where we are going to start talking about some of the big
                        challenges and solutions that we might come up against inside this application.</p>
                    <h3>App Challenges</h3>
                    <p>In the last section we took a look at a mock up that describes the next application that we're
                        going to be working on. We'll now continue by talking about some of the problems which we're
                        going to have to address as we start working on this app. And we'll also of course talk
                        about some possible solutions as well. So I think there are at least four big issues that we
                        are going to run into over time:</p>
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th>Problem</th>
                            <th>Solution</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Need to somehow search for videos on YouTube</td>
                            <td>Sign up for the YouTube API and use it to search for videos based on the user's
                                entered search term.
                            </td>
                        </tr>
                        <tr>
                            <td>Need to show some different elements on the screen (search bar, video player, video
                                list)
                            </td>
                            <td>Use Vue to create a couple of components, each of which have a distinct job.</td>
                        </tr>
                        <tr>
                            <td>Need a place to write our code and run it</td>
                            <td>Use a tool called Vue CLI to generate a new project boilerplate.</td>
                        </tr>
                        <tr>
                            <td>Need to handle user input, like typing in the search term and clicking on videos</td>
                            <td>Use the same Vue directives, methods, and computed functions that we just learned
                                about
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <p>So let's continue in the next section where we're going to start by generating a new project
                        - making use of Vue CLI.</p>
                    <h3>Generating a New Project</h3>
                    <p>In the last section we talked about how we're going to make use of a tool called Vue CLI to
                        generate a new project boilerplate. We're using this tool because setting up your own Vue
                        project from scratch takes a little bit of time and it's not the best thing to get started
                        with when you're first trying to start learning Vue.</p>
                    <p>So we're going to install Vue CLI at our terminal and then we'll use it to generate a new
                        project. To install Vue CLI run the following command:</p>
                    <pre class="prettyprint">npm install -g @vue/cli</pre>
                    <p>Now while that's being installed I want to show you the documentation for Vue CLI very
                        quickly. It can be found at GitHub:
                    </p>
                    <code class="prettyprint">https://github.com/vuejs/vue-cli</code>
                    <p>There's not a tremendous amount of documentation on here because Vue CLI is still in active
                        development right now. Towards the bottom of the page you will find a link to the full
                        documentation. Following this link will take you to some information on how to do further
                        configuration of the project and eventually I would expect to see some deployment directions
                        on here as well.</p>
                    <p>Back in our terminal we can now use this tool to generate a new project so I'm going to make
                        sure I am inside of a directory where I want to create a workspace folder of sorts. For this
                        application I created a directory at:</p>
                    <pre class="prettyprint">C:\DevelopmentTutorials\video-browser</pre>
                    <p>Inside of this directory I'm going to run the following command:</p>
                    <pre class="prettyprint">vue create video-browser</pre>
                    <p>When you run this command you might be prompted to answer several questions about the new
                        project you are configuring. If you do just select any of the default options that are
                        presented. </p>
                    <p>In the next section we will discuss what is being configured when we install this default
                        project here.</p>
                    <h3>Why Use Vue CLI?</h3>
                    <p>In the previous section we made use of Vue CLI to generate a new project </p>
                    <h3>Project Walkthrough</h3>
                    <h3>Vue Files</h3>
                    <h3>Behind the Scenes of Vue Files</h3>
                    <h3>Vue Components vs Vue Instances</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VuejsEssentials02MovingOnWithVueCLI.vue"
    }
</script>

<style scoped>

</style>