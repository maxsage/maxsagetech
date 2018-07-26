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
                    <p>Issue the following command from a terminal window:</p>
                    <code class="prettyprint">npm run serve</code>
                    <p>This will start the application running at the following addresses:</p>
                    <figure>
<pre class="prettyprint">App running at:
    - Local:   http://localhost:8080/
    - Network: http://192.168.0.37:8080/</pre>
                        <figcaption>Fig 04-004</figcaption>
                    </figure>
                    <p>Back in the code editor you should see some pretty familiar files and folders - these were
                        all generated for us automatically by Vue CLI. I don't want to use a lot of the boilerplate
                        that was added automatically for us - so I will delete the src directory along with all it's
                        content.</p>
                    <p>Create a new src directory and then create the root file of the application which is the
                        <code class="prettyprint">main.js</code> file. Remember when Vue CLI first boots up and tries
                        to run your project it always looks for a file called <code class="prettyprint">main
                            .js</code> inside the <code class="prettyprint">src</code> directory.
                    </p>
                    <p>In the main.js file we will add some code which is very similar to the code we added in the
                        previous application:
                    </p>
                    <figure>
<pre class="prettyprint">import Vue from 'vue';
import App from './App';

new Vue ({
    render: h =&gt; h(App)
}).mount('#app');</pre>
                        <figcaption>Fig 04-005</figcaption>
                    </figure>


                    <p>We start by importing the Vue library. Next we add an import statement for the App component.
                        The App component does not yet exist but we will create it in just a moment. We create a new Vue
                        instance and supply an object with a <code class="prettyprint">render</code> property (remember
                        this is one of the many ways of getting content to show up in the browser when Vue first
                        starts up). We define our h function. Then, after we create the Vue instance, we render it to
                        the <code class="prettyprint">div</code> with an <code class="prettyprint">id</code> of app.
                        This will target the element that gets created for us by default inside of our public
                        index.html file:
                    </p>
                    <figure>
                        <pre class="prettyprint">&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</pre>
                        <figcaption>Fig 04-006</figcaption>
                    </figure>
                    <p>Create a new file called App.vue inside the src directory:</p>
                    <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;h3&gt;Im an App!&lt;/h3&gt;
&lt;/template&gt;

&lt;script&gt;
    export default {
        name: 'App'
    };
&lt;/script&gt;</pre>
                        <figcaption>Fig 04-007</figcaption>
                    </figure>
                    <p>So we add a template with a placeholder heading, we add a script tag and define our export
                        default.
                    </p>
                    <p>Ok, so we've created our App component, we've got our main.js file which imports the App
                        component, creates the Vue instance and renders it in the browser.
                    </p>
                    <p>Now back in the browser you should see the following:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig04-008.png"/>
                        <figcaption>Fig 04-008</figcaption>
                    </figure>
                    <h3>Building the Header</h3>
                    <p>In the last section we setup our project. We now need to dive in and work on our first
                        feature - the AppHeader.</p>
                    <p>The left hand of the AppHeader will display the Image Storage logo. On the right hand side we
                        will display a login button. Once logged in the AppHeader should display links to Gallery,
                        Upload and Log Out.
                    </p>
                    <p>Back in the editor we will create a new directory called components in the src directory. In the
                        components folder create a file called AppHeader.vue:</p>
                    <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
        Image Storage
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
    export default {
        name: 'AppHeader'
    };
&lt;/script&gt;</pre>
                        <figcaption>Fig 04-009</figcaption>
                    </figure>
                    <p>In the App component we will now import AppHeader and make sure that it is visible. Add an
                        <code class="prettyprint">import</code> statement to the <code
                                class="prettyprint">&lt;script&gt;</code> tag:</p>
                    <figure>
                        <pre class="prettyprint">import AppHeader from './components/AppHeader';</pre>
                        <figcaption>Fig 04-010</figcaption>
                    </figure>
                    <p>Then we add the <code class="prettyprint">AppHeader</code> to components property of our
                        component configuration object:</p>
                    <figure>
<pre class="prettyprint">export default {
        name: 'App',
        components: {
            AppHeader
        }
    };</pre>
                        <figcaption>Fig 04-011</figcaption>
                    </figure>
                    <p>So now we can show an instance of AppHeader inside of our app's template so we replace the
                        placeholder heading:</p>
                    <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
        &lt;AppHeader&gt;&lt;/AppHeader&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
                        <figcaption>Fig 04-012</figcaption>
                    </figure>
                    <p>If you preview this in the browser you should see the AppHeader is now visible:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig04-013.png"/>
                        <figcaption>Fig 04-013.png</figcaption>
                    </figure>
                    <p>In the next section we will look at the solution we will be using for styling in this app.</p>
                    <h3>Including Semantic UI</h3>
                    <p>We wont write all the CSS for this application from scratch because at the end of the day
                        this course is focused on Vue and not CSS. To handle styling we're going to make use of a
                        styling library called Semantic UI.</p>
                    <p>This is going to take care of all the styling of our application and we're just going to have
                        to add a couple of CSS rules here and there.</p>
                    <p>The documentation for Semantic UI can be found <a href="https://semantic-ui.com/">here</a>. It
                        describes a couple of different methods for installing Semantic UI into your project.
                    </p>
                    <p>We are not going to use an NPM package to install Semantic UI. Instead we will get a single
                        CSS file and include that in the Html of our application.</p>
                    <p>The link to the CSS file that we need is available on a CDN or Content Delivery Network which
                        is used to very quickly serve up resources like CSS files to users of our application. </p>
                    <p>Browse to <a href="cdnjs.com">cdnjs.com</a> and perform a search for semantic-ui and locate
                        the <a href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css">
                            semantic.min.css</a> CSS file - this is the complete package (the other results are
                        individual components).
                    </p>
                    <p>Copy the link tag and then, back in the editor, in the public/index.html file paste the
                        link for Semantic UI under the existing link tag (this link tag is related to all the
                        custom CSS that you and I include directly into our project):</p>
                    <figure>
<pre class="prettyprint">&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1.0&quot;&gt;
    &lt;link rel=&quot;icon&quot; href=&quot;&lt;%= BASE_URL %&gt;favicon.ico&quot;&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css&quot; /&gt;
    &lt;title&gt;images&lt;/title&gt;
&lt;/head&gt;</pre>
                        <figcaption>Fig 04-014</figcaption>
                    </figure>
                    <p>If you now refresh the browser you should see the Image Storage logo has changed font -
                        meaning the Semantic UI styling has been applied successfully.</p>
                    <h3>Styling the Header</h3>
                    <p>If we look at the Semantic UI documentation we will see that it can be used in place of other
                        libraries like Bootstrap or Material UI - it's just another styling framework that gives you a
                        little bit of styling out of the box for free.</p>
                    <p>Locate the Menu button on the left hand side and you will see a list of all the different
                        styled components you will get when you install Semantic UI.</p>
                    <p>We can use the <a href="https://semantic-ui.com/collections/menu.html">Menu</a> component of
                        the Collections section to style our AppHeader. The documentation give a couple of different
                        examples of menu components. The Pointing menu is close to the styling we require for the
                        AppHeader menu bar. Clicking on the code snippet icon we can see from the example Html that
                        we need to place a <code class="prettyprint">div</code> with a couple of classes applied and
                        then inside there any button that wants to appear on the left hand side should be an <code
                                class="prettyprint">anchor</code> tag with a class of <code class="prettyprint">item
                        </code>.
                    <p>For buttons that we want to appear on the right-hand side we will place a <code
                            class="prettyprint">div</code> with a class of <code class="prettyprint">right</code> and
                        <code class="prettyprint">menu</code>. Inside the <code class="prettyprint">div</code> we place
                        anchor tags which will serve as the actual buttons.</p>
                    <p>Back in the editor modify the AppHeader.vue file:</p>
<figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div class=&quot;ui secondary pointing menu&quot;&gt;
        &lt;a href=&quot;/&quot; class=&quot;active item&quot;&gt;
            Image Storage
        &lt;/a&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
<figcaption>Fig 04-015</figcaption>
</figure>
                    <p>Back in the browser you should see the page has some new styling applied:</p>
<figure>
  <img src="./images/vuejsessentials/Fig04-016.png"/>
  <figcaption>Fig 04-016</figcaption>
</figure>
                    <h3>Imgur Overview</h3>
                    <p>We are now going to start looking at the right hand side of the AppHeader where initially a
                        login button will be displayed that is then replaced by various page links when the user
                        logs in. The AppHeader component is very tightly coupled with the authentication system of
                        our application. Remember to handle authentication we're going to be making use of the OAuth
                    system through the Imgur API.</p>
                    <p>If you navigate to <a href="imgur.com">imgur.com</> you will see a lot of images appearing on
                        screen. These are all images that have been submitted by users of the Imgur application.
                        Imgur has two primary methods of working with these images - creating images, adding images,
                    adding comment or titles, deleting images etc.</p>
                    <p>The first method is by signing into imgur.com and using the website the other is by making
                        use of the Imgur API. This is the method we will use. The <a
                                href="https://apidocs.imgur.com/">Imgur</a> docs provide lots of information on how
                        to interface with Imgur through the API.
                    </p>
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