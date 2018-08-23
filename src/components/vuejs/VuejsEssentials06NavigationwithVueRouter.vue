<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h2>Navigation with Vue Router</h2>
        </div>
        <div class="panel-body">
          <h3>Wiring up Vue Router</h3>
          <p>In the last section we spoke about how we're going to use a Vue router library to customize what is
            displayed on the screen based on the current Url. We're going to use this library to watch for this <code
              class="prettyprint">/oauth2/callback</code> route. Whenever the user ends up on this route we're going to
            show the AuthHandler component who's sole purpose is going to be to extract the token from the Url and call
            the appropriate action.
          </p>
          <p>So in this section we're going to start doing the setup of the router inside of our application. Let's
            first get a good idea of the different steps that we're going to have to do to setup the router:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig06-001.png"/>
            <figcaption>Fig 06-001</figcaption>
          </figure>
          <p>We're going to first start off by creating a new Vue router instance. We're going to do this inside of our
            <span class="filename">main.js</span> file when we create this new view. When we create this new Vue router
            instance we're also going to pass it a configuration object that tells it about different routes that are
            going to be available inside of our application.
          </p>
          <p>After we setup the initial Vue router instance we're going to tell our Vue instance that the router exists.
            In the exact same way that we have to connect together Vuex and Vue libraries in the previous sections we
            also have to connect together Vue Router and Vue as well.
          </p>
          <p>Finally the third step is to tell Vue Router whenever it sees a Url that it cares about or a path that it
            cares about you have to tell it where to put the corresponding component on the screen. So if, for example,
            a user browses to <code class="prettyprint">/oauth2/callback</code> and Vue Router says "Ok, I need to show
            AuthHandler" somewhere on the screen we have to make sure we tell the router exactly where it is supposed to
            put that component because just saying "Hey, put it on the screen is not quite enough." We have to
            specifically designate where it's going to show up.
          </p>
          <p>Ok, let's flip back over to our code editor and we'll get started with step number one first. In <span
            class="filename">main.js</span> add the following import statement:
          </p>
          <figure>
            <pre class="prettyprint">import VueRouter from 'vue-router';</pre>
            <figcaption>Fig 06-002</figcaption>
          </figure>
          <p>Recall that we already installed the Vue Router library a little bit ago at the very start of the this
            project so there's no need to do this again. Next we will tell the Vue library about the existence of the
            Vue Router:</p>
          <figure>
            <pre class="prettyprint">Vue.use(VueRouter);</pre>
            <figcaption>Fig 06-003</figcaption>
          </figure>
          <p>Next we'll create our actual Vue router instance. This is where we pass in that initial configuration that
            tells Vue Router about the different routes that are going to be available inside of our application:
          </p>
          <figure>
<pre class="prettyprint">const router = new VueRouter ({
  routes: [
  ]
});</pre>
            <figcaption>Fig 06-004</figcaption>
          </figure>
          <p>We pass in an object containing a property called <code class="prettyprint">routes</code>. This is going to
            be an array which will contain a collection of different objects. In each of these objects we are going to
            tell Vue Router about one of the possible routes that can be visited inside of our application.
          </p>
          <p>The first route that you and I are going to define is going to be the <code class="prettyprint">/oauth2/callback</code>
            route:
          </p>
          <figure>
<pre class="prettyprint">const router = new VueRouter ({
  routes: [
      { path: '/oauth2/callback', component: AuthHandler }
  ]
});</pre>
            <figcaption>Fig 06-005</figcaption>
          </figure>
          <p>We haven't yet created the AuthHandler Vue component - so we will need to do that and then import it into
            <code class="prettyprint">main.js</code>. Before we do that we need to complete one more step. At the bottom
            of the file where we create our actual instance remember that in the exact same way with Vuex we did the
            initial use statement and then finally passed the store into Vue. We have to do the exact same thing with
            Vue Router as well. So we can think of the <code
              class="prettyprint">Vue.use</code> as the initial handshake and now we need to pass the actual instance
            into our Vue instance as well:
          </p>
          <figure>
<pre class="prettyprint">new Vue ({
    router,
    store,
    render: h =&gt; h(App)
}).$mount('#app');</pre>
            <figcaption>Fig 06-006</figcaption>
          </figure>
          <p>Now we need to create the AuthHandler component that's going to be displayed anytime a user visits this
            route and then we need to make sure that we import it into this <span class="filename">main.js</span> file.
            So first add a new file called <span class="filename">AuthHandler.vue</span> to the <span class="filename">components</span>
            directory with the following code:
          </p>
          <figure>
                    <pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
        Please wait...
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
    export default {
        name: 'AuthHandler'
    }
&lt;/script&gt;</pre>
            <figcaption>Fig 06-007</figcaption>
          </figure>
          <p>Remember that anytime a user comes back to our application and sees that <code
            class="prettyprint">/oauth2/callback</code> route it will probably only be displayed for a split second as
            we try and access the Url and pull the token out of it. We just want to display something that says "Hey
            just give us a moment we're getting the token" hence the "Please wait..." message.
          </p>
          <p>In <span class="filename">main.js</span> we will wire the AuthHandler component up by adding an <code
            class="prettyprint">import</code> statement:
          </p>
          <figure>
            <pre class="prettyprint">import AuthHandler from './components/AuthHandler';</pre>
            <figcaption>Fig 06-008</figcaption>
          </figure>
          <h3>Browser vs Hash Routers</h3>
          <p>In the last section we added Vue Router to our application. If we now refresh the browser and look at the
            address bar we will see a <code class="prettyprint">#</code> sign is now present in the Url:
          </p>
          <figure>
            <pre class="prettyprint">http://localhost:8080/#/</pre>
            <figcaption>Fig 06-008</figcaption>
          </figure>
          <p>When we wired up our Vue Router we got a very default set of options created for us:</p>
          <figure>
            <img src="./images/vuejsessentials/Fig06-009.png"/>
            <figcaption>Fig 06-009</figcaption>
          </figure>
          <p>One of the default options that was set when we created our new router was the type of router that was
            used. By default Vue router tries to use something called a hash router. The hash router is a reference to
            what portion of the Url is going to be used when Vue router tries to figure out what set of components it
            needs to show on screen.
          </p>
          <p>When we use Hash Router Vue Router is going to look at only characters to the right-hand side of the hash
            inside the Url to figure out what components need to be shown on screen.
          </p>
          <p>This is going to cause some unintended side effects when we start working with OAuth inside of our
            application. Remember just a moment ago when we got redirected back over to our application from the Imgur
            OAuth flow it sent us back here with the route of something like:
          </p>
          <figure>
            <pre class="prettyprint">/oauth2/callback#access_token....</pre>
            <figcaption>Fig 06-010</figcaption>
          </figure>
          <p>So if we leave this default implementation of the router as it's standing right now it's going to look to
            the characters to the right-hand side of the hash to figure out what set of components to show on the
            screen. Currently this will break the routing because it won't have any idea how to interpret access_token
            and the other query string variables.
          </p>
          <p>We can modify the router configuration to use Browser Router instead of Hash Router. The Browser Router
            option causes the router to look at all the characters between the domain <code
              class="prettyprint">localhost:8080</code> and the hash on the right-hand side to figure out what route or
            what set of components need to be shown on screen. So the behaviour of Browser Router is a better fit for
            our requirements. We can still add further information after the <code class="prettyprint">#</code> such as
            our access_token etc.
          </p>
          <p>To switch to using the Browser Router we will modify our router configuration in <code
            class="prettyprint">main.js</code>:
          </p>
          <figure>
<pre class="prettyprint">const router = new VueRouter ({
    mode: 'history',
    routes: [
        { path: '/oauth2/callback', component: AuthHandler }
  ]
});</pre>
            <figcaption>Fig 06-011</figcaption>
          </figure>
          <p>We add in a new key called mode and set the value to history which tells VueRouter to use the Browser
            Router mode instead of the default.
          </p>
          <p>Back in the browser navigate to <code class="prettyprint">localhost:8080</code> and you'll notice the page
            reloads but does not automatically add the hash inside the Url anymore.
          </p>
          <h3>Component Insertion Point</h3>
          <p>We've now taken care of steps 1 and 2 of setting up VueRouter inside of our application:</p>
          <figure>
            <img src="./images/vuejsessentials/Fig06-012.png"/>
            <figcaption>Fig 06-012</figcaption>
          </figure>
          <p>We're now going to move onto step number 3 which is going to tell Vue Router what to do anytime it matches
            a route against the Url that's in the users address bar. Essentially we just need to add a little tag inside
            of some template in our application that says "Hey Vue Router if you ever match a component try to stick it
            into this tag". In <span class="filename">App.vue</span> we are currently showing just the AppHeader
            component. We will want to display other content under the AppHeader. Insert the following code into the
            template:
          </p>
          <figure>
                    <pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
        &lt;AppHeader&gt;&lt;/AppHeader&gt;
        &lt;router-view&gt;&lt;/router-view&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 06-013</figcaption>
          </figure>
          <p>So now anytime VueRouter matches up a route that's going to take that component and put it inside the <code
            class="prettyprint">vue-router</code> tag. In the browser navigate to <code class="prettyprint">/oauth2
            /callback</code> and we should see the AuthHanlder component appear on the screen:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig06-014.png"/>
            <figcaption>Fig 06-014</figcaption>
          </figure>
          <p>Chances are that, in the vast majority of applications, you'll add this tag into one of the more root
            components of your application like an App component or Layout component.
          </p>
          <h3>Component Lifecycle Methods</h3>
          <p>We've now got our AuthHandler component visible on the screen which means we can start adding some code to
            it to extract the access_token from the Url. The required steps are illustrated in the following diagram:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig06-015.png"/>
            <figcaption>Fig 06-015</figcaption>
          </figure>
          <p>The key here is making sure that the instant we know AuthHandler is about to render on the screen we want
            it to call the <code class="prettyprint">finalizeLogin</code> right away. We achieve this using a feature of
            Vue components called life cycle methods.
          </p>
          <p>Lifecycle methods are functions that we can define on a component that are called automatically during
            certain points inside of a components lifecycle. The term lifecycle refers to the sequence of steps a
            component goes through whenever it's about to be:
          <ul>
            <li>rendered on the screen</li>
            <li>taken off the screen</li>
            <li>updated with new content</li>
          </ul>
          <p>The official Vue documentation has a fantastic <a
            href="https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram">Lifecycle Diagram</a> to give you a better
            idea of how these lifecycle methods work. It's important to understand the lifecycle methods and their
            names. We start off at the very top where we create a new Vue instance. When we call <code
              class="prettyprint">new Vue</code> it kicks off some initial events and internal code handling stuff to
            setup this Vue instance. After that initial bit of configuration and setup a lifecycle method called <code
              class="prettyprint">beforeCreate</code> is then automatically called. If we define a function with a name
            of <code class="prettyprint">beforeCreate</code> in a component:
          </p>
          <figure>
                    <pre class="prettyprint">&lt;script&gt;
    export default {
        name: 'AuthHandler',
        beforeCreate() {

        }
    };
&lt;/script&gt;</pre>
            <figcaption>Fig 06-016</figcaption>
          </figure>
          <p>It will be invoked automatically any time the component is about to be created.</p>
          <p>So you can follow this diagram down and everyone of the red boxes that you see:</p>
          <ul>
            <li>beforeCreate</li>
            <li>created</li>
            <li>beforeMount</li>
            <li>mounted</li>
            <li>beforeUpdate</li>
            <li>beforeDestroy</li>
            <li>updated</li>
            <li>destroyed</li>
          </ul>
          <p>is a different lifecycle method that will be called at some point inside this component's lifecycle. For
            example, right after calling <code class="prettyprint">beforeCreate</code> we then setup some further
            configuration, immediately after that a second lifecycle method named <code
              class="prettyprint">created</code> is called. So, again, if we add the following code:
          </p>
          <figure>
<pre class="prettyprint">&lt;script&gt;
    export default {
        name: 'AuthHandler',
        beforeCreate() {

        },
        created() {

        }
    };
&lt;/script&gt;</pre>
            <figcaption>Fig 06-017</figcaption>
          </figure>
          <p>The <code class="prettyprint">created</code> method we defined will be called automatically when the
            lifecycle method of the same name runs.
          </p>
          <p>For our current application, we want to make sure that the instant the component is created we try to call
            the <code class="prettyprint">finalizeLogin</code> action that we're going to eventually create inside of
            our application. It's probably most appropriate for us to make use of the <code
              class="prettyprint">created</code> lifecycle method.
          </p>
          <p>The lifecycle methods:</p>
          <ul>
            <li>beforeCreate</li>
            <li>created</li>
            <li>beforeMount</li>
            <li>mounted</li>
          </ul>
          <p>All get called before the component actually shows up in the DOM. The process of actually showing up in the
            DOM is called the 'mounted point'.
          </p>
          <p>If you look at the official Vue Router documentation then it's going to suggest the <code
            class="prettyprint">created</code> lifecycle method is the optimal location to do any initial data loading.
            We will take advantage of this when we start to implement the ability to list out images that our user has
            uploaded.
          </p>
          <h3>Calling Actions</h3>
          <p>In the last section we spoke about the presence of lifecycle methods inside of components. Next we have to
            make sure that when the <code class="prettyprint">created()</code> method we defined is invoked we call the
            appropriate action in the Auth module - <code class="prettyprint">finalizeLogin</code>.
          </p>
          <p>Let's first wire up the <code class="prettyprint">finalizeLogin</code> action to the AuthHanlder component
            and then we'll go over to the Auth module and start to define it - first we import <code
              class="prettyprint">mapActions</code> :
          </p>
          <figure>
            <pre class="prettyprint">import { mapActions } from 'vuex';</pre>
            <figcaption>Fig 06-018</figcaption>
          </figure>
          <p>and hook it up to the methods property listing out the action name(s) that we want to connect to this
            component:
          </p>
          <figure>
            <pre class="prettyprint">methods: mapActions(['finalizeLogin']),</pre>
            <figcaption>Fig 06-019</figcaption>
          </figure>
          <p>Now we can invoke the <code class="prettyprint">finalizeLogin</code> action from the <code
            class="prettyprint">created()</code> method:
          </p>
          <figure>
                    <pre class="prettyprint">created() {
    this.finalizeLogin();
}</pre>
            <figcaption>Fig 06-020</figcaption>
          </figure>
          <p>So to call an action that's been bound to our <code class="prettyprint">methods</code> object from the
            lifecycle method all we have to do is use the <code class="prettyprint">this</code> keyword followed by a
            period and then the name of the action - in this case <code class="prettyprint">finalizeLogin</code>. We
            don't have to do anything like <code
              class="prettyprint">this.actions</code> it's simply <code
              class="prettyprint">this.finalizeLogin</code>.
          </p>
          <p>So when we call this action we are going to want to get the entire hash out of the Url and pass it into the
            action where it will be parsed to pull the access_token out of the Url and get it to updated the internal
            state of the AuthModule.
          </p>
          <p>To get the hash from the Url we write <code class="prettyprint">window.location.hash</code> this will
            return everything from the <code class="prettyprint">#</code> symbol to the right hand side of the Url:
          </p>
          <figure>
                    <pre class="prettyprint">created() {
    this.finalizeLogin(window.location.hash);
}</pre>
            <figcaption>Fig 06-020a</figcaption>
          </figure>

          <h3>Parsing the Access Token</h3>
          <p>Next we will work on the <code class="prettyprint">finalizeLogin</code> action to extract the access_token
            out of the Url and then call the <code class="prettyprint">setToken</code> mutation.
          </p>
          <p>In the browser click the login button. If you have the console open you may see an error:</p>
          <figure>
            <pre class="prettyprint">[vuex] unknown action type: finalizeLogin</pre>
            <figcaption>Fig 06-021</figcaption>
          </figure>
          <p>This error occurs because we haven't created the <code class="prettyprint">finalizeLogin </code> action
            yet. In the console if you write:
          </p>
          <figure>
            <pre class="prettyprint">window.location.hash</pre>
            <figcaption>Fig 06-022</figcaption>
          </figure>
          <p>You will receive the following value which has been formatted for readability:</p>
          <pre>
#access_token=3e43a278fdcd17c2bae234779abcc71b42bb18c8
&expires_in=315360000&token_type=bearer
&refresh_token=e6f9d8870f2b4b04bf4a8d2e57261d7a59f48a58
&account_username=maxsage&account_id=91444873"
</pre>
          <p>Add the following code in the Auth module under the <code class="prettyprint">login</code> action:</p>
          <figure>
                    <pre class="prettyprint">finalizeLogin() {
},</pre>
            <figcaption>Fig 06-023</figcaption>
          </figure>
          <p>When we call <code class="prettyprint">finalizeLogin</code> from our AuthHandler component we pass in <code
            class="prettyprint">window.location.hash</code>:
          </p>
          <figure>
            <pre class="prettyprint">this.finalizeLogin(window.location.hash);</pre>
            <figcaption>Fig 06-024</figcaption>
          </figure>
          <p>So this argument is going to show up as the second argument to the <code
            class="prettyprint">finalizeLogin</code> action. Remember the first argument that gets passed to any action
            is an object that has a bunch of helper methods tied to it that allow us to modify our Vuex module - for
            example it might contain the <code class="prettyprint">commit</code> function that allows us to call
            mutations:
          </p>
          <figure>
                    <pre class="prettyprint">finalizeLogin({ commit }, hash) {
},</pre>
            <figcaption>Fig 06-025</figcaption>
          </figure>
          <p>So we supply the <code class="prettyprint">commit</code> function again in the first argument. Remember we
            supplied the <code class="prettyprint">window.location.hash</code> property to the call to <code
              class="prettyprint">finalizeLogin</code> in the <code class="prettyprint"> created</code> lifecycle method
            hook so that hash will be the second argument to this action. We simply call it <code class="prettyprint">hash</code>
            . Add the following code to extract the access_token from the hash:</p>
          <figure>
                    <pre class="prettyprint">finalizeLogin({ commit }, hash) {
    const queryString = qs.parse(hash.replace('#', ''));

    commit('setToken', queryString.access_token);
},
                    </pre>
            <figcaption>Fig 06-026</figcaption>
          </figure>
          <p><code class="prettyprint">hash.replace('#', '')</code> removes the <code
            class="prettyprint">#</code> character from the start of the string. We pass the remaining string into the
            qs module which is used to manipulate, parse and generate query strings. Firstly, import the qs module:
          </p>
          <figure>
            <pre class="prettyprint">import qs from 'qs';</pre>
            <figcaption>Fig 06-027</figcaption>
          </figure>
          <p>Then pass our string into the <code class="prettyprint">qs.parse</code> function and assign it to a
            variable called <code class="prettyprint">queryString</code>:
          </p>
          <figure>
            <pre class="prettyprint">const queryString = qs.parse(hash.replace('#', ''));</pre>
            <figcaption>Fig 06-028</figcaption>
          </figure>
          <p><code class="prettyprint">qs.parse</code> will return an object that contains the properties and values
            from the string we pass. So in this case there will be keys like access_token, refresh_token etc. and the
            corresponding values.
          </p>
          <p>Next we call the <code class="prettyprint">setToken</code> mutation and pass in the access_token from our
            queryString:
          </p>
          <figure>
            <pre class="prettyprint">commit('setToken', queryString.access_token);</pre>
            <figcaption>Fig 06-029</figcaption>
          </figure>
          <p>That's going to update our state object with that new token. Even though we are not making use of the token
            from our state let's test this in the browser just to make sure we don't get any errors. Click login, that
            sends us to Imgur, which sends us straight back, check for errors in the console and hopefully you will see
            there aren't any.
          </p>
          <h3>Data in Components with MapGetters</h3>
          <p>In the last section we finished up or <code class="prettyprint">finalizeLogin</code> action and we assumed
            that the code we wrote would update the state inside the Auth although we have not yet proved this. We will
            add some code to verify this. Remember when we were first discussing Vuex:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig06-030.png"/>
            <figcaption>Fig 06-030.png-</figcaption>
          </figure>
          <p>In our Auth module there are actions that we can call modify data and at some point in time we're going to
            want to also read data - that was the purpose of the getters which we defined:
          </p>
          <figure>
                    <pre class="prettyprint">const getters = {
    isLoggedIn: state =&gt; !!state.token
};</pre>
            <figcaption>Fig 06-031</figcaption>
          </figure>
          <p>We have defined one getter called <code class="prettyprint">isLoggedIn</code> which returns a boolean value
            indicating if our user is authenticated with our application. We will use the <code class="prettyprint">isLoggedIn</code>
            getter to supply that information to our AppHeader component allowing us to customize it's template
            depending on the value we receive. In the AppHeader component's <code class="prettyprint">script</code>
            section import the <code class="prettyprint">mapGetters</code> function from Vuex:</p>
          <figure>
            <pre class="prettyprint">import { mapActions, mapGetters } from 'vuex';</pre>
            <figcaption>Fig 06-032</figcaption>
          </figure>
          <p>We're going to use this <code class="prettyprint">mapGetters</code> function to pull some information out
            of the Auth module and add it directly to the AppHeader. We use a similar syntax to what we just did with
            the <code class="prettyprint">mapActions</code> :
          </p>
          <figure>
            <pre class="prettyprint">methods: mapActions(['login'])</pre>
            <figcaption>Fig 06-033</figcaption>
          </figure>
          <p>However instead of using methods which we use to modify data or react to events inside of our application
            we are going to use a computed property. Remember computed is how we read our data and get access to it
            inside our template:
          </p>
          <figure>
<pre class="prettyprint">export default {
    name: 'AppHeader',
    computed: mapGetters(['isLoggedIn']),
    methods:
        mapActions(['login'])
};</pre>
            <figcaption>Fig 06-034</figcaption>
          </figure>
          <p>Now that we've defined this getter of <code class="prettyprint">isLoggedIn</code> and assigned it to the
            component we can reference it in our template:
          </p>
          <figure>
            <pre v-pre class="prettyprint">{{ isLoggedIn }}</pre>
            <figcaption>Fig 06-035</figcaption>
          </figure>
          <p>Remember whenever we are working with our templates we don't have to write out <code class="prettyprint">this.</code>
            or <code class="prettyprint">this.computed</code> or anything like that we just supply the name of the
            computed property - in this case <code class="prettyprint">isLoggedIn</code> . Refresh the browser and you
            should see true indicating that the user is logged in:</p>
          <figure>
            <img src="./images/vuejsessentials/Fig06-036.png"/>
            <figcaption>Fig 06-036</figcaption>
          </figure>
          <p>If you browse to the application root instead <code class="prettyprint">http://localhost :8080</code> the
            access_token will no longer be available inside the Url. This means the AuthHandler component can't get the
            token which will result in the AppHeader displaying false:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig06-037.png"/>
            <figcaption>Fig 06-037</figcaption>
          </figure>

          <h3>The V-Else Directive</h3>
          <p>Our AppHeader component is now aware of whether or not the user is actually signed into our application. We
            will now use the <code class="prettyprint">v-else</code> directive to show different buttons and layout
            depending on the status of the user. First of all delete the code that we just added to our AppHeader
            component:
          </p>
          <figure>
            <pre v-pre class="prettyprint">{{ isLoggedIn }}</pre>
            <figcaption>Fig 06-037A</figcaption>
          </figure>
          <p>Add the following Html inside the existing right menu <code class="prettyprint">div</code> :</p>
          <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div class=&quot;ui secondary pointing menu&quot;&gt;
        &lt;a href=&quot;/&quot; class=&quot;active item&quot;&gt;
            Image Storage
        &lt;/a&gt;
        &lt;div class=&quot;right menu&quot;&gt;
            &lt;div v-if=&quot;isLoggedIn&quot;&gt;
                Galleries button
                Upload button
                Logout button
            &lt;/div&gt;
            &lt;a v-else href=&quot;#&quot; class=&quot;ui item&quot; @click=&quot;login&quot;&gt;
                Login
            &lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;
</pre>
            <figcaption>Fig 06-038</figcaption>
          </figure>
          <p>So we use the <code class="prettyprint">v-if</code> directive to say if <code
            class="prettyprint">isLoggedIn</code> is equal to <code class="prettyprint">true</code> then display the
            buttons (or placeholders at the moment) inside of the <code class="prettyprint">div</code> . We then use the
            <code
              class="prettyprint">v-else</code> directive to handle the opposite case of when a user is not logged in.
            We could have used another <code class="prettyprint">v-if</code> directive here with <code
              class="prettyprint">!isLoggedIn</code> but instead we us <code class="prettyprint">v-else</code> which is
            a slightly shorter syntax. The <code class="prettyprint">v-else</code> directive must occur on the element
            directly after an element using the <code class="prettyprint">v-if </code> directive. If we test this in the
            browser we should now see the placeholder text when we are logged in and the Login button when we are not.
          </p>
          <h3>Persisting Login State</h3>
          <p>In the last section we added in a <code class="prettyprint">v-if</code> directive to our AppHeader to
            conditionally change the content displayed inside of it. Now one thing you might have noticed is that when
            we manually navigate to <code
              class="prettyprint">localhost:8080</code> the AppHeader reverts to saying that we are logged out. So let's
            try and clear up how Vuex works in this respect because there are some misconceptions. So inside of our
            <code class="prettyprint">auth.js</code> Vuex module we have the initial state of token set to null:
          </p>
          <figure>
<pre class="prettyprint">const state = {
    token: null
};</pre>
            <figcaption>Fig 06-039</figcaption>
          </figure>
          <p>So this means that anytime our application is loaded up from scratch inside the browser, for example when
            we do a full refresh, all of the state contained in the auth Vuex module gets dumped and the token reverts
            to the initial state of null. So this is why I was able to log in and refresh the page and see that I was
            suddenly not logged in. Every time my application restarts in the browser all this state gets completely
            wiped away and starts over again from scratch. So that kind of sequence is not really what you would expect
            when it comes to authentication. If you sign in to an application you probably expect to stay signed in even
            if you navigate away from the page and come back to it later.
          </p>
          <p>There's any easy fix which we can add to the auth module to make sure that we persist the authentication
            status of our user even if they close this page and come back to it again tomorrow. To do this we are going
            to use a native storage feature that is available on all major browsers called local storage. You can access
            local storage by writing <code class="prettyprint">localStorage</code> in the browser console. <code
              class="prettyprint">localStorage</code>

            allows us to store variables that will be persisted specifically for the current domain we are on (in our
            case <code class="prettyprint"> localhost:8080</code>. We can use this as a little spot to store a tiny bit
            of information customized for this particular user on their browser on specifically this domain of <code
              class="prettyprint"> localhost:8080</code>. If we were to browse to another domain like for example <code
              class="prettyprint">google.com</code> that same <code class="prettyprint">localStorage</code> would no
            longer be available - <code class="prettyprint">localhost:8080</code> has it's own little bucket of storage.
          </p>
          <p>We can take this access_token and put it into this <code class="prettyprint">localStorage</code> object
            whenever a user signs into the application. Then when they come back to our application at some point in the
            future we can look inside that <code class="prettyprint">localStorage</code> and see if that access token is
            available . If it is then we'll assume that the user is still logged in. The code for this is quite easy to
            put together. First inside the auth module locate the initial state object:
          </p>
          <figure>
<pre class="prettyprint">const state = {
    token: null
};</pre>
            <figcaption>Fig 06-040</figcaption>
          </figure>
          <p>So by default the token is set to null which equates to not logged in. So rather than starting off with
            null in every single case we're going to replace this and say that we're going to look inside that <code
              class="prettyprint">localStorage</code> object and check to see if we have saved an access token:
          </p>
          <figure>
<pre class="prettyprint">const state = {
    token: window.localStorage.getItem('imgur_token');
};</pre>
            <figcaption>Fig 06-041</figcaption>
          </figure>
          <p>So now every time our application starts up we're going to look to see is there's been a token stored and
            if there is we are going to assign it to the token property and then our application is going to appear to
            say "OK user you're still logged in". Now just adding the piece of code above is'nt enough. We need to make
            sure that whenever the user signs in we add the actual access token to local storage as well. We can do this
            in the <code class="prettyprint">finalizeLogin</code> action after we commit the token to the <code
              class="prettyprint">setToken</code> mutation - we can also take that token and add it to our <code
              class="prettyprint">localStorage</code> :
          </p>
          <figure>
<pre class="prettyprint">    finalizeLogin({ commit }, hash) {
        const queryString = qs.parse(hash.replace('#', ''));

        commit('setToken', queryString.access_token);
        window.localStorage.setItem('imgure_token', queryString.access_token);
    },</pre>
            <figcaption>Fig 06-042</figcaption>
          </figure>
          <p>Now, anytime a user signs in for the first time, we're going to take that token and store it on <code
            class="prettyprint">localStorage</code> and then any time a user comes back to our application we'll check
            to see if the tokens there and if it is we will assign it to our initial token state.
          </p>
          <p>Flip back over to the browser and test our authentication flow again. If we refresh, then click the Login
            button. Once we return to our application our <code class="prettyprint">finalizeLogin</code> action is going
            to take that token store it in <code class="prettyprint">localStorage</code> . We can confirm this by
            writing <code
              class="prettyprint">localStorage.getItem('imgur_token')</code> I will see my token stored inside there. So
            the token displayed will exactly match the access_token in the Url:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig06-043.png"/>
            <figcaption>Fig 06-043</figcaption>
          </figure>
          <p>So now I should be able to navigate back to <code class="prettyprint">localhost:8080</code> do a complete
            refresh and still see that I am logged into the application.
          </p>
          <h3>Button Styling</h3>
          <p>In this section we're going to style and add logic to our buttons in the AppHeader. So, initially, we will
            add some temporary anchor tags:
          </p>
          <figure>
<pre class="prettyprint">&lt;div class=&quot;right menu&quot;&gt;
    &lt;div v-if=&quot;isLoggedIn&quot;&gt;
        &lt;a class=&quot;item&quot;&gt;Galleries&lt;/a&gt;
        &lt;a class=&quot;item&quot;&gt;Upload&lt;/a&gt;
        &lt;a class=&quot;item&quot;&gt;Logout&lt;/a&gt;
    &lt;/div&gt;
    &lt;a v-else href=&quot;#&quot; class=&quot;ui item&quot; @click=&quot;login&quot;&gt;
        Login
    &lt;/a&gt;
&lt;/div&gt;</pre>
            <figcaption>Fig 06-044</figcaption>
          </figure>
          <p>If we view the application in the browser the styling looks good as far as the size of the buttons and the
            text they contain but you'll notice that they're all stacking up:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig06-045.png"/>
            <figcaption>Fig 06-045</figcaption>
          </figure>
          <p>So the reason they're stacking up like this is because we added this extra <code
            class="prettyprint">div</code> :</p>
          <figure>
                    <pre class="prettyprint">&lt;div class=&quot;right menu&quot;&gt;
    &lt;div v-if=&quot;isLoggedIn&quot;&gt;</pre>
            <figcaption>Fig 06-045</figcaption>
          </figure>
          <p>We want to keep this <code class="prettyprint">div</code> because we need to use the <code
            class="prettyprint">v-if</code> directive to make sure that we either show the set of buttons or the anchor
            tag that contains the Login functionality. However, the <a target="_blank" href="https://semantic-ui.com/">SemanticUI</a>
            library that we are using does not expect there to be a bunch of anchor tags inside of this <code
              class="prettyprint">right menu</code> class. We're basically breaking the rules of what SemanticUI expects
            to see but for a very good reason - so we can use that <code class="prettyprint">v-if</code> directive.
            We're going to add in a little bit of custom styling using CSS to make sue that the buttons appear
            horizontally. Add a style tag to the bottom of the AppHeader component:</p>
          <figure>
<pre class="prettyprint">&lt;style scoped&gt;
    .horizontal {
        display: flex;
        flex-direction: row;
    }
&lt;/style&gt;</pre>
            <figcaption>Fig 06-046</figcaption>
          </figure>
          <p>Apply this style to the div with the v-if directive:</p>
          <figure>
            <pre class="prettyprint">&lt;div v-if=&quot;isLoggedIn&quot; class=&quot;horizontal&quot;&gt;</pre>
            <figcaption>Fig 06-046a</figcaption>
          </figure>
          <p>Back in the browser, perform a refresh - because we added a new chunk of CSS that did not exist before, and
            you will see those buttons now appear side by side:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig06-047.png"/>
            <figcaption>Fig 06-047</figcaption>
          </figure>
          <h3>Logging Out Users</h3>
          <p>Next we will work on the logout functionality to make sure that when a user clicks the Logout button the
            <code class="prettyprint">logout</code> action is executed which will call the <code
              class="prettyprint">setToken</code> mutation which in turn sets the token in state to null. If token is
            null that indicates our user is not logged in.
          </p>
          <p>In your code editor navigate to the AppHeader component's definition. You'll recall that to get an action
            wired up to a component we make use of the <code class="prettyprint">mapActions</code> function. So we
            currently have one action mapped up. To add further actions we add them as a string to the array:
          </p>
          <figure>
<pre class="prettyprint">export default {
    name: 'AppHeader',
    computed: mapGetters(['isLoggedIn']),
    methods:
        mapActions(['login', 'logout'])
};</pre>
            <figcaption>Fig 06-048</figcaption>
          </figure>
          <p>So now we can make use of this <code class="prettyprint">logout</code> action that's been added to the
            <code class="prettyprint">methods</code> object by going up to the <code
              class="prettyprint">logout</code> anchor tag and adding a click event handler to it:
          </p>
          <figure>
            <pre class="prettyprint"> &lt;a class=&quot;item&quot; @click=&quot;logout&quot;&gt;Logout&lt;/a&gt;</pre>
            <figcaption>Fig 06-049</figcaption>
          </figure>
          <p>In the browser, perform a refresh, and click the Logout button. You should see the header revert back to
            the not logged in state and the Login button should appear which is the behaviour we want.
          </p>
          <h3>Automatic Component Updates</h3>
          <p>In the last section we added the Logout functionality. Anytime the user clicks on the Logout button the
            header instantly updates to indicate the user has been logged out. Behind the scenes when a user clicks on
            the button it calls the <code class="prettyprint">logout</code> action defined inside of our Auth module.
            That action updates the state of our Auth module. Anytime we call an action that updates our state it causes
            every single component that is using one of that modules getters to update as well. In other words, when we
            call the <code
              class="prettyprint">logout</code> action to update <code class="prettyprint">isLoggedIn</code> in the Auth
            module the getter of <code
              class="prettyprint">isLoggedIn</code> automatically got rerun as well and caused AppHeader component to
            update. What that means is that you and I do not have to call any manual update functions. There's no need
            for you and I to say - "Oh, some data that the AppHeader relies upon just changed - we need to somehow
            forcibly re-render the AppHeader component". We don't need to do that. All you and I have to do is call an
            action to update our state and then our component is going to just magically update for us.
          </p>
          <h3>Clearing LocalStorage Tokens</h3>
          <p>Ok, our application is looking pretty good, but there's still some rough edges around our authentication
            process. Firstly, you might notice, that if I click the logout button and then do a navigation attempt back
            to <code class="prettyprint">localhost:8080</code> the application thinks that I am still logged in. The
            reason that the app thinks we're still logged in is that even though we are updating our piece of state -
            <code class="prettyprint">token</code> when we call that <code class="prettyprint">logout</code> action
            inside of our Auth module we are not emptying ouf the <code class="prettyprint">localStorage</code> record
            of that access token.
          </p>
          <p>We need to make sure that anytime the <code class="prettyprint">logout</code> action is called we also
            clear out that imgur_token <code class="prettyprint">localStorage</code> item so that when a user refreshes
            the page that tokens not inside of <code class="prettyprint">localStorage</code> :
          </p>
          <figure>
<pre class="prettyprint">logout: ({ commit }) =&gt; {
    commit('setToken', null);
    window.localStorage.removeItem('imgur_token');
}</pre>
            <figcaption>Fig 06-050</figcaption>
          </figure>
          <p>To clear out an item that has been defined inside of <code class="prettyprint">localStorage</code> we use a
            function called <code class="prettyprint">removeItem</code> passing the name/key of the property -
            'imgur_token'. If we now test this inside the browser perform a refresh. Now click on logout which will log
            you out. Refresh the page again and you should see you are still logged out - this is now the desired
            behaviour.
          </p>
          <h3>Programmatic Navigation</h3>
          <p>Another issue we have is when a user comes back to our application from the Oauth2 flow we always see the
            text "Please wait..." on the screen. In reality we probably want to make sure that anytime someone comes
            back to the <code class="prettyprint">/oauth2/callback</code> route that we get access to their token, we do
            some work on it, then what we need to do is redirect them to a suitable location in our application - in our
            case our root route - <code class="prettyprint">localhost:8080</code>.
          </p>
          <p>You have already seen an example of us manipulating the user's browser by setting the <code
            class="prettyprint">window.location</code> property to the Url that we wanted the browser to navigate to.
            However, an important distinction to remember here, anytime we use this function or this way of changing the
            user's address it causes a hard refresh of the entire page - in Single Page Application we do not want to
            accidentally reload the page unless we really have to.
          </p>
          <p>Instead we're going to be making use of some built-in functionality directly inside of Vue router which
            allows us to change the route without causing a full refresh of the entire page. You'll remember in our
            <span class="filename">main.js</span> file we imported VueRouter:</p>
          <figure>
            <pre class="prettyprint">import VueRouter from 'vue-router';</pre>
            <figcaption>Fig 06-051</figcaption>
          </figure>
          <p>Then we created a new router instance</p>
          <figure>
<pre class="prettyprint">const router = new VueRouter({
    mode: 'history',
    routes: [{ path: '/oauth2/callback', component
});</pre>
            <figcaption>Fig 06-052</figcaption>
          </figure>
          <p>This router object allows us to programmatically navigate our users around our application. So really what
            we want to do is get access to this router object at the point we need to redirect our user (the <code
              class="prettyprint">finalizeLogin</code> action in this application). To achieve that we export the router
            object from the <span class="filename">main.js</span> file.</p>
          <figure>
<pre class="prettyprint">export const router = new VueRouter ({
    mode: 'history',
    routes: [
        { path: '/oauth2/callback', component: AuthHandler }
  ]
});</pre>
            <figcaption>Fig 06-053</figcaption>
          </figure>
          <p>Now in the Auth module we can import the router object:</p>
          <figure>
            <pre class="prettyprint">import { router }  from '../../main';</pre>
            <figcaption>Fig 06-054</figcaption>
          </figure>
          <p>Notice the use of the curly braces. That's because this export of router we setup above in <span
            class="filename">main.js</span> is referred to as a named export. We did not use the <code
            class="prettyprint">default</code> keyword for the router which is why we need the curly braces on the
            import statement. Now we can use the router object to navigate in the <code
              class="prettyprint">finalizeLogin</code>

            action:</p>
          <figure>
<pre class="prettyprint">finalizeLogin({ commit }, hash) {
    const queryString = qs.parse(hash.replace('#', ''));

    commit('setToken', queryString.access_token);
    window.localStorage.setItem('imgur_token', queryString.access_token);
    router.push('/');
},</pre>
            <figcaption>Fig 06-055</figcaption>
          </figure>
          <p>In the browser, Login to the application and you should see that after <code class="prettyprint">/oauth2/callback/</code>
            the browser is redirected to <code class="prettyprint">localhost:8080</code>. So that's the automatic
            refresh in action.
          </p>
          <h3>Additional Route Config</h3>
          <p>Our authentication system is in a pretty good spot at this point in time. So we're now going to start
            thinking about the galleries page and the upload page as well. Before we start working on either of those
            components we probably will want to make sure that our user has the ability to navigate over to the Gallery
            and Upload screens. Let's get started by adding some boilerplate to get the Gallery and Upload buttons to
            navigate to an actual page.
          </p>
          <p>Create two new files inside the components directory:</p>
          <ul>
            <li><span class="filename">ImageList.vue</span></li>
            <li><span class="filename">UploadForm.vue</span></li>
          </ul>
          <p>Add the following boilerplate code to the UploadForm component:</p>
          <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
        Upload form
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
    export default {
        name: 'UploadForm'
    }
&lt;/script&gt;</pre>
            <figcaption>Fig 06-056</figcaption>
          </figure>
          <p>Add the following boilerplate code to the ImageList component:</p>
          <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
        Image List
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
    export default {
        name: 'ImageList'
    }
&lt;/script&gt;</pre>
            <figcaption>Fig 06-057</figcaption>
          </figure>
          <p>Next we will create some routing rules inside our router instance which is located in <span
            class="filename">main.js</span
          >. Remember our routing diagram:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig06-058.png"/>
            <figcaption>Fig 06-058</figcaption>
          </figure>
          <p>In <span class="filename">main.js</span> firstly, import the two components we just created:</p>
          <figure>
<pre class="prettyprint">import ImageList from './components/ImageList';
import UploadForm from './components/UploadForm';</pre>
            <figcaption>Fig 06-058</figcaption>
          </figure>
          <p>Next add two new objects to the routes array:</p>
          <figure>
<pre class="prettyprint">export const router = new VueRouter ({
    mode: 'history',
    routes: [
        { path :'/', component: ImageList },
        { path : '/upload', component: UploadForm },
        { path: '/oauth2/callback', component: AuthHandler },

  ]
});</pre>
            <figcaption>Fig 06-059</figcaption>
          </figure>
          <p>Back in the browser reload the page and make sure the address is set to <code
            class="prettyprint">localhost:8080</code>. You should see the ImageList component on the screen:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig06-060.png"/>
            <figcaption>Fig 06-060</figcaption>
          </figure>
          <p>Now if you browse to <code class="prettyprint">localhost:8080/upload</code> you should see the UploadForm
            component appear:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig06-061.png"/>
            <figcaption>Fig 06-061</figcaption>
          </figure>
          <h3>Navigation with Router-Link</h3>
          <p>Now that we've created the UploadForm and ImageList components we need to make sure that the user has the
            ability to navigate to those anytime they click on the relevant button in the AppHeader. Using anchor tags
            results in a full page refresh which, as we said earlier, is not a good thing in a SPA. To resolve this Vue
            router provides the <code class="prettyprint">router-link</code> tag which still renders an anchor tag but
            if the user clicks on it a full page reload will not occur. Instead it will just very quickly update the Url
            at the top of the screen and, without reloading the entire page, Vue router will automatically update the
            content on the screen.
          </p>
          <p>Update the Galleries, Upload and Image Storage links in the AppHeader to use <code class="prettyprint">router-link</code>
            tags instead of
            anchor tags:
          </p>
          <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div class=&quot;ui secondary pointing menu&quot;&gt;
        &lt;router-link to=&quot;/&quot; class=&quot;active item&quot;&gt;
            Image Storage
        &lt;/router-link&gt;
        &lt;div class=&quot;right menu&quot;&gt;
            &lt;div v-if=&quot;isLoggedIn&quot; class=&quot;horizontal&quot;&gt;
                &lt;router-link to=&quot;/&quot; class=&quot;item&quot;&gt;Galleries&lt;/router-link&gt;
                &lt;router-link to=&quot;/upload&quot; class=&quot;item&quot;&gt;Upload&lt;/router-link&gt;
                &lt;a class=&quot;item&quot; @click=&quot;logout&quot;&gt;Logout&lt;/a&gt;
            &lt;/div&gt;
            &lt;a v-else href=&quot;#&quot; class=&quot;ui item&quot; @click=&quot;login&quot;&gt;
                Login
            &lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 06-062</figcaption>
          </figure>
          <p>Note that we do not change all the anchor tags to <code class="prettyprint">router-link</code> tags - only
            those links that are used to navigate around inside our application. The logout anchor tag is a good example
            of where we are not trying to perform any actual navigation - clicking on this button is just going execute
            the <code class="prettyprint">logout</code> action. The same is true for the Login tag.
          </p>
          <p>In the browser if you click on one of the <code class="prettyprint">router-link</code> tags and then
            inspect it in Chrome you will see that an anchor tag is still being rendered in the background. However this
            anchor tag has some special click event handlers tied to it to make sure that it does not cause a full page
            reload. Instead it's just going to update the Url which is going to tell Vue router to change the components
            visible on the page without doing a full reload.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
