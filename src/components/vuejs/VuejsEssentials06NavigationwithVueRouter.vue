<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>Navigation with Vue Router</h2>
                </div>
                <div class="panel-body">
                    <h3>Wiring up Vue Router</h3>
                    <p>In the last section we spoke about how we're going to use a Vue router library to customize what
                        is displayed on the screen based on the current Url. We're going to use this library to watch
                        for this /oauth2/callback route. Whenever the user ends up on this route we're going to show the
                        AuthHandler component who's sole purpose is going to be to extract the token from the Url and
                        call the appropriate action.
                    </p>
                    <p>So in this section we're going to start doing the setup of the router inside of our application.
                        Let's first get a good idea of the different steps that we're going to have to do to setup the
                        router:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig06-001.png"/>
                        <figcaption>Fig 06-001</figcaption>
                    </figure>
                    <p>We're going to first start off by creating a new Vue router instance. We're going to do this
                        inside of our main.js file when we create this new view. When we create this new Vue router
                        instance we're also going to pass it a configuration object that tells it about different routes
                        that are going to be available inside of our application.
                    </p>
                    <p>After we setup the initial Vue router instance we're going to tell our Vue instance that the
                        router exists. In the exact same way that we have to connect together Vuex and Vue libraries in
                        the previous sections we also have to connect together Vue Router and Vue as well.
                    </p>
                    <p>Finally the third step is to tell Vue Router whenever it sees a Url that it cares about or a path
                        that it cares about you have to tell it where to put the corresponding component on the screen.
                        So if, for example, a user browses to <code class="prettyprint">/oauth2/callback</code> and Vue
                        Router says "Ok, I need to show AuthHandler" somewhere on the screen we have to make sure we
                        tell the router exactly where it is supposed to put that component because just saying "Hey, put
                        it on the screen is not quite enough." We have to specifically designate where it's going to
                        show up.
                    </p>
                    <p>Ok, let's flip back over to our code editor and we'll get started with step number one first. In
                        main.js add the following import statement:
                    </p>
                    <figure>
                        <pre class="prettyprint">import VueRouter from 'vue-router';</pre>
                        <figcaption>Fig 06-002</figcaption>
                    </figure>
                    <p>Recall that we already installed the Vue Router library a little bit ago at the very start of the
                        this project so there's no need to do this again.
                    </p>
                    <p>Next we will tell the Vue library about the existence of the Vue Router:</p>
                    <figure>
                        <pre class="prettyprint">Vue.use(VueRouter);</pre>
                        <figcaption>Fig 06-003</figcaption>
                    </figure>
                    <p>Next we'll create our actual Vue router instance. This is where we pass in that initial
                        configuration that tells Vue Router about the different routes that are going to be available
                        inside of our application:
                    </p>
                    <figure>
<pre class="prettyprint">const router = new VueRouter ({
  routes: [
  ]
});</pre>
                        <figcaption>Fig 06-004</figcaption>
                    </figure>
                    <p>We pass in an object containing a property called <code class="prettyprint">routes</code>. This
                        is going to be an array which will contain a collection of different object. In each of these
                        objects we are going to tell Vue Router about one of the possible routes that can be visited
                        inside of our application.
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
                    <p>We haven't yet created the AuthHandler Vue component - so we will need to do that and then import
                        it into <code class="prettyprint">main.js</code>. Before we do that we need to complete one more
                        step. At the bottom of the file where we create our actual instance remember that in the exact
                        same way with Vuex we did the initial use statement and then finally passed the store into Vue.
                        We have to do the exact same thing with Vue Router as well. So we can think of the <code
                                class="prettyprint">Vue.use</code> as the initial handshake and now we need to pass the
                        actual instance into our Vue instance as well:
                    </p>
                    <figure>
<pre class="prettyprint">new Vue ({
    router,
    store,
    render: h =&gt; h(App)
}).$mount('#app');</pre>
                        <figcaption>Fig 06-006</figcaption>
                    </figure>
                    <p>Now we need to create the AuthHandler component that's going to be displayed anytime a user
                        visits this route and then we need to make sure that we import it into this main.js file. So
                        first add a new file called AuthHandler.vue to the components directory with the following code:
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
                            class="prettyprint">/oauth2/callback</code> route it will probably only be displayed for a
                        split second as we try and access the Url and pull the token out of it. We just want to display
                        something that says "Hey just give us a moment we're getting the token" hence the "Please
                        wait..." message.
                    </p>
                    <p>In main.js we will wire the AuthHandler component up by adding an <code class="prettyprint">
                        import</code> statement:
                    </p>
                    <figure>
                        <pre class="prettyprint">import AuthHandler from './components/AuthHandler';</pre>
                        <figcaption>Fig 06-008</figcaption>
                    </figure>
                    <h3>Browser vs Hash Routers</h3>
                    <p>In the last section we added Vue Router to our application. If we now refresh the browser and
                        look at the address bar we will see a <code class="prettyprint">#</code> sign is now present in
                        the Url:
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
                    <p>One of the default options that was set when we created our new router was the type of router
                        that was used. By default Vue router tries to use something called a hash router. The hash
                        router is a reference to what portion of the Url is going to be used when Vue router tries to
                        figure out what set of components it needs to show on screen.
                    </p>
                    <p>When we use Hash Router Vue Router is going to look at only characters to the right-hand side of
                        the hash inside the Url to figure out what components need to be shown on screen.
                    </p>
                    <p>This is going to cause some unintended side effects when we start working with OAuth inside of
                        our application. Remember just a moment ago when we got redirected back over to our application
                        from the Imgur OAuth flow it sent us back here with the route of something like:
                    </p>
                    <figure>
                        <pre class="prettyprint">/oauth2/callback#access_token....</pre>
                        <figcaption>Fig 06-010</figcaption>
                    </figure>
                    <p>So if we leave this default implementation of the router as it's standing right now it's going to
                        look to the characters to the right-hand side of the hash to figure out what set of components
                        to show on the screen. Currently this will break the routing because it won't have any idea how
                        to interpret access_token and the other query string variables.
                    </p>
                    <p>We can modify the router configuration to use Browser Router instead of Hash Router. The Browser
                        Router option causes the router to look at all the characters between the domain <code
                                class="prettyprint">localhost:8080</code> and the hash on the right-hand side to figure
                        out what route or what set of components need to be shown on screen. So the behaviour of Browser
                        Router is a better fit for our requirements. We can still add further information after the
                        <code class="prettyprint">#</code> such as our access_token etc.
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
                    <p>We add in a new key called mode and set the value to history which tells VueRouter to use the
                        Browser Router mode instead of the default.
                    </p>
                    <p>Back in the browser navigate to <code class="prettyprint">localhost:8080</code> and you'll notice
                        the page reloads but does not automatically add the hash inside the Url anymore.
                    </p>
                    <h3>Component Insertion Point</h3>
                    <p>We've now taken care of steps 1 and 2 of setting up VueRouter inside of our application:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig06-012.png"/>
                        <figcaption>Fig 06-012</figcaption>
                    </figure>
                    <p>We're now going to move onto step number 3 which is going to tell Vue Router what to do anytime
                        it matches a route against the Url that's in the users address bar. Essentially we just need to
                        add a little tag inside of some template in our application that says "Hey Vue Router if you
                        ever match a component try to stick it into this tag". In App.vue we are currently showing just
                        the AppHeader component. We will want to display other content under the AppHeader. Insert the
                        following code into the template:
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
                    <p>So now anytime VueRouter matches up a route that's going to take that component and put it inside
                        the <code class="prettyprint">vue-router</code> tag.
                    </p>
                    <p>In the browser navigate to /oauth2/callback and we should see the AuthHanlder component appear on
                        the screen:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig06-014.png"/>
                        <figcaption>Fig 06-014</figcaption>
                    </figure>
                    <p>Chances are that, in the vast majority of applications, you'll add this tag into one of the more
                        root components of your application like an App component or Layout component.
                    </p>
                    <h3>Component Lifecycle Methods</h3>
                    <p>We've now got our AuthHandler component visible on the screen which means we can start adding
                        some code to it to extract the access_token from the Url. The required steps are illustrated in
                        the following diagram:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig06-015.png"/>
                        <figcaption>Fig 06-015</figcaption>
                    </figure>
                    <p>The key here is making sure that the instant we know AuthHandler is about to render on the screen
                        we want it to call the <code class="prettyprint">finalizeLogin</code> right away. We achieve
                        this using a feature of Vue components called life cycle methods.
                    </p>
                    <p>Life cycle methods are functions that we can define on a component that are called automatically
                        during certain points inside of a components lifecycle. The term lifecycle refers to the
                        sequence of steps a component goes through whenever it's about to be:
                    <ul>
                        <li>rendered on the screen</li>
                        <li>taken off the screen</li>
                        <li>updated with new content</li>
                    </ul>
                    <p>The official Vue documentation has a fantastic <a
                            href="https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram">Lifecycle Diagram</a> to
                        give you a better idea of how these lifecycle methods work.
                    </p>
                    <p>It's important to understand the lifecycle methods and their names. We start off at the very top
                        where we create a new Vue instance. When we call <code class="prettyprint">new Vue</code> it
                        kicks off some initial events and internal code handling stuff to setup this Vue instance.
                    </p>
                    <p>After that initial bit of configuration and setup a lifecycle method called <code
                            class="prettyprint">beforeCreate</code> is then automatically called. If we define a
                        function with a name of <code class="prettyprint">beforeCreate</code> in a component:
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
                    <p>is a different lifecycle method that will be called at some point inside this component's
                        lifecycle. For example, right after calling <code class="prettyprint">beforeCreate</code> we
                        then setup some further configuration, immediately after that a second lifecycle method named
                        <code class="prettyprint">created</code> is called. So, again, if we add the following code:
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
                    <p>The <code class="prettyprint">created</code> method we defined will be called automatically when
                        the lifecycle method of the same name runs.
                    </p>
                    <p>For our current application, we want to make sure that the instant the component is created we
                        try to call the <code class="prettyprint">finalizeLogin</code> action that we're going to
                        eventually create inside of our application. It's probably most appropriate for us to make use
                        of the <code class="prettyprint">created</code> lifecycle method.
                    </p>
                    <p>The lifecycle methods:</p>
                    <ul>
                        <li>beforeCreate</li>
                        <li>created</li>
                        <li>beforeMount</li>
                        <li>mounted</li>
                    </ul>
                    <p>All get called before the component actually shows up in the DOM. The process of actually showing
                        up in the DOM is called the 'mounted point'.
                    </p>
                    <p>If you look at the official Vue Router documentation then it's going to suggest the <code
                            class="prettyprint">created</code> lifecycle method is the optimal location to do any
                        initial data loading. We will take advantage of this when we start to implement the ability to
                        list out images that our user has uploaded.
                    </p>
                    <h3>Calling Actions</h3>
                    <p>In the last section we spoke about the presence of lifecycle methods inside of components. Next
                        we have to make sure that when the <code class="prettyprint">created()</code> method we defined
                        is invoked we call the appropriate action in the Auth module - <code class="prettyprint">finalizeLogin</code>.
                    </p>
                    <p>Let's first wire up the finalizeLogin action to the AuthHanlder component and then we'll go over
                        to the Auth moduleand start to define it - firsst we import mapActions:
                    </p>
                    <figure>
                        <pre class="prettyprint">import { mapActions } from 'vuex';</pre>
                        <figcaption>Fig 06-018</figcaption>
                    </figure>
                    <p>and hook it up to the methods property listing out the action name(s) that we want to connect to
                        this component:
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
                    <p>So to call an action that's been bound to our methods object from the lifecycle method all we
                        have to do is use the <code class="prettyprint">this</code> keyword followed by a period and
                        then the name of the action - in this case <code class="prettyprint">finalizeLogin</code>. We
                        don't have to do anything like <code class="prettyprint">this.actions</code> it's simply <code
                                class="prettyprint">this.finalizeLogin</code>.
                    </p>
                    <p>So when we call this action we are going to want to get the entire hash out of the Url and pass
                        it into the action where it will be parsed to pull the access_token out of the Url and get it to
                        updated the internal state of the AuthModule.
                    </p>
                    <p>To get the hash from the Url we write <code class="prettyprint">window.location.hash</code> this
                        will return everything from the <code class="prettyprint">#</code> symbol to the right hand side
                        of the Url:
                    </p>
                    <figure>
                    <pre class="prettyprint">created() {
    this.finalizeLogin(window.location.hash);
}</pre>
                    <figcaption>Fig 06-020a</figcaption>
                    </figure>

                    <h3>Parsing the Access Token</h3>
                    <p>Next we will work on the <code class="prettyprint">finalizeLogin</code> action to extract the
                        access_token out of the Url and then call the <code class="prettyprint">setToken</code>
                        mutation.
                    </p>
                    <p>In the browser click the login button. If you have the console open you may see an error:</p>
                    <figure>
                        <pre class="prettyprint">[vuex] unknown action type: finalizeLogin</pre>
                        <figcaption>Fig 06-021</figcaption>
                    </figure>
                    <p>This error occurs because we haven't created the <code class="prettyprint">finalizeLogin </code>
                        action yet. In the console if you write:
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
                    <p>Add the following code in the Auth module under the login action:</p>
                    <figure>
                    <pre class="prettyprint">finalizeLogin() {
},</pre>
                        <figcaption>Fig 06-023</figcaption>
                    </figure>
                    <p>When we call <code class="prettyprint">finalizeLogin</code> from our AuthHandler component we
                        pass in <code class="prettyprint">window.location.hash</code>:
                    </p>
                    <figure>
                    <pre class="prettyprint">this.finalizeLogin(window.location.hash);</pre>
                    <figcaption>Fig 06-024</figcaption>
                    </figure>
                    <p>So this argument is going to show up as the second argument to the <code class="prettyprint">finalizeLogin</code>
                        action. Remember the first argument that gets passed to any action is an object that has a bunch
                        of helper methods tied to it that allow us to modify our Vuex module - for example it
                        might contain the <code class="prettyprint">commit</code> function that allows us to call
                        mutations:
                    </p>
                    <figure>
                    <pre class="prettyprint">finalizeLogin({ commit }, hash) {
},</pre>
                        <figcaption>Fig 06-025</figcaption>
                    </figure>
                    <p>So we supply the <code class="prettyprint">commit</code> function again in the first argument.
                        Remember we supplied the  <code class="prettyprint">window.location.hash</code> property to
                        the call to <code  class="prettyprint">finalizeLogin</code> in the <code class="prettyprint">
                            created</code> lifecycle method hook so that hash will be the second argument to this
                        action. We simply call it hash.
                    </p>
                    <p>Add the following code to extract the access_token from the hash:</p>
                    <figure>
                    <pre class="prettyprint">finalizeLogin({ commit }, hash) {
    const queryString = qs.parse(hash.replace('#', ''));

    commit('setToken', queryString.access_token);
},
                    </pre>
                    <figcaption>Fig 06-026</figcaption>
                    </figure>
                    <p><code class="prettyprint">hash.replace('#', '')</code> removes the <code class="prettyprint">#
                    </code> character from the start of the string.</p>
                    <p>We pass the remaining string into the qs module which is used to manipulate, parse and
                        generate query strings. Firstly, import the qs module:</p>
                    <figure>
                    <pre class="prettyprint">import qs from 'qs';</pre>
                    <figcaption>Fig 06-027</figcaption>
                    </figure>
                    <p>Then pass our string into the <code class="prettyprint">qs.parse</code> function and assign
                        it to a variable called <code class="prettyprint">queryString</code>:</p>
                    <figure>
                    <pre class="prettyprint">const queryString = qs.parse(hash.replace('#', ''));</pre>
                    <figcaption>Fig 06-028</figcaption>
                    </figure>
                    <p><code class="prettyprint">qs.parse</code> will return an object that contains the properties
                        and values from the string we pass. So in this case there will be keys like access_token,
                        refresh_token etc. and the corresponding values.</p>
                    <p>Next we call the <code class="prettyprint">setToken</code> mutation and pass in the
                        access_token from our queryString:</p>
                    <figure>
                    <pre class="prettyprint">commit('setToken', queryString.access_token);</pre>
                    <figcaption>Fig 06-029</figcaption>
                    </figure>
                    <p>That's going to update our state object with that new token.</p>
                    <p>Even though we are not making use of the token from our state let's test this in the browser
                        just to make sure we don't get any errors.</p>
                    <p>Click login, that sends us to Imgur, which sends us straight back, check for errors in the
                        console and hopefully you will see there aren't any.</p>
                    <h3>Data in Components with MapGetters</h3>
                    <p>In the last section we finished up or finalizeLogin action and we assumed that the code we
                        wrote would update the state inside the Auth although we have not yet proved this. We will
                        add some code to verify this. Remember when we were first discussing Vuex:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig06-030.png"/>
                        <figcaption>Fig 06-030.png-</figcaption>
                    </figure>
                    <p>In our Auth module there are actions that we can call modify data and at some point in time
                        we're going to want to also read data - that was the purpose of the getters which we defined:
                    </p>
                    <figure>
                    <pre class="prettyprint">const getters = {
    isLoggedIn: state =&gt; !!state.token
};</pre>
                    <figcaption>Fig 06-031</figcaption>
                    </figure>
                    <p>We have defined one getter called <code class="prettyprint">isLoggedIn</code> which returns a
                        boolean value indicating if our user is authenticated with our application.
                    </p>
                    <p>We will use the <code class="prettyprint">isLoggedIn</code> getter to supply that information
                        to our AppHeader component allowing us to customize it's template depending on the value we
                        receive.
                    </p>
                    <p>In the AppHeader component's script section import the mapGetters function from Vuex:</p>
<figure>
<pre class="prettyprint">import { mapActions, mapGetters } from 'vuex';</pre>
<figcaption>Fig 06-032</figcaption>
</figure>
                    <p>So we're going to use this mapGetters function to pull some information out of the Auth
                        module and add it directly to the AppHeader. We use a similar syntax to what we just did
                        with the mapActions:</p>
<figure>
<pre class="prettyprint">methods: mapActions(['login'])</pre>
<figcaption>Fig 06-033</figcaption>
</figure>
                    <p>However instead of using methods which we use to modify data or react to events inside of our
                        application we are going to use a computed property. Remember computed is how we read our
                        data and get access to it inside our template:
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
                    <p>Now that we've defined this getter of isLoggedIn and assigned it to the component we can
                        reference it in our template:</p>
<figure>
<pre v-pre  class="prettyprint">{{ isLoggedIn }}</pre>
<figcaption>Fig 06-035</figcaption>
</figure>
                    <p>Remember whenever we are working with our templates we dont have to write out this. or this
                        .computed or anything like that we just supply the name of the computed property - in
                        this case isLoggedIn
                        .</p>
                    <p>Refresh the browser and you should see true indicating that the user is logged in:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig06-036.png"/>
                        <figcaption>Fig 06-036</figcaption>
                    </figure>
                    <p>If you browse to the application root instead <code class="prettyprint">http://localhost
                        :8080</code> the access_token will no longer be available inside the Url. This means the
                    AuthHandler component can't get the token which will result in the AppHeader displaying false:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig06-037.png"/>
                        <figcaption>Fig 06-037</figcaption>
                    </figure>

                    <h3>The V-Else Directive</h3>
                    <h3>Persisting Login State</h3>
                    <h3>Button Styling</h3>
                    <h3>Logging Out Users</h3>
                    <h3>Automatic Component Updates</h3>
                    <h3>Clearing LocalStorage Tokens</h3>
                    <h3>Programmatic Navigation</h3>
                    <h3>Additional Route Config</h3>
                    <h3>Navigation with Router-Link</h3>
                </div>
            </div>
        </div>
    </div>
</template>
