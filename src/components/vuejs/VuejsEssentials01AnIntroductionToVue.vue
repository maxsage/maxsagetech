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
                        when the user enter some new text and responding by running some custom Javascript code.
                    </p>
                    <p>So we will focus on this first step inside this section. To implement this step we are going to
                        add a method to the Vue instance. That method will get called anytime the user enters some new
                        text.
                    </p>
                    <p>What is a method? A method is a function that is going to be tied to our View instance. That
                        function can then be called at any point in time to somehow implement or update our user
                        interface.
                    </p>
                    <p>Let's first begin by implementing the method and then we'll figure out how to call it any time a
                        user enters some text. First the method:
                    </p>
                    <figure>
                    <pre class="prettyprint">new Vue({
  el:  '#app',
  methods: {

  }
});</pre>
                        <figcaption>Fig 01-016</figcaption>
                    </figure>
                    <p>Methods is going to have an object tied to it. Right now there's just one method we care about
                        which is the method that's going to be called anytime a user enters some text into the input
                        field. But over time if we had a more complicated template with more text inputs or more buttons
                        of just more ways of interacting with it we might end up having many different methods defined
                        inside the subject.
                    </p>
                    <p>So let's begin by implementing this method that's going to be called anytime a user enters some
                        text.
                    </p>
                    <figure>
                    <pre class="prettyprint">new Vue({
  el:  &apos;#app&apos;,
  methods: {
    onInput: function() {
      console.log(&apos;Someone typed something&apos;);
    }
  }
});</pre>
                        <figcaption>Fig 01-017</figcaption>
                    </figure>
                    <p>It is not mandatory for the function name to be onInput, it just makes it clear that this
                        function will be called anytime the user enters some text. Inside the function we write a
                        message to the console. View the console in Chrome. When you type in the input text field you
                        will note that you don't see anything written to the console.
                    </p>
                    <p>This is because even though we've defined a method called onInput we have not instructed our view
                        instance or our view template that we want our method to be called when a user enters text into
                        the input.
                    </p>
                    <h3>Defining Vue Directives</h3>
                    <p>In the last section we defined our first method inside the methods object inside our Vue
                        instance. We defined a function called onInput that hopefully will be executed anytime a user
                        enters some text into the input.
                    </p>
                    <p>We will add a vue directive to the input field to hook it up to our onInput method:</p>
                    <figure>
                        <pre class="prettyprint">&lt;input v-on:input=&quot;onInput&quot; /&gt;</pre>
                        <figcaption>Fig 01-018</figcaption>
                    </figure>
                    <p>If we now enter some text into the input we see messages in the console.</p>
                    <p>The above code is an example of a Vue directive. A directive is a piece of template syntax inside
                        a view that somehow enhances the behavior of otherwise normal HTML code.
                    </p>
                    <p>So behind the scenes when our instance first boots up it looks at the el: property and, as we
                        said previously, it tries to find some element inside the DOM with an id of app - in this
                        example it finds the root div with an id of "app" and it scans over all of the Html contained in
                        the div looking for any directives like the one we just added.
                    </p>
                    <p>When it finds a directive it performs a couple of additional steps to parse the directive and
                        figure out how to correctly process it. In our case we have to find a directive that sets up an
                        event handler.
                    </p>
                    <p>The left hand-side of the Vue directive in this statement:</p>
                    <figure>
                        <pre class="prettyprint"> &lt;input v-on:input=&quot;onInput&quot; /&gt;</pre>
                        <figcaption>Fig 01-019</figcaption>
                    </figure>
                    <p>v-on means we are trying to define an event handler. We then place a colon and then the name of
                        the event that we want to watch for - in this case input. So any time a user enters input into
                        this input tag Vue is going to attempt to do something for us. The thing that it actually does
                        is defined to the right of the equals sign - in our case we call the onInput method.
                    </p>
                    <p>The event handler directive is one of the more straightforward Vue directives but over time we
                        will start to see some more complicated directives.
                    </p>
                    <h3>Retrieving Event Information</h3>
                    <p>In the last section we used a Vue directive to tie any event that occurred to our text input to
                        the onInput method that we defined inside of our Vue instance.
                    </p>
                    <p>Like I said previously Vue directives are one of the more complicated parts of Vue - which is
                        why, many time throughout this course, we are going to review how they work.
                    </p>
                    <p>Now we have the ability to run a function anytime the user types in this input we need to move to
                        our next step which is to somehow get the text that the user entered.
                    </p>
                    <p>To do this we are going to use our on input function. The onInput function gets called with a
                        single argument that we usually refer to as the event object. This is an object that contains a
                        bunch of different information about the event that just occurred - in our case an input event.
                        The event object has the actual text that the user entered so we can make use of that argument
                        to figure out exactly what text the user typed.
                    </p>
                    <p>Inside the methods object in the Vue instance find the onInput function and reference the single
                        argument that is provided to it - like I just said we usually refer to this as the event object.
                        The event object has a property called target.value and that will be a reference to the text
                        that the user entered. For the moment let's just write that value to the console:
                    </p>
                    <figure>
                    <pre class="prettyprint">new Vue({
  el:  '#app',
  methods: {
    onInput: function() {
      console.log(event.target.value);
    }
  }
});</pre>
                        <figcaption>Fig 01-020</figcaption>
                    </figure>
                    <p>event is a reference to the event that just occurred, target is a reference to the Html element
                        that just had the event applied to it and then value is a reference to the current value of that
                        text input.
                    </p>
                    <p>So if you now enter some text into the input field you should see it appearing over in the
                        console.
                    </p>
                    <h3>Imperative vs Declarative Programming</h3>
                    <p>In the previous section we figured out how to use the event object to get access to the text that
                        the user entered into our text input. Next, instead of moving onto step 3 - Use that text to
                        generate a new identicon, we are going to take a slight detour.
                    </p>
                    <p>We are going to get a better idea of how to structure and build Vue applications.</p>
                    <p>We are going to discuss the difference between declarative and imperative programming styles
                        especially as applied to Vue applications in the world of web development.
                    </p>
                    <p>In the world of web development from say maybe 2005 all the to 2013 or so we practiced a
                        programming style referred to as imperative programming. With imperative programming we write
                        out code that lists exactly what our application should do step by step.
                    </p>
                    <p>So our code follows a pattern very similar to the list we described earlier:</p>
                    <ul>
                        <li>Detect that the user has entered some new text.</li>
                        <li>Get the text the user entered.</li>
                        <li>Use that text to generate a new identicon.</li>
                        <li>Show the identicon next to 'output'</li>
                    </ul>
                    <p>This is an example of an imperative design flow where we list out exactly what to do step by
                        step.
                    </p>
                    <p>By contrast in the world of declarative programming we instead list out some rules that our
                        application should follow. We then provide what we refer to as some initial state to our
                        application and we let those rules kind of define how our application behaves.
                    </p>
                    <p>Now these very quick descriptions I'm giving you probably don't make a lot of sense so let's walk
                        through the differences between imperative and declarative programming by walking through a
                        little analogy.
                    </p>
                    <p>OK so I want you to imagine for just a second that maybe you and I are not building software
                        anymore. Maybe instead you and I bake cakes for a living. So we go into work every single day
                        and we have to bake a cake. Now unfortunately you and I maybe very poor cooks and we don't
                        really know how to bake a cake so our boss sits down and gives us a list of directions -
                        essentially a recipe.
                    </p>
                    <p>So we have one recipe written in an imperative style:</p>
                    <ul>
                        <li>Mix 1 cup flour and 1 cup sugar in a bowl.</li>
                        <li>Add 1 egg to the bowl and mix thoroughly.</li>
                        <li>Pour mixture into a pan.</li>
                        <li>Put the pan into the oven for 30 minutes at 350F.</li>
                    </ul>
                    <p>And then we have the same recipe written in a declarative style:</p>
                    <ul>
                        <li>1 egg, 1 cup flour, 1 cup sugar</li>
                        <li>If ingredients have been mixxed, put them in a pan</li>
                        <li>If ingredients are unmixed, mix them in a bowl</li>
                        <li>If ingredients are in a pan, put in oven for 30 mins at 350F</li>
                    </ul>
                    <p>So let's walk through both these recipes and get a better idea of the differences between
                        imperative and declarative approaches.
                    </p>
                    <p>Imperative approaches are characterized by step by step directions. They tell you - start with
                        step 1, then go directly to step 2 and do it, then go to step 3 etc. After you have gone through
                        this entire list of steps you eventually end up with some end product.
                    </p>
                    <p>So in the context of baking a cake maybe our imperative recipe tells us to take these raw
                        ingredients, mix them together, pour the ingredients into a pan and then put that pan into an
                        oven - after you go through these steps you end up with a cake.
                    </p>
                    <p>In a declarative world it's a little bit different as you might imagine.</p>
                    <p>So with a declarative recipe we would separate out our recipe into maybe two separate parts. We
                        would start out with one part that lists, what we might refer to, as the initial state of our
                        recipe. The initial state would be like the variables and in the case of a recipe our variables
                        would be maybe our ingredient quantities or the ingredient types. We then take this initial
                        state or this initial listing of ingredients and then we apply a set of rules to them. So you
                        can kind of imagine that we take these ingredients or this initial recipe, we pass it through
                        the rules one time.
                    </p>
                    <p>Then maybe after that first time we then stick it into the rules a second time and then maybe
                        after we go through the second time we go through a third time - repeating the process over and
                        over until eventually we come out the other side with a baked cake.
                    </p>
                    <p>So it starts to get really important to understand how we might structurally structure these
                        rules in a declarative approach.
                    </p>
                    <p>So for the rules in a declarative recipe we might say okay let's examine our ingredients or our
                        state, if our ingredients have been mixed then put them in a pan. Well, clearly with our initial
                        state that doesn't quite match - we have not yet mixed our ingredients - so let's go down to
                        rule number 2 which says if the ingredients are unmixed then mix them together in a bowl. Ok,
                        well that's good, we have unmixed ingredients so we will mix them all together in a bowl.
                    </p>
                    <p>So, maybe now, instead of having one egg, cup flour, and sugar we would instead have one bowl
                        mixed ingredients. We then take that state and apply it to our rules again.
                    </p>
                    <p>We've now got our mixed ingredients so we're going to look at rule number 1 which says if
                        ingredients have been mixed put them in a pan.
                    </p>
                    <p>Ok that applies to us so let's do that - so now we have one batch ingredients in a pan we work
                        through our rules again.
                    </p>
                    <p>Rule number three says if we're in a pan then put in the ovent for 30 minutes at 350F. Well that
                        definitely applies to us. So we take this and we put it in the oven for 30 minutes at 350F and
                        then finally we come out with a baked cake.
                    </p>
                    <p>So in the world of declarative programming, or declarative cooking I suppose, we have some state
                        that we start off with, then we take that state and apply a set of rules to it.
                    </p>
                    <p>Now I know that this might sound like it's a real complicated approach for what we are trying to
                        build right now so I took the liberty of writing our our applications rules (of sorts) in an
                        imperative and declarative approach.
                    </p>
                    <p>So let's consider how we might build our Identicon application in an imperative approach and a
                        declarative approach.
                    </p>
                    <p>So in an imperative approach to our current program, which is kind of what we're following now,
                        we might say that whenever a user enters some text we want to:
                    </p>
                    <ol>
                        <li>Retrieve the new input value</li>
                        <li>Turn the input value into an identicon</li>
                        <li>Put the identicon on the screen</li>
                    </ol>
                    <p>Now this might seem like a very direct and easy to understand flow and you might be thinking -
                        "Hey imperative programming - I understand this, it's what I'm used to"
                    </p>
                    <p>Well maybe for very simple flows like this it makes sense but most web applications, that we
                        spend any amount of time building, have flows that are much more complicated than this.
                    </p>
                    <p>So even though I'm giving you a very simple example here I hope that you can, kind of,
                        extrapolate this example and imagine a more complicated flow where going step by step in code
                        might be a little bit more challenging.
                    </p>
                    <p>Now let's look at a declarative approach:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig01-021.png"/>
                        <figcaption>Fig 01-021</figcaption>
                    </figure>
                    <p>So with a declarative approach maybe we would say that we've got some initial state or some
                        initial ingredients of sorts of a single variable called something like textInput which maybe
                        starts off as an empty string.
                    </p>
                    <p>We'll then take this initial state, of sorts, and apply it to this set of rules that we defined
                        inside of our Vue instance. So maybe we'll say "If a user enters text then update text input".
                        Well that doesn't really apply to us so we'll say "If the template is rendered calculate the
                        identicon". Well that doesn't really apply to us either so we'll say "If text input is updated
                        re-render the template." Well that doesn't apply either so we'll just wait around for something
                        to happen.
                    </p>
                    <p>So maybe then at some point a user updates our text input and when that happens we might apply
                        rule number 1 - "If user enters text, update textInput". So we update textInput:
                    </p>
                    <figure>
                        <pre class="prettyprint">textInput = &quot;abcd&quot;</pre>
                        <figcaption>Fig 01-022</figcaption>
                    </figure>
                    <p>And then we look at the other rules that are listed. Rule number 2 - "If template is rendered,
                        calculate the identicon". This does apply so we'll re-render the template and now if we look
                        back at rule number two - "If template is rendered, calculate the identicon." so let's calculate
                        the identicon and then render it to the screen.
                    </p>
                    <p>So I know that the rules we listed for the identicon application don't quite translate from the
                        idea of baking to what we're doing but it gives you the idea that inside of our Vue instance
                        we'll declare some type of data or variable. Then, inside of that instance we'll declare the set
                        of different rules that tells our Vue instance how it should behave whenever something occurs
                        inside of our application.
                    </p>
                    <p>So, again, in general you and I, inside a Vue, want to strive for this more declarative
                        programming style as opposed to a more imperative approach. Again, I know that imperative
                        programming might seem like a little bit more clear and obvious and it might be more challenging
                        to understand exactly why we would take the declarative approach but in general a declarative
                        approach scales very nicely for larger applications.
                    </p>
                    <p>Ok, now we've got this idea of declarative programming in mind, in the next section we'll talk a
                        little bit more about how we can implement these declarative rules into our Vue instance and get
                        our application working.
                    </p>
                    <h3>Declarative Apps with the Vue API</h3>
                    <p>In the last section we talked about some of the differences between imperative and declarative
                        programming. We're now going to take this idea of declarative programming and apply it to our
                        actual application with some real terminology that is used in Vue instances.
                    </p>
                    <p>So the first thing we're going to do is take a look at each of these steps/rules here:</p>
                    <ul>
                        <li>textInput = "abcd1234"</li>
                        <li>If user enters text, update 'textInput'</li>
                        <li>If template is rendered calculate the identicon</li>
                        <li>If 'textInput' is updated re-render the template</li>
                    </ul>
                    <p>I want you to consider the purpose of each of these rules and to imagine when each of these rules
                        would be applied.
                    </p>
                    <p>So at the very top we start out with that initial state of sorts (or initial list of ingredients)
                        which we might also refer to as our data inside our application. If we had to characterize the
                        purpose of the the first rule: "If user enters text, update 'textInput'" we would say it updates
                        our data or state. So this is really an update action of an action that changes things inside of
                        our application.
                    </p>
                    <p>The second step: "If template is rendered, calculate the identicon" is a step that uses our
                        data/state to show stuff on the screen. Another way to put it would be to say that this step
                        consumes data to present it to users inside of our application.
                    </p>
                    <p>The last step: "If 'textInput' is updated re-render the template" just kind of happens
                        automatically with the view behind the scenes. So anytime you or I change our state or change
                        our data inside of our application our Vue instance is going to automatically update everything
                        on the screen.
                    </p>
                    <p>Let's now apply some more precise terminology to each of these steps.</p>
                    <p>In the following figure the terms on the right hand side are the different properties that you
                        and I are going to eventually define on our Vue instances to implement each of the different
                        steps:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig01-023.png"/>
                        <figcaption>Fig 01-023</figcaption>
                    </figure>
                    <p>So first off, at the very top, we've been referring to this kind of initial list of ingredients
                        or our initial state of sorts. In a Vue instance we refer to this as a property defined as
                        'data'. So you and I are going to define a data property inside of our Vue instance and that's
                        going to tell our instance what the starting ingredients, of sorts, are inside our application.
                    </p>
                    <p>Next, you and I are going to define a couple of different methods eventually. So far we only
                        defined one method - the onInput method - but the purpose of the method's property is to define
                        a bunch of functions that are supposed to somehow update our data. So all the functions you're
                        going to see on methods are going to describe how we might update the data inside of our
                        application. Looking at our current application that definitely matches up.
                    </p>
                    <p>The computed property is a little bit more complicated. Anytime you and I want to kind of consume
                        data and get it into our actual template, or show it on the screen in some fashion, we're going
                        to use a computed property.
                    </p>
                    <p>So, one more time, these are three pieces of terminology or properties that you and I are doing
                        to define inside our Vue instance eventually:
                    </p>
                    <p><strong>data</strong> initializes the data inside of our application</p>
                    <p><strong>methods</strong> changes/updates the data inside of our application</p>
                    <p><strong>computed</strong> consumes the data and formats/transforms it for display on the screen
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig01-024.png"/>
                        <figcaption>Fig 01-024</figcaption>
                    </figure>
                    <p>Now obviously the text that a user enters into our application is in itself like a viewable value
                        but, in this example, we are trying to display an identicon so a viewable value would be like
                        taking that text and turning it into an identicon.
                    </p>
                    <p>In the following figure you can see a simplified version of the previous figure:</p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig01-024.png"/>
                        <figcaption>Fig 01-025</figcaption>
                    </figure>
                    <p>So we've now got a good idea of some of these different parts of the Vue API. In the next section
                        we'll start to use the data, methods and computed properties.
                    </p>
                    <h3>Data, Computed, and Methods</h3>
                    <p>In the last section we took the idea of declarative programming and applied it to our application
                        and then more specifically took a look at the Vue API and some of the different properties that
                        we're going to define on our Vue instance.
                    </p>
                    <p>So let's now go back over to Codepen and start defining these different properties inside of the
                        JavaScript side of our application.
                    </p>
                    <p>Now, you will recall that we already defined that methods property. I'm going to add a comment
                        inside methods object to remind me of it's purpose:
                    </p>
                    <figure>
                    <pre class="prettyprint">new Vue({
  el:  '#app',
  methods: { // Use these function to change data
    onInput: function() {
      console.log(event.target.value);
    }
  }
});</pre>
                        <figcaption>Fig 01-026</figcaption>
                    </figure>
                    <p>Next I will define the data and computed properties with comments to describe their purpose:</p>
                    <figure>
                    <pre class="prettyprint">new Vue({
  el:  '#app',
  data: { // Initialize our list of 'ingredients'

  },
  computed: { // Turn data into viewable values

  },
  methods: { // Use these function to change data
    onInput: function() {
      console.log(event.target.value);
    }
  }
});</pre>
                        <figcaption>Fig 01-027</figcaption>
                    </figure>
                    <p>Now one thing that might be a little bit misleading here is that with the methods property we
                        have clearly defined a function. However, inside of this computed object we are also going to
                        define functions - functions that are going to be executed to turn our data into viewable
                        values. But with the data property we are not defining functions, instead we are defining simple
                        properties and private property names and property values. As an example we could initialize a
                        textInput property like so:
                    </p>
                    <figure>
                    <pre class="prettyprint">  data: { // Initialize our list of 'ingredients'
    textInput: ''
  },</pre>
                        <figcaption>Fig 01-028</figcaption>
                    </figure>
                    <p>So, again, with data we define simple key value pairs that have say strings or numbers or arrays
                        or objects. But with the computed and methods properties we define functions on both and those
                        functions are executed to either update our data (methods property) or turn our data into
                        viewable values (computed property)
                    </p>
                    <p>Now that we've added in some comments to further guide us we will continue in the next section to
                        start adding code to the data and computed properties.
                    </p>
                    <h3>Updated Data Values</h3>
                    <p>In the last section we added in our data property and our computed property. We also added in
                        some comments to describe their purpose inside of this Vue instance. In this section we're going
                        to go back to our onInput function inside of the methods object.
                    </p>
                    <p>Remember all of the functions inside of methods are intended to somehow update our data and
                        anytime we updated our data it's going to cause our Vue instance to update the HTML that is
                        displayed inside the browser.
                    </p>
                    <p>At present we're just taking the value that the user types in - which is event.target.value and
                        logging it to the console. That's not incredibly useful. I think we should probably remove that
                        console log and replace it with something that's going to update the textInput property in our
                        data object. Remember text input is supposed to reflect the current value of the text input form
                        field defined here:
                    </p>
                    <figure>
                    <pre class="prettyprint">&lt;div&gt;
    Input:
    &lt;input /&gt;

  &lt;/div&gt;</pre>
                        <figcaption>Fig 01-029</figcaption>
                    </figure>
                    <p>We can kind of imagine this data property of textInput as being like our list of ingredients and
                        based on what the value of textInput is inside of the data object we will do different things to
                        render different stuff out onto the page.
                    </p>
                    <p>So let's remove the consolelog statement and then to update the value of this textInput value
                        data property we will add the following code:
                    </p>
                    <figure>
                    <pre class="prettyprint">methods: { // Use these function to change data
    onInput: function() {
      this.textInput = event.target.value;
    }
  }</pre>
                        <figcaption>Fig 01-030</figcaption>
                    </figure>
                    <p>Now one thing that's very important here that I want to point out is that we said simply <code
                            class="prettyprint">this.texInput</code> we did not say anything like <code
                            class="prettyprint">this.data.textInput</code>. We only used the word <code
                            class="prettyprint">data</code> when we first initialized the data property. After that to
                        refer to any of the properties that are initialized inside of here we simply write <code
                                class="prettyprint">this.</code> and then the property name.
                    </p>
                    <p>Now, what I want to be really crystal clear about because I mentioned this in passing one or two
                        videos ago is that anytime we update the value of one of our data properties it causes our Vue
                        instance to automatically re-render inside of the browser window. At present our template is not
                        making use of the <code class="prettyprint">textInput</code> property at all so you won't
                        currently see any changes in the browser. However, as soon as we start updating or making use of
                        <code class="prettyprint">textInput</code> inside of our actual template you're going to see
                        that anytime we run this <code class="prettyprint">onInput</code> function everything inside the
                        browser window is going to automatically update as well which is a very nice feature. We don't
                        have to forcibly say "Please re-render my application" or anything like that.
                    </p>
                    <p>So just to bring everything full circle now I want to go back to one of the diagrams we were just
                        looking at and walk through the process of what we've done now with the <code
                                class="prettyprint">data</code> property and the <code
                                class="prettyprint">onInput</code> function:
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig01-031.png"/>
                        <figcaption>Fig 01-031</figcaption>
                    </figure>
                    <p>We said that we have some initial starting data of <code class="prettyprint">textInput</code>
                        equal to empty string. So that's how our application first starts off. We then sit around and
                        wait and then at some point in time the <code class="prettyprint">onInput</code> method is
                        executed. So the user enters some text and inside the method we update the value of <code
                                class="prettyprint">textInput</code>. So let's imagine that maybe the user enters in
                        text of "abcd". So after they enter that text we're going to update the <code
                                class="prettyprint">textInput</code> value. So now the <code class="prettyprint">textInput</code>
                        property in <code class="prettyprint">data</code> has a value of "abcd". Now because <code
                                class="prettyprint">textInput</code> has been updated the template is re-rendered
                        automatically by Vue. Next, as a result of the template being re-rendered we calculate the
                        identicon by using one of our computed functions. We have not yet defined this function but we
                        will in just a second.
                    </p>
                    <p>We are going to talk about the data, methods and computed properties non-stop throughout this
                        course so if it seems confusing right now don't sweat it because we're definitely going to get a
                        lot of practice with it.
                    </p>
                    <p>Let's continue in the next section where we're going to start working on our computed properties
                        and hopefully start to bring everything full circle.
                    </p>
                    <h3>Computed Properties</h3>
                    <p>We've now got our data property being initialized here and we've got some way for our data to be
                        initialized over time whenever our user does something inside of our application. It's now time
                        to turn to the last step here which is to take our data and turn it into an actual viewable
                        value. To be entirely clear our data is already in kind of like a viewable value - it's a plain
                        text string. Obviously we can show it inside of our template and have our users kind of view the
                        output.
                    </p>
                    <p>However that's not actually what we want our users to view. We don't care about showing them the
                        text that they just entered. Instead, we want to show them an identicon - so we need to do some
                        processing of oiur data before it actually gets displayed on the screen. Anytime we want to do
                        som calculation on a value before it gets displayed on the screen that's where we make use of a
                        computed function.
                    </p>
                    <p>So inside of the computed object is where we're going to define a new function which I'm going to
                        call identicon like so:
                    </p>
                    <figure>
                    <pre class="prettyprint">computed: { // Turn data into viewable values
    identicon: function() {

    }
  },</pre>
                        <figcaption>Fig 01-032</figcaption>
                    </figure>
                    <p>So any time the identicon function gets called you and I are going to return something that's
                        going to get the identicon displayed on the screen.
                    </p>
                    <p>Now as a quick reminder when we first made use of this CodePen then we already got you access to
                        this library call jdenticon (you can verify this by clicking the settings button, selecting the
                        JavaScript tab and viewing the external scripts section. So we're going to write some code
                        that's going to make use of this library right here to produce the actual identicon based on the
                        text input that the user has provided to us.
                    </p>
                    <p>So inside the identicon function we're going to make use of that jdenticon library:</p>
                    <figure>
                    <pre class="prettyprint">computed: { // Turn data into viewable values
identicon: function() {
  jdenticon.toSvg();
}</pre>
                        <figcaption>Fig 01-033</figcaption>
                    </figure>
                    <p>First we'll pass in the value of <code class="prettyprint">textInput</code> because that's kind
                        of like the seed of sorts from which our identicon gets calculated. Remember that we can
                        reference any of the properties in the data object by simply writing <code class="prettyprint">this.</code>
                        and then the property name.
                    </p>
                    <p>The second argument is going to be the height or pixel width of the identicon that gets generated
                        - 200 pixels should be fine for application.
                    </p>
                    <p>Now the very last thing we need to do is return this calculated or computed value from the
                        identicon function so I'm going to make sure I get the return keyword inside there as well:
                    </p>
                    <figure>
                    <pre class="prettyprint">computed: { // Turn data into viewable values
identicon: function() {
  return jdenticon.toSvg(this.textInput, 200);
}</pre>
                        <figcaption>Fig 01-034</figcaption>
                    </figure>
                    <p>Ok so I know that at this point we still don't really see any change in the output rendered to
                        the browser window. So to actually get this identicon function running and displayed on the
                        screen we have to actually reference the identicon function from within our template which is
                        defined in the Html panel in the CodePen.
                    </p>
                    <p>To call a computed function from within our template or to somehow get that information to appear
                        on the screen we can use a little bit of advanced Vue syntax. So in the Html where we have
                        written Output: I am going to reference this computed identicon function by writing the
                        following:
                    </p>
                    <figure>
                    <pre v-pre class="prettyprint">&lt;div&gt;
    Output:
    {{ identicon }}
&lt;/div&gt;</pre>
                        <figcaption>Fig 01-035</figcaption>
                    </figure>
                    <p>So now in the browser output you'll see a bunch of crazy strange text. This might not look like
                        what we want but it is actually pretty close to what we need. You should see an svg tag which is
                        a type of image. So, in this case, whenever we make use of the jidenticon toSvg function it
                        returns an SVG element. But when we try to show that inside of our template we just see the
                        actual raw Html that represents our Svg.
                    </p>
                    <p>To actually get this to show up as a real piece of rendered Svg we're going to use another Vue
                        directive:
                    </p>
                    <figure>
                    <pre class="prettyprint">computed: { // Turn data into viewable values
identicon: function() {
  return jdenticon.toSvg(this.textInput, 200);
}</pre>
                        <figcaption>Fig 01-036</figcaption>
                    </figure>
                    <p>Now you should see the identicon appear on the screen. Now I know that the last step there, where
                        I said "Ok we don't really want the SVG raw text to appear here - we want to instead show the
                        Html" might seem a little bit confusing. We'll come back to this in a second but before we do
                        let's try entering in some text in the input field. As you start to type stuff in you'll notice
                        that the identicon is changing every single time and we get some new identicon appearing on the
                        screen.
                    </p>
                    <p>So in the next section we're going to do a very big review to describe exactly how this
                        application is working right now.
                    </p>
                    <h3>Review from Start to Finish</h3>
                    <p>In the last section we got our application working but I think you'll agree with me that there's
                        still some confusion over how everything works at the moment. So in this section we are going to
                        work through a big timeline diagram that's going to give you a better idea of exactly what is
                        occurring inside or our application and it's going to really tie everything together.
                    </p>
                    <figure>
                        <img src="./images/vuejsessentials/Fig01-037.png"/>
                        <figcaption>Fig 01-037</figcaption>
                    </figure>
                    <p>At the very top we first start off by creating our Vue instance. When that instance is created
                        the data property is evaluated:
                    </p>
                    <figure>
                    <pre class="prettyprint">data: { // Initialize our list of 'ingredients'
 textInput: ''
},</pre>
                        <figcaption>Fig 01-038</figcaption>
                    </figure>
                    <p>Vue sees that we are providing an object that has a property named <code class="prettyprint">textInput</code>
                        with a value of empty string. Because we are initializing this data property right here Vue is
                        going to take that and it's going to assign it to the value of <code
                                class="prettyprint">this</code> which is accessible inside of our computed functions and
                        our methods functions. After that value is initialized our template inside the Dom is then
                        evaluated by Vue and eventually rendered onto the screen. So that's when we actually see some
                        starting content appear
                    </p>
                    <p>We then wait for some user to type into our text input. The instant they do our own input method
                        is executed. Inside of that <code class="prettyprint">onInput</code> method which is right here
                        we update the value of <code class="prettyprint">textInput</code>. That's when some interesting
                        stuff starts to happen. So it's when you start to update these data properties that have been
                        assigned to <code class="prettyprint">this</code> that you start to see some interesting
                        behaviour in your application. So when that value gets updated our template gets automatically
                        re-rendered to the screen. So Vue says - "Hey!, someone just updated that value. I need
                        automatically re-render the template and update content that is visible on the screen.
                    </p>
                    <p>
                        During that process, Vue looks at our template and it sees that our template references a
                        computed property when we put together the directive right underneath Output:
                    </p>
                    <figure>
                    <pre class="prettyprint">&lt;div&gt;
    Output:
    &lt;div v-html=&quot;identicon&quot; /&gt;
  &lt;/div&gt;</pre>
                        <figcaption>Fig 01-039</figcaption>
                    </figure>
                    <p>So we added in the directive of <code class="prettyprint">v-html</code> which we're going to
                        expand upon in just a moment and inside there we referenced the identicon computed function.
                    </p>
                    <p>So identicon in the directive above is a reference to the computed function identicon.</p>
                    <p>So Vue locates the identicon function and executes it and then whatever is returned from that
                        function will be provided to this <code class="prettyprint">v-html</code> directive. So in this
                        case the identicon function returns some raw Html as a string (with an svg tag inside it). But
                        as you an I very well know we don't want to show raw Html to the user - we want to display an
                        identicon. So to get Vue to interpret that string as Html and not a plain old string we used the
                        <code class="prettyprint">v-html</code> directive. This directive says - "We're going to give
                        you a snippet of Html. It's gonna be a string but it's going to look like Html. You need to
                        interpret that as Html and render it as Html in the output. Don't try to just print out the
                        string."
                    </p>
                    <p>What we did before where we use the curly braces like so:</p>
                    <code v-pre class="prettyprint">{{ identicon }}</code>
                    <p>This is how we just print out a very simple string.</p>
                    <p>Traditionally we dont use the <code class="prettyprint">v-html</code> tag unless you are working
                        on an application where you actually need to make use of some pre-generated Html. So it's much
                        more frequently that we'll use other methods for displaying content on the screen.
                    </p>
                    <p>So hopefully that's a little bit more of an explanation and makes what's happening inside of our
                        application a little bit more clear. There's still some side topics I want to address about this
                        application which we will address in the next section.
                    </p>
                    <h3>Template Placement</h3>
                    <p>In the last section we reviewed our entire application and got a better idea of how it's working.
                        In this section I want to start going over a couple of quick odds and ends around the
                        application we just put together.
                    </p>
                    <p>So the first ordinance I want to tell you about is the placement of our template. Remember, that,
                        many videos ago when we spoke about the Vue template being created in Html and the Vue instance
                        being created in JavaScript and we mentioned that was one way of structuring a Vue application.
                        In particular, I'd said that our Vue template does not have to be created on the Html side of
                        our application and that we could instead declare that Vue template in the JavaScript side.
                    </p>
                    <p>To demonstrate this alternative configuration go back to our CodePen and take all the Html that
                        is inside the <code class="prettyprint">div</code> with an id of app and cut and paste it into a
                        new property called <code class="prettyprint">template:</code> that we add to the bottom of the
                        JavaScript panel:
                    </p>
                    <figure>
                    <pre class="prettyprint">template: `
&lt;div&gt;
  &lt;h3&gt;My Identicon Generator&lt;/h3&gt;
      Input:
    &lt;div&gt;
      &lt;input v-on:input=&quot;onInput&quot; /&gt;
    &lt;/div&gt;
    &lt;div&gt;
      Output:
      &lt;div v-html=&quot;identicon&quot; &gt;&lt;/div&gt;
&lt;/div&gt;`</pre>
                        <figcaption>Fig 01-031</figcaption>
                    </figure>
                    <p>Note the use of back ticks (the character on the keyboard to the left of 1) and additional
                        enclosing <code class="prettyprint">div</code>.
                    </p>
                    <p>So when we make use of a template that is attached directly to an instance we provide a string
                        that contains some amount of Html. Inside that string we have to have exactly one root element
                        (which is why we added the additional <code class="prettyprint">div</code>)
                    </p>
                    <p>If I were to remove the root <code class="prettyprint">div</code> you would see the we only see
                        the <code class="prettyprint">h3</code> element in the browser window (which is now the root
                        element).
                    </p>
                    <p>That's the reason for the root <code class="prettyprint">div</code>. We are expected to only
                        return 1 root element inside the template string.
                    </p>
                    <p>So you'll see very plainly that everything works the exact same way that it did before. This is
                        just a different way to structure your Vue application. You can either create your template
                        inside of your Html or you can create the template and attach it directly to your Vue instance.
                    </p>
                    <p>Now, in reality, the vast majority of applications that you will be working on are going to take
                        the approach where you define the Html as a template property in JavaScript.
                    </p>
                    <p>The reason I demonstrated the approach where the Vue template is created in the Html is because
                        all the Vue documentation takes that approach.
                    </p>
                    <p>Ok, that was the first ordinance I wanted to show you. Let's now continue in the next section to
                        discuss one or two other topics.
                    </p>

                    <h3>Referencing Data in the Template</h3>
                    <p>In the last section we spoke about on quick ordinance. In this section we are going to cover
                        another small topic I just want you to be aware of. I want to focus on the fact that we used a
                        computed function when putting our application together. Now what I want to be very clear about
                        is that our template can show data that has been assigned to our data property. We don't have to
                        always use computed functions.
                    </p>
                    <p>In general we only ever use computed functions anytime we want to somehow mess around with some
                        piece of data before it gets shown on the screen. Let me show you a good example of this. Back
                        inside of our application let's say that we want to dramatically change how our app behaves.
                    </p>
                    <p>Let's say that maybe instead of entering in some input and then getting back an identicon we want
                        to just echo back our text directly to the user. So if I enter "my slice of pie" right here the
                        output should be simply "my slice of pie" - no change whatsoever. If you want to print out some
                        value that is assigned to data without making any change to it whatsoever you don't have to use
                        a computed function. Instead you can reference your property or your data name directly from
                        within the template.
                    </p>
                    <p>To do this scroll down to where the template is defined (in the JavaScript panel) and locate the
                        <code class="prettyprint">div</code> with a directive of <code
                                class="prettyprint">v-html </code>. So, we don't want to show the identicon anymore so I
                        am going to delete that <code class="prettyprint">div</code> entirely.
                    </p>
                    <p>Instead I will directly reference the text input property and just try to print it out directly
                        into the template. To print out a direct property without trying to do any fancy directives or
                        anything like that we use the double curly braces and then inside there we just write out the
                        property name that we want to display. The name that we put inside the curly braces can be
                        either the name of one of our computed functions or the name of one of our data properties:
                    </p>
                    <figure>
                    <pre v-pre class="prettyprint">&lt;div&gt;
    Output:
    {{ textInput }}
&lt;/div&gt;</pre>
                        <figcaption>Fig 01-032</figcaption>
                    </figure>
                    <p>Now if I start to type inside of my textInput again you'll see that the text gets directly
                        mirrored right underneath. That's because I'm just taking whatever my input value is an printing
                        out directly inside the template. One thing I want to mention inside of here, very explicitly,
                        is that when we reference this textInput we did not have to do anything like say <code
                                class="prettyprint">this.textInput</code> or <code class="prettyprint">this.data.textInput</code>
                        We simply write the name of the property inside the curly braces.
                    </p>
                    <p>One issue that raises is you'll want to make sure when you're defining computed functions right
                        here is you don't accidentally duplicate the name of one of your data properties. So I would not
                        want to make a computed function named textInput because then it would be really ambiguous as wo
                        whether inside my template I'm referring to the data property or the computed function name.
                    </p>
                    <p>So, to recap, we don't have to use a computed property to display data if we don't want to/need
                        to. We can just reference the data name directly and that will be printed out verbatim inside of
                        our template.
                    </p>
                    <p>In CodePen revert back to the original <code class="prettyprint">v-html</code> directive:</p>
                    <figure>
                    <pre class="prettyprint">&lt;div&gt;
    Output:
    &lt;div v-html=&quot;identicon&quot;&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
                        <figcaption>Fig 01-033</figcaption>
                    </figure>
                    <p>Let's continue in the next section where there's just one last thing I want to mention about this
                        application before we move on.
                    </p>
                    <h3>Expressions in Templates</h3>
                    <p>In the last section we spoke about one additional ordinance. In this section we're going to close
                        off with a topic which is very closely related to the one we just discussed.
                    </p>
                    <p>So when we were talking in the last section about using those curly braces to display some value
                        inside of a template that made use of a technique called string interpolation. So whenever we
                        use string interpolation that means that we are kind of injecting a value directly into our
                        template. Anytime that we use those curly braces we are not limited to referring to a simple
                        data property or a computed property.
                    </p>
                    <p>If we want to we can put in some tiny amount of JavaScript logic into those curly braces. To be
                        more precise we can put exactly one Javascript expression inside the curly braces. So we can't
                        write out a full <code class="prettyprint">if</code> statement, we can't write out a <code
                                class="prettyprint">for</code> loop or anything like that.
                    </p>
                    <p>Back in CodePen at the very bottom of the template where we've got the identicon content being
                        printed out inside the <code class="prettyprint">div</code> using the <code class="prettyprint">v-html</code>
                        directive.
                    </p>
                    <p>Delete the <code class="prettyprint">div</code> replacing it with another set of curly braces
                        . Inside the braces reference textInput again:</p>
                    <figure>
                    <pre v-pre class="prettyprint">&lt;div&gt;
    Output:
    {{ textInput }}
&lt;/div&gt;</pre>
                    <figcaption>Fig 01-034</figcaption>
                    </figure>
                    <p>Now if I type something out inside the input, just as before, I see the same text appear in
                        the Output. So, right now, we are simply referencing textInput. However, is we want to we
                        can add a very limited amount of Javascript logic inside of these curly braces.</p>
                    <p>So, for example, we could do a little bit of string concatenation:</p>
                    <figure>
                    <pre v-pre class="prettyprint">&lt;div&gt;
    Output:
    {{ textInput + 'abcd' }}
 &lt;/div&gt;</pre>
                    <figcaption>Fig 01-034</figcaption>
                    </figure>
                    <p>Or we could reverse the string. In Javascript we reverse the string by splitting it into an
                        array by every character and then reverse that array and, finally, join the result back
                        together:</p>
                    <figure>
                    <pre v-pre class="prettyprint">&lt;div&gt;
    Output:

&lt;/div&gt;</pre>
                    <figcaption>Fig 01-035</figcaption>
                    </figure>
                    <p>Now what I want to point out here is that while I can add some amount of logic into the
                        string interpolation it is almost always preferable to use a computed function.</p>
                    <p>So instead of the string interpolation method shown above we could use a computed function:</p>
                    <figure>
                    <pre class="prettyprint">reverse: function() {
      return this.textInput.split('').reverse().join('');
    }</pre>
                    <figcaption>Fig 01-036</figcaption>
                    </figure>
                    <p>So that's doing the same operation as before. Now inside the template we reference our
                        computed function instead:
                    </p>
                    <figure>
                    <pre class="prettyprint">&lt;div&gt;
    Output:
    {{ reverse }}
&lt;/div&gt;</pre>
                    <figcaption>Fig 01-037</figcaption>
                    </figure>
                    <p>I highly recommend you use computed functions anytime you need to play around with some data
                        before it gets printed out because it keeps your templates very clean and easy to read. The
                        computed functions will also be easier to understand because you can add comments to document
                        their behaviour.
                    </p>
                    <p>We're going to continue in the next section by discussing the first big application we're
                        going to create in this course.
                    </p>
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
