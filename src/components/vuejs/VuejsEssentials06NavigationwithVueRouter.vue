<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>Navigation with Vue Router</h2>
                </div>
                <div class="panel-body">
                    <h3>Wiring up Vue Router</h3>
                    <p>In the last section we spoke about how we're going to use a Vue router library to customize
                        what is displayed on the screen based on the current Url. We're going to use this library to
                        watch for this /oauth2/callback route. Whenever the user ends up on this route we're going to
                        show the AuthHandler component who's sole purpose is going to be to extract the token from
                        the Url and call the appropriate action.
                    </p>
                    <p>So in this section we're going to start doing the setup of the router inside of our
                        application. Let's first get a good idea of the different steps that we're going to have to
                        do to setup the router: </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig06-001.png"/>
                        <figcaption>Fig 06-001</figcaption>
                    </figure>
                    <p>We're going to first start off by creating a new Vue router instance. We're going to do this
                        inside of our main.js file when we create this new view. When we create this new Vue router
                        instance we're also going to pass it a configuration object that tells it about different
                        routes that are going to be available inside of our application.</p>
                    <p>After we setup the initial Vue router instance we're going to tell our Vue instance that the
                        router exists. In the exact same way that we have to connect together Vuex and Vue libraries
                        in the previous sections we also have to connect together Vue Router and Vue as well.</p>
                    <p>Finally the third step is to tell Vue Router whenever it sees a Url that it cares about or a
                        path that it cares about you have to tell it where to put the corresponding component on the
                        screen. So if, for example, a user browses to <code class="prettyprint">/oauth2
                            /callback</code> and Vue Router says "Ok, I need to show AuthHandler" somewhere on the
                        screen we have to make sure we tell the router exactly where it is supposed to put that
                        component because just saying "Hey, put it on the screen is not quite enough." We have to
                        specifically designate where it's going to show up.
                    </p>
                    <p>Ok, let's flip back over to our code editor and we'll get started with step number one first.
                        In main.js add the following import statement:
                    </p>
                    <figure>
                        <pre class="prettyprint">import VueRouter from 'vue-router';</pre>
                        <figcaption>Fig 06-002</figcaption>
                    </figure>
                    <p>Recall that we already installed the Vue Router library a little bit ago at the very start of
                        the this project so there's no need to do this again.</p>
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
                    <p>We pass in an object containing a property called <code class="prettyprint">routes</code>.
                        This is going to be an array which will contain a collection of different object. In each of
                        these objects we are going to tell Vue Router about one of the possible routes that can be
                        visited inside of our application.
                    </p>
                    <p>The first route that you and I are going to define is going to be the <code
                            class="prettyprint">/oauth2/callback</code> route:</p>
                    <figure>
<pre class="prettyprint">const router = new VueRouter ({
  routes: [
      { path: '/oauth2/callback', component: AuthHandler }
  ]
});</pre>
                        <figcaption>Fig 06-005</figcaption>
                    </figure>
                    <p>We haven't yet created the AuthHandler Vue component - so we will need to do that and
                        then import it into <code class="prettyprint">main.js</code>. Before we do that we need to
                        complete one more step. At the bottom of the file where we create our actual instance
                        remember that in the exact same way with Vuex we did the initial use statement and then
                        finally passed the store into Vue. We have to do the exact same thing with Vue Router as
                        well. So we can think of the <code class="prettyprint">Vue.use</code> as the initial
                        handshake and now we need to pass the actual instance into our Vue instance as well:
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
                        first add a new file called AuthHandler.vue to the components directory with the following
                        code:</p>
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
                            class="prettyprint">/oauth2/callback</code> route it will probably only be displayed for
                        a split second as we try and access the Url and pull the token out of it. We just want to
                        display something that says "Hey just give us a moment we're getting the token" hence the
                        "Please wait..." message.
                    </p>
                    <p>In main.js we will wire the AuthHandler component up by addin an <code class="prettyprint">
                        import</code> statement:</p>
<figure>
<pre class="prettyprint">import AuthHandler from './components/AuthHandler';</pre>
<figcaption>Fig 06-008</figcaption>
</figure>
                    <h3>Browser vs Hash Routers</h3>

                    <h3>Component Insertion Point</h3>
                    <h3>Component Lifecycle Methods</h3>
                    <h3>Calling Actions</h3>
                    <h3>Parsing the Access Token</h3>
                    <h3>Data in Components with MapGetters</h3>
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
