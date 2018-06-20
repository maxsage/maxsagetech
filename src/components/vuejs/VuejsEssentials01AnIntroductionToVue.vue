<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2>An Introduction to Vue</h2>
                </div>
                <div class="panel-body">
                    <h3>How to Get Help</h3>
                    <p>In this section Stephen Grider discusses the best ways of contacting him if you get stuck during
                        the course:
                    </p>
                    <ul>
                        <li>The course discussion <a
                                href="https://www.udemy.com/vue-js-course/learn/v4/questions/4408150"> board</a> is
                            usually checked once a day Monday through Friday.
                        </li>
                        <li>The second, and probably most effective, option is to contact Stephen via a direct <a
                                href="https://www.udemy.com/user/sgslo/"> message</a> on Udemy.
                        </li>
                        <li>Lastly Stephen invites you to Tweet him at <a
                                href="http://twitter.com/home?status=Message@ste_grider">@ste_grider</a></li>
                    </ul>
                    <h3>Our First Vue App</h3>
                    <p>In this section Stephen supplies a link to a <a target="_blank" href="http://goo.gl/NrtSgX">Codepen</a>
                        example which demonstrates the power of Vue.
                    </p>
                    <p>Codepen is similar to many of the other (JSFiddle etc.) prototyping tools out there. We add HTML,
                        CSS and JS code to the relevant windows and the result is shown in the output window.
                    </p>
                    <p>The Codepen example already includes a small amount of JavaScript that Stephen has authored to
                        save a bit of time.
                    </p>
                    <p>Add the following code to the HTML tab:</p>
                    <figure>
                    <pre class="prettyprint">&lt;div id=&quot;root&quot; @mousemove=&quot;onMouseMove&quot;&gt;
&lt;/div&gt;</pre>
                        <figcaption>Fig 01-001</figcaption>
                    </figure>
                    <p>Note the @ symbol prefixing the mousemove attribute, the fact that the mousemove attribute is not
                        capitalized and that we are using double quotes around the word onMouseMove.
                    </p>
                    <p>Add two additional child divs. On the first div add a :style option setting the value to
                        styleOne. Do the same for the second div but specify a style of styleTwo instead:
                    </p>
                    <figure>
                    <pre class="prettyprint">&lt;div id=&quot;root&quot; @mousemove=&quot;onMouseMove&quot;&gt;
  &lt;div :style=&quot;styleOne&quot;&gt;&lt;/div&gt;
  &lt;div :style=&quot;styleTwo&quot;&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
                        <figcaption>Fig 01-002</figcaption>
                    </figure>
                    <p>That's all the HTML we will need. Open the JS tab and declare a brand new Vue application passing
                        it an empty object:
                    </p>
                    <figure>
                    <pre class="prettyprint">new Vue({

});</code></pre>
                        <figcaption>Fig 01-003</figcaption>
                    </figure>
                    <p>Next we will add in some configuration to the object.</p>
                    <p>First we will add the el property which specifies where the application should attempt to render
                        itself inside of our HTML structure:
                    </p>
                    <figure>
                    <pre class="prettyprint">new Vue({
  el: '#root',

});</pre>
                        <figcaption>Fig 01-004</figcaption>
                    </figure>
                    <p>Next we will initialize the data property of our application (we will talk a lot about data in
                        future modules):
                    </p>
                    <figure>
                    <pre class="prettyprint">new Vue({
  el: '#root',
  data: { styleOne: {}, styleTwo: {} },
});</pre>
                        <figcaption>Fig 01-005</figcaption>
                    </figure>
                    <p>data is an object that contains two empty objects - styleOne and styleTwo.</p>
                    <p>Next add the methods option:</p>
                    <figure>
                    <pre class="prettyprint">new Vue({
  el: '#root',
  data: { styleOne: {}, styleTwo: {} },
  methods: {
    onMouseMove(event) {

    }
  }
});</pre>
                        <figcaption>Fig 01-005</figcaption>
                    </figure>
                    <p>methods is also an empty object that is going to have one function tied to it called onMouseMove
                        which will be called with some event.
                    </p>
                    <p>Inside the function body add the following code:</p>
                    <figure>
                    <pre class="prettyprint">new Vue({
  el: '#root',
  data: { styleOne: {}, styleTwo: {} },
  methods: {
    onMouseMove(event) {
      this.styleOne = transform(-event.clientX / event.clientY);
      this.styleTwo = transform(event.clientX / event.clientY);
    }
  }
});</pre>
                        <figcaption>Fig 01-006</figcaption>
                    </figure>
                    <p>Make sure you have the X and Y capitalized inside these statements.</p>
                    <p>In the CSS tab add the following styling:</p>
                    <figure>
                    <pre class="prettyprint">#root {
  height: 100vh;
  width: 100vw;
}

#root div {
  position: absolute;
  height: 100%;
  width: 100%;
  box-shadow: 0 0 50px grey;
}</pre>
                        <figcaption>Fig 01-007</figcaption>
                    </figure>

                    <p>Finally in Codepen click the Assets button and from the Patterns tab select a the wavy lines
                        pattern (which will copy it to the clipboard). Back in the CSS tab paste the clipboard in after
                        the box-shadow declaration:
                    </p>
                    <figure>
                    <pre class="prettyprint">#root {
  height: 100vh;
  width: 100vw;
}

#root div {
  position: absolute;
  height: 100%;
  width: 100%;
  box-shadow: 0 0 50px grey;
  background-image: url('data:image/svg+xml,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;100&quot; height=&quot;18&quot; viewBox=&quot;0 0 100 18&quot;%3E%3Cpath fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.4&quot; d=&quot;M61.82 18c3.47-1.45 6.86-3.78 11.3-7.34C78 6.76 80.34 5.1 83.87 3.42 88.56 1.16 93.75 0 100 0v6.16C98.76 6.05 97.43 6 96 6c-9.59 0-14.23 2.23-23.13 9.34-1.28 1.03-2.39 1.9-3.4 2.66h-7.65zm-23.64 0H22.52c-1-.76-2.1-1.63-3.4-2.66C11.57 9.3 7.08 6.78 0 6.16V0c6.25 0 11.44 1.16 16.14 3.42 3.53 1.7 5.87 3.35 10.73 7.24 4.45 3.56 7.84 5.9 11.31 7.34zM61.82 0h7.66a39.57 39.57 0 0 1-7.34 4.58C57.44 6.84 52.25 8 46 8S34.56 6.84 29.86 4.58A39.57 39.57 0 0 1 22.52 0h15.66C41.65 1.44 45.21 2 50 2c4.8 0 8.35-.56 11.82-2z&quot;%3E%3C/path%3E%3C/svg%3E');
}</pre>
                        <figcaption>Fig 01-008</figcaption>
                    </figure>
                    <p>Now run the application and you will see an interesting visualization. This demonstrates the
                        power of Vue - just a small amount of code can produce impressive results.
                    </p>
                    <h3>App Overview</h3>
                    <p>In the last section we worked on a little Codepen visualization tool. We are not going to go
                        through the code we wrote for this example. Instead we are going to create another little
                        Codepen application that will give you a better idea of the structure of a Vue application.
                    </p>
                    <p>The application we are going to build is an Identicon generator:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig01-009.png"/>
                        <figcaption>Fig 01-009</figcaption>
                    </figure>
                    <p>The user will enter a small amount of text into the input box. We are going to take that text and
                        use it to create what is called an Identicon - which is short for Identifying Icon. An Identicon
                        is a colourful image often used when a user doesn't supply their own image. The Identicon
                        graphic is based around the input string. Therefore if you enter the same input string twice the
                        two images will be identical.
                    </p>
                    <p>We are going to use a library that actually creates the Identicon but we will need to concern
                        ourselves with - how we take in user input and how we call functions.
                    </p>
                    <h3>A Codepen Starter</h3>
                    <p>We will start working on this application by creating a new Codepen instance. The starter
                        template can be found at the following address:
                    </p>
                    <a target="_blank" href="http://goo.gl/4TG4Bq">Codepen Identicon Example</a>
                    <p>There is a tiny amount of configuration that has already been performed for us in this template.
                        You can see this by clicking on the gear in the JS panel which will open the Pen Settings window
                        with the JavaScript tab pre-selected:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig01-010.png"/>
                        <figcaption>Fig 01-010</figcaption>
                    </figure>
                    <p>Towards the bottom of the window you will see a link to the jdenticon.min.js library which we
                        will use to create the Identicon. There is also a link to the vue.min.js library.
                    </p>
                    <p></p>
                    <h3>Vue Templates and Instances</h3>
                    <p>In order for our application to work we will need:</p>
                    <ul>
                        <li>Some starting text and form input on the screen.</li>
                        <li>Something to happen when a user types in the input.</li>
                    </ul>
                    <p>Any time a user enters text into the Input text field we want to run some JavaScript code that
                        will create the Identicon image itself and then somehow output that to the screen as well.
                    </p>
                    <p>So we have just described two aspects of our application.</p>
                    <p>On the one hand we have the aspect of somehow rendering or getting content to appear on the
                        screen.
                    </p>
                    <p>On the other hand, in the second list item, we are talking about somehow interacting with user
                        input.
                    </p>
                    <p>In the Vue.js world we map up these two different tasks to two different elements or two
                        different parts of a Vue application
                    </p>
                    <p>The first part describes the content and structure that appears on the screen. That task is
                        handled by creating what is called a Vue template. So we create new templates to show
                        information to users. Vue Templates are created in HTML in our application.
                    </p>
                    <p>The second part - handling user input is going to be covered by creating what is called a Vue
                        instance. A Vue instance is created by writing out some amount of Javascript code. The Vue
                        instance is responsible for actually dealing with user input. So, in this example, anytime the
                        user types some text into the input field the Vue instance will take the entered text and
                        generate an Identicon out of it, and then pass the identicon back to the template which will
                        then present it to the user on the screen.
                    </p>
                    <p>This scenario describes just one possible way of many of structuring a Vue application. An
                        example of a different configuration would consist of the Vue Template being created in the
                        Javascript instead of the Html.
                    </p>
                    <h3>Creating the Template</h3>
                    <p>In the last section we spoke about the differences between a Vue template and a Vue Instance. We
                        are now going to get started on creating our Vue Template - the presentation layer for our
                        application. For the first iteration of our template we are going to write essentially just
                        plain Html.
                    </p>
                    <p>In Codepen add the following Html:</p>
                    <figure>
                    <pre class="prettyprint">&lt;div&gt;
  &lt;h3&gt;My Identicon Generator&lt;/h3&gt;
  &lt;div&gt;
    Input:
    &lt;input /&gt;

  &lt;/div&gt;
  &lt;div&gt;
    Output:
  &lt;/div&gt;
&lt;/div&gt;</pre>
                        <figcaption>Fig 01-011</figcaption>
                    </figure>
                    <p>This is our first Vue template (we will re-visit this Html later and add some more additional
                        syntax that will make it clear that we are not working with plain Html here - but a Vue
                        template).
                    </p>
                    <h3>Linking Templates and Instances</h3>
                    <p>In the last section we created our Vue template on the Html side of our application. We are now
                        going to define our Vue instance in the Javascript part of our application. In the JS Panel in
                        Codepen add the following code:
                    </p>
                    <figure>
                    <pre class="prettyprint">new Vue({

});</pre>
                        <figcaption>Fig 01-012</figcaption>
                    </figure>
                    <p>Inside of the object defined by the curly braces we are going to add in a bunch of different
                        properties over time. All these different properties are going to serve to customize how this
                        Vue instance behaves. The Vue instance and the properties contained within are where a lot of
                        the complexity of Vue itself comes into play. Understanding these properties and using them
                        correctly is what will make you a professional Vue engineer.
                    </p>
                    <p>The first property that we are going to make use of is the el property:</p>
                    <figure>
                    <pre class="prettyprint">new Vue({
  el:
});</pre>
                        <figcaption>Fig 01-013</figcaption>
                    </figure>
                    <p>el is short for the word element. The el property ties one Vue instance to one Vue template that
                        has been defined in our application. To achieve this add an id attribute to the root div in your
                        Vue template with a value of &quot;app&quot;:
                    </p>
                    <figure>
                    <pre class="prettyprint">&lt;div id=&quot;app&quot;&gt;
  &lt;h3&gt;My Identicon Generator&lt;/h3&gt;
  &lt;div&gt;
    Input:
    &lt;input /&gt;

  &lt;/div&gt;
  &lt;div&gt;
    Output:
  &lt;/div&gt;
&lt;/div&gt;</pre>
                        <figcaption>Fig 01-014</figcaption>
                    </figure>
                    <p>Now update the Vue instance's el: property to point to this div using the id:</p>
                    <figure>
                    <pre class="prettyprint">new Vue({
  el:  '#app'
});</pre>
                        <figcaption>Fig 01-015</figcaption>
                    </figure>
                    <p>The #app we supplied provides a DOM Query selector to our instance that tell's it exactly where
                        it's template exists inside the DOM. This is what really links together the Javascript and Html
                        sides of our application.
                    </p>
                    <h3>Step by Step Implementation</h3>
                    <p>In the last section we defined our Vue instance and then provided an el property that told our
                        Vue instance what area of the DOM it was responsible for.
                    </p>
                    <p>We will see change inside of our Html template only as we start to add code to our Vue instance.
                    </p>
                    <p>The steps that are going to occur inside of our application are as follows:</p>
                    <ul>
                        <li>Detect that the user has entered some new text.</li>
                        <li>Get the text the user entered.</li>
                        <li>Use that text to generate a new identicon.</li>
                        <li>Show the identicon next to 'output'</li>
                    </ul>
                    <p>One detail worth highlighting is that we want to update the identicon displayed as the user
                        enters each character into the text input. We are not going to wait for the user to type the
                        whole string and then press enter. It is with every single key press that we are going to
                        generate a new identicon.
                    </p>
                    <p>Once we get the text the user entered we can use it to generate the new Identicon itself (at
                        which point we will use the Identicon library).
                    </p>
                    <p>Finally we output the Identicon to the screen next to the Output section.</p>
                    <p>The four steps above may seem very obvious. However the reason we did this is that for everyone
                        of the above steps Vue has a different feature built-in to help you implement each step (this
                        will help you learn about different pieces of the Vue api)
                    </p>
                    <h3>Defining Instance Methods</h3>
                    <p>In the last section we spoke about the four different steps we are going to implement to get our
                    application working. In this section we are going to start off with step number one - detecting
                    when the user enter some new text and responding by running some custom Javascript code.</p>
                    <p>So we will focus on this first step inside this section. To implement this step we are going
                    to add a method to the Vue instance. That method will get called anytime the user enters some
                    new text.</p>
                    <p>What is a method? A method is a function that is going to be tied to our View instance. That
                    function can then be called at any point in time to somehow implement or update our user interface.
                    </p>
                    <p>Let's first begin by implementing the method and then we'll figure out how to call it any time a
                    user enters some text. First the method:</p>
                    CFig



                    <h3>Defining Vue Directives</h3>
                    <h3>Retrieving Event Information</h3>
                    <h3>Imperative vs Declarative Programming</h3>
                    <h3>Declarative Apps with the Vue API</h3>
                    <h3>Data, Computed, and Methods</h3>
                    <h3>Updated Data Values</h3>
                    <h3>Computed Properties</h3>
                    <h3>Review from Start to Finish</h3>
                    <h3>Template Placement</h3>
                    <h3>Referencing Data in the Template</h3>
                    <h3>Expressions in Templates</h3>
                    <h3>Coding Exercise 1 Rendering with String Templates</h3>
                    <h3>Coding Exercise 2 JS Expressions with String Templates</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VuejsEssentials01AnIntroductionToVue"
    };
</script>

<style scoped></style>
