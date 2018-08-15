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
                    <p>We will display the list of videos on the right hand side of the screen. Then any time
                        a user click on one of these videos we will display a larger detail on the left hand side where
                        the user can play the video and view a quick description of the video itself.
                    </p>
                    <p>This application will test our knowledge of Vue and ensure that we learn many different aspects
                        of working with Vue inside an application.
                    </p>
                    <h3>App Challenges</h3>
                    <p>We'll now continue by talking about some of the problems which we're
                        going to have to address as we start working on this app. And we'll also of course talk about
                        some possible solutions as well. So I think there are at least four big issues that we are going
                        to run into over time:
                    </p>
                    <table class="table table-striped table-bordered">
                        <thead class="thead-dark">
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
                        project. To install Vue CLI enter <span class="terminal">npm install -g @vue/cli</span> in
                        a terminal window.</p>
                    <p>Now while that's being installed I want to show you the documentation for Vue CLI very quickly.
                        It can be found on <a target="_blank" href="https://github.com/vuejs/vue-cli">GitHub</a>. There's
                      not a
                        tremendous amount of documentation on here because Vue CLI is still in active
                        development right now. Towards the bottom of the page you will find a link to the full
                        documentation. Following this link will take you to some information on how to do further
                        configuration of the project and eventually I would expect to see some deployment directions on
                        here as well.
                    </p>
                    <p>Back in our terminal we can now use this tool to generate a new project so I'm going to make sure
                        I am inside of a directory where I want to create a workspace folder of sorts. For this
                        application I created a directory at <span class="terminal">C:\DevelopmentTutorials\video-browser</span>.
                        Inside of this directory I'm going to run the following command: <span
                                class="terminal">vue create video-browser</span>. When you run this command you might
                        be prompted to answer several questions about the new project you are configuring. If you do
                        just select any of the default options that are presented.</p>
                    <h3>Why Use Vue CLI?</h3>
                    <p>In the previous section we made use of Vue CLI to generate a new project. It looks like my
                        installation is now complete and I'm given the directions to change directories to video-browser
                        and run the following command <span class="terminal">npm run serve</span>
                    <p>Let's have a quick discussion about why we are making use of the Vue CLI project generator - why
                        do we need all this infrastructure and preconfigured stuff anyway?
                    </p>
                    <p>Let's take a look at a diagram to get a better sense of why:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig02-002.png"/>
                        <figcaption>Fig 02-002</figcaption>
                    </figure>
                    <p>So above is an illustration of how we were running when we used CodePen in the previous
                        couple of examples. We automatically loaded up the Vue JS file by adding it as a dependency
                        to the project. We also then added a little bit of code directly on CodePen. The two together
                        formed a usable application. The key thing there to keep in mind is that all the code that
                        you and I wrote - like the Javascript code and the Html markup were all inside of essentially
                        a single file authored directly on CodePen.
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

                    <p>So to take all these different files and combine them together we make use of a tool called
                        webpack.</p>
                    <figure>
                        <a target="blank" href="https://webpack.js.org/"><img
                          src="./images/vuejsessentials/Fig02-004.png"/></a>
                        <figcaption>Fig 02-004</figcaption>
                    </figure>
                    <p>Essentially webpack's purpose is to look at a big collection of files and possibly
                        dependencies as well (like Vue JS) and combine them all down to one single file which can then
                        be sent down to your users browser when they try to make use of your application.
                    </p>
                    <p>The webpack tool is one of the big reasons that we're making use of Vue CLI. webpack is somewhat
                        notorious for being a little difficult to set up out of the box. So by making use of Vue CLI it
                        automatically sets up webpack for us and chooses a lot of very sensible configuration defaults.
                    </p>
                    <figure>
                        <a href="https://babeljs.io/" target="_blank"><img
                          src="./images/vuejsessentials/Fig02-005.png"/></a>
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
                        the project by running the  <span class="terminal">npm run serve</span> command.
                    </p>
                    
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
                    <p>Let's start off by looking at the <span class="filename">main.js</span> file. Inside of this file
                        you'll find some very plain
                        Javascript code and towards the bottom you'll find a function call to create a new Vue instance.
                        You'll notice that there's also this <code class="prettyprint">render</code> option in here and
                        also a <code class="prettyprint">$mount</code> function call as well. We'll just ignore those
                        two little pieces of code for right now but we'll definitely come back to those very shortly and
                        talk about what their purposes are.
                    </p>
                    <p>You'll notice that, also inside the src directory, is an App.vue file. Notice the extension there
                        - it's .vue rather than being .js or anything like that. Let's open up the file and have a look:
                    </p>
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
                    <p>All this Html is nested inside of a template tag and then below all that Html you'll find what
                        looks like another piece of Html - a script tag inside which there is some Javascript code.
                    </p>
                    <p>So I don't know about you but this definitely looks like one weird little file.</p>
                    <p>So let's talk about what's going on here in the next section.</p>
                    <h3>Vue Files</h3>
                    <p>In the last section we started looking at some of the different files and folders that were
                        generated for us automatically when we made our new project. In particular we opened up the
                        App.vue file and inside of there we saw some very interesting looking syntax.
                    </p>
                    <p>So at the top we see a <code class="prettyprint">template</code> tag and a the bottom we see a
                        <code class="prettyprint">script</code> tag. So let's talk about what's going here.
                    </p>
                    <p>First off, a quick reminder of what we were doing previously over inside of CodePen:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig02-010.png"/>
                        <figcaption>Fig 02-010</figcaption>
                    </figure>
                    <p>This figure demonstrates one possible way of structuring a Vue app. We might define our Vue
                        template inside of some Html like an actual Html document and we might create our Vue instance
                        over in some Javascript code.
                    </p>
                    <p>We then later on said that alternatively we could also create this Vue template inside of our
                        Javascript:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig02-011.png"/>
                        <figcaption>Fig 02-011</figcaption>
                    </figure>
                    <p>We saw an example of that over in CodePen when we used those back tick characters to insert our
                        template directly attached to our Vue instance.
                    </p>
                    <p>So that covers two different ways of structuring a Vue application.</p>
                    <p>However, what you're seeing inside of the App.vue file is yet another way of structuring your Vue
                        code:
                    </p>
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
&lt;/style&gt;
                    </pre>
                        <figcaption>Fig 02-012</figcaption>
                    </figure>

                    <p>So in this scenario we are making use of a paradigm called Vue files. The idea behind a Vue file
                        is that you'll have exactly one file that is responsible for creating a single component inside
                        of your application.
                    </p>
                    <p>A single component is created as a reusable piece of code that can be used all over your
                        application many times. Inside the single Vue file you'll find not only the template that your
                        Vue file or your Vue component is going to use but you'll also find all the Javascript code
                        relate to it as well.
                    </p>
                    <p>So in other words, inside of one single file, we get access to all of our Html for this Vue
                        component, we get all the Javascript for it, and in future demos we will also locate all the CSS
                        for this component as well:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig02-013.png"/>
                        <figcaption>Fig 02-013</figcaption>
                    </figure>
                    <p>So - one file that contains all the code related to one component or one piece of our application
                        as we start to implement our video browser application you and I are going to end up with a
                        couple of different Vue files each of which are responsible for implementing one distinct part
                        of this application.
                    </p>
                    <p>So we might make one Vue file that is responsible for the search bar at the top of the browser,
                        we might make another single Vue file that is responsible for the search results list over the
                        right-hand side, and another that is responsible for the big video detail here in the middle
                        that's going to eventually play a video.
                    </p>
                    <p>So, again, the idea is that we have all the Html, Javascript and CSS directly placed inside the
                        one Vue file.
                    </p>
                    <p>Now you might think that this violates one of the core principles of creating web applications -
                        the idea of separate concerns. Separation of concerns means we try not to mix all of our Html,
                        Javascript and CSS together because that could make our application messy and difficult to
                        follow.
                    </p>
                    <p>What I want to point out here is that even when we start making use of Vue files. Even though
                        we've got our template, script and CSS altogether in one file we are still technically adhering
                        to the principle of separation of concerns because inside the Vue file we have one area that is
                        responsible for Html, one for our Javascript, and one for our CSS.
                    </p>
                    <p>So, while, yes they are all located inside of a single file they are still at least somewhat
                        isolated inside this file.
                    </p>
                    <p>One of the big benefits to making use of Vue files is that if you ever need to change your
                        application in some fashion it'll be a lot easier to find all the related code in one file.
                    </p>
                    <p>
                        For example, if we wanted to make a change to the way that the search bar behaves we know that
                        we could always open up the Vue file that contains the search bar implementation and inside
                        there we'll find the Html, Javascript and CSS. That means that we don't have to go hunting
                        around different directories inside of our application to find all the different aspects of code
                        that are related to the search bar.
                    </p>
                    <p>So, it might take a little bit of time to get used to this Vue file syntax but over time I'm very
                        confident that you'll come to enjoy it.
                    </p>
                    <p>So we've spoken a little bit about the purpose of the Vue file at this point but we have't really
                        spoken about how this strange syntax is used to build an actual application.
                    </p>
                    <p>So in the next section we're going to examine some of the behind the scenes stuff that occurs to
                        get the code you create inside your Vue files to run inside of your browser.
                    </p>
                    <h3>Behind the Scenes of Vue Files</h3>
                    <p>In the last section we started talking about Vue files. Inside of a single Vue file we will
                        locate all the code related to one distinct portion of our application.
                    </p>
                    <p>We're going to use Vue files in place of making separate Vue instances and Vue templates that are
                        already created in the DOM.
                    </p>
                    <p>In this section I want to answer a question that you might have - which is how does our browser
                        understand and execute the code that we place inside our Vue files.
                    </p>
                    <p>So, in fact, the code you see in a Vue file is not what actually gets sent down to your user's
                        browser. Instead Babel and webpack work together to somehow convert all of this content into
                        some very plain Javascript code that your browser can safely run.
                    </p>
                    <p>So in this section we will run through a quick demonstration of what this file turns into when it
                        gets sent down to your browser.
                    </p>
                    <p>Now for this demonstration I really recommend that you just watch what I'm doing because I'm
                        going to click through a couple of steps very quickly so you don't have to watch me laboriously
                        go through the process in minute detail.
                    </p>
                    <p>First, go back to the browser and open up the request log like so:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig02-014.png"/>
                        <figcaption>Fig 02-014</figcaption>
                    </figure>
                    <p>Then I'm going to go over to my code editor and make one very small change to this file and then
                        save it. Go back over to the request log and you should see a whole bunch of Javascript code
                        that represents that change that we just made:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig02-015.png"/>
                        <figcaption>Fig 02-015</figcaption>
                    </figure>
                    <p>I'm going to copy that code into a blank file in my code editor, I'm going to find and replace
                        newline characters in here very quickly and then I'm just going to delete a tiny little bit of
                        code leaving me with:
                    </p>
                    <figure>
                    <pre class="prettyprint">var render = function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
        \&quot;div\&quot;,
            { attrs: { id: \&quot;app\&quot; } },
                [
                      _c(\&quot;img\&quot;, { attrs: { src: __webpack_require__(/*! ./assets/logo.png */ \&quot;./src/assets/logo.png\&quot;) } }),\n
                      _c(\&quot;HelloWorld\&quot;, { attrs: { msg: \&quot;Wel to Your Vue.js App\&quot; } })
                ],
                1
            )
        }</pre>
                        <figcaption>Fig 02-016</figcaption>
                    </figure>
                    <p>So, like I said, I just wanted to very quickly go through that change sw we can see what that
                        file gets turned into.
                    </p>
                    <p>So the render function is what our App.vue file was converted into before it got sent down to our
                        browser. Fig 02-016 shows the actual code that is running inside of your browser that represents
                        that Vue file.
                    </p>
                    <p>Now, before we walk through the code inside of here too deeply let's go back over to the App .vue
                        file. Inside the template you'll notice that we are creating a <code
                                class="prettyprint">div</code> with an <code class="prettyprint">id</code> of <code
                                class="prettyprint">app</code> and then inside there we've got an <code
                                class="prettyprint">image</code> tag with a <code class="prettyprint">src</code> of
                        logo.png. Then we have a <code class="prettyprint"> HelloWorld</code> tag that has a message of
                        "Welcome to your Vue.js App":
                    </p>
                    <figure>
                    <pre class="prettyprint">&lt;div id=&quot;app&quot;&gt;
    &lt;img src=&quot;./assets/logo.png&quot;&gt;
    &lt;HelloWorld msg=&quot;Wel to Your Vue.js App&quot;/&gt;
  &lt;/div&gt;</pre>
                        <figcaption>Fig 02-017</figcaption>
                    </figure>
                    <p>Now that we have a better understanding of the template let's go back over to the file we just
                        created. Inside this file you'll notice a couple of strange variable declarations at the top:
                    </p>
                    <figure>
                    <pre class="prettyprint">var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h</pre>
                        <figcaption>Fig 02-018</figcaption>
                    </figure>
                    <p>Ignore those for a second and checkout the function call to _c:</p>
                    <figure>
                    <pre class="prettyprint">return _c(
        \&quot;div\&quot;,
            { attrs: { id: \&quot;app\&quot; } },
                [
                      _c(\&quot;img\&quot;, { attrs: { src: __webpack_require__(/*! ./assets/logo.png */ \&quot;./src/assets/logo.png\&quot;) } }),\n
                      _c(\&quot;HelloWorld\&quot;, { attrs: { msg: \&quot;Wel to Your Vue.js App\&quot; } })
                ],
                1
            )
        }</pre>
                        <figcaption>Fig 02-019</figcaption>
                    </figure>
                    <p>Inside this we have a first argument of <code class="prettyprint">div</code> which represents our
                        top level <code class="prettyprint">div</code> tag inside of our template. Then the second
                        argument is an object that says that <code class="prettyprint">div</code> should have an <code
                                class="prettyprint">id</code> of <code class="prettyprint">app</code>. The third
                        argument is a list of other elements that are contained within that <code class="prettyprint">div</code>.
                    </p>
                    <p>So the first element that exists inside that <code class="prettyprint">div</code> is an <code
                            class="prettyprint">img</code> tag that has a <code class="prettyprint">src</code> of
                        logo.png
                    </p>
                    <p>The second element is that <code class="prettyprint">HelloWorld</code> tag that has a message
                        property of "Welcome to your Vue .js App".
                    </p>
                    <p>So even though this syntax still might look very strange - it might not look like any Vue code
                        we've written or looked at so far - I hope that you can at least get the sense that yes
                        everything inside this file is somehow converted into this other structure before it gets sent
                        down to our browser.
                    </p>
                    <p>So inside of our browser, we're not directly running the code in App.vue. It all gets translated
                        into this other form and then executed.
                    </p>
                    <p>So really the idea of making use of these Vue files that have the template tag, the script tag
                        and the style tag is really just to make your life and my life as developers a little bit more
                        easy and straightforward. That's the only purpose of it - it's just to help us organize our code
                        inside of these Vue files.
                    </p>
                    <p>Ok, so now that we've got a better idea of what's happening inside of a Vue file, let's continue
                        in the next section and do a little bit more of a walk through of some of the code that we have
                        inside the project that Vue CLI setup for us.
                    </p>
                    <h3>Vue Components vs Vue Instances</h3>
                    <p>In the last section we saw how these .vue file eventually got turned into normal Javascript code
                        before they are displayed in the browser. Before we move onto actually coding our video-browser
                        application there is one last important topic which I want to share with you. So in the last
                        couple of videos I've been using the term Vue component a couple of different times and earlier
                        on in the course, back when we were working inside of CodePen, I was using the term Vue
                        instance.
                    </p>
                    <p>So I want to make the distinction between Vue components and Vue instances:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig02-020.png"/>
                        <figcaption>Fig 02-20</figcaption>
                    </figure>
                    <p>So you can think of a Vue component as a blueprint or a set of rules on how to create something
                        that can be inserted into the DOM in our browser which the user can then interact with.
                    </p>
                    <p>So whenever you and I make a Vue file we are going to define exactly one component inside of it
                        and that component is going to have this set of rules that tells you how to display some content
                        on the screen and how a user can interact with it. So again - think of a component as being like
                        a blueprint of sorts.
                    </p>
                    <p>On the other hand is a Vue instance which is what we were making back inside of CodePen. A Vue
                        instance is really an instance of a Vue component and represents something that has been
                        inserted into the DOM and is something that a user can interact with.
                    </p>
                    <p>So I know that the relation between these two things is very tenuous but if you've got an
                        understanding or a background in object oriented programming then you can think of a Vue
                        component as being a class and a Vue instance being like an instance of that class. That's the
                        real relationship that's going on here.
                    </p>
                    <p>So like I said we are always going to create one Vue file for every Vue component. One of the
                        critical steps that we're going to undergo in every Vue application that we put together is to
                        plan out the different components that we might want to make. In general we like to look at
                        mockups of the applications that we are going to make and do some quick brainstorming on how we
                        might assemble a set of different components go make up that application.
                    </p>
                    <p>So with that in mind I took the liberty of taking our mockup for the video-browser application
                        and thinking about how I might divide this up into a set of different components:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig02-021.png"/>
                        <figcaption>Fig 02-021</figcaption>
                    </figure>
                    <p>So you'll notice I've added some colored boxes on this mockup and then on every box I've attached
                        a label. So the label that you see here is the name of a component that we're going to make to
                        implement the video-browser application. So you and I are going to make one Vue file called
                        SearchBar.vue. This is going to have a single Vue component that is going to contain a text
                        input field and anytime a user types inside that we are going to somehow trigger some searching
                        operation on the YouTube API.
                    </p>
                    <p>
                        We will also make a single Vue file that houses a component called VideoList. This component
                        will know how to take a list of videos and render them out onto the screen.
                    </p>
                    <p>In turn we will also have a VideoListItem which will be a single component that represents a
                        single video.
                    </p>
                    <p>So the VideoListComponent will contain many VideoListItems inside of it because the VideoListItem
                        represents one video and the VideoList represents the entire list. We'll also have a Vue file
                        for the VideoDetail which is responsible for showing details about one single video and then all
                        of these components will be assembled underneath one component that we will call the app
                        component. This component is kind of like the central brains of our entire application and it
                        represents the single point that kind of organizes these different components and controls how
                        data flows between them.
                    </p>
                    <p>It's extremely common to always have a single component called <code
                            class="prettyprint">app</code> in a Vue application and it's always going to serve that same
                        purpose of being the brains of your app.
                    </p>
                    <p>The last think I want to show you with all these component names in mind is a quick diagram of
                        how they are all related:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig02-022.png"/>
                        <figcaption>Fig 02-022</figcaption>
                    </figure>
                    <p>So this is the overall structure that you and I are going to eventually head towards as we start
                        to build our video browser application. At the very top we've got our <span class="filename">main.js</span>
                        file which is
                        responsible for kind of like booting up your entire application and rendering it onto the
                        screen. That <span class="filename">main.js</span> file is then going to show our app component
                        and internally the app
                        component will show the VideoDetail, the SearchBar, and the VideoList. In turn, the VideoList
                        component will show a couple of copies of the VideoListItem component.
                    </p>
                    <p>So that's how all these different pieces are going to be wired together. Again we're going to
                        make one separate Vue file for each of these different components and each of those Vue files is
                        going to contain all the Html, CSS and Javascript related to that single component.
                    </p>
                    <p>So hopefully that should give you more of an idea of the high level architecture. If any of
                        this component stuff still seems a bit strange this is another one of those topics where
                        we're going to be doing the kind of breakdown of talking about components throughout the
                        course. So this is another topic that we're just going to come back to again and again. So
                        we'll get a lot of practice in understanding how components are really working.</p>
                    <p>So with that in mind let's continue in the next section and we're going to start working on
                        our app.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'VuejsEssentials02MovingOnWithVueCLI.vue'
}
</script>

<style scoped>

</style>
