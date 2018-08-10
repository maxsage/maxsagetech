<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>Handling Image Upload</h2>
                </div>
                <div class="panel-body">
                    <h3>Image Upload Overview</h3>
                    <p>We've now got the ability to render out an image on the screen or in theory all the images that
                        we fetch from the Imgur API but we still don't have the ability to upload images directly
                        through our application. So in this section we're going to start working on the UploadForm.
                    </p>
                    <p>Let's review the mockup:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig08-001.png"/>
                        <figcaption>Fig 08-001</figcaption>
                    </figure>
                    <p>A user should either be able to drag and drop an image onto the element in the center of the page
                        to upload it or click the element to display a file select screen.
                    </p>
                    <p>The Imgur API <a href="https://apidocs.imgur.com/">documentation</a> provides details on
                        uploading images. To upload an image we are going to make a POST request to https://api
                        .imgur.com/3/image that contains an image property. Image is going to be a key in the body of
                        the request that we make. The value for that property is going to be an actual image file. This
                        endpoint only allows uploading one image at a time so if we want to upload 5 images we will need
                        to make 5 separate requests.
                    </p>
                    <h3>Upload Form HTML</h3>
                    <p>In the last section we started talking about the implementation of our UploadForm. We going to
                        talk about the raw Html involved in building the drag and drop element. The following diagram
                        illustrates:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig08-002.png"/>
                        <figcaption>Fig 08-002</figcaption>
                    </figure>
                    <p>The blue box represents a <code class="prettyprint">div</code> and we're going to be applying all
                        our styling to that <code class="prettyprint">div</code> - so the border, border radius,
                        dimensions, text centering etc. Inside the <code class="prettyprint">div</code> there will two
                        child elements. One will be a <code class="prettyprint">span</code> that will contain some
                        amount of text inside it. The other will be an invisible input element which will provide the
                        drag and drop functionality and click the element.
                    </p>
                    <p>Add the following code to the template of the UploadForm component:</p>
                    <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div class=&quot;dropper&quot;&gt;
        &lt;input type=&quot;file&quot; /&gt;
        &lt;span&gt;Drag file here!&lt;/span&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
                        <figcaption>Fig 08-003</figcaption>
                    </figure>
                    <p>We're going to add one or two quick style rules to this component and then preview it in the
                        browser:
                    </p>
                    <figure>
<pre class="prettyprint">&lt;style&gt;
    .dropper {
        height: 30vh;
        border: 2px dashed black;
        border-radius: 5px;
    }
&lt;/style&gt;</pre>
                        <figcaption>Fig 08-004</figcaption>
                    </figure>
                    <p>The height of 30vh refers to the view height or the view window exposed in the browser which
                        means it will essentially occupy 30 percent of the overall height of the browser. After that we
                        setup our border and border radius.
                    </p>
                    <p>Refresh the browser and you should see the styling:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig08-005.png"/>
                        <figcaption>Fig 08-005</figcaption>
                    </figure>
                    <p>So now we've got the <code class="prettyprint">div</code> that is taking up pretty much the whole
                        width of the screen. Also, notice that if I reduce the height of the browser the height of the
                        div will reduce as well to approx 30% of the available height.
                    </p>
                    <h3>Styling the Upload Form</h3>
                    <p>In this section we are going to continue working on our UploadForm by adding some additional
                        styling.
                    </p>
                    <p>We will add some styling provided by SemanticUI for margins to our App component so that the
                        styling gets applied to all the elements in our application:
                    </p>
                    <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
        &lt;AppHeader&gt;&lt;/AppHeader&gt;
        &lt;div class=&quot;ui container&quot;&gt;
            &lt;router-view&gt;&lt;/router-view&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
                        <figcaption>Fig 08-005</figcaption>
                    </figure>
                    <p>So we wrapped the <code class="prettyprint">router-view</code> in a single <code
                            class="prettyprint">div</code> with a class of <code class="prettyprint">ui container</code>
                        which is provided by SemanticUI and should add the desired styling.
                    </p>
                    <p>Next we will fix up the Upload panel in UploadForm. In the style tag at the bottom add the
                        following:
                    </p>
                    <figure>
<pre class="prettyprint">&lt;style&gt;
    .dropper {
        height: 30vh;
        border: 2px dashed black;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
&lt;/style&gt;</pre>
                        <figcaption>Fig 08-006</figcaption>
                    </figure>
                    <p>If you preview in the browser you should see the content is now centered. The <code
                            class="prettyprint">input</code> tag is still visible. We will add some styling to make the
                        <code class="prettyprint">input</code> invisible and stretch it to fill the whole dropper <code
                                class="prettyprint">div</code>:
                    </p>
                    <figure>
<pre class="prettyprint">&lt;style&gt;
    .dropper {
        height: 30vh;
        border: 2px dashed black;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    input {
        width: 100%;
        height: 30vh;
        position: absolute;
    }
&lt;/style&gt;</pre>
                        <figcaption>Fig 08-007</figcaption>
                    </figure>
                    <p>We add some styling rules for <code class="prettyprint">input</code> to resize it's width and
                        height. We add a <code class="prettyprint">position</code> of <code class="prettyprint">
                            absolute</code> and then on the dropper class we add a <code
                                class="prettyprint">position </code> of <code class="prettyprint">relative</code>.
                    </p>
                    <p>Preview in the browser:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig08-008.png"/>
                        <figcaption>Fig 08-008</figcaption>
                    </figure>
                    <p>and you'll see that the <code class="prettyprint">input</code> has moved to the top left-hand
                        side. If you hover over anywhere on the dropper <code class="prettyprint">div</code> you will
                        see the "No file chosen" notification. That means the <code class="prettyprint">input</code>
                        element is now filling up the entire height and width of the div. If you click anywhere in the
                        <code class="prettyprint">div</code> a file selector will be displayed.
                    </p>
                    <p>To change the visibility of the input element add an opacity of 0 to it's styling:</p>
                    <figure>
<pre class="prettyprint">input {
    width: 100%;
    height: 30vh;
    position: absolute;
    opacity: 0;
}</pre>
                        <figcaption>Fig 08-009</figcaption>
                    </figure>
                    <p>We will add a background color to our dropper div to make it clear that the element is
                        interactive:
                    </p>
                    <figure>
                    <pre class="prettyprint">.dropper: hover {
    background-color: #eee;
}</pre>
                        <figcaption>Fig 08-010</figcaption>
                    </figure>
                    <h3>The Upload Images Action</h3>
                    <p>We will do some work on the Image module design. Inside images.js add the uploadImages action:
                    </p>
                    <figure>
<pre class="prettyprint">async uploadImages({ commit }, images) {
    console.log(images);
}</pre>
                        <figcaption>Fig 08-011</figcaption>
                    </figure>
                    <p>We specify our first options argument, as usual, specifying commit to allow us to execute
                        mutations. As a second argument add in an argument called <code
                                class="prettyprint">images </code> which we will upload to Imgur. We add a temporary
                        console.log to give us some information about the <code class="prettyprint">images</code>
                        object.
                    </p>
                    <p>In the UploadForm component we will map the uploadImages action so we can call it anytime we
                        select a file. Firstly, import mapActions:
                    </p>
                    <figure>
                        <pre class="prettyprint">import { mapActions } from 'vuex';</pre>
                        <figcaption>Fig 08-012</figcaption>
                    </figure>
                    <p>Then add this to our methods property to give us access to the <code class="prettyprint">
                        uploadImages</code> action:
                    </p>
                    <figure>
                    <pre class="prettyprint">export default {
    name: 'UploadForm',
    methods: mapActions(['uploadImages']);
}</pre>
                        <figcaption>Fig 08-013</figcaption>
                    </figure>

                    <h3>File Change Event</h3>
                    <p>Now that we've added in our <code class="prettyprint">uploadImages</code> action we can make sure
                        that this action gets called anytime someone selects a file from our <code class="prettyprint">input</code>
                        tag. Add the following binding to the input tag:
                    </p>
                    <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div class=&quot;dropper&quot;&gt;
        &lt;input type=&quot;file&quot; @change=&quot;uploadImages&quot; /&gt;
        &lt;span&gt;Drag file here!&lt;/span&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
                        <figcaption>Fig 08-014</figcaption>
                    </figure>
                    <p>So we watch for a <code class="prettyprint">change</code> event which signals the selection of
                        that input element has changed. Anytime that occurs we're going to run the <code
                                class="prettyprint">uploadImages</code> method.
                    </p>
                    <p>In the browser click the upload element and select a file. You'll notice the console.log that we
                        get from our action is not actually a list of images at all:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig08-015.png"/>
                        <figcaption>Fig 08-015</figcaption>
                    </figure>
                    <p>Inside the event object is a property called target with a value of input which contains a
                        property called files. This is a file list object which contains a reference to every file that
                        the user just selected. We will use this object to specify the images which the user wants to
                        upload to the Imgur API.
                    </p>
                    <p>One other point to consider is that in addition to clicking on the upload element we also want
                        the user to be able to drag and drop files to upload. If we try dragging and dropping a file
                        onto the element the <code class="prettyprint">changed</code> event will still fire and we still
                        get the same level of information so both methods should work for uploading files.
                    </p>
                    <h3>Accepting Multiple Image Files</h3>
                    <p>Now we will add some functionality to allow multiple images to be uploaded. First we need to
                        change the second argument that the uploadImages action receives so that instead of passing in
                        the whole event object we pass in just the file list object. To do this change the event handler
                        in UploadForm from the existing syntax:
                    </p>
                    <figure>
                        <pre class="prettyprint">&lt;input type=&quot;file&quot; @change=&quot;uploadImages&quot; /&gt;</pre>
                        <figcaption>Fig 08-016</figcaption>
                    </figure>
                    <p>Throughout this course we've used the exact same syntax every time - the <code
                            class="prettyprint">@</code> sign followed by the name of the event followed by the method
                        to call when triggered. We can change the syntax of this statement to send back just the part of
                        the event object that we are interested in:
                    </p>
                    <figure>
                        <pre class="prettyprint">&lt;input type=&quot;file&quot; @change=&quot;uploadImages($event.target.files)&quot; /&gt;</pre>
                        <figcaption>Fig 08-017</figcaption>
                    </figure>
                    <p>Let's explain the reason for the <code class="prettyprint">$</code> sign. If ommitted the <code
                            class="prettyprint">$</code> sign and just wrote out <code class="prettyprint">event
                        .target.files</code> then anytime the change event is triggered Vue would try to look for an
                        object, variable, function or something tied to our component called event - which it won't find
                        so it will throw an error. The <code class="prettyprint">$</code> sign tells Vue that we want to
                        take the <code class="prettyprint">event</code> object from triggering the <code
                                class="prettyprint">change</code> event and pass through the <code class="prettyprint">
                            data.files</code> property to the <code class="prettyprint">uploadImages</code> action.
                    </p>
                    <p>Now, in the browser, if we do a refresh, select an image and then look at the console.log again
                        we should see just the FileList:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig08-018.png"/>
                        <figcaption>Fig 08-018</figcaption>
                    </figure>
                    <p>Next we will add the functionality to upload multiple images. In UploadForm add the following
                        code to the <code class="prettyprint">input</code> tag:
                    </p>
                    <figure>
                    <pre class="prettyprint">&lt;template&gt;
    &lt;div class=&quot;dropper&quot;&gt;
        &lt;input
            type=&quot;file&quot;
            @change=&quot;uploadImages($event.target.files)&quot;
            multiple
            accept=&quot;image/*&quot; /&gt;
        &lt;span&gt;Drag file here!&lt;/span&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
                        <figcaption>Fig 08-019</figcaption>
                    </figure>
                    <p>Now in the file select Shift+click should allow you to select multiple files. Also you should
                        only see image files in the file selector.
                    </p>
                    <h3>The Path to Upload</h3>
                    <p>We're now inside of our <code class="prettyprint">uploadImages</code> action and we're just about
                        ready to actually take this list of images and upload them to the Imgur API. Before we do that
                        let's check the Imgur API documentation for something we did not look at previously in relation
                        to the Image Upload API endpoint. If you scroll down to the HEADERS section you'll notice that
                        one of the headers that we have to apply to the API call is the Bearer with the access_token
                        property on it. You can ignore the other header - Authorization Client ID - we would only use
                        this header if we wanted to upload an image tied to our developer account. That's not what we're
                        trying to do. We are trying to upload this image tied to a user's account - so we will use the
                        Authorization Bearer with the access_token property.
                    </p>
                    <p>So inside the uploadImages action in the Image module we are going to perform the following
                        steps:
                    </p>
                    <ul>
                        <li>Get the access token</li>
                        <li>Call the Imgur API and upload the list of images</li>
                        <li>Redirect the user to the ImageList component.</li>
                    </ul>
                    <p>We are not going to write the actual upload logic inside of the uploadImages action, instead we
                        will put the code in the api imgur.js file which is where we've been placing all of our logic
                        that reaches out to Imgur so far.
                    </p>
                    <p>First let's get the access_token from the Auth module, exactly like we did in the <code
                            class="prettyprint">fetchImages</code> action. So rather than making use of the <code
                            class="prettyprint">commit</code> function we will swap it for <code class="prettyprint">
                        rootState</code> which gives us access to all the state that contained inside of our Vuex store.
                    </p>
                    <p>So we're going to reach over to the Auth module and get our access_token out of that:</p>
                    <figure>
                        <pre class="prettyprint">const { token } = rootState.auth;</pre>
                        <figcaption>Fig 08-020</figcaption>
                    </figure>
                    <p>Next we're going to call our api imgur module to do the actual file upload. We will define a
                        function called <code class="prettyprint">uploadImages</code> shortly but for the moment let's
                        just add the function call to the <code class="prettyprint">uploadImages</code> action:
                    </p>
                    <figure>
                        <pre class="prettyprint">await api.uploadImages(images, token);</pre>
                        <figcaption>Fig 08-021</figcaption>
                    </figure>

                    <h3>Attaching Images with FormData</h3>
                    <p>In the imgur.js api file add a new function called uploadImages:</p>
                    <figure>
                    <pre class="prettyprint">uploadImages(images, token) {
    Array.from(images).map(image =&gt; {
        const formData = new FormData();
        formData.append('image', image);

        return axios.post(`$(ROOT_URL}/3/image`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    });
}</pre>
                        <figcaption>Fig 08-022</figcaption>
                    </figure>
                    <p>So first we take the images file list object and turn it into an array - currently it is an array
                        like object (this is what it is known as in the JavaScript world). We use <code
                                class="prettyprint">Array.from</code> and pass in the images file list object. We then
                        call the <code class="prettyprint">map</code> function and use it to iterate over all the images
                        stored inside of the file list object.
                    </p>
                    <p>Inside the map function we're going to take every image and we're going to do a little bit of
                        work on it to attempt to upload it to the Imgur API. Regarding uploading the image if you
                        revisit the <code class="prettyprint">Imgur documentation</code> you'll notice that we have to
                        provide a key of <code class="prettyprint">image</code> which should be a binary file or base64
                        data - we have to attach the actual image object itself to the request. If you remember back
                        in the console when we logged out the file list we did not get direct access to the file
                        itself - instead we got access to kind of a reference to the file instead.
                    </p>
                    <p>In order to take the actual image file and attach it to the request we make use
                        of something called a <code class="prettyprint">formData</code> object. This object is part
                        of the standard vanilla Javascript spec and it allows us to take a reference to the file and
                        attach the real file to the post request that we're about to make to the Imgur API:</p>
                    <figure>
                        <pre class="prettyprint">const formData = new FormData();</pre>
                        <figcaption>Fig 08-023</figcaption>
                    </figure>
                    <p>Then directly after that we're going to take the formData object and we're going to attach
                        the reference to the image that was provided to our map function: </p>
                    <figure>
                        <pre class="prettyprint">formData.append('image', image);</pre>
                        <figcaption>Fig 08-024</figcaption>
                    </figure>
                    <p>I'm using image because if you look back at the Imgur API documentation it specifically
                        stated that we need to supply a key of image that contains the actual image file itself.</p>
                    <p>Next we make the actual POST request to the Imgur API that's going to take that formData
                        object and send off the entire object:</p>
                    <figure>
<pre class="prettyprint">return axios.post(`$(ROOT_URL}/3/image`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });</pre>
                        <figcaption>Fig 08-025</figcaption>
                    </figure>
                    <p>So first we use the <code class="prettyprint">return</code> keyword to make sure we return the
                        request object. Then we write axios.post and supply the Url as the first argument. As the
                        second argument we supply the formData object. Then, as the third object, we pass in the
                        headers, as we did previously, along with the access_token that will give us access to modify
                        our users account.
                    </p>
                    <p>Ok so that's just about it. The code above is going to take all of our images from inside the
                        images list, it's going to create a formData object, attach our image to that object which is
                        going to turn the image reference to a file itself, and then it's going to take the entire
                        formData and post it off to the Imgur API. It will then repeat the same process again for
                        every image inside of the image list object.</p>
                    <p>In the next section we will discuss a small error in logic that we have inside the above
                        function as it stands.</p>
                    <h3>Concurrent Uploads</h3>
                    <p>In the last section we put together the uploadImages function that loops over our list of
                        images and try to upload each one - one at a time. Please note that the upload action is
                        going to be running in parallel. So even though we use the terminology one at a time that we
                        are going to upload on image and then move onto the next - it's going to try and upload every
                        image at the exact same time.
                    </p>
                    <p>That's good, but there is one point we need to be aware of. We need to make sure that this
                        uploadImages function returns exactly one promise that represents all of these separate
                        image requests or all these separate uploads so that any other function that calls
                        uploadImages will know when the overall upload is complete. To do so we are going to take the
                        list of promises that get's return from the map function:
                    </p>
                    <figure>
                        <pre class="prettyprint">Array.from(images).map(image =&gt;</pre>
                        <figcaption>Fig 08-026</figcaption>
                    </figure>
                    <p>So notice how we are running map function and inside the body we return the result of our
                        POST request:</p>
                    <figure>
                    <pre class="prettyprint">return axios.post(`${ROOT_URL}/3/image`, formData, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});</pre>
                        <figcaption>Fig 08-027</figcaption>
                    </figure>
                    <p>That return value is going to be a promise that represents the upload request itself. So
                        from the entire statement we're going to get an array of promises each of which represents
                        one individual image upload. So we take the entire list and assign it to a variable called
                        promises:</p>
                    <figure>
                    <pre class="prettyprint">uploadImages(images, token) {
    const promises = Array.from(images).map(image =&gt; {
        const formData = new FormData();
        formData.append('image', image);

        return axios.post(`${ROOT_URL}/3/image`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    });
}</pre>
                        <figcaption>Fig 08-028</figcaption>
                    </figure>
                    <p>Then down at the bottom of this function we're going to add a little bit of code to wait for
                        this entire array of promises to be resolved before we say - "Ok everything's done":</p>
                    <figure>
                        <pre class="prettyprint">return Promise.all(promises);</pre>
                        <figcaption>Fig 08-029</figcaption>
                    </figure>
                    <p><code class="prettyprint">Promise.all</code> is a built-in Javascript function that takes an
                        array of promises and waits for every one of those inner promises to resolve and
                        then resolves itself as well.</p>
                    <p>So essentially we just added a little bit of code to make sure that we wait for every upload
                        request to be completed before we allow this function to continue.</p>
                    <p>Back over in our Images module and we will make sure that after all the work in
                        uploadImages is completed and then we will automatically navigate our user over to our
                        ImageList component. First import the router:</p>
                    <figure>
                        <pre class="prettyprint">import { router } from '../../main';</pre>
                        <figcaption>Fig 08-029</figcaption>
                    </figure>
                    <p>Then add the following code to the uploadImages function:</p>
                    <figure>
                        <pre class="prettyprint">router.push('/');</pre>
                        <figcaption>Fig 08-030</figcaption>
                    </figure>
                    <p>Test this in the browser. You will notice (if you have your Network tab open in the console)
                        one or more POST requests that represent each of the individual file uploads. We then get
                        redirected back over to <code class="prettyprint">locahost:8080</code> and we should see our
                        uploaded image(s) on the screen.
                    </p>
                    <h3>Layout with CSS Grid</h3>
                    <p>We are now able to see a list of the images that we have uploaded using the Imgur API but
                        they're definitely not showing up that nicely inside of our ImageList component. So in this
                        section we're going to add in just a little bit of styling to make sure that these images
                        show up better than they do at the moment.</p>
                    <p>In the ImageList component you'll recall we have our root div and then we render our a list
                        of images inside of it. Add the following class to the root div:</p>
                    <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div class=&quot;image-container&quot;&gt;
        &lt;img v-for=&quot;image in allImages&quot; :src=&quot;image.link&quot; /&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
                        <figcaption>Fig 08-030</figcaption>
                    </figure>
                    <p>Then add a style tag to the bottom of the component: </p>
                    <figure>
<pre class="prettyprint">&lt;style scoped&gt;
    .image-container {
        column-count: 3;
        column-gap: 0;
    }
    img {
        max-width: 100%;
        padding: 5px;
    }
&lt;/style&gt;</pre>
                        <figcaption>Fig 08-031</figcaption>
                    </figure>
                    <p>We are going to use something called CSS grids to style the list of images. We create three
                        separate columns then have the images automatically lay themselves out inside those three
                        columns. </p>
                    <p>First we add some styling to our class which we added to the div above. We add column-count
                        of 3 and column-gap of 0. This tells our ImageList component that we want to have three
                        separate columns rendered containing all of our images. Then, by default, between each of
                        those columns we're going to have a gap of zero pixels - so by default the columns are going
                        to be touching. </p>
                    <p>Directly after that we add some styling to the <code class="prettyprint">img</code> tag for
                        each of the images. We set the <code class="prettyprint">max-width</code> to 100% to make
                        sure that the images dont break out of the column width which they have been assigned. Then
                        we add a padding of 5 pixels works closely with the column-gap of 0. It's going to make sure
                        that there's give pixels between every img tag both above and to the side. </p>
                    <p>Now when our application loads back up we should see three separate columns and all of our
                        images rendered neatly inside with 5px around each image (totalling 10px between images).</p>
                    <h3>Hide Images on Logout</h3>
                    <p>If we log out while on the ImageList component our list of images remain on the screen. We
                        are going to address this now. In the ImageList component recall that we've got our computed
                        property fetching a list of all or our images:</p>
                    <figure>
                        <pre class="prettyprint">computed: mapGetters(['allImages']),</pre>
                        <figcaption>Fig 08-032</figcaption>
                    </figure>
                    <p>We will update the computed property to check if the user is currently logged in. We do this
                        by adding another string:</p>
                    <figure>
                        <pre class="prettyprint">computed: mapGetters(['allImages',  'isLoggedIn']),</pre>
                        <figcaption>Fig 08-033</figcaption>
                    </figure>
                    <p>Now that this getter is wired up we can decide what content to show inside of our component
                        based upon whether or not the user is logged in. Wrap everything inside the template in a
                        new div:</p>
                    <p>We add a v-if expression to check the value of isLoggedIn. If they are render the list of
                        images as before. If they are not then render the h2 element with the v-else directive.
                    </p>
                    <h3>Expanding the App</h3>
                    <p>We've just about wrapped up our application but before we finish I want to mention one way in
                        which you could possibly expand this application in the future. The Imgur API documentation
                        details an Account Favorites endpoint. This endpoint returns a list of all the diferent
                        images this user has ever liked over on Imgur.com. </p>
                    <p>So one way to expand the application would be to add a new component and another tab into the
                        application that showed a list of all the different images that this user has ever
                        favourited.</p>
                    <p>The challenge to this task is this endpoint can return either a Gallery Image or a Gallery
                        Album. Up until now we have only worked with Gallery Image. Gallery Album is an array of
                        images. You would need to write code to detect which of the two response models you are
                        working with.</p>
                    <p>I hope you enjoyed learning about Vue - goodbye and thanks for all the fish.</p>
                </div>
            </div>
        </div>
    </div>
</template>
