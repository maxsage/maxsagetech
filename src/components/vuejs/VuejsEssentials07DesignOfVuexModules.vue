<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>Design of Vuex Modules</h2>
                </div>
                <div class="panel-body">
                    <h3>Image Module Design</h3>
                    <p>I think that we've got a good handle on navigation and authentication inside of our app now.
                        Now that those systems are under wraps we are going to move forward and think about how we
                        are going to attempt to retrieve a list of images from the Imgur API and handle the upload
                        process.</p>
                    <p>We will take care of fetching images first. We will use the Imgur sites upload form to upload
                        some initial images. We should then be able to come back over to our application and see
                        those images appear on the ImageList component.</p>
                    <p>Let's discuss the initial design of our Images module. So remember we've worked on one Vuex
                        module so far - the Auth module. Inside that module we defined:
                    </p>
                    <ul>
                        <li>state</li>
                        <li>getters</li>
                        <li>actions</li>
                        <li>mutations</li>
                    </ul>
                    <p>We are going to add a completely separate module inside of our Vuex modules folder which is
                        going to be related to working with the images resource. Handling fetching them - like the
                        list of images we have as a user and also work around uploading images as well.
                    </p>
                    <p>So let's take a look at a diagram that's going to walk us through the design of this module. </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig07-001.png"/>
                        <figcaption>Fig 07-001</figcaption>
                    </figure>
                    <p>The first thing we are going to think about is the state of this module. Remember the state
                        is kind of like the very raw data that we're going to be working with inside this module.
                        For this particular case when we reach out to the Imgur API to get a list of images that
                        have been uploaded by our present user the Imgur API is going to send back a big array of
                        objects to us - each object inside that array is going to represent one uploaded image - so
                        in essence it's going to be very similar to the YouTube API we worked with earlier in the
                        course.</p>
                    <p>So when we start thinking about our state design it's going to make a lot of sense to just
                        have a single property called images and this will point to an array that
                        contains a list of all the images that we've fetched from the Imgur API. Initially the array
                        will be empty:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig07-002.png"/>
                        <figcaption>Fig 07-002</figcaption>
                    </figure>
                    <p>So for the getters all we're doing is showing a list of all of the images that the user has
                        uploaded on screen. We are not performing any filtering or advanced computation or anything
                        like that. We will have just one getter called allImages. If someone calls this getter we
                        just going return back to them a list of all the images inside inside of our state </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig07-003.png"/>
                        <figcaption>Fig 07-003</figcaption>
                    </figure>
                    <p>In the case of Actions, our application really has two primary purposes to it. On the one hand
                        we should have the ability to fetch a list of all of our images. Secondly we should have the
                        ability to upload an image because that's really the two big aspects of our application that
                        we're trying to implement:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig07-004.png"/>
                        <figcaption>Fig 07-004</figcaption>
                    </figure>
                    <p>We are going to be in a similar situation here with uploadImage to what we had in the Auth
                        module. In the Auth module we put together that login action - which didn't actually modify
                        our state or call any mutations. So it's actually going be very similar in this case as well.
                        Upload image is going to attempt to take an image or multiple images and upload them to the
                        Imgur API. There's probably not a lot of stuff beyond that the upload image action really
                        needs to do because whenever we upload an image - that's going to be on the upload form and
                        the uploadImage action is going to have no reason to ever try to modify the
                        state object.
                    </p>
                    <p>On the other hand we have fetchImages which without doubt is going to have to call a mutation
                        to update the images piece of state. We will create a mutation called setImages that will be
                        something very similar to the setToken mutation that we had in the Auth module: </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig07-005.png"/>
                        <figcaption>Fig 07-005</figcaption>
                    </figure>
                    <p>We'll say that after the fetchImages action makes a network request over to the Imgur API to
                        get a list of all of our images it should call the setImages mutation and attempt to update
                        the list of images stored inside of our state.
                    </p>
                    <p>The design of this module is going to be very similar to the Auth module we worked on earlier
                        . So this will be a good opportunity to reinforce a lot of the stuff that we just learned.</p>
                    <h3>Module Implementation</h3>
                    <p>In the modules directory create a new file called images.js and add the following boilerplate
                        code:</p>
                    <figure>
<pre class="prettyprint">const state = {
    images: []
};

const getters = {
    allImages: state =&gt; state.images
};

const actions = {
    fetchImages() {}
};

const mutations = {
    setImages: (state, images) =&gt; {
        state.images = images;
    }
};
</pre>
                        <figcaption>Fig 07-006</figcaption>
                    </figure>
                    <p>The allImages getter is a function that gets called with our state object and all we want to
                        do is return the list of images from state.</p>
                    <p>The setImages mutation gets called with an array of image objects. We just take the
                        entire array and update the value of images replacing what is already there. Remember that
                        when this gets called we first have our current state object and then any optional arguments
                        - in this case the array of images that comes back from the Imgur API. We take that array and
                        assign it to state.images. As we said previously most of the mutations that we put together
                        inside of a Vuex application are going to be very straightforward in nature because they are
                        specifically designed to be very small, very discrete changes to our state object so it will
                        be rare to do a lot of complicated stuff here. Instead we try to put any complicated business
                        logic we have into an action object.
                    </p>
                    <p>With fetchImages action we just add the function stub. We will look at the functionality
                        inside fetchImages in the next section.</p>
                    <h3>Fetch Images API Documentation</h3>
                    <p>The purpose of the fetchImages action is to reach out to the Imgur API and retrieve any
                        images that this user has ever uploaded. There are a couple of different considerations here
                        . First off we have to think about where we are going to locate the code to make this actual
                        API request. Secondly we have to think about how we actually fetch the images at all.</p>
                    <p>The Imgur API <a target="_blank" href="apidocs.imgur.com">documentation</a> has a section on
                      Account which
                        lists all the different API endpoints that are tied to a users account. We are looking for
                        Account Images which returns all the images that have been uploaded by the current user. To
                        get the list of images we perform a GET request to https://api.imgur.com/3/account/me/images
                        . What's very important to note here is that we have to send along a very specific header on
                        the request as well. The Header has to include the access_token that we obtained when we went
                        through the OAuth process in order to access the user's list of images.</p>
                    <h3>Fetching Images</h3>
                    <p>In the imgur.js file located in the api directory:</p>
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
                        <figcaption>Fig 07-007</figcaption>
                    </figure>
                    <p>You'll recall that we created the default object that houses a couple of different functions
                        related to working with the Imgur API. Add a new function under the login action:</p>
                    <figure>
<pre class="prettyprint">fetchImages() {
    return axios.get(`${ROOT_URL}/3/account/me/images`)
}</pre>
                        <figcaption>Fig 07-008</figcaption>
                    </figure>
                    <p>We also need to import the axios library:</p>
                    <figure>
                        <pre class="prettyprint">import axios from 'axios';</pre>
                        <figcaption>Fig 07-009</figcaption>
                    </figure>
                    <p>Remember we use that library to make network requests off to arbitrary endpoints. </p>
                    <p>The fetchImages function makes a get request using axios. We use string interpolation to
                        concatenate our ROOT_URL with the remainder of the address for the Account Images endpoint.
                    </p>
                    <p>This will make the get request over to the Imgur API. However at this point we are not
                        passing the required information in the Header of the request. First of all we will add a
                        Header to an axios request and then after that we will look at how we get access to the
                        actual access_token from the fetchImages action.</p>
                    <p>So the first argument to get request is the actual Url that we want to make the request to
                        and then the second argument is going to be an object that can have a collection of
                        different options that customize the request that we're making. One possible option we could
                        pass in here is a headers object:</p>
                    <figure>
<pre class="prettyprint">fetchImages(token) {
        return axios.get(`${ROOT_URL}/3/account/me/images`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }</pre>
                        <figcaption>Fig 07-010</figcaption>
                    </figure>
                    <p>This is going to be a list of different headers that we're going to include along with the
                        request. So we follow the specifications laid out in the documentation by adding a key of
                        <code class="prettyprint">Authorization</code>. The value that we specify is a template
                        string - <code class="prettyprint">`Bearer ${}`</code>. We want to add the access token
                        between the curly braces so, for the moment, we make the assumption that when we
                        call the fetchImages function from within our images module we can pass the access_token in
                        as an argument. We will figure out how to get the access_token into that module shortly.
                    </p>
                    <h3>Communicating Across Modules</h3>
                    <p>In the last section we put together our fetchImages function inside of imgur helper function.
                        We want to call this function from the fetchImages action inside of our images module. We want
                        to get our access token over to this function. Remember that you and I are working inside of
                        the Images module:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig07-011.png"/>
                        <figcaption>Fig 07-011.png</figcaption>
                    </figure>
                    <p>However our token is saved inside the Auth module - which is a totally separate piece of
                        state inside of our overall Vuex instance. So inside of images.js we import our api:</p>
                    <figure>
                        <pre class="prettyprint">import api from '../../api/imgur';</pre>
                        <figcaption>Fig 07-012</figcaption>
                    </figure>
                    <p>Then inside of the fetchImages function we can use our api that we just imported to call <code
                            class="prettyprint">api.fetchImages();</code></p>
                    <figure>
<pre class="prettyprint">const actions = {
    fetchImages() {
        api.fetchImages();
    }
};</pre>
                        <figcaption>Fig 07-013</figcaption>
                    </figure>
                    <p>In order to reach out to that totally different module and get information our of it the
                        fetchImages action gets called with a first argument, which we've discussed a couple of times
                        now, is going to give us the ability to reach into other modules inside of our application.

                    </p>
                    <p>So, previously, remember when we defined that first argument inside of an action we said it
                        was an object with a couple of different properties. So, for example, in the Auth module
                        the finalizeLogin and logout actions both make use of the commit function which allows us to
                        call a mutation.</p>
                    <p>Another property that exists on that first argument is called rootState:</p>
                    <figure>
<pre class="prettyprint">const actions = {
    fetchImages({ rootState }) {
        api.fetchImages();
    }
};</pre>
                        <figcaption>Fig 07-014</figcaption>
                    </figure>
                    <p>rootState is a reference to all of the state that is held inside of our Vuex store or
                        instance. So rootState here gives us the ability to reach into other modules and access
                        state or access data that is held inside them.</p>
                    <p>The rootState object is going to have different properties assigned to it based on how you
                        have hooked up your modules to your Vuex instance. Let me explain what I mean by that. If you
                        recall inside the store directory we've got that index.js file inside of which we created our
                        Vuex instance and wired up our Auth module as a module called simply auth:
                    </p>
                    <figure>
                    <pre class="prettyprint">export default new Vuex.Store({
    modules: {
        auth
    }
});</pre>
                        <figcaption>Fig 07-015</figcaption>
                    </figure>
                    <p>Because we hooked the Auth module up to the store as a module called <code
                            class="prettyprint">auth</code> above, we can access the state inside of this Auth module
                        by writing out <code class="prettyprint">rootState.auth</code> and then whatever property we
                        want off that state object. Our Auth module has only one property on it's data object - the
                        token property. So we use the following code in our Images module to reach over into that
                        Auth module and pull the token out of that Auth module state:
                    </p>
                    <figure>
<pre class="prettyprint">const actions = {
    fetchImages({ rootState }) {
        rootState.auth.token;
        api.fetchImages();
    }
};</pre>
                        <figcaption>Fig 07-016</figcaption>
                    </figure>
                    <p>I'm going to use ES2015 destructuring syntax to clean up the code a little bit:</p>
                    <figure>
                        <pre class="prettyprint">const { token } = rootState.auth;</pre>
                        <figcaption>Fig 07-017</figcaption>
                    </figure>
                    <p>So now we can take that token that we've got from the module and pass it along to the
                        fetchImages function that we put together inside of the imgur.js api helper file:
                    </p>
                    <figure>
<pre class="prettyprint">const actions = {
    fetchImages({ rootState }) {
        const { token } = rootState.auth;
        api.fetchImages(token);
    }
};</pre>
                        <figcaption>Fig 07-018</figcaption>
                    </figure>
                    <p>Next in the imgur.js api file in the fetchImages function where we make the axios request:</p>
                    <figure>
<pre class="prettyprint">    fetchImages(token) {
        return axios.get(`${ROOT_URL}/3/account/me/images`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }</pre>
                        <figcaption>Fig 07-019</figcaption>
                    </figure>
                    <p>Note - we are returning the request from the function. So back inside of the images module
                        when we call <code class="prettyprint">api.fetchImages(token);</code> because we are calling
                        an asynchronous request we have to write a little bit of code to handle the response that
                        comes back. So previously in the VideoBrowser application when we made a request, we
                        interfaced with that request by using a promise. However, this time around we are going to
                        follow the convention of Vuex a little bit more closely by using an async await syntax here
                        instead to wait for this api request to be completed:
                    </p>
                    <figure>
<pre class="prettyprint">const actions = {
    async fetchImages({ rootState }) {
        const { token } = rootState.auth;
        const response = await api.fetchImages(token);
    }
};</pre>
                        <figcaption>Fig 07-020</figcaption>
                    </figure>
                    <p>Firstly we mark <code class="prettyprint">fetchImages</code> with the <code
                            class="prettyprint">async</code> keyword then we add the <code class="prettyprint">await
                    </code> keyword in front of the api call. Then we store the response in a variable called
                        <code class="prettyprint">response</code>.</p>
                    <p>Finally when we get this response back it should have a list of all the images inside of our
                        application we will eventually call commit. Before call commit and actually store these
                        images inside of our module I think it would probably be a really good experience to console
                        log out the response object to get a better idea of what information we get back from the Imgur
                        API:</p>
                    <figure>
<pre class="prettyprint">const actions = {
    async fetchImages({ rootState }) {
        const { token } = rootState.auth;
        const response = await api.fetchImages(token);
        console.log(response);
    }
};</pre>
                        <figcaption>Fig 07-021</figcaption>
                    </figure>
                    <h3>Testing Images Response</h3>
                    <p>In this section we're going to wire up the Images module to our Vuex store and then we'll
                        wire up all that stuff to our ImageList component and attempt to reach out to the Imgur API
                        and get a list of all of our images.</p>
                    <p>So, again, the first thing we have to do is make sure that we export our state, getters,
                        actions and mutations from this module file. At the bottom add the following export
                        statement:</p>
                    <figure>
<pre class="prettyprint">export default {
    state,
    getters,
    actions,
    mutations
}</pre>
                        <figcaption>Fig 07-022</figcaption>
                    </figure>
                    <p>And just like before the names of each of these objects right here are especially important.
                        Next in index.js where we create our Vuex instance and import the Images module:
                    </p>
                    <figure>
                        <pre class="prettyprint">import images from './modules/images';</pre>
                        <figcaption>Fig 07-023</figcaption>
                    </figure>
                    <p>Next we'll hook that module up inside the modules object to tell Vuex about the additional
                        module we have created:</p>
                    <figure>
                    <pre class="prettyprint">export default new Vuex.Store({
                        modules: {
                            auth,
                            images
                        }
                    });</pre>
                        <figcaption>Fig 07-024</figcaption>
                    </figure>
                    <p>Ok so the next thing we have to do is actually take that store, take the action inside of it
                        and call it from one of the functions inside our lifecycle methods inside our components.</p>
                    <p>So the chances are that we only want to attempt to load up our list of images from the Imgur
                        API when we are showing the ImageList component on the screen. In the ImageList component we
                        make use of the created() lifecycle method. First off though let's setup mapActions for fetching
                        images. Add the import statement for mapActions:</p>
                    <figure>
                        <pre class="prettyprint">import { mapActions } from 'vuex';</pre>
                        <figcaption>Fig 07-025</figcaption>
                    </figure>
                    <p>Next we will wire up the fetchImages action and wire it up to this component's methods
                        property. </p>

                    <p>So we define the methods property and call mapActions passing in an array containing the name
                        of the action that we want merge into our ImageList component - fetchImages:
                    </p>
                    <figure>
<pre class="prettyprint">export default {
    name: 'ImageList',
    methods: mapActions(['fetchImages']),
}</pre>
                        <figcaption>Fig 07-025</figcaption>
                    </figure>
                    <p>And as we were just saying we also want to define a lifecycle method because the instant we
                        are about to load this component up we want to attempt to reach out to the Imgur API and
                        fetch our list of images so we can show them on the screen. So underneath our methods
                        definition I'll add in our created function which will be called automatically because it is
                        called created. Inside the lifecycle method we can fetch our images:</p>
                    <figure>
<pre class="prettyprint">export default {
        name: 'ImageList',
        methods: mapActions(['fetchImages']),
        created() {
            this.fetchImages();
        }
    }</pre>
                        <figcaption>Fig 07-026</figcaption>
                    </figure>
                    <p>So I think we are just about ready to test this out inside the browser. One thing I want to
                        remind you about is that we have not yet gone through the process of uploading any images. So
                        while we may be able to run this code inside the browser I really don't expect to see any
                        images come back on the api. However I would like to run this code just to verify we are not
                        getting any errors.
                    </p>
                    <p>In the browser make sure you are on the Image List - localhost:8080 and logged in. Click on the
                        Network tab inside chrome devtools, filter by XHR requests and then refresh the
                        entire page. </p>
                    <p>At this point we have not yet setup our application to work correctly if you're not logged in
                        when it comes to fetching this list of images. </p>
                    <p>When you refresh you should see a GET request to the images endpoint at Imgur. You'll notice
                        that there's two requests inside of here. The first one is an options type request. This is
                        to handle the fact that we are making a network request across domain - also referred to as
                        a CORS (Cross-Origin Resource Sharing) request. </p>
                    <p>The second one is our actual request that tries to fetch some information. If we select that
                        and then view the preview tab you'll notice that we got back data of empty array:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig07-027.png"/>
                        <figcaption>Fig 07-027</figcaption>
                    </figure>
                    <p>This means we fetched no images. Also in the console log we've got the entire response object
                        with the data property:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig07-028.png"/>
                        <figcaption>Fig 07-028</figcaption>
                    </figure>
                    <p>One thing that's going to be really confusing here, and this is why I wanted to do the console
                        log, is that whenever we make a request with axios the response comes back with a data
                        property that contains data that was sent back to us by the remote api. The reason this is
                        really confusing is that when Imgurs API in particular sends a response back to us - there
                        response object has a data property nested inside of it as well.
                    </p>
                    <p>So the first data object shown in Fig 07-028 is from axios behaving as usual saying whatever
                        information we get back is going to be on the data property. Inside there is a second data
                        property that is being returned by Imgurs API - they just decided to call this property data
                        as well and they decided to return the results of our query inside that data property.</p>
                    <p>So in other words we've got <code class="prettyprint">data.data</code> these two nested data
                        properties which is a bit confusing but we'll get around that.</p>
                    <h3>Image Upload via Imgur</h3>
                    <p>Upload an image or images to imgur.com and then refresh the browser of your application at
                        localhost:8080. If you look at the Network tab again and select the images GET request you
                        should see that the data object contains a single object. </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig07-029.png"/>
                        <figcaption>Fig 07-029</figcaption>
                    </figure>
                    <p>You can expand the node to see various details about the image such as the date and time it
                        was uploaded, the dimensions, type of image, and (most relevant for us) a direct link to the
                        image.</p>
                    <h3>Committing Images to State</h3>
                    <p>We are now able to successfully retrieve a list of images from the Imgur API and the last
                        thing we have to do inside of our images module is to make sure that we complete the code fo
                        our fetchImages action. We got back our response object that contains our images but we need
                        to make sure that we call that setImages mutation to update the list of images that are
                        stored inside of our state object. Remember how we do that from the first argument:
                    </p>
                    <figure>
                        <pre class="prettyprint">async fetchImages({ rootState }) </pre>
                        <figcaption>Fig 07-030</figcaption>
                    </figure>
                    <p>We are going to pull off the commit function in addition to the rootState object. The
                        rootState object gives us access to state within other modules:</p>
                    <figure>
                    <pre class="prettyprint">const actions = {
                        async fetchImages({ rootState, commit }) {
                            const { token } = rootState.auth;
                            const response = await api.fetchImages(token);
                        }
                    };</pre>
                        <figcaption>Fig 07-031</figcaption>
                    </figure>
                    <p>We also remove the console.log statement and call commit instead:</p>
                    <figure>
<pre class="prettyprint">const actions = {
    async fetchImages({ rootState, commit }) {
        const { token } = rootState.auth;
        const response = await api.fetchImages(token);
        commit('setImages', response.data.data);
    }
};</pre>
                        <figcaption>Fig 07-032</figcaption>
                    </figure>
                    <p>The first argument to commit is a string that tells Vuex which mutation we are trying to call
                        - so in this case <code class="prettyprint">setImages</code>. The second argument we provide is
                        the new list of images to store inside of our state - <code class="prettyprint">response.data
                            .data</code>. </p>
                    <p>We are now getting back our list of image(s) and storing them inside our ImageList modules
                        state object.</p>
                    <h3>Mapping the Images Getter</h3>
                    <p>Our Images module is now taking our list of images back from the Imgur API and storing them
                        on our Images module state. We are now going to move over to our ImageList component and
                        make sure that the component is aware of all the images that are being fetched by our api.</p>
                    <p>At present we are only calling the action to fetch the images. Now remember these actions
                        attempt to modify our state in some fashion. To actually get information out of our state
                        object we have to make use of getters. Remember inside of our Images module we made that getter
                        called allImages which returns all the images that are stored inside of our state object. So
                        we want to take the allImages getter and map it to our ImageList component.</p>
                    <p>To do so we are going to import our mapGetters function:</p>

                    <p>and add it to our component definitions computed property. We use a computed property to read
                        information into our component and make it accessible from our actual template:</p>
                    <figure>
                        <pre class="prettyprint">import { mapActions, mapGetters } from 'vuex';</pre>
                        <figcaption>Fig 07-033</figcaption>
                    </figure>
                    <p>Ok so now that we've got the list of images inside of here we can reference that list of
                        images inside of our template as we please. So for now, I'll just print out the number of
                        images that are being fetched from the API:
                    </p>
                    <figure>
                    <pre v-pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
        Image List

        {{ allImages.length }}
    &lt;/div&gt;
&lt;/template&gt;</pre>
                        <figcaption>Fig 07-034</figcaption>
                    </figure>
                    <p>If you now view the application now you should see the number of images returned from the
                        API:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig07-035.png"/>
                        <figcaption>Fig 07-035.png</figcaption>
                    </figure>
                    <h3>Listing Images</h3>
                    <p>We've now got a list of all of our images inside our ImageList component. Inside this section
                        we are going to put in a little bit of temporary code here just to loop over all the images
                        that we fetched and print them out to the screen. Now the first take that we're going to do
                        is going to be a little bit ugly but we just want to get some temporary solution in here.
                        We'll then go and take care of the UploadForm and then we're going to come back to this once
                        we have the ability to upload a lot of images and we'll do something way more interesting to
                        display our images on the screen.
                    </p>
                    <p>Firstly, clear out the contents of the div in the ImageList component and replace it with the
                        following code:</p>
<figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
        &lt;img v-for=&quot;image in allImages&quot; :src=&quot;image.link&quot; /&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
<figcaption>Fig 07-036</figcaption>
</figure>
                    <p>We use the <code class="prettyprint">v-for</code> directive to loop over all the different
                        images that we fetch and display one <code class="prettyprint">img</code> tag for each image.
                        Remember how we use the <code class="prettyprint">v-for</code> directive - we write out <code
                                class="prettyprint">v-for</code>
                        and then a temporary variable name (in this case image), then the <code class="prettyprint">
                            in</code> keyword, then the name
                        of the collection of records that we want to iterate over which in this case is <code
                                class="prettyprint">allImages</code> Then inside the tag that contains the <code class="prettyprint">v-for</code>
                        directive we can use the temporary variable (<code class="prettyprint">image</code>) for any
                        other purpose we might want. So in the context of an <code class="prettyprint">img</code> tag
                        we probably want to define the <code class="prettyprint">src</code> property. Remember that
                        anytime we want to pass in a <code class="prettyprint">src</code> property or any Html
                        property to an element and we want to ensure that the property comes from a variable we have
                        to make use of the <code class="prettyprint">v-bind</code> syntax.</p>
                    <p>If we now view this in the browser we should see the image is displaying as expected.</p>
                </div>
            </div>
        </div>
    </div>
</template>
