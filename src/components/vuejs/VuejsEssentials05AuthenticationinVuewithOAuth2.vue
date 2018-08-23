<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h2>Authentication in Vue with OAuth2</h2>
        </div>
        <div class="panel-body">
          <h3>OAuth Overview</h3>
          <p>In the last section we started doing a little bit of a detour away from the AppHeader component to discuss
            the Imgur API. We are going to continue our detour by discussing how we are going to make use of the Imgur
            API to handle authentication inside of our application. The following diagram illustrates the flow of
            authenticating our users through the Imgur API:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-001.png"/>
            <figcaption>Fig 05-001</figcaption>
          </figure>
          <p>So this is a high level overview of the general flow that you and I are going to use. We are making a very
            big assumption that the users of our application already have an Imgur account . You and I are not going to
            have to require users to enter emails or passwords to identify themselves because they will have already
            done that through the Imgur service. So we are going to rely on Imgur's Authentication system to also
            authenticate users inside of our app as well. If you have seen the buttons that say Login with Facebook or
            Login with Google you will have experienced an OAuth flow in action. So applications that show those buttons
            delegate out the process of authenticating the user to some outside service like Facebook, Google, Linked In
            or Imgur.
          </p>
          <p>The process will begin by a user coming to our application and clicking the Login button at which point we
            will forcibly navigate our users over to the Imgr OAuth flow. This means we literally change the Url inside
            the users browser to go to a page on the Imgur website that tells Imgur that we are attempting to
            authenticate the user inside of our application. The user will be prompted with a message that the Image
            Storage application wants to get access to your account for the purposes of authentication. They can either
            allow this or not.
          </p>
          <p>Assuming the user authorizes Imgur to allow access to the Image Store application Imgur will redirect the
            user back to our application - changing the Url back to our application. When the redirect is performed
            Imgur inserts a token at the end of the Url. This is a string of random numbers and letters that defines
            that this application has been given access to this users account and has the ability to perform certain
            actions on the Imgur web site on behalf of the user such as uploading images.
          </p>
          <h3>Imgur API Signup</h3>
          <p>In this section we're going to create a new Imgur account which is going to allow us to sign up for a
            developer set of credentials to work with the Imgur API directly. On the Imgur website click the Signup
            button and provide the required details. This will create a regular user account. To enable a developer
            account with API keys we need to <a href="https://apidocs.imgur.com/">register our application</a> - the
            link to do this is available from the Imgur documentation. Enter the following details:
          </p>
          <table class="table table-striped table-bordered">
            <thead class="thead-dark">
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
          <p>We get a Client ID and Client secret which should be copied to Notepad. The Client ID identifies our
            application to Imgur and the Client Secret allows us to do some more secure actions on the Imgur API.
          </p>
          <h3>Handling App Logic</h3>
          <p>Now we will write the actual code that will let a user navigate over to the Imgur flow, send them back to
            our application with a token and then presumably do some interesting things inside of our application. One
            consideration is where to place all the code for handling this authentication flow.If we think back to our
            VideoBrowser application you'll remember we had the App component, VideoDetail, VideoList, VideoListItem and
            the SearchBar. When it came to state or data inside of our application it was all concentrated inside of the
            App component - so it stored the list of videos and the currently selected video. It was very simple to have
            the App in charge of knowing the currently selected video because it could then very easily communicate that
            down to the VideoDetail and each time the user clicked on a video from the VideoListItem that got
            communicated up to the App. However, as we start to work on this App, things are bit different. The
            following diagram details some of the components:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-002.png"/>
            <figcaption>Fig 05-002.png</figcaption>
          </figure>
          <p>In total we are probably going to end up with fewer components than in the VideoBrowser application.
            However the amount of information that is going to be exchanged between these components is going to be
            dramatically increased.
          </p>
          <p>We are going to have the token which needs to be known by the App component so that it can modify the
            display of the AppHeader. In addition the ImageList will need to know whether the user is signed in and if
            so who they are so that the ImageList can fetch the list of images that have been uploaded by the user. And
            then finally the UploadForm definitely needs to know about the token and wheter the user is logged in or not
            because we have to use that token to actually handle image upload over to the Imgur API. So even though it
            might still sound like all the components are just using pieces of information that can be handled by the
            App component consider if the application was to grow in complexity:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-003.png"/>
            <figcaption>Fig 05-003</figcaption>
          </figure>
          <p>So maybe inside of the app you've got the AppHeader which has some AuthButtons and ProfileImage components.
            Perhaps the UploadForm has some fancy drag and drop functionality or progress bar tied to it that you add to
            an ImageUploader component. Maybe the ImageListItem component shows comments and for each comment we display
            a ProfileImage component as well. If you think about the above component structure and consider how you
            would share whether or not a user was logged in throughout all of these components you can start to see how
            that would be a little bit of a hassle. Almost every single link in the chain in the diagram above would
            need to pass down information about whether or not a user was signed in down to it's child component. A
            better way to store information in our application is to use the Vuex library which we will look at in the
            next section.
          </p>
          <h3>Vuex Introduction</h3>
          <p>So as soon as we start dealing with larger applications that have many different components that need to
            exchange a lot of different information between components we might start to run into some scaling issues if
            we stick to using just the Vue library. To solve this issue of maintaining information in larger
            applications you and I are going to make use of a library called Vuex. You'll recall we spoke briefly about
            that library when we discussed some of the issues that we might encounter whilst creating our application in
            the App Overview section earlier. We will look at what our completed application will look like then we will
            discuss what Vuex is actually doing internally to help us:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-004.png"/>
            <figcaption>Fig 05-004.png</figcaption>
          </figure>
          <p>So in addition to our existing components you and I are going to add the Vuex library to handle the flow
            and updating of information inside of our App. We are going to create two separate modules inside of Vuex.
            The first module is going to be the Auth Module and the second is going to be the Image Module. These
            modules will contain all of the code and data related to their particular purpose. So the Auth Module will:
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
          <p>When we start to locate all of this kind of business logic inside these two modules it means we will be
            writing far less business logic inside of our components which means the component can focus on presenting
            information to the user. The components will still have things like click events inside them but they wont,
            for example, make Ajax requests using Axios.
          </p>
          <h3>Vuex Modules</h3>
          <p>In the last section we started talking about how our application is going to have two separate Vuex modules
            - the Auth Module and the Image Module. In this section we will dive a bit deeper into how these modules
            will be structured and the kind of code we will be adding to them. First off every module that you and I
            create is going to have four separate parts to it:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-005.png"/>
            <figcaption>Fig 05-005</figcaption>
          </figure>
          <p>Instead of giving you some boring definition of what each of the parts do we will go through a very
            practical example of a module. We're going to imagine that we are going to create a Vuex module for handling
            Car inventory at an imaginary dealership. We're going to first start off with state:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-006.png"/>
            <figcaption>Fig 05-006</figcaption>
          </figure>
          <p>state is probably the easiest part to picture in your head and get a sense of what it's really doing for
            us. The state section of a module holds all of the raw data related to this particular module. So in the
            case of a Car Inventory the raw record or most core unit would probably be a Car - probably an object with
            key value pairs describing the year that the car was built, it's make/model, price and other Car related
            details. Inside the state section you and I are going to have a bunch of different records that describe
            some core unit of data inside our application. You can think of this state section as being like a big
            bucket of data. As we start to fetch more records for our application we're just going to continually throw
            them into the big bucket of data we call state. At some point a customer will come into our car dealership
            and say to a salesperson "Hey, I'm looking for budget cars" or "Hey, I'm looking for a sports car". The Car
            salesperson won't want to look at a big list of cars and examine each record for the relevant information.
            To handle the functionality of automatically sorting through records we use getters:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-007.png"/>
            <figcaption>Fig 05-007</figcaption>
          </figure>
          <p>getters are functions that take the entire state object and do some filtering or computation on those
            records. So inside of our Car Inventory module you and I might decide to define some getters to retrieve all
            the cars that are defined as "budget vehicles" or all the cars that are defined as "off road". These are all
            functions that will take all of our records stored in state and return some subset.
          </p>
          <p>getters don't necessarily have to do just a filtering operation - they can be used for any type of
            operation you can possibly imagine. Anything that is going to take our list of records in state and perform
            any type of operation. We could, instead, have some getter defined inside of here called numberOfCars:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-008.png"/>
            <figcaption>Fig 05-008</figcaption>
          </figure>
          <p>Which, because we have six cars currently in state, might just return the number six. As we said, the
            getters do not have to be used for just filtering operations. They can be used for any type of operation we
            might want to do on our records stored inside of state. getters can be used to simply say return all the
            cars or all the records we have stored inside state. So we could define a getter called allCars and when we
            call that function it would simply return all the records we have stored inside of our state object. It is
            worth pointing out that state and getters are closely related - so we've got the state defined and we've got
            the set of getters that somehow operate on that state.
          </p>
          <p>Now, the next two parts of a Vuex module - mutations and actions have a somewhat similar relationship to
            the one that is shared by state and getters. With Mutations, we think of very explicit individual single
            step ways in which you and I would want to change the data stored inside of the state. In the context of a
            car dealership, some ways that we might operate on the state are:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-009.png"/>
            <figcaption>Fig 05-009</figcaption>
          </figure>
          <p>All the above are single operations that might occur on the list of cars in state. The single operations
            are called Mutations. A mutation is a function that is going to operate on our list of records stored inside
            of state and make some small change. For example, we might call the setCarAsSold mutation on the Ford F150
            which will set it as sold preventing any one else from purchasing it. Or maybe we would define a mutation
            that receives a new car from a manufacturer and adds it to our inventory. So we would call addCarToInventory
            that takes one individual car and adds it into our state object. We obviously attempt to name the mutations
            so they indicate what their purpose is.
          </p>
          <p>As we discussed, our last part, actions have a very close relationship to mutations. actions allow us to
            define functions that assemble together multiple mutations to make some intelligent change to the list of
            records that are stored inside our state. For example, we might define an action as a function called
            SellCar:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-010.png"/>
            <figcaption>Fig 05-010</figcaption>
          </figure>
          <p>Anytime we sell a car chances are we are going to perform several different Mutations to our list of
            records stored inside of the state object. So an action is a function that assembles together multiple
            mutations and it calls them all in some sequence. It isn't mandatory for an action to call multiple
            mutations - we could define an action that does just one single mutation:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-011.png"/>
            <figcaption>Fig 05-011.png</figcaption>
          </figure>
          <p>However, in general, the idea behind actions is that we're going to take multiple mutations and call them
            all in some distinct order.
          </p>
          <h3>Connecting Vuex to Vue</h3>
          <p>In the last section we had a long discussion about Vuex modules. We are now going to create the Auth
            module. We are also going to perform some one-time setup of Vuex within our project . After that is complete
            we can add as many modules as we want to. Create a new folder in the <span class="filename">src</span>
            directory called <span class="filename">store</span>. This folder is going to contain all of our Vue related
            code. Create a new file in the <span class="filename">store</span> directory called <span class="filename">index.js</span>.
            This is way the initial setup of Vue is going to take place. Add the following code:
          </p>
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
            class="prettyprint">use</code> command to tell Vue that we want to use the Vuex library. Vuex can be used
            with other libraries. Next we create a new Vuex store and pass an object called <code class="prettyprint">modules</code>.
            As we create more modules we will register them with Vuex by adding them to the modules object.
          </p>
          <p>As we've been working on Vue we've been creating components and we've said several times that those
            components have a relationship to Vue instances. We think of the Vue instances as being like instances of a
            class. It is a similar story with the Vuex store. The store is an overarching term for a collection of
            modules that have been assembled together and can then be interfaced with from our Vue code. We are now
            going to add code to our <span class="filename">main.js</span> and import our newly created store and hook
            it up to the Vue instance:
          </p>
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
          <p>We don't need to add the <code class="prettyprint">/index</code> because whenever we have a file called
            <span class="filename">index.js</span> we can just import the directory that it is contained in and Webpack
            will just assume that we are looking for the <span class="filename">index.js</span> file inside. Next we
            pass the store into the Vue instance. Again, because the key and the value are identically named we can use
            the condensed form of just <code class="prettyprint">store</code> instead of <code class="prettyprint">store:
              store,</code>.
          </p>
          <p>Back in <span class="filename">index.js</span> the statement <code class="prettyprint">Vue.use
            (Vuex)</code> tells Vue that it needs to use the Vuex library, it kinds of wires the two together and let's
            the two know that they exist. But an additional part to that is providing the store to the Vue instance
            which is the purpose of passing in the store when we create the new Vue instance in <span
              class="filename">main.js</span>.
          </p>
          <h3>Initial Auth Module Design</h3>
          <p>We are now going to start working on our Auth module which will contain all the code related to
            Authentication. Create a new directory called <span class="filename">modules</span> in the <span
              class="filename">store</span> directory. Create a new file called <span class="filename">auth.js</span>.
            Let's briefly discuss the design of this module.</p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-015.png"/>
            <figcaption>Fig 05-015</figcaption>
          </figure>
          <p>Let's begin by doing a quick review of the overall authentication process. As discussed, we will be making
            use of Imgur's OAuth flow. So it all begins with the user clicking on the Log In button:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-016.png"/>
            <figcaption>Fig 05-016</figcaption>
          </figure>
          <p>We then navigate the user to the Imgur OAuth flow, the user gives our app permission to access their Imgur
            account, the user comes back to our application with a token generated by Imgur (the token contains the
            information required to access the users account). The token is a very critical piece of information to our
            application - it's related to our actual authentication process. For this reason we will add it directly to
            our state object:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-017.png"/>
            <figcaption>Fig 05-017</figcaption>
          </figure>
          <p>Now the chances are that when our application first starts up and the user has not logged in we will almost
            definitely not have a token when we get started. Initially we will set the token to <code
              class="prettyprint">null</code> .
          </p>
          <p>So that takes care of our initial design of state. You might be surprised but there's really not a lot of
            other very root core variables in here tied to our core authentication process. You might be thinking that
            the API key or Client Id that we got when we signed up to Imgur might be classed as a piece of state.
            However the Client Id is actually a constant inside of our application which will never change.
          </p>
          <p>So the next thing to think about is getters. Remember getters allow us to do some type of computation on
            our state object. That saves us the time of having to rerun the computation inside of some individual
            component. So as we look at the application design we can start to think about where we want to make use of
            the information stored inside of the Auth module. In order to determine whether the user is logged in or not
            we will create a getter function called isLoggedIn:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-018.png"/>
            <figcaption>Fig 05-018</figcaption>
          </figure>
          <p>This function will look at our state object and check for the presence of a token. This will indicate if
            the user has successfully gone through our authentication process - <code class="prettyprint">null</code>
            means the user has not performed the authentication process and is not logged in. Ok I can't think of any
            other getter that we might want to define around our authentication module.
          </p>
          <h3>Auth Module Mutations</h3>
          <p>Next we will discuss the mutations and actions that we might want to add into our Auth module. We will
            begin with the mutations section - remember mutations are functions that modify our state in some very
            particular fashion. They're intended to one very exact singular job and nothing else related to our state
            object. In our case we have only one value inside of our state and it's going to only ever be <code
              class="prettyprint">null</code> or an actual <code
              class="prettyprint">token</code> . As far as changing this very singular value I think that we really only
            need exactly one mutation. Let's call this mutation <code class="prettyprint">setToken</code> - which will
            be a small function that is intended to only update the value of our <code class="prettyprint">token</code>
            object inside the <code class="prettyprint">state</code> object:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-019.png"/>
            <figcaption>Fig 05-019</figcaption>
          </figure>
          <p>In the case of actions we are going to have a little bit more stuff going on. So let's visit our OAuth flow
            and think through the actual process:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-020.png"/>
            <figcaption>Fig 05-020.png-</figcaption>
          </figure>
          <p>Remember the purpose of actions is to call a mutation at a very particular time or call multiple mutations
            in a very particular order. The only times I can think of where we would want to call that mutation at all
            is when we come back from the Imgur API to our application with the <code
              class="prettyprint">token</code> inside the Url. At that point in time we're going to want to take that
            <code class="prettyprint">token</code> out of the Url and call the <code class="prettyprint">setToken</code>
            mutation. So we will call our action <code class="prettyprint">finalizeLogin</code> :</p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-021.png"/>
            <figcaption>Fig 05-021</figcaption>
          </figure>
          <p>We use finalize because this is really the last step in our authentication process. So the <code
            class="prettyprint">finalizeLogin</code>

            action will get the <code class="prettyprint">token</code> that was provided to us by Imgur and call the
            <code class="prettyprint">setToken</code> mutation. I think there will be one more action that we will want
            in our application - <code class="prettyprint">logout</code> :</p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-022.png"/>
            <figcaption>Fig 05-022</figcaption>
          </figure>
          <p>So if the presence of a <code class="prettyprint">token</code> inside of our <code class="prettyprint">state</code>
            object indicates whether or not the user is logged in we can log a user out by setting the <code
              class="prettyprint">token</code> to be <code class="prettyprint">null</code>. So the <code
              class="prettyprint">logout</code> function also needs to call <code class="prettyprint">setToken</code>
            and make sure that it attempts to update the <code class="prettyprint">token</code> value in <code
              class="prettyprint">state</code> to be <code
              class="prettyprint">null</code> - hence the arrow in the diagram. We will add one more additional action
            called <code class="prettyprint">login</code> which will be responsible for kicking off the initial
            authentication flow:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-023.png"/>
            <figcaption>Fig 05-023</figcaption>
          </figure>
          <p>The <code class="prettyprint">login</code> action is not going to call a mutation or anything like that. We
            are just putting the <code class="prettyprint">login</code> function in the actions section of our module
            because it makes a lot of sense to group all the authentication stuff together. That concludes our initial
            Auth module design</p>
          <h3>Auth Module state and getters</h3>
          <p>We are now going to work on adding code to the <span class="filename">auth.js</span> file we created
            earlier. Inside this file we are going to define four separate objects which will map to one of the
            different pieces of our module that we've been discussing in the last couple of sections:
          </p>
          <figure>
<pre class="prettyprint">const state = {

};

const getters = {

};

const actions = {

};

const mutations = {

};</pre>
            <figcaption>Fig 05-024</figcaption>
          </figure>
          <p>We will now add a couple of properties to each of these four objects to map up against the design that we
            just created in the last section. We'll get started by working on <code class="prettyprint">state</code>
            with the <code class="prettyprint">token</code> property with an initial value of <code class="prettyprint">null</code>
            :
          </p>
          <figure>
<pre class="prettyprint">const state = {
    token: null
};</pre>
            <figcaption>Fig 05-025</figcaption>
          </figure>
          <p>Next we will look at the getters section. The only getter that we're going to have for this module is <code
            class="prettyprint">isLoggedIn</code>. Remember that, in this case, these are functions which are going to
            take our entire <code class="prettyprint">state</code> object do some computation on it and then return if
            from the function:
          </p>
          <figure>
<pre class="prettyprint">const getters = {
    isLoggedIn: (state) =&gt; {
    }
};</pre>
            <figcaption>Fig 05-026</figcaption>
          </figure>
          <p>This function is going to be automatically called with the entire <code class="prettyprint">state</code>
            object. One thing I want to clarify is that when I write <code class="prettyprint">state</code> in the <code
              class="prettyprint">isLoggedIn</code> function it is an argument to the function. It is not the same
            variable as <code class="prettyprint">state</code> object we created earlier. As we said, to determine
            whether a user is logged in we are going to look at the value of the <code
              class="prettyprint">token</code>

            property in the state object:
          </p>
          <figure>
<pre class="prettyprint">const getters = {
    isLoggedIn: (state) =&gt; {
        return !!state.token
    }
};</pre>
            <figcaption>Fig 05-027</figcaption>
          </figure>

          <p>The <code class="prettyprint">!!</code> syntax is an easy way to turn a variable into a boolean. The two
            possible values of <code class="prettyprint">token</code> are going to be either <code class="prettyprint">null</code>
            or a string that has a random series of numbers and letters in it (the actual <code class="prettyprint">token</code>
            )
          </p>
          <p>The boolean equivalent of <code class="prettyprint">null</code> is <code class="prettyprint">false</code>
            so:</p>
          <figure>
            <pre class="prettyprint">!!null</pre>
            <figcaption>Fig 05-028</figcaption>
          </figure>
          <p>Will return <code class="prettyprint">false</code>. However the following statement:</p>
          <figure>
            <pre class="prettyprint">!!'jaij3i2o235o2i3j5io2oa'</pre>
            <figcaption>Fig 05-029</figcaption>
          </figure>
          <p>Will return <code class="prettyprint">true</code>. We an make the function more concise by using the ES2015
            arrow function syntax:</p>
          <figure>
<pre class="prettyprint">const getters = {
    isLoggedIn: state =&gt; !!state.token
};</pre>
            <figcaption>Fig 05-030</figcaption>
          </figure>
          <p>We have the function name of <code class="prettyprint">isLoggedIn</code> , the argument that we are passing
            (our <code
              class="prettyprint">state</code> object), our arrow <code class="prettyprint">=&gt;</code>, and then the
            flip of the <code class="prettyprint">state</code> <code
              class="prettyprint">token</code> to return a boolean.
          </p>
          <h3>Updating state Values</h3>
          <p>We've put together our <code class="prettyprint">state</code> and <code class="prettyprint">getters</code>
            objects. We're now going to look at the <code class="prettyprint">mutations</code> object. Remember our
            <code class="prettyprint">mutations</code> object has exactly one mutation assigned to it - this is going to
            be a function called <code
              class="prettyprint">setToken</code> which will try to update the value of <code
              class="prettyprint">token</code> inside of our <code class="prettyprint">state</code> object. The <code
              class="prettyprint">setToken</code> function can be called from either <code class="prettyprint">finalizeLogin</code>
            or <code
              class="prettyprint">logout:</code>.
          </p>
          <figure>
<pre class="prettyprint">const mutations = {
    setToken: (state, token) =&gt; {
        state.token = token;
    }
};</pre>
            <figcaption>Fig 05-031</figcaption>
          </figure>
          <p>The <code class="prettyprint">setToken</code> function is always called with one initial first argument and
            then possibly some additional arguments. So you are always guaranteed to get the argument <code
              class="prettyprint">state</code> as the very first argument. The second argument will depend on the which
            function calls the <code class="prettyprint">setToken</code> function.
          </p>
          <p>Inside the <code class="prettyprint">setToken</code> function we are going to update our <code
            class="prettyprint">state</code> object. In reality this doesn't involve any API calls or anything like
            that, we just literally update the values stored inside of our <code class="prettyprint">state</code>
            object. That's pretty much it for mutations.</p>
          <h3>Logging Out with Actions</h3>
          <p>We will now look at the <code class="prettyprint">actions</code> object which, as you may remember, is
            going to have three functions tied to it: <code class="prettyprint">login</code> , <code
              class="prettyprint">finalizeLogin</code> , <code
              class="prettyprint">logout</code> . Let's start with <code class="prettyprint">logout</code> :</p>
          <figure>
<pre class="prettyprint">const actions = {
    logout: ({ commit }) =&gt; {
        commit('setToken', null);

}</pre>
            <figcaption>Fig 05-032</figcaption>
          </figure>
          <p>The actions we create are going to have a very similar method signature to what we discussed with
            mutations. So the first argument to the actions is always going to be guaranteed to be some particular value
            (that we will discuss in just a second) and then any additional arguments will be optionally provided.
          </p>
          <p>So the first argument inside of every single action is going be an object that has a couple of different
            properties assigned to it that allow us to work with the Vuex instance that we are contained in. We are
            interested in the <code class="prettyprint">commit</code> property. The <code
              class="prettyprint">commit</code> property is a function which is used to call the mutations we have
            defined. We do not call mutations in the following way:
          </p>
          <figure>
            <pre class="prettyprint">mutations.setToken // bad !!</pre>
            <figcaption>Fig 05-033</figcaption>
          </figure>
          <p>To call a mutation we write <code class="prettyprint">commit('mutationName');</code>. Remember that in the
            case of our <code class="prettyprint">logout</code> action to logout a user all we need to do is set our
            <code
              class="prettyprint">token</code> in <code class="prettyprint">state</code> to <code
              class="prettyprint">null</code> :
          </p>
          <figure>
            <pre class="prettyprint">commit('setToken', null);</pre>
            <figcaption>Fig 05-034</figcaption>
          </figure>
          <p>The first argument is the mutation name. The second argument - <code class="prettyprint">null</code> is
            going to be the <code class="prettyprint">token</code> argument that get's provided to the mutation. It may
            seem unnecessary to have the additional layer of an action here just to call the mutation - why don't we
            just call <code class="prettyprint">setToken</code> directly ourselves? Remember the idea behind an action
            is we might want to call multiple mutations from inside of one action or we might want to say make an Ajax
            request where we might want to perform some asynchronous operation. Even though our <code
              class="prettyprint">logout</code> action is very simple we might eventually have actions that span many
            different lines of code and make many different network requests, calling many different mutations. So the
            idea is that we try to stuff as much complexity inside our Vuex store into these <code class="prettyprint">actions</code>
            . We can then leave our <code class="prettyprint">mutations</code> , <code
              class="prettyprint">state</code> and <code class="prettyprint">getters</code> a little bit more simple and
            straightforward. We can't really test this action yet because we don't even have the ability to login to our
            application. We will resolve this shortly.
          </p>
          <h3>Separate API Helpers</h3>
          <p>We are now going to work on the <code class="prettyprint">login</code> action. The Imgur documentation
            contains a section on <a
              href="https://apidocs.imgur.com/#authorization-and-oauth">Authorization and OAuth</a>. To access a user's
            account we have to get the user to authorize our application so we can get an access <code
              class="prettyprint">token</code> . To do this we point a browser (pop-up, or full page redirect if needed)
            to a URL and include a set of query string parameters.
          </p>
          <figure>
            <pre class="prettyprint">https://api.imgur.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&amp;response_type=REQUESTED_RESPONSE_TYPE&amp;state=APPLICATION_STATE</pre>
            <figcaption>Fig 05-035</figcaption>
          </figure>
          <p>We have the route url with a path of <code class="prettyprint">oauth2/authorize</code> . After that we have
            a couple of parameters which we need to specify:
          </p>
          <ul>
            <li><code class="prettyprint">client_id</code> : The Id we received when we signed up for the Imgur API</li>
            <li><code class="prettyprint">response_type</code> : Now deprecated. There used to be a couple of different
              ways of getting information back from Imgur API and then performing actions on the users behalf. Now <code
                class="prettyprint">token</code> is the only option.
            </li>
            <li><code class="prettyprint">state</code> : Gives the ability to optionally pass in some information about
              this particular user as they are going through the OAuth flow.
            </li>
          </ul>
          <p>Next we will add the code to redirect the user to the above Url. Bear in mind that later we will create an
            Images module:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-036.png"/>
            <figcaption>Fig 05-036</figcaption>
          </figure>
          <p>Chances are that the Images module will also need to work with the Imgur API. If we were to locate all our
            logic directly with the API inside these actions then we're probably going to end up with a lot of
            duplicated code in the two (or more) modules shown above. I suggest we create a new file - so this is not a
            separate Vuex module or anything - just a separate file called <code class="prettyprint">imgur.js</code> .
            We will add all the code to make network requests and work with the Imgur API etc. to this file. The <code
              class="prettyprint">login</code> and <code class="prettyprint">fetchImages</code> functions can then call
            the code in that file instead:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-037.png"/>
            <figcaption>Fig 05-037</figcaption>
          </figure>
          <p>This will dramatically reduce the amount of networking related code that we would otherwise be duplicating.
          </p>
          <h3>Forming the OAuth2 URL</h3>
          <p>Create a new folder under the <code class="prettyprint">src</code> directory called <code
            class="prettyprint">api</code> and add a new file to this directory called <code class="prettyprint">imgur.js</code>.
          </p>
          <p>So the first thing we need to do is setup some function inside of here that will kick off our login
            process. To achieve this we will create an object. We will add a couple of properties to this object over
            time.
          </p>
          <figure>
<pre class="prettyprint">export default {
    login() {

    }
};</pre>
            <figcaption>Fig 05-037</figcaption>
          </figure>
          <p>Define the Imgur ClientId that we were allocated when we created our Imgur account as a constant (hence the
            capitals) to enable it to be used by several different functions:
          </p>
          <figure>
            <pre class="prettyprint">const CLIENT_ID = 'c3feb8623a2803b';</pre>
            <figcaption>Fig 05-038</figcaption>
          </figure>
          <p>Next we define a helper variable to hold the root Url. This will save us lots of retyping the same Url over
            and over again:
          </p>
          <figure>
            <pre class="prettyprint">const ROOT_URL = 'https://api.imgur.com';</pre>
            <figcaption>Fig 05-039</figcaption>
          </figure>
          <p>Inside the <code class="prettyprint">login</code> function add the following code:</p>
          <figure>
<pre class="prettyprint">import qs from 'qs';

const CLIENT_ID = 'c3feb8623a2803b';
const ROOT_URL = 'https://api.imgur.com';

export default {
    login() {
        const querystring = {
            client_id: CLIENT_ID,
            response_type: 'token'
        };

        window.location = `${ROOT_URL}/oauth2/authorize?${qs.stringify(querystring )}`;
    }
};</pre>
            <figcaption>Fig 05-040</figcaption>
          </figure>
          <p>At the top of the file we import the qs library that we discussed in a (much) earlier section. We create a
            template string by using the back tick <code class="prettyprint">`</code> character. We first add the <code
              class="prettyprint">ROOT_URL</code> and append the <code class="prettyprint">/oauth2/authorize?</code> the
            question mark indicates the start of the query string. We use the <code class="prettyprint">stringify</code>
            function and pass in the <code class="prettyprint">querystring</code> constant. We assign the expression we
            just defined to <code
              class="prettyprint">window.location</code> which will redirect the user's browser to the location
            specified.
          </p>
          <h3>Initiating the Login Flow</h3>
          <p>Now that we've created this <code class="prettyprint">login</code> function we need to make sure we have
            the ability to call it from within our Auth module. In <span class="filename">auth.js</span> we need to
            import our helper file:</p>
          <figure>
            <pre class="prettyprint">import api from '../../api/imgur';</pre>
            <figcaption>Fig 05-041</figcaption>
          </figure>
          <p>So the <code class="prettyprint">api</code> variable we just declared in the <code class="prettyprint">import</code>
            statement above is now this entire object:
          </p>
          <figure>
<pre class="prettyprint">login() {
        const querystring = {
            client_id: CLIENT_ID,
            response_type: 'token'
        };

        window.location = `${ROOT_URL}/oauth2/authorize?${qs.stringify(querystring )}`;
    }</pre>
            <figcaption>Fig 05-042</figcaption>
          </figure>
          <p>So one variable or one function on the <code class="prettyprint">api</code> object is the <code
            class="prettyprint">login</code> function. Next we will create a new action called <code
            class="prettyprint">login</code> in the <code class="prettyprint">auth</code> module to kick off the actual
            login attempt. This action will call the api <code class="prettyprint">login</code> function:
          </p>
          <figure>
<pre class="prettyprint">const actions = {
    login: () =&gt; {
        api.login();
    },
    logout: ({ commit }) =&gt; {
        commit('setToken', null);
    }
};</pre>
            <figcaption>Fig 05-043</figcaption>
          </figure>
          <p>As soon as we call <code class="prettyprint">api.login</code> it's going to cause our browser to
            automatically navigate away from our application. We can't immediately test this because there are one or
            two last little steps we have to perform. At this point in time we have created our Auth module inside the
            <span class="filename">auth.js</span> file but we have not actually hooked this file up to anything inside
            of our application. We have not connected this module, we've not connected <code
              class="prettyprint">state</code> , <code
              class="prettyprint">getters</code> , <code class="prettyprint">actions</code> to anything inside of our
            application yet.
          </p>
          <h3>Wiring in the Auth Module</h3>
          <p>We are now going to wire up the auth module. Inside the auth module add an <code
            class="prettyprint">export</code> statement to the bottom of the file to export our <code
            class="prettyprint">state</code> object, <code
            class="prettyprint">getters</code>, <code class="prettyprint">actions</code> and <code class="prettyprint">mutations</code>
            :
          </p>
          <figure>
<pre class="prettyprint">export default {
    state,
    getters,
    actions,
    mutations
};</pre>
            <figcaption>Fig 05-044</figcaption>
          </figure>
          <p>Again because the keys and values are identical we use the ES 2015 shorthand syntax. One thing to keep in
            mind here is that the names of each of these objects are very important because we specifically want to have
            a key called <code class="prettyprint">state</code> that contains our <code
              class="prettyprint">state</code> object.
          </p>
          <p>Now that we've exported those four pieces from the auth module we're going to open up our <span
            class="filename">index.js</span> file inside of our <span class="filename">store</span> directory and wire
            it up:
          </p>
          <figure>
<pre class="prettyprint">import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth
    }
});</pre>
            <figcaption>Fig 05-045</figcaption>
          </figure>
          <p>Firstly we import the auth module. Next we add the auth module to the <code
            class="prettyprint">modules</code> object. One thing that's key to keep in mind here is that whatever name
            or key that you use inside the <code class="prettyprint">modules</code> object is going to affect how you
            actually access data from within your Vue components - we use a key of <code class="prettyprint">auth</code>
            and again because the key and value are identical we condense it down to <code
              class="prettyprint">auth</code> .
          </p>
          <p>The above code wires up our auth module to our Vuex instance. Remember that back inside of our <span
            class="filename">main.js</span> file we then took that instance that we created:
          </p>
          <code class="prettyprint">import store from './store';</code>
          <p>and we hooked it up to Vue:</p>
          <figure>
<pre class="prettyprint">new Vue ({
    store,</pre>
            <figcaption>Fig 05-046</figcaption>
          </figure>
          <p>Also remember that back inside the <span class="filename">index.js</span> file we also did that <code
            class="prettyprint"> Vue.use(Vuex);</code> statement. This was like the initial handshake or the initial
            communication and then we followed that up by passing our store into a Vue instance and that's what actually
            followed up on that communication and said ok here's all the <code class="prettyprint">data</code>, <code
              class="prettyprint">actions</code>, <code class="prettyprint">mutations</code> that you need to be aware
            of.
          </p>
          <p>The auth module is complete. The last thing that we have to do is make sure that there is some component
            inside of our application that actually attempts to call that <code class="prettyprint">login</code> action
            we just created.
          </p>
          <h3>Initial OAuth Request</h3>
          <p>To enable us to invoke the login attempt that we've now defined inside of our <code class="prettyprint">login</code>
            action in the Auth module we have to do one last piece of configuration to tell our Vue application about
            these actions we've defined inside of the Vuex module:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-047.png"/>
            <figcaption>Fig 05-047.png</figcaption>
          </figure>
          <p>At the top of the figure we have a diagram of our application. At this point we have only created the App
            and the AppHeader. We want the AppHeader to attempt to call the <code class="prettyprint">login</code>
            action any time a user clicks on the Login button that will eventually exist inside there. Anytime we want
            to access a Vuex module and update some data or cause some change inside of our application we're going to
            wire up an action to our Vue component:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-048.png"/>
            <figcaption>Fig 05-048</figcaption>
          </figure>
          <p>So we're going to form a connection between the actions that we've defined inside of our auth module to the
            AppHeader component. At some point in time we also want to make sure that the AppHeader has the ability to
            figure out what set of buttons it should be showing to the user. In other words make sure that the AppHeader
            knows whether or not the user is logged in. That's going to be the purpose of the getter properties that we
            defined. So we will eventually wire up that set of getters defined inside of our auth module to the
            AppHeader component as well:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-049.png"/>
            <figcaption>Fig 05-049</figcaption>
          </figure>
          <p>To recap, we call actions to change data and we call getters to retrieve data from a Vuex module. With that
            in mind let's now open up our AppHeader component and figure out how we connect an <code
              class="prettyprint">action</code> to the AppHeader. This process always involves the exact same sequence
            of actions. Inside the <code
              class="prettyprint">script</code> tag we will import a Vuex helper:
          </p>
          <figure>
            <pre class="prettyprint">import { mapActions } from 'vuex';</pre>
            <figcaption>Fig 05-050</figcaption>
          </figure>
          <p><code class="prettyprint">mapActions</code> is a function that will automatically connect different actions
            that we have created inside of our modules to an actual component instance - like our AppHeader. So to
            actually take that <code class="prettyprint">login</code> action that we defined and wire it up to our
            component we are going to connect it as a method.
          </p>
          <p>Remember that <code class="prettyprint">methods</code> are inside of components. We use <code
            class="prettyprint">methods</code> to somehow instigate change or react to user events. So in the context of
            <code class="prettyprint">actions</code> that makes a lot of sense. Methods change things inside of our
            application and as we just discussed we call methods to modify data so the marriage between a method and a
            component and an action inside of a module makes a lot of sense. In <code
              class="prettyprint">AppHeader.vue</code> add the following code to the component definition:</p>
          <figure>
<pre class="prettyprint">&lt;script&gt;
    import { mapActions } from 'vuex';

    export default {
        name: 'AppHeader',
        methods: mapActions(['login'])
    };
&lt;/script&gt;
</pre>
            <figcaption>Fig 05-051</figcaption>
          </figure>
          <p>We add a <code class="prettyprint">methods</code> property to our default export and call the <code
            class="prettyprint">mapActions</code> function. We to pass in an array of strings to this function that
            lists all the different modules that we've hooked up to our Vuex instance that we want to somehow import
            into this component. At this point the only action that we want to hookup is <code
              class="prettyprint">login</code>
            <figure>
              <pre class="prettyprint">mapActions('login')</pre>
              <figcaption>Fig 05-051A</figcaption>
            </figure>
          <p>That's it, that's how we connect an action to a component. So now anywhere within the <code
            class="prettyprint">AppHeader</code> component or it's template we can freely call the <code
            class="prettyprint">login</code> action. We wil look at that in just a moment. Before we do, in the official
            Vuex documentation you will see a slightly different syntax that looks like this:
          </p>
          <figure>
            <pre class="prettyprint">..mapActions(['login'])</pre>
            <figcaption>Fig 05-052</figcaption>
          </figure>
          <p>To be clear, the above code and the code we just wrote is operationally completely identical. The reason
            that you see the <code class="prettyprint">...</code> is that it takes all the different actions that we are
            trying to pull out of the Vuex module and it adds them to the method object. Using this syntax allows use to
            define other methods on this component as well. So maybe we would want another method called <code
              class="prettyprint">onLogonClick ()</code> that could be called whenever someone clicked on our
            ImageStorage logo:
          </p>
          <figure>
                    <pre class="prettyprint">methods: {
    ...mapActions(['login']),
    onLogoClick() {
    }</pre>
            <figcaption>Fig 05-053</figcaption>
          </figure>
          <p>When you see this alternate <code class="prettyprint">...</code> syntax it is being used just so you can
            add in other methods as well. If you do not have any other methods or anything like the <code
              class="prettyprint">onLogoClick()</code> method then you don't need to do the <code class="prettyprint">...</code>
            syntax or the wrapping object.
          </p>
          <p>We've now mapped up this <code class="prettyprint">login</code> action to our AppHeader component the last
            thing we have to do is actually call it. We can call this action from inside any method that we define, any
            lifecycle method (which we've yet to discuss) or we can call it as part of an event handler placed on a
            template which is what we're going to do in this case.
          </p>
          <p>Add the following code to the AppHeader template:</p>
          <figure>
                    <pre class="prettyprint">&lt;template&gt;
    &lt;div class=&quot;ui secondary pointing menu&quot;&gt;
        &lt;a href=&quot;/&quot; class=&quot;active item&quot;&gt;
            Image Storage
        &lt;/a&gt;

        &lt;div class=&quot;right menu&quot;&gt;
            &lt;a href=&quot;#&quot; class=&quot;ui item&quot; @click=&quot;login&quot;&gt;
                Login
            &lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 05-054</figcaption>
          </figure>
          <p>So, again, this is an extremely repeatable process. To make sure a component has access to an action and
            can call it we always use the same sequence:
          </p>
          <ul>
            <li>Import <code class="prettyprint">mapActions</code>
            </li>
            <li>Define the <code class="prettyprint">methods</code> object</li>
            <li>Setup <code class="prettyprint">mapActions</code> by passing in an array with a list of strings that
              define all the actions you want to be available to this component.
            </li>
          </ul>
          <p>One quick thing that might be surprising - notice how when we wrote <code class="prettyprint">
            mapActions</code> and passed the <code class="prettyprint">login</code> action we did not have to specify
            the <code class="prettyprint">Auth</code> module. There is nothing in the statment that says to look inside
            the Auth module and find the login function. Vuex just automatically looks through all the actions on all
            the different modules to find one called <code class="prettyprint">login</code>.
          </p>
          <p>Refresh the browser and and click the Login button. At this point you should notice the Url changes to
            <code class="prettyprint">https://api.imgur.com</code> with the clientId and response_type specifed in the
            querystring (thanks to our use of the qs module).
          </p>
          <p>So now we're being prompted to grant access to the application called Vue Image Storage App. I logged in
            with an actual Imgur account and clicked. This will take you to stage 2 of our OAuth flow. If you break down
            the url:</p>
          <figure>
            <pre class="prettyprint">http://localhost:8080/oauth2/callback</pre>
            <figcaption>Fig 05-055</figcaption>
          </figure>
          <p>This is the exact callback Url we specified.</p>
          <figure>
            <pre class="prettyprint">#access_token=00ed3cd52279d5673ae039d326aea44f42729071</pre>
            <figcaption>Fig 05-056</figcaption>
          </figure>
          <p>The access_token is essentially total power (within reason) over this users account. It allows us to post
            information, delete posts, make comments, just about anything you can imagine on behalf of the user. So the
            access_token is extremely important and it's the same <code class="prettyprint">token</code> that we've been
            talking about all along with respect to our module.
          </p>
          <figure>
            <pre class="prettyprint">&expires_in=315360000</pre>
            <figcaption>Fig 05-057</figcaption>
          </figure>
          <p>expires_in specifies when the token expires</p>
          <figure>
            <pre class="prettyprint">&token_type=bearer</pre>
            <figcaption>Fig 05-058</figcaption>
          </figure>
          <p>token_type of bearer dictates how we provide this token back to the imgur API when we want to make a
            request on the user's behalf. We'll see an example of this in a short while.
          </p>
          <figure>
            <pre class="prettyprint">&amp;refresh_token=27660c25c3430b2ab26dea766a24b71276ed158e</pre>
            <figcaption>Fig 05-059</figcaption>
          </figure>
          <p>refresh_token allows us to request another token after the initial token expires. Now we're not going to
            this in our application because it's a little bit out of scope of what we're trying to do.
          </p>
          <figure>
            <pre class="prettyprint">&amp;account_username=maxsage</pre>
            <figcaption>Fig 05-060</figcaption>
          </figure>
          <p>account_username specifies the account username</p>
          <figure>
            <pre class="prettyprint">&amp;account_id=91444873</pre>
            <figcaption>Fig 05-061</figcaption>
          </figure>
          <p>account_id specifies the account id</p>
          <p>We now have access to the access_token which allows us to perform actions on behalf of the user. There's
            just one issue. Notice how the Url contains all this very important information that we want to get access
            to and remember we also said that during our initial Auth module design that whenever a user gets redirected
            back to our application we want to call the <code class="prettyprint"> finalizeLogin</code> <code
              class="prettyprint">action</code> which takes the token out of the Url and calls the <code
              class="prettyprint">setToken</code> mutation with it. We will cover this in the next section.
          </p>
          <h3>Extracting the Access Token</h3>
          <p>We've now been successfully redirected back to our application from the OAuth flow on the Imgur API with
            the access_token present in the Url. We need to somehow extract the token out of the Url and send it back
            over to our <code class="prettyprint">finalizeLogin</code> action inside of our Auth module. We have not yet
            created the <code class="prettyprint">finalizeLogin</code> action but it was the one that we said we were
            going to create to take the token and update the <code class="prettyprint">token</code> in our <code
              class="prettyprint">state</code> object in <code class="prettyprint">auth.js</code>. That's the next big
            challenge we're going to have. Getting the token out of the Url is not a big challenge
          </p>
          <p>Inside the browser we can write out <code class="prettyprint">window.location</code> which will print out
            some information about the current Url we are visiting. So inside that <code class="prettyprint">window.location</code>
            object is a hash property which contains the entire string that appears after the <code class="prettyprint">#</code>
            character in the Url including the access_token. We could definitely write a little bit of logic to somehow
            extract the required string out of the hash. The challenge is where to place the code and ensuring that the
            code only runs when we get redirected back to our application from the Imgur OAuth flow. I don't want the
            code to run when a user is visiting, for example, <code class="prettyprint">http://localhost:8080</code> .
          </p>
          <p>To achieve this we will be making use of the Vue router library that we installed much earlier inside of
            our project. The Vue router library is intended to do different things inside of our application based on
            the Url that the user is visiting in our application. So we're going to use that Vue library to look at the
            Url and if the Url has a path of <code class="prettyprint">/oauth2/callback</code> then at that point we
            will run the code to try to get the access_token and call the appropriate action inside of our auth module.
            The following diagram illustrates how navigation is going to work inside of our project:</p>
          <figure>
            <img src="./images/vuejsessentials/Fig05-062.png"/>
            <figcaption>Fig 05-062.png</figcaption>
          </figure>
          <p>Inside our project we are going to have a couple of different routes. These routes are going to be defined
            as logic pointing at the Vue router library. We're going to create the Vue router library inside of our
            project and then we're going to instruct it about what components it should show on the screen based on the
            current route we are visiting. On the right hand side of the above diagram notice that we have not yet
            created the ImageList or UploadForm component but you can imagine what the purpose of each of those is.
          </p>
          <p>So if a user is visiting the root route of our application we probably want to show them a list of all the
            images they have uploaded which means displaying the ImageList component. If they visit a route of something
            like <code class="prettyprint">/upload</code> we will show them an UploadForm component that will allow them
            to upload new images. Finally, the bit that's relevant to us right now, if a user visits <code
              class="prettyprint">/oauth2/callback/</code> route (which we arrive at when we come back from Imgur) then
            we will show the AuthHandler component. The AuthHandler component that you and I are going to create is not
            going to have a lot of template logic in it. It wont display anything on the screen as such. Instead, it's
            purpose will be to extract the token from the Url and call the <code class="prettyprint">
              finalizeLogin</code> action.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
