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
                    <p>So we're going to make a sort of YouTube browsing application. This application is going to allow
                        users to enter a search term at the top of the page in the text input field. They might search
                        for a term like say "archery". Once they submit their search criteria we will use the YouTube
                        API to search for the term they just entered. We will receive a list of videos that match that
                        search term.
                    </p>
                    <p>We will display the list of videos on the right hand side of the screen over here. Then any time
                        a user click on one of these videos we will display a larger detail on the left hand side where
                        the user can play the video and view a quick description of the video itself.
                    </p>
                    <p>This application will test our knowledge of Vue and ensure that we learn many different aspects
                        of working with Vue inside an application.
                    </p>
                    <p>Let's continue in the next section where we are going to start talking about some of the big
                        challenges and solutions that we might come up against inside this application.
                    </p>
                    <h3>App Challenges</h3>
                    <p>In the last section we took a look at a mock up that describes the next application that we're
                        going to be working on. We'll now continue by talking about some of the problems which we're
                        going to have to address as we start working on this app. And we'll also of course talk about
                        some possible solutions as well. So I think there are at least four big issues that we are going
                        to run into over time:
                    </p>
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
                            <td>Sign up for the YouTube API and use it to search for videos based on the user's entered
                                search term.
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
                            <td>Use the same Vue directives, methods, and computed functions that we just learned about
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <p>So let's continue in the next section where we're going to start by generating a new project -
                        making use of Vue CLI.
                    </p>
                    <h3>Generating a New Project</h3>
                    <p>In the last section we talked about how we're going to make use of a tool called Vue CLI to
                        generate a new project boilerplate. We're using this tool because setting up your own Vue
                        project from scratch takes a little bit of time and it's not the best thing to get started with
                        when you're first trying to start learning Vue.
                    </p>
                    <p>So we're going to install Vue CLI at our terminal and then we'll use it to generate a new
                        project. To install Vue CLI run the following command:
                    </p>
                    <pre class="prettyprint">npm install -g @vue/cli</pre>
                    <p>Now while that's being installed I want to show you the documentation for Vue CLI very quickly.
                        It can be found at GitHub:
                    </p>
                    <pre class="prettyprint">https://github.com/vuejs/vue-cli</pre>
                    <p>There's not a tremendous amount of documentation on here because Vue CLI is still in active
                        development right now. Towards the bottom of the page you will find a link to the full
                        documentation. Following this link will take you to some information on how to do further
                        configuration of the project and eventually I would expect to see some deployment directions on
                        here as well.
                    </p>
                    <p>Back in our terminal we can now use this tool to generate a new project so I'm going to make sure
                        I am inside of a directory where I want to create a workspace folder of sorts. For this
                        application I created a directory at:
                    </p>
                    <pre class="prettyprint">C:\DevelopmentTutorials\video-browser</pre>
                    <p>Inside of this directory I'm going to run the following command:</p>
                    <pre class="prettyprint">vue create video-browser</pre>
                    <p>When you run this command you might be prompted to answer several questions about the new project
                        you are configuring. If you do just select any of the default options that are presented.
                    </p>
                    <p>In the next section we will discuss what is being configured when we install this default project
                        here.
                    </p>
                    <h3>Why Use Vue CLI?</h3>
                    <p>In the previous section we made use of Vue CLI to generate a new project. It looks like my
                        installation is now complete and I'm given the directions to change directories to video-browser
                        and run the following command:
                    </p>
                    <pre class="prettyprint">npm run serve</pre>
                    <p>Let's have a quick discussion about why we are making use of the Vue CLI project generator - why
                        do we need all this infrastructure and preconfigured stuff anyway?
                    </p>
                    <p>Let's take a look at a diagram to get a better sense of why:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig02-002.png"/>
                        <figcaption>Fig 02-002</figcaption>
                    </figure>
                    <p>So this is an illustration of how we were running when we used CodePen in the previous couple of
                        examples.
                    </p>
                    <p>We automatically loaded up the Vue JS file by adding it as a dependency to the project.</p>
                    <p>We also then added a little bit of code directly on CodePen. The two together formed a usable
                        application.
                    </p>
                    <p>The key thing there to keep in mind is that all the code that you and I wrote - like the
                        Javascript code and the Html markup were all inside of essentially a single file authored
                        directly on CodePen.
                    </p>
                    <p>When we start working on real projects we don't have the luxury of only having to create one
                        single file like we did in the previous examples. With real Vue project we much more frequently
                        make a collection of files - so many different files form one single application. Vue CLI aids
                        us in this process.
                    </p>
                    <p>So, with Vue CLI, we get the ability to instead make many different files each of which might
                        have one individual or distinct purpose inside of our application:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig02-003.png"/>
                        <figcaption>Fig 02-003</figcaption>
                    </figure>
                    <p>So we might have one file that has some code for fetching videos and then maybe another one
                        that's in charge of the search bar at the top of our application. Another one for playing a
                        video and then on more for maybe showing a list of videos to the user.
                    </p>
                    <p>So all these different files are going to come together to form our one usable application.</p>
                    <p>Here's the thing about JavaScript though - out of the box it doesn't offer a great way to take
                        all these different files, combine them down to one single file, send that file to the user's
                        browser and have our application start up and be executed.
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig02-004.png"/>
                        <figcaption>Fig 02-004</figcaption>
                    </figure>
                    <p>So to take all these different files and combine them together we make use of a tool called
                        webpack. Essentially webpack's purpose is to look at a big collection of files and possibly
                        dependencies as well (like Vue JS) and combine them all down to one single file which can then
                        be sent down to your users browser when they try to make use of your application.
                    </p>
                    <p>The webpack tool is one of the big reasons that we're making use of Vue CLI. webpack is somewhat
                        notorious for being a little difficult to set up out of the box. So by making use of Vue CLI it
                        automatically sets up webpack for us and chooses a lot of very sensible configuration defaults.
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig02-005.png"/>
                        <figcaption>Fig 02-005</figcaption>
                    </figure>
                    <p>Along with Vue CLI we also get access to Babel preconfigured for us right of the box. You may
                        have heard of Babel before as well. Babel allows us to write ES2015, 16, 17 and so on code that
                        can be safely executed inside of a user's browser even if their browser does not have support
                        for a particular dialect of Javascript which we might want to use. Just like webpack, Babel is
                        also included automatically inside of Vue CLI and it has a lot of very sensible configuration
                        defaults already set up for us.
                    </p>
                    <p>So that's why we are making use of Vue CLI. It does all this setup for us and we don't have to
                        waste any time labouring over documentation and figuring out how to set that stuff up.
                    </p>
                    <p>Let's continue in the next section where we're going to start up our application and get a better
                        sense of all the different files and folders that were created for us automatically when we just
                        generated the project.
                    </p>
                    <h3>Project Walkthrough</h3>
                    <p>In the last section we spoke about how we get webpack and Babel setup for us for free whenever we
                        make use of Vue CLI.
                    </p>
                    <p>Back in the terminal change directory into the newly created video browser directory and start
                        the project by running the command:
                    </p>
                    <pre class="prettyprint">npm run serve</pre>
                    <p>Throughout the rest of this course we're going to be using this command to start our project up.
                        Now when you run that command you'll see some information about starting up the development
                        server. The <code class="prettyprint">npm run serve</code> command starts up a local server that
                        starts up Babel and webpack, takes all of our project files and bundles them together into one
                        single Javascript file where it can then be served up into the browser. The command will also
                        open a browser window pointing to the following address:
                    </p>
                    <pre class="prettyprint">localhost:8080</pre>
                    <p>This is where our project is hosted.</p>
                    <p>You'll also notice that there is a little bit of default content already visible on the screen
                        here.
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig02-006.png"/>
                        <figcaption>Fig 02-006</figcaption>
                    </figure>
                    <p>The code to create this content is generated automatically when we run Vue CLI to setup our new
                        project.
                    </p>
                    <p>Let's now open up our code editor inside of the project directory and take a look at some of the
                        different files and folders that were generated for us:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig02-007.png"/>
                        <figcaption>Fig 02-007</figcaption>
                    </figure>
                    <p>You'll see some different files and folders that were created for us automatically when we
                        generated our project.
                    <p>Inside the node_modules directory is a list of all the different dependencies that our project
                        relies or depends on.
                    </p>
                    <p>Underneath that you'll find the public directory inside which is a very important file -
                        index.html:
                    </p>
                    <figure>
                    <pre class="prettyprint">&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1.0&quot;&gt;
    &lt;link rel=&quot;icon&quot; href=&quot;&lt;%= BASE_URL %&gt;favicon.ico&quot;&gt;
    &lt;title&gt;video-browser&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;noscript&gt;
      &lt;strong&gt;We're sorry but video-browser doesn't work properly without JavaScript enabled. Please enable it to continue.&lt;/strong&gt;
    &lt;/noscript&gt;
    &lt;div id=&quot;app&quot;&gt;&lt;/div&gt;
    &lt;!-- built files will be auto injected --&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
                        <figcaption>Fig 02-008</figcaption>
                    </figure>
                    <p>Anytime someone tries to visit our application by coming to our server in their web browser the
                        index.html file is going to be loaded up automatically. In the Html you should see a <code
                                class="prettyprint">div</code> with an <code class="prettyprint">id</code> of <code
                                class="prettyprint">app</code> just like the code we wrote back in CodePen.
                    </p>
                    <p>This <code class="prettyprint">div</code> represents the root location of where our app is going
                        to be booted up.
                    </p>
                    <p>Then inside the src directory you will find a bunch of different files and folders that are
                        related to the actual implementation of our Vue app. We're gong to be spending the vast majority
                        of our time inside this src directory.
                    </p>
                    <p>Let's start off by looking at the main.js file. Inside of this file you'll find some very plain
                        Javascript code and towards the bottom you'll find a function call to create a new Vue instance.
                        You'll notice that there's also this <code class="prettyprint">render</code> option in here and
                        also a <code class="prettyprint">$mount</code> function call as well. We'll just ignore those
                        two little pieces of code for right now but we'll definitely come back to those very shortly
                        and talk about what their purposes are.
                    </p>
                    <p>You'll notice that, also inside the src directory, is an App.vue file. Notice the extension
                        there - it's .vue rather than being .js or anything like that. Let's open up the file and
                        have a look:</p>
<figure>
<pre class="prettyprint">&lt;template&gt;
  &lt;div id=&quot;app&quot;&gt;
    &lt;img src=&quot;./assets/logo.png&quot;&gt;
    &lt;HelloWorld msg=&quot;Welcome to Your Vue.js App&quot;/&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
&lt;/script&gt;

&lt;style&gt;
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
&lt;/style&gt;</pre>
<figcaption>Fig 02-009</figcaption>
</figure>
                    <p>All this Html is nested inside of a template tag and then below all that Html you'll find
                        what looks like another piece of Html - a script tag inside which there is some Javascript
                        code.</p>
                    <p>So I don't know about you but this definitely looks like one weird little file.</p>
                    <p>So let's talk about what's going on here in the next section.</p>
                    <h3>Vue Files</h3>
                    <p>In the last section we started looking at some of the different files and folders that were
                        generated for us automatically when we made our new project. In particular we opened up the
                        App.vue file and inside of there we saw some very interesting looking syntax.</p>
                    <p>So at the top we see a <code class="prettyprint">template</code> tag and a the bottom we see a
                        <code class="prettyprint">script</code> tag. So let's talk about what's going here.</p>
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