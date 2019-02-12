<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h2>Handling Image Upload</h2>
        </div>
        <div class="panel-body">
          <h3>Image Upload Overview</h3>
          <p>We've now got the ability to render out an image on the screen or in theory all the images that we fetch
            from the Imgur API but we still don't have the ability to upload images directly through our application. In
            this section we're going to start working on the UploadForm. Let's review the mockup:</p>
          <figure>
            <img src="./images/vuejsessentials/Fig08-001.png"/>
            <figcaption>Fig 08-001</figcaption>
          </figure>
          <p>A user should either be able to drag and drop an image onto the element in the center of the page to upload
            it or click the element to display a file select screen. The Imgur API <a target="_blank"
                                                                                      href="https://apidocs.imgur.com/">documentation</a>
            provides details on uploading images. To upload an image we are going to make a POST request to <a href="https://api
            .imgur.com/3/image">https://api .imgur.com/3/image</a> that contains an image property. Image is going to be
            a key in the body of the request that we make. The value for that property is going to be an actual image
            file. This endpoint only allows uploading one image at a time so if we want to upload 5 images we will need
            to make 5 separate requests.
          </p>
          <h3>Upload Form HTML</h3>
          <p>In the last section we started talking about the implementation of our UploadForm. We are going to talk
            about the raw Html involved in building the drag and drop element. The following diagram illustrates:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig08-002.png"/>
            <figcaption>Fig 08-002</figcaption>
          </figure>
          <p>The blue box represents a <code class="language-">div</code> and we're going to be applying all our
            styling to that <code class="language-">div</code> - so the border, border radius, dimensions, text
            centering etc. Inside the <code class="language-">div</code> there will two child elements. One will be a
            <code class="language-">span</code> that will contain some amount of text inside it. The other will be an
            invisible input element which will provide the drag and drop functionality and click the element. Add the
            following code to the <code class="language-">template</code> of the UploadForm component:</p>
          <figure>
<pre><code class="language-html">&lt;template&gt;
    &lt;div class=&quot;dropper&quot;&gt;
        &lt;input type=&quot;file&quot; /&gt;
        &lt;span&gt;Drag file here!&lt;/span&gt;
    &lt;/div&gt;
  &lt;/template&gt;</code></pre>
            <figcaption>Fig 08-003</figcaption>
          </figure>
          <p>We're going to add one or two quick style rules to this component and then preview it in the browser:
          </p>
          <figure>
<pre><code class="language-html">&lt;style&gt;
    .dropper {
        height: 30vh;
        border: 2px dashed black;
        border-radius: 5px;
    }
  &lt;/style&gt;</code></pre>
            <figcaption>Fig 08-004</figcaption>
          </figure>
          <p>The height of 30vh refers to the view height or the view window exposed in the browser which means it will
            essentially occupy 30 percent of the overall height of the browser. After that we setup our <code
              class="language-">border</code> and <code class="language-">border-radius</code>. Refresh the browser
            and you should see the styling:</p>
          <figure>
            <img src="./images/vuejsessentials/Fig08-005.png"/>
            <figcaption>Fig 08-005</figcaption>
          </figure>
          <p>So now we've got the <code class="language-">div</code> that is taking up pretty much the whole width of
            the screen. Also, notice that if I reduce the height of the browser the height of the <code
              class="language-">div</code> will reduce as well to approx 30% of the available height.
          </p>
          <h3>Styling the Upload Form</h3>
          <p>In this section we are going to continue working on our UploadForm by adding some additional styling. We
            will add some styling provided by SemanticUI for margins to our App component so that the styling gets
            applied to all the elements in our application:
          </p>
          <figure>
<pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;AppHeader&gt;&lt;/AppHeader&gt;
        &lt;div class=&quot;ui container&quot;&gt;
            &lt;router-view&gt;&lt;/router-view&gt;
        &lt;/div&gt;
    &lt;/div&gt;
  &lt;/template&gt;</code></pre>
            <figcaption>Fig 08-005</figcaption>
          </figure>
          <p>We wrapped the <code class="language-">router-view</code> in a single <code
            class="language-">div</code> with a class of <code class="language-">ui container</code> which is
            provided by SemanticUI and should add the desired styling. Next we will fix up the Upload panel in
            UploadForm. In the <code class="language-">style</code> tag at the bottom add the following:
          </p>
          <figure>
<pre><code class="language-html">&lt;style&gt;
    .dropper {
        height: 30vh;
        border: 2px dashed black;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
  &lt;/style&gt;</code></pre>
            <figcaption>Fig 08-006</figcaption>
          </figure>
          <p>If you preview in the browser you should see the content is now centered. The <code
            class="language-">input</code> tag is still visible. We will add some styling to make the <code
            class="language-">input</code> invisible and stretch it to fill the whole dropper <code
            class="language-">div</code>:
          </p>
          <figure>
<pre><code class="language-html">&lt;style&gt;
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
  &lt;/style&gt;</code></pre>
            <figcaption>Fig 08-007</figcaption>
          </figure>
          <p>We add some styling rules for <code class="language-">input</code> to resize it's <code
            class="language-">width</code> and <code class="language-">height</code> . We add a <code
            class="language-">position</code> of <code class="language-"> absolute</code> and then on the dropper
            class we add a <code
              class="language-">position </code> of <code class="language-">relative</code>.
          </p>
          <p>Preview in the browser:</p>
          <figure>
            <img src="./images/vuejsessentials/Fig08-008.png"/>
            <figcaption>Fig 08-008</figcaption>
          </figure>
          <p>and you'll see that the <code class="language-">input</code> has moved to the top left-hand side. If you
            hover over anywhere on the dropper <code class="language-">div</code> you will see the "No file chosen"
            notification. That means the <code class="language-">input</code> element is now filling up the entire
            height and width of the <code class="language-">div</code>. If you click anywhere in the <code
              class="language-">div</code> a file selector will be displayed. To change the visibility of the <code
              class="language-">input</code> element add an opacity of 0 to it's styling:</p>
          <figure>
<pre><code class="language-css">input {
    width: 100%;
    height: 30vh;
    position: absolute;
    opacity: 0;
  }</code></pre>
            <figcaption>Fig 08-009</figcaption>
          </figure>
          <p>We will add a background color to our dropper <code class="language-">div</code> to make it clear that
            the element is interactive:
          </p>
          <figure>
                    <pre><code class="language-css">.dropper: hover {
    background-color: #eee;
                      }</code></pre>
            <figcaption>Fig 08-010</figcaption>
          </figure>
          <h3>The Upload Images Action</h3>
          <p>We will do some work on the Image module design. Inside <span class="filename">images.js</span> add the
            <code class="language-">uploadImages</code> action:
          </p>
          <figure>
<pre><code class="language-javascript">async uploadImages({ commit }, images) {
    console.log(images);
  }</code></pre>
            <figcaption>Fig 08-011</figcaption>
          </figure>
          <p>We specify our first options argument, as usual, specifying <code class="language-">commit</code> to
            allow us to execute mutations. As a second argument add in an argument called <code
              class="language-">images</code> which we will upload to Imgur. We add a temporary <code
              class="language-">console.log</code> to give us some information about the <code class="language-">images</code>
            object. In the UploadForm component we will map the <code class="language-">uploadImages</code> action so
            we can call it anytime we select a file. Firstly, import <code class="language-">mapActions</code>:
          </p>
          <figure>
            <pre><code class="language-javascript">import { mapActions } from 'vuex';</code></pre>
            <figcaption>Fig 08-012</figcaption>
          </figure>
          <p>Then add the following code to our <code class="language-">methods</code> property to give us access to
            the <code class="language-"> uploadImages</code> action:
          </p>
          <figure>
          <pre><code class="language-javascript">export default {
  name: 'UploadForm',
  methods: mapActions(['uploadImages']);
}</code></pre>
            <figcaption>Fig 08-013</figcaption>
          </figure>

          <h3>File Change Event</h3>
          <p>Now that we've added in our <code class="language-">uploadImages</code> action we can make sure that this
            action gets called anytime someone selects a file from our <code class="language-">input</code> tag. Add
            the following binding to the input tag:
          </p>
          <figure>
<pre><code class="language-html">&lt;template&gt;
    &lt;div class=&quot;dropper&quot;&gt;
        &lt;input type=&quot;file&quot; @change=&quot;uploadImages&quot; /&gt;
        &lt;span&gt;Drag file here!&lt;/span&gt;
    &lt;/div&gt;
  &lt;/template&gt;</code></pre>
            <figcaption>Fig 08-014</figcaption>
          </figure>
          <p>So we watch for a <code class="language-">change</code> event which signals the selection of that <code
            class="language-">input</code>

            element has changed. Anytime that occurs we're going to run the <code
              class="language-">uploadImages</code> method.
          </p>
          <p>In the browser click the upload element and select a file. You'll notice the console.log that we get from
            our action is not actually a list of images at all:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig08-015.png"/>
            <figcaption>Fig 08-015</figcaption>
          </figure>
          <p>Inside the <code class="language-">event</code> object is a property called <code class="language-">target</code>
            with a value of <code class="language-">input</code> which contains a property called <code
              class="language-">files</code> . This is a file list object which contains a reference to every file
            that the user just selected. We will use this object to specify the images which the user wants to upload to
            the Imgur API.
          </p>
          <p>One other point to consider is that in addition to clicking on the upload element we also want the user to
            be able to drag and drop files to upload. If we try dragging and dropping a file onto the element the <code
              class="language-">changed</code> event will still fire and we still get the same level of information so
            both methods should work for uploading files.
          </p>
          <h3>Accepting Multiple Image Files</h3>
          <p>Now we will add some functionality to allow multiple images to be uploaded. First we need to change the
            second argument that the uploadImages action receives so that instead of passing in the whole event object
            we pass in just the file list object. To do this change the event handler in UploadForm from the existing
            syntax:
          </p>
          <figure>
            <pre><code class="language-html">&lt;input type=&quot;file&quot; @change=&quot;uploadImages&quot;
              /&gt;</code></pre>
            <figcaption>Fig 08-016</figcaption>
          </figure>
          <p>Throughout this course we've used the exact same syntax every time - the <code
            class="language-">@</code> sign followed by the name of the event followed by the method to call when
            triggered. We can change the syntax of this statement to send back just the part of the <code
              class="language-">event</code> object that we are interested in:
          </p>
          <figure>
            <pre><code class="language-html">&lt;input type=&quot;file&quot;
              @change=&quot;uploadImages($event.target.files)&quot; /&gt;</code></pre>
            <figcaption>Fig 08-017</figcaption>
          </figure>
          <p>Let's explain the reason for the <code class="language-">$</code> sign. If ommitted the <code
            class="language-">$</code> sign and just wrote out <code class="language-">event .target.files</code>
            then anytime the <code class="language-">change</code> event is triggered Vue would try to look for an
            object, variable, function or something tied to our component called event - which it won't find so it will
            throw an error. The <code
              class="language-">$</code> sign tells Vue that we want to take the <code
              class="language-">event</code> object from triggering the <code
              class="language-">change</code> event and pass through the <code class="language-"> data.files</code>
            property to the <code class="language-">uploadImages</code> action. In the browser, if we do a refresh,
            select an image and then look at the console.log again we should see just the FileList:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig08-018.png"/>
            <figcaption>Fig 08-018</figcaption>
          </figure>
          <p>Next we will add the functionality to upload multiple images. In UploadForm add the following code to the
            <code class="language-">input</code> tag:
          </p>
          <figure>
                    <pre><code class="language-html">&lt;template&gt;
    &lt;div class=&quot;dropper&quot;&gt;
        &lt;input
            type=&quot;file&quot;
            @change=&quot;uploadImages($event.target.files)&quot;
            multiple
            accept=&quot;image/*&quot; /&gt;
        &lt;span&gt;Drag file here!&lt;/span&gt;
    &lt;/div&gt;
                      &lt;/template&gt;</code></pre>
            <figcaption>Fig 08-019</figcaption>
          </figure>
          <p>Now in the file select Shift+click should allow you to select multiple files. Also you should only see
            image files in the file selector.
          </p>
          <h3>The Path to Upload</h3>
          <p>We're now inside of our <code class="language-">uploadImages</code> action and we're just about ready to
            actually take this list of images and upload them to the Imgur API. Before we do that let's check the Imgur
            API documentation for something we did not look at previously in relation to the Image Upload API endpoint.
            If you scroll down to the HEADERS section you'll notice that one of the headers that we have to apply to the
            API call is the Bearer with the <code class="language-">access_token</code> property on it. You can ignore
            the other header - Authorization Client ID - we would only use this header if we wanted to upload an image
            tied to our developer account. That's not what we're trying to do. We are trying to upload this image tied
            to a user's account - so we will use the Authorization Bearer with the <code class="language-">access_token</code>
            property.
          </p>
          <p>So inside the <code class="language-">uploadImages</code> action in the Image module we are going to
            perform the following steps:
          </p>
          <ul>
            <li>Get the access token</li>
            <li>Call the Imgur API and upload the list of images</li>
            <li>Redirect the user to the ImageList component.</li>
          </ul>
          <p>We are not going to write the actual upload logic inside of the <code
            class="language-">uploadImages</code> action, instead we will put the code in the api <span
            class="filename">imgur.js</span> file which is where we've been placing all of our logic that reaches out to
            Imgur so far. First let's get the <code class="language-">access_token</code> from the Auth module,
            exactly like we did in the <code
              class="language-">fetchImages</code> action. Rather than making use of the <code
              class="language-">commit</code> function we will swap it for <code class="language-"> rootState</code>
            which gives us access to all the state that contained inside of our Vuex store. We're going to reach over to
            the Auth module and get our <code class="language-">access_token</code> out of that:</p>
          <figure>
            <pre><code class="language-javascript">const { token } = rootState.auth;</code></pre>
            <figcaption>Fig 08-020</figcaption>
          </figure>
          <p>Next we're going to call our api imgur module to do the actual file upload. We will define a function
            called <code class="language-">uploadImages</code> shortly but for the moment let's just add the function
            call to the <code class="language-">uploadImages</code> action:
          </p>
          <figure>
            <pre><code class="language-javascript">await api.uploadImages(images, token);</code></pre>
            <figcaption>Fig 08-021</figcaption>
          </figure>

          <h3>Attaching Images with FormData</h3>
          <p>In the <span class="filename">imgur.js</span> api file add a new function called <code class="language-">uploadImages</code>
            :</p>
          <figure>
                    <pre><code class="language-javascript">uploadImages(images, token) {
  Array.from(images).map(image =&gt; {
      const formData = new FormData();
      formData.append('image', image);

      return axios.post(`$(ROOT_URL}/3/image`, formData, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
  });
}</code></pre>
            <figcaption>Fig 08-022</figcaption>
          </figure>
          <p>First we take the images file list object and turn it into an array - currently it is an array like object
            (this is what it is known as in the JavaScript world). We use <code
              class="language-">Array.from</code> and pass in the images file list object. We then call the <code
              class="language-">map</code> function and use it to iterate over all the images stored inside of the
            file list object. Inside the <code class="language-">map</code> function we're going to take every image
            and we're going to do a little bit of work on it to attempt to upload it to the Imgur API. Regarding
            uploading the image if you revisit the <a href="https://api.imgur.com/">Imgur documentation</a> you'll
            notice that we have to provide a key of <code
              class="language-">image</code> which should be a binary file or base64 data - we have to attach the
            actual image object itself to the request. If you remember back in the console when we logged out the file
            list we did not get direct access to the file itself - instead we got access to kind of a reference to the
            file. In order to take the actual image file and attach it to the request we make use of something called a
            <code
              class="language-">formData</code> object. This object is part of the standard vanilla Javascript spec
            and it allows us to take a reference to the file and attach the real file to the POST request that we're
            about to make to the Imgur API:</p>
          <figure>
            <pre><code class="language-javascript">const formData = new FormData();</code></pre>
            <figcaption>Fig 08-023</figcaption>
          </figure>
          <p>Then directly after that we're going to take the <code class="language-">formData</code> object and we're
            going to attach the reference to the image that was provided to our <code class="language-">map</code>
            function: </p>
          <figure>
            <pre><code class="language-javascript">formData.append('image', image);</code></pre>
            <figcaption>Fig 08-024</figcaption>
          </figure>
          <p>I'm using <code class="language-">image</code> because if you look back at the Imgur API documentation it
            specifically stated that we need to supply a key of <code class="language-">image</code> that contains the
            actual image file itself. Next we make the actual POST request to the Imgur API that's going to take that
            <code class="language-">formData</code> object and send off the entire object:</p>
          <figure>
<pre><code class="language-javascript">return axios.post(`$(ROOT_URL}/3/image`, formData, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});</code></pre>
            <figcaption>Fig 08-025</figcaption>
          </figure>
          <p>First we use the <code class="language-">return</code> keyword to make sure we return the request object.
            Then we write <code class="language-">axios.post</code> and supply the Url as the first argument. As the
            second argument we supply the <code class="language-">formData</code> object. Then, as the third object,
            we pass in the headers, as we did previously, along with the <code class="language-">access_token</code>
            that will give us access to modify our users account.
          </p>
          <p>That's just about it. The code above is going to take all of our images from inside the images list, it's
            going to create a <code class="language-">formData</code> object, attach our image to that object which is
            going to turn the image reference to a file itself, and then it's going to take the entire <code
              class="language-">formData</code> and post it off to the Imgur API. It will then repeat the same process
            again for every image inside of the image list object. In the next section we will discuss a small error in
            logic that we have inside the above function as it stands.</p>
          <h3>Concurrent Uploads</h3>
          <p>In the last section we put together the <code class="language-">uploadImages</code> function that loops
            over our list of images and try to upload each one - one at a time. Please note that the upload action is
            going to be running in parallel. So even though we use the terminology one at a time that we are going to
            upload on image and then move onto the next - it's going to try and upload every image at the exact same
            time. That's good, but there is one point we need to be aware of. We need to make sure that this <code
              class="language-">uploadImages</code>

            function returns exactly one promise that represents all of these separate image requests or all these
            separate uploads so that any other function that calls <code class="language-">uploadImages</code> will
            know when the overall upload is complete. To do so we are going to take the list of promises that get's
            returned from the <code
              class="language-">map</code> function:
          </p>
          <figure>
            <pre><code class="language-javascript">Array.from(images).map(image =&gt;</code></pre>
            <figcaption>Fig 08-026</figcaption>
          </figure>
          <p>So notice how we are running <code class="language-">map</code> function and inside the body we return
            the result of our POST request:</p>
          <figure>
                    <pre><code class="language-javascript">return axios.post(`${ROOT_URL}/3/image`, formData, {
    headers: {
        Authorization: `Bearer ${token}`
    }
                      });</code></pre>
            <figcaption>Fig 08-027</figcaption>
          </figure>
          <p>That return value is going to be a promise that represents the upload request itself. So from the entire
            statement we're going to get an array of promises each of which represents one individual image upload. So
            we take the entire list and assign it to a variable called promises:</p>
          <figure>
                    <pre><code class="language-javascript">uploadImages(images, token) {
    const promises = Array.from(images).map(image =&gt; {
        const formData = new FormData();
        formData.append('image', image);

        return axios.post(`${ROOT_URL}/3/image`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    });
                      }</code></pre>
            <figcaption>Fig 08-028</figcaption>
          </figure>
          <p>Then down at the bottom of this function we're going to add a little bit of code to wait for this entire
            array of promises to be resolved before we say - "Ok everything's done":</p>
          <figure>
            <pre><code class="language-javascript">return Promise.all(promises);</code></pre>
            <figcaption>Fig 08-029</figcaption>
          </figure>
          <p><code class="language-">Promise.all</code> is a built-in Javascript function that takes an array of
            promises and waits for every one of those inner promises to resolve and then resolves itself as well.
            Essentially we just added a little bit of code to make sure that we wait for every upload request to be
            completed before we allow this function to continue. Back over in our Images module and we will make sure
            that after all the work in <code class="language-">uploadImages</code> is completed and then we will
            automatically navigate our user over to our ImageList component. First import the router:</p>
          <figure>
            <pre><code class="language-javascript">import { router } from '../../main';</code></pre>
            <figcaption>Fig 08-029</figcaption>
          </figure>
          <p>Then add the following code to the uploadImages function:</p>
          <figure>
            <pre><code class="language-javascript">router.push('/');</code></pre>
            <figcaption>Fig 08-030</figcaption>
          </figure>
          <p>Test this in the browser. You will notice (if you have your Network tab open in the console) one or more
            POST requests that represent each of the individual file uploads. We then get redirected back over to <code
              class="language-">locahost:8080</code> and we should see our uploaded image(s) on the screen.
          </p>
          <h3>Layout with CSS Grid</h3>
          <p>We are now able to see a list of the images that we have uploaded using the Imgur API but they're
            definitely not showing up that nicely inside of our ImageList component. So in this section we're going to
            add in just a little bit of styling to make sure that these images show up better than they do at the
            moment. In the ImageList component you'll recall we have our root <code class="language-">div</code> and
            then we render our a list of images inside of it. Add the following class to the root <code
              class="language-">div</code>:</p>
          <figure>
<pre><code class="language-html">&lt;template&gt;
    &lt;div class=&quot;image-container&quot;&gt;
        &lt;img v-for=&quot;image in allImages&quot; :src=&quot;image.link&quot; /&gt;
    &lt;/div&gt;
  &lt;/template&gt;</code></pre>
            <figcaption>Fig 08-030</figcaption>
          </figure>
          <p>Then add a style tag to the bottom of the component: </p>
          <figure>
<pre><code class="language-html">&lt;style scoped&gt;
    .image-container {
        column-count: 3;
        column-gap: 0;
    }
    img {
        max-width: 100%;
        padding: 5px;
    }
  &lt;/style&gt;</code></pre>
            <figcaption>Fig 08-031</figcaption>
          </figure>
          <p>We are going to use something called CSS grids to style the list of images. We create three separate
            columns then have the images automatically lay themselves out inside those three columns. First we add some
            styling to our class which we added to the <code class="language-">div</code> above. We add <code
              class="language-">column-count</code> of 3 and <code class="language-">column-gap</code> of 0. This
            tells our ImageList component that we want to have three separate columns rendered containing all of our
            images. Then, by default, between each of those columns we're going to have a gap of zero pixels - so by
            default the columns are going to be touching. </p>
          <p>Directly after that we add some styling to the <code class="language-">img</code> tag for each of the
            images. We set the <code class="language-">max-width</code> to <code class="language-">100%</code> to
            make sure that the images dont break out of the column width which they have been assigned. Then we add a
            <code
              class="language-">padding</code> of 5 pixels which works closely with the <code
              class="language-">column-gap</code> of <code class="language-">0</code>. It's going to make sure that
            there's five pixels between every <code class="language-">img</code> tag both above and to the side. Now
            when our application loads back up we should see three separate columns and all of our images rendered
            neatly inside with 5px around each image (totalling 10px between images).</p>
          <h3>Hide Images on Logout</h3>
          <p>If we log out while on the ImageList component our list of images remain on the screen. We are going to
            address this now. In the ImageList component recall that we've got our computed property fetching a list of
            all or our images:</p>
          <figure>
            <pre><code class="language-javascript">computed: mapGetters(['allImages']),</code></pre>
            <figcaption>Fig 08-032</figcaption>
          </figure>
          <p>We will update the computed property to check if the user is currently logged in. We do this by adding
            another string:</p>
          <figure>
            <pre><code class="language-javascript">computed: mapGetters(['allImages',  'isLoggedIn']),</code></pre>
            <figcaption>Fig 08-033</figcaption>
          </figure>
          <p>Now that this getter is wired up we can decide what content to show inside of our component based upon
            whether or not the user is logged in. Wrap everything inside the template in a new <code
              class="language-">div</code>:</p>
          <figure>
<pre><code class="language-html">&lt;template&gt;
    &lt;div v-if=&quot;isLoggedIn&quot; class=&quot;image-container&quot;&gt;
        &lt;img v-for=&quot;image in allImages&quot; :src=&quot;image.link&quot; /&gt;
    &lt;/div&gt;
    &lt;h2 v-else&gt;Log in to get started!&lt;/h2&gt;
  &lt;/template&gt;</code></pre>
            <figcaption>Fig 08-034</figcaption>
          </figure>
          <p>We add a <code class="language-">v-if</code> expression to check the value of <code class="language-">isLoggedIn</code>
            . If they are render the list of images as before. If they are not then render the <code
              class="language-">h2</code> element with the <code
              class="language-">v-else</code> directive.
          </p>
          <h3>Expanding the App</h3>
          <p>We've just about wrapped up our application but before we finish I want to mention one way in which you
            could possibly expand this application in the future. The Imgur API documentation details an Account
            Favorites endpoint. This endpoint returns a list of all the diferent images this user has ever liked over on
            Imgur.com. One way to expand the application would be to add a new component and another tab into the
            application that showed a list of all the different images that this user has ever favourited. The challenge
            to this task is this endpoint can return either a Gallery Image or a Gallery Album. Up until now we have
            only worked with Gallery Image. Gallery Album is an array of images. You would need to write code to detect
            which of the two response models you are working with.</p>
          <p>I hope you enjoyed learning about Vue - goodbye.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  img {
    max-width: 100%;
  }
</style>
