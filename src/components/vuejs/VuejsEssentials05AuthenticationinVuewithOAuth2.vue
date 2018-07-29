<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>Handling State with Vuex</h2>
                </div>
                <div class="panel-body">
                    <h3>OAuth Overview</h3>
                    <p>In the last section we started doing a little bit of a detour away from the AppHeader component
                        to discuss the Imgur API. We are going to continue our detour by discussing how we are going to
                        make use of the Imgur API to handle authentication inside of our application.
                    </p>
                    <p>The following diagram illustrates the flow of authenticating our users through the Imgur API:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig05-001.png"/>
                        <figcaption>Fig 05-001</figcaption>
                    </figure>
                    <p>So this is a high level overview of the general flow that you and I are going to use. We are
                        making a very big assumption that the users of our application already have an Imgur account .
                        You and I are not going to have to require users to enter emails or passwords to identify
                        themselves because they will have already done that through the Imgur service. So we are going
                        to rely on Imgur's Authentication system to also authenticate users inside of our app as well.
                    </p>
                    <p>If you have seen the buttons that say Login with Facebook or Login with Google you will have
                        experienced an OAuth flow in action. So applications that show those buttons delegate our the
                        process of authenticating the user to some outside service like Facebook, Google, Linked In or
                        Imgur.
                    </p>
                    <p>So everythings going to begin by a user coming to our application and clicking the Login button
                        at which point we will forcibly navigate our users over to the Imgr OAuth flow. This means we
                        literally change the Url inside the users browser to go to a page on the Imgur website that
                        tells Imgur that we are attempting to authenticate the user inside of our application. The user
                        will be prompted with a message that the Image Storage application want to get access to your
                        account for the purposes of authentication. They can either allow this or not.
                    </p>
                    <p>Assuming the user authorizes Imgur to allow access to the Image Store application Imgur will
                        redirect the user back to our application - changing the Url back to our application. When the
                        redirect is performed Imgur inserts a token at the end of the Url. This is a string of random
                        numbers and letters that defines that this application has been given access to this users
                        account and has the ability to perform certain actions on the Imgur web site on behalf of the
                        user such as uploading images.
                    </p>
                    <h3>Imgur API Signup</h3>
                    <p>In this section we're going to create a new Imgur account which is going to allow us to sign up
                        for a developer set of credentials to work with the Imgur API directly.
                    </p>
                    <p>On the Imgur website click the Signup button and provide the required details. This will create a
                        regular user account. To enable a developer account with API keys we need to <a
                                href="https://apidocs.imgur.com/">register our application</a> - the link to do this is
                        available from the Imgur documentation. Enter the following details:
                    </p>
                    <table>
                        <tr>
                            <td>Application Name</td>
                            <td>Vue Image Storage App</td>
                        </tr>
                        <tr>
                            <td>Authorization Type</td>
                            <td>OAuth 2 authorization with a callback URL</td>
                        </tr>
                        <tr>
                            <td>Authorization callback URL</td>
                            <td>http://localhost:8080/oauth2/callback</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>maxsage@gmail.com</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>Test application for Image upload</td>
                        </tr>
                    </table>
                    <p>We get a Client ID and Client secret which should be copied to Notepad. The Client ID identifies
                        our application to Imgur and the Client Secret allows us to do some more secure actions on the
                        Imgur API.
                    </p>
                    <p>That completes our signup for Imgur API. Next we will implement the OAuth flow.</p>
                    <h3>Handling App Logic</h3>
                    <p>Now we will write the actual code that will let a use navigate over to the Imgur flow, send them
                        back to our application with a token and then presumably do some interesting things inside of
                        our application.
                    </p>
                    <p>One consideration is where to place all the code for handling this authentication flow.</p>
                    <p>If we think back to our VideoBrowser application you'll remember we had the App component,
                        VideoDetail, VideoList, VideoListItem and the SearchBar. When it came to state or data inside of
                        our application it was all concentrated inside of the App component - so it stored the list of
                        videos and the currently selected video.
                    </p>
                    <p>It was very simple to have the App in charge of knowing the currently selected video because it
                        could then very easily communicate that down to the VideoDetail and each time the user clicked
                        on a video from the VideoListItem that got communicated up to the App.
                    </p>
                    <p>However, as we start to work on this App, things are bit different. The following diagram details
                        some of the components:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig05-002.png"/>
                        <figcaption>Fig 05-002.png</figcaption>
                    </figure>
                    <p>In total we are probably going to end up with fewer components than in the VideoBrowser
                        application. However the amount of information that is going to be exchanged between these
                        components is going to be dramatically increased.
                    </p>
                    <p>We are going to have the token which needs to be known by the App component so that it can modify
                        the display of the AppHeader. In addition the ImageList will need to know whether the user is
                        signed in and if so who they are so that the ImageList can fetch the list of images that have
                        been uploaded by the user. And then finally the UploadForm definitely needs to know about the
                        token and wheter the user is logged in or not because we have to use that token to actually
                        handle image upload over to the Imgur API.
                    </p>
                    <p>So even though it might still sound like all the components are just using pieces of information
                        that can be handled by the App component consider if the application was to grow in complexity:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig05-003.png"/>
                        <figcaption>Fig 05-003</figcaption>
                    </figure>
                    <p>So maybe inside of the app you've got the AppHeader which has some AuthButtons and ProfileImage
                        components. Perhaps the UploadForm has some fancy drag and drop functionality or progress bar
                        tied to it that you add to an ImageUploader component. Maybe the ImageListItem component shows
                        comments and for each comment we display a ProfileImage component as well.
                    </p>
                    <p>If you think about the above component structure and consider how you would share whether or not
                        a user was logged in throughout all of these components you can start to see how that would be a
                        little bit of a hassle.
                    </p>
                    <p>Almost every single link in the chain in the diagram above would need to pass down information
                        about whether or not a user was signed in down to it's child component.
                    </p>
                    <p>A better way to store information in our application is to use the Vuex library which we will
                        look at in the next section.
                    </p>
                    <h3>Vuex Introduction</h3>
                    <p>So as soon as we start dealing with larger applications that have many different components that
                        need to exchange a lot of different information between components we might start to run into
                        some scaling issues if we stick to using just the Vue library.
                    </p>
                    <p>To solve this issue of maintaining information in larger applications you and I are going to make
                        use of a library called Vuex. You'll recall we spoke briefly about that library when we
                        discussed some of the issues that we might encounter whilst creating our application in the App
                        Overview section earlier.
                    </p>
                    <p>We will look at what our completed application will look like then we will discuss what Vuex is
                        actually doing internally to help us:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig05-004.png"/>
                        <figcaption>Fig 05-004.png</figcaption>
                    </figure>
                    <p>So in addition to our existing components you and I are going to add the Vuex library to handle
                        the flow and updating of information inside of our App. We are going to create two separate
                        modules inside of Vuex. The first module is going to be the Auth Module and the second is going
                        to be the Image Module. These modules will contain all of the code and data related to their
                        particular purpose. So the Auth Module will:
                    </p>
                    <ul>
                        <li>Storing whether the user is logged in or not</li>
                        <li>Signing the user in</li>
                        <li>Signing the user out</li>
                    </ul>
                    <p>The Image Module will:</p>
                    <ul>
                        <li>Fetch all the images that the user has uploaded</li>
                        <li>Handle uploading images</li>
                    </ul>
                    <p>When we start to locate all of this kind of business logic inside these two modules it means we
                        will be writing far less business logic inside of our components which means the component can
                        focus on presenting information to the user. So the components will still have things like click
                        events inside them but they wont, for example, make Ajax requests using Axios.
                    </p>
                    <h3>Vuex Modules</h3>
                    <p>In the last section we started talking about how our application is going to have two separate
                        Vuex modules - the Auth Module and the Image Module. In this section we will dive a bit deeper
                        into how these modules will be structured and the kind of code we will be adding to them.
                    </p>
                    <p>First off every module that you and I create is going to have four separate parts to it:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig05-005.png"/>
                        <figcaption>Fig 05-005</figcaption>
                    </figure>
                    <p>Instead of giving you some boring definition of what each of the parts do we will go through a
                        very practical example of a module. We're going to imagine that we are going to create a Vuex
                        module for handling Car inventory at an imaginary dealership.
                    </p>
                    <p>We're going to first start off with state:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig05-006.png"/>
                        <figcaption>Fig 05-006</figcaption>
                    </figure>
                    <p>State is probably the easiest part to picture in your head and get a sense of what it's really
                        doing for us. The state section of a module holds all of the raw data related to this particular
                        module. So in the case of a Car Inventory the raw record or most core unit would probably be a
                        Car - probably an object with key value pairs describing the year that the car was built, it's
                        make/model, price and other Car related details.
                    </p>
                    <p>So inside the state section you and I are going to have a bunch of different records that
                        describe some core unit of data inside our application. You can think of this state section as
                        being like a big bucket of data. As we start to fetch more records for our application we're
                        just going to continually throw them into the big bucket of data we call state.
                    </p>
                    <p>At some point a customer will come into our car dealership and say to a salesperson "Hey, I'm
                        looking for budget cars" or "Hey, I'm looking for a sports car". The Car salesperson won't want
                        to look at a big list of cars and examine each record for the relevant information.
                    </p>
                    <p>So to handle the functionality of automatically sorting through records we use Getters:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig05-007.png"/>
                        <figcaption>Fig 05-007</figcaption>
                    </figure>
                    <p>So getters are functions that take the entire state object and do some filtering or computation
                        on those records. So inside of our Car Inventory module you and I might decide to define some
                        getters to retrieve all the cars that are defined as "budget vehicles" or all the cars that are
                        defined as "off road". So, again, these are all functions that will take all of our records
                        stored in state and return some subset.
                    </p>
                    <p>Getters don't necessarily have to do just a filtering operation - they can be used for any type
                        of operation you can possibly imagine. Anything that is going to take our list of records in
                        state and perform any type of operation.
                    </p>
                    <p>So we could, instead, have some getter defined inside of here called numberOfCars:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig05-008.png"/>
                        <figcaption>Fig 05-008</figcaption>
                    </figure>
                    <p>Which, because we have six cars currently in state, might just return the number six. So, as we
                        said, the getters do not have to be used for just filtering operations. They can be used for any
                        type of operation we might want to do on our records stored inside of state.
                    </p>
                    <p>Getters can be used to simply say return all the cars or all the records we have stored inside
                        state. So we could define a getter called allCars and when we call that function it would simply
                        return all the records we have stored inside of our state object.
                    </p>
                    <p>It is worth pointing out that State and Getters are closely related - so we've got the state
                        defined and we've got the set of getters that somehow operate on that state.
                    </p>
                    <p>Now, the next two parts of a Vuex module - Mutations and Actions have a somewhat similar
                        relationship to the one that is shared by State and Getters.
                    </p>
                    <p>With Mutations, we think of very explicit individual single step ways in which you and I would
                        want to change the data stored inside of the state:
                    </p>

                    <p>So, in the context of a car dealership, some ways that we might operate on the state are:</p>
<figure>
    <img src="./images/vuejsessentials/Fig05-009.png"/>
    <figcaption>Fig 05-009</figcaption>
</figure>
                    <p>All the above are single operations that might occur on the list of cars in state. The single
                        operations are called Mutations. A mutation is a function that is going to operate on our list
                        of records stored inside of state and make some small change. For example, we might call the
                        setCarAsSold mutation on the Ford F150 which will set it as sold preventing any one else from
                        purchasing it.
                    </p>
                    <p>Or maybe we would define a mutation that receives a new car from a manufacturer and adds it
                        to our inventory. So we would call addCarToInventory that takes one individual car and adds
                        it into our state object.</p>
                    <p>We obviously attempt to name the mutations so they indicate what their purpose is.</p>
                    <p>As we discussed, our last part, Actions have a very close relationship to mutations. Actions
                        allow us to define functions that assemble together multiple mutations to make some
                        intelligent change to the list of records that are stored inside our state. </p>
                    <p>So, for example, we might define an action as a function called SellCar:</p>
<figure>
    <img src="./images/vuejsessentials/Fig05-010.png"/>
    <figcaption>Fig 05-010</figcaption>
</figure>
                    <p>So anytime we sell a car chances are we are going to perform several different Mutations to
                        our list of records stored inside of the state object.</p>
                    <p>So an action is a function that assembles together multiple mutations and it calls them all
                        in some sequence. It isn't mandatory for an Action to call multiple mutations - we could
                        define an action that does just one single mutation:</p>
<figure>
    <img src="./images/vuejsessentials/Fig05-011.png"/>
    <figcaption>Fig 05-011.png</figcaption>
</figure>
                    <p>However, in general, the idea behind actions is that we're going to take multiple mutations
                        and call them all in some distinct order.</p>
                    <p>Ok so that wraps up our first take on Vuex modules.</p>
                    <h3>Connecting Vuex to Vue</h3>
                    <p>In the last section we had a long discussion about Vuex modules. We are now going to create
                        the Auth module. We are also going to perform some one-time setup of Vuex within our project
                        . After that is complete we can add as many modules as we want to.</p>
                    <p>Create a new folder in the src directory called store. This folder is going to contain all of
                    our Vue related code. </p>
                    <p>Create a new file in the store directory called index.js. This is way the initial setup of
                        Vue is going to take place. Add the following code:</p>
                    <figure>
<pre class="prettyprint">import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {}
});</pre>
                        <figcaption>Fig 05-012</figcaption>
                    </figure>
                    <p>We import the Vuex library, then we import the Vue library and issue the <code
                            class="prettyprint">use</code> command to tell Vue that we want to use the Vuex library.
                        Vuex can be used with other libraries.
                    </p>
                    <p>Next we create a new Vuex store and pass an object called modules. As we create more modules
                        we will register them with Vuex by adding them to the modules object.</p>
                    <p>As we've been working on Vue we've been creating components and we've said several times
                        that those components have a relationship to Vue instances. We think of the Vue
                        instances as being like instances of a class. It is a similar story with the Vuex Store. The
                        Store is an overarching term for a collection of modules that have been assembled together
                        and can then be interfaced with from our Vue code.
                    </p>
                    <p>We are now going to add code to our main.js and import our newly created Store and hook it up
                    to the Vue instance:</p>
                    <figure>
<pre class="prettyprint">import Vue from 'vue';
import App from './App';
import store from './store'

new Vue ({
    store,
    render: h =&gt; h(App)
}).$mount('#app');
</pre>
                        <figcaption>Fig 05-013</figcaption>
                    </figure>
                    <p>Notice the import statement:</p>
                    <figure>
                        <pre class="prettyprint">import store from './store'</pre>
                        <figcaption>Fig 05-014</figcaption>
                    </figure>
                    <p>We don't need to add the <code class="prettyprint">/index</code> because whenever we have a
                        file called <code class="prettyprint">index.js</code> we can just import the directory that
                        it is contained in and Webpack will just assume that we are looking for the index.js file
                        inside. </p>
                    <p>Next we pass the store into the Vue instance. Again, because the key and the value are
                        identically named we can use the condensed form of just <code class="prettyprint">store
                        </code> instead of <code class="prettyprint">store: store,</code>.</p>
                    <p>So back in the index.js the statement <code class="prettyprint">Vue.use(Vuex)</code> tells Vue
                        that it needs to use the Vuex library. So it kinds of wires the two together and let's the
                        two know that they exist. But an additional part to that is providing the store to the Vue
                        instance which is the purpose of passing in the store when we create the new Vue instance in
                        main.js.
                    </p>
                    <h3>Initial Auth Module Design</h3>
                    <p>We are now going to start working on our Auth module which will contain all the code relate
                        to Authentication.</p>
                    <p>Create a new directory called modules in the store directory. Create a new file called auth
                        .js</p>
                    <p>Let's briefly discusss the design of this module.</p>
                    <h3>Auth Module Mutations</h3>
                    <h3>Auth Module State and Getters</h3>
                    <h3>Updating State Values</h3>
                    <h3>Logging Out with Actions</h3>
                    <h3>Separate API Helpers</h3>
                    <h3>Forming the OAuth2 URL</h3>
                    <h3>Initiating the Login Flow</h3>
                    <h3>Wiring in the Auth Module</h3>
                    <h3>Initial OAuth Request</h3>
                    <h3>Extracting the Access Token</h3>

                </div>

            </div>
        </div>
    </div>
</template>
