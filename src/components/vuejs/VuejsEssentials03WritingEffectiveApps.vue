<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h2>Writing Effective Apps</h2>
        </div>
        <div class="panel-body">
          <h3>Starting from Scratch</h3>
          <p>At this point we've spoken a lot about all the code that's placed inside the <span
            class="filename">src</span> directory and it's now time to actually start working on our video-browser
            application but I don't really want to use any of the code that is already placed inside of here.
            Personally, I like to try to start from scratch where possible. I don't really like having to go through the
            Babel setup or the webpack setup which is why we're using Vue CLI in the first place but I don't think a lot
            of the code inside the <span class="filename">src</span> directory that we were given is super helpful for
            us.
          </p>
          <p>So the first thing we're going to do in working on our video-browser application is to delete everything
            inside the <span class="filename">src</span> directory and we're going to start over from scratch. This will
            give you a really good idea of exactly how we build out a Vue application. So to get started I'm going to
            highlight the <span class="filename">src</span> directory and delete the entire thing and then I'm going to
            immediately recreate that directory by making a new directory called <span class="filename">src</span>:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-001.png"/>
            <figcaption>Fig 03-001</figcaption>
          </figure>
          <p>Inside of the <span class="filename">src</span> folder create a new file called <span class="filename">main.js</span>.
            It is important to name the file <span class="filename">main.js</span> with a lowercase m. This is because
            whenever our application first boots up Vue CLI and webpack and all the tooling that exists inside this
            project is going to look inside the <span class="filename">src</span> directory for a file called <span
              class="filename">main.js</span>. So <span class="filename">main.js</span> is a special file because it is
            the entry point of our application.
          </p>
          <p>Now inside this file we are going to perform the same steps that were already inside the <span
            class="filename">main.js</span> file but this time around we'll talk about what every line of code is doing
            so you'll get a better idea of how all that stuff was structured.
          </p>
          <p>So, inside the <span class="filename">main.js</span> file we're going to first start off by importing the
            Vue JS library. To do so - at the top we'll write out:
          </p>
          <code class="prettyprint">import Vue from 'vue';</code>
          <p>As a quick reminder of how <code class="prettyprint">import</code> statements work webpack is going to
            interpret this line of code when it processes all of our code. It's going to see that we're trying to import
            something called Vue. Now we don't currently have any files inside of our <code
              class="prettyprint">src</code> directory called Vue so instead webpack is going to automatically look into
            the <span class="filename">node-modules</span> directory. You'll recall that that is where all of our
            different dependencies for our project are stored. If you scroll down to the bottom of this list you'll find
            a folder named simply <span class="filename">vue</span> which contains the actual Vue JS library:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-002.png"/>
            <figcaption>Fig 03-002</figcaption>
          </figure>
          <p>So when we write out <code class="prettyprint">import Vue from 'vue';</code> webpack is going to look into
            that folder and pull in some amount of Javascript code to support our project.
          </p>
          <p>Now the next thing we're going to do is to create a new file called <span class="filename">App
            .vue</span>. This is going to function very similarly to the <span class="filename">App.vue</span> file that
            we just deleted. Inside that file you and I are going to make a single Vue component which is going to serve
            as, kind of, the brains of our application.
          </p>
          <p>It's going to be responsible for coordinating all the other components and making sure that the correct
            content is visible on the screen at any given time. Once we create this <span
              class="filename">App.vue</span> file and create a component inside of it we'll then import it into the
            <span class="filename">main.js</span> file and make sure that we show that on the screen.
          </p>
          <p>So inside the <span class="filename">src</span> directory I will now create the <span class="filename">App.vue</span>
            file. As a quick reminder, it's very common inside of any Vue application to always have a root component
            called <span class="filename">App.vue</span>. So I would expect you to see <span class="filename">App
              .vue</span> and <span class="filename">main.js</span> in the vast majority of projects that you're going
            to work on.
          </p>
          <p>So inside of our new <span class="filename">App.vue</span> file we're going to put together our first Vue
            component. Every Vue file that we put together is going to look very similar.
          </p>
          <p>At the very top we're going to place that <code class="prettyprint">template</code> tag which will contain
            all the Html or the template for the component that we are creating:
          </p>
          <figure>
                    <pre class="prettyprint">&lt;template&gt;

&lt;/template&gt;</pre>
            <figcaption>Fig 03-003</figcaption>
          </figure>
          <p>Inside the <code class="prettyprint">template</code> tag itself we are only allowed to have one root Html
            element. So, in other words, the following would be invalid:
          </p>
          <figure>
                    <pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
    &lt;/div&gt;
    &lt;div&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-004</figcaption>
          </figure>
          <p>These are two sibling divs. So in this case we would have two root elements which is not allowed. Make sure
            you only have one root element.
          </p>
          <p>Let's add some content to the <code class="prettyprint">template</code> tag:</p>
          <figure>
                    <pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
        Hi there!
    &lt;/div&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-005</figcaption>
          </figure>
          <p>Underneath the <code class="prettyprint">template</code> tag we will add a <code
            class="prettyprint">script</code> tag:
          </p>
          <figure>
                    <pre class="prettyprint">&lt;script&gt;

&lt;/script&gt;</pre>
            <figcaption>Fig 03-006</figcaption>
          </figure>
          <p>So this is going to contain all the Javascript that defines this component and tells Vue how it should
            behave anytime the user interacts with it in some fashion.
          </p>
          <p>Inside of the <code class="prettyprint">script</code> tag add the following code:</p>
          <figure>
                    <pre class="prettyprint">&lt;script&gt;
    export default {
    }
&lt;/script&gt;</pre>
            <figcaption>Fig 03-007</figcaption>
          </figure>
          <p>Now we haven't really spoken a lot about this <code class="prettyprint">export default</code> syntax so far
            even though we saw it in the previous implementation of the <span class="filename">App.vue</span> file. In
            the next section we'll talk about what the purpose of this <code class="prettyprint">export default</code>
            syntax is.
          </p>
          <h3>The App Component</h3>
          <p>In the last section we started working on our App component. Remember this is going to serve as the sort of
            brains of our application and it's going to coordinate all the other components that we create inside of our
            app.
          </p>
          <p>We finished off the last section working on the <code class="prettyprint">script</code> tag right here
            where we wrote <code class="prettyprint">export default</code> then placed a set of curly braces:
          </p>
          <figure>
                    <pre class="prettyprint">&lt;script&gt;
    export default {
    }
&lt;/script&gt;</pre>
            <figcaption>Fig 03-008</figcaption>
          </figure>
          <p>First I want to give you a quick reminder back to some of the CodePen code that we were working on earlier:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-009.png"/>
            <figcaption>Fig 03-009.png</figcaption>
          </figure>
          <p>So I've still got the identicon application here from CodePen up on my screen. You'll recall that inside of
            the Javascript that we added for this project we had a couple of different properties that we provided to
            the Vue instance. Things like:
          </p>
          <ul>
            <li>data</li>
            <li>computed properties</li>
            <li>methods</li>
            <li>template</li>
          </ul>
          <p>Recall we also added the template directly into the Javascript as well. So the object that we passed to
            <code class="prettyprint">new Vue</code> had some number of properties that customized the instance. The
            same exact thing is true of this object that you pass into <code class="prettyprint">export default</code>.
            So this object is going to contain a couple of different properties that customize this Vue component and
            how it behaves.
          </p>
          <p>So, for example, we might eventually have a <code class="prettyprint">data</code> property on here, some
            <code class="prettyprint">computed</code> functions and eventually have some different <code
              class="prettyprint">methods</code> tied to it as well:
          </p>
          <figure>
<pre class="prettyprint">&lt;script&gt;
export default {
  data: {},
  computed: {},
  methods: {}
</pre>
            <figcaption>Fig 03-010</figcaption>
          </figure>
          <p>Right now, there is only one property that we are going to assign inside of this object - a property we did
            not discuss previously when we were working back inside of CodePen - <code class="prettyprint">name</code>:
          </p>
          <figure>
<pre class="prettyprint">&lt;script&gt;
    export default {
        name: 'App'
    }
&lt;/script&gt;</pre>
            <figcaption>Fig 03-011</figcaption>
          </figure>
          <p>The <code class="prettyprint">name</code> property is not strictly required for Vue to work properly. We
            put in the <code class="prettyprint">name</code> property just to make our lives, as developers, a little
            bit easier. You see, there's a couple of debugging tools out there that you can download, free of charge,
            that help you debug Vue applications inside the browser. Many of these debug tools that we use with Vue look
            for different components that have specific names tied to them. So simply providing the name property is
            going to make those debugging tools work a little bit better by allowing you the developer to more easily
            identify different components that are in use in your application.
          </p>
          <p>So that's really all we need for right now to get this component started. We don't have to provide anything
            like the <code class="prettyprint">data</code>, <code class="prettyprint">methods</code> or <code
              class="prettyprint">computed</code> properties in order to get some content on the screen. We're only
            going to start to add those extra properties once our component actually needs their behaviour.
          </p>
          <p>One other thing I'll mention here is you'll recall that back in our Vue instance, that we created over in
            CodePen, we provided the <code class="prettyprint">el</code> argument:
          </p>
          <figure>
                    <pre class="prettyprint">new Vue({
    el: '#app',
    data: { // Initialize our list of 'ingredients'
        textInput: ''
    },
}</pre>
            <figcaption>Fig 03-012</figcaption>
          </figure>
          <p>The <code class="prettyprint">el</code> argument is short for element and it specifies to Vue where our Vue
            template is located in the DOM.
          </p>
          <p>In the case of the Vue component that we're putting together right now Vue is going to automatically
            understand that our template is created in the same file. We don't need to specify any <code
              class="prettyprint">el</code> property to tell this component where it's template is or where it should
            render itself.
          </p>
          <p>That's pretty much it for the App component right now. We're going to come back to the App component again
            very shortly and add a bunch more code to further develop our application.
          </p>
          <p>In the next section we will re-visit the <span class="filename">main.js</span> file and try and get that
            App component to show up on the screen.
          </p>
          <h3>Another Way of Specifying Content</h3>
          <p>In the last section we worked on our <span class="filename">App.vue</span> file. We're going to go back
            over to our <span class="filename">main.js</span> file and we're going to use the App component to get it to
            display on the screen when we load up the app inside our browser.
          </p>
          <p>So back inside of <span class="filename">main.js</span> we're going to do a couple of different steps very
            quickly here. The first thing we're going to do is to import the App component into the <span
              class="filename">main.js</span> file:
          </p>
          <figure>
            <pre class="prettyprint">import App from './App';</pre>
            <figcaption>Fig 03-013</figcaption>
          </figure>
          <p>Just a quick reminder on <code class="prettyprint">import</code> statements - if we are importing a file
            that we have created then we have to provide the relative path to that file. So <code
              class="prettyprint">./</code> in the <code class="prettyprint">import</code> statement above means in the
            same folder look for a file called <span class="filename">App</span>. I think webpack allows you to include
            or omit the file extension.
          </p>
          <p>Underneath that we are going to create a new Vue instance and we are going to attempt to show the App
            component. So we already know how to create a new Vue instance:
          </p>
          <figure>
                    <pre class="prettyprint">new Vue({

});</pre>
            <figcaption>Fig 03-014</figcaption>
          </figure>
          <p>We write out <code class="prettyprint">new Vue();</code> and then pass in an object with some number of
            configuration options. Now the first option that we're going to put in here is going to look a bit strange:
          </p>
          <figure>
                    <pre class="prettyprint">new Vue({
   render: function(createElement) {
       return createElement(App);
   }
});</pre>
            <figcaption>Fig 03-015</figcaption>
          </figure>
          <p>At this point, we have seen more than one way to specify the <code class="prettyprint">template</code> for
            a give Vue instance. We've seen how we can put our <code class="prettyprint">template</code> in the Html.
            We've also seen how we can attach it directly to our Vue instance. What you're seeing in Fig 03-015 is
            another way, yes another way, to tell a Vue instance how to show some content on the screen.
          </p>
          <p>We define a <code class="prettyprint">render</code> function that gets called with another function called
            <code class="prettyprint">createElement</code>. We call the <code class="prettyprint">createElement</code>
            function and we pass in the component that we just created and then we return the result of that function
            call.
          </p>
          <p>You can kind of imagine that this takes the App component and turns it into a Vue instance which can then
            be turned into Html. We then take that Html and put it on the screen of our application. So that's what's
            going on with the <code class="prettyprint">render</code> function.
          </p>
          <p>We are going perform one quick refactor that will make this look more similar to what you'll see in real
            applications. Usually we do not write out the entire function name of <code class="prettyprint">
              createElement</code>:
          </p>
          <figure>
                    <pre class="prettyprint">function(createElement) {
    return createElement(App);
}</pre>
            <figcaption>Fig 03-016</figcaption>
          </figure>
          <p>Instead we usually abbreviate the <code class="prettyprint">createElement</code> function name as simply
            <code class="prettyprint">h</code>:
          </p>
          <figure>
                    <pre class="prettyprint">new Vue({
   render: function(h) {
       return h(App);
   }
});</pre>
            <figcaption>Fig 03-017</figcaption>
          </figure>
          <p>Don't ask me why we use <code class="prettyprint">h</code> I honestly don't know why we came up with that
            convention. The other key factor that you'll see very commonly around this <code
              class="prettyprint">render</code> function is not to use the entire <code
              class="prettyprint">function</code> keyword but instead use an ES 2015 arrow function:
          </p>
          <figure>
                    <pre class="prettyprint">new Vue({
   render: h =&gt; h(App)
});
</pre>
            <figcaption>Fig 03-018</figcaption>
          </figure>
          <p>This shorthand version is functionally 100 percent equivalent to what we had just a moment ago.
          </p>
          <p>Now, anytime this file is executed, we will try to create a new Vue instance. When that Vue instance is
            created the <code class="prettyprint">render</code> function will be called with the <code
              class="prettyprint">createElement</code> function. We then pass in our App component to <code
              class="prettyprint">createElement</code> and the entire result is return from the <code
              class="prettyprint">render</code> function.
          </p>
          <p>Our App component is created and then the result of that is stuck into the DOM. We're going to come back in
            the next section and make sure that this entire file actually gets some content on the screen of our
            browser.
          </p>
          <h3>Multiple Ways of DOM Attachment</h3>
          <p>In the last section we started working on our <span class="filename">main.js</span> file. We've now created
            a new Vue instance and we've told this instance that we want to get some content on the screen. When we
            eventually render to our actual DOM or try to get it to show up inside the browser - the <code
              class="prettyprint">render</code> function will be called. We are telling the <code class="prettyprint">
              render</code> function that we want to display an instance of our App component:
          </p>
          <figure>
<pre class="prettyprint">new Vue({
   render: h =&gt; h(App)
});
</pre>
            <figcaption>Fig 03-019</figcaption>
          </figure>
          <p>Now the very last thing we need to do inside of here is to make sure that we actually try to take this
            instance of App that is created and stick it into the DOM somewhere. You'll recall that back inside of the
            CodePen identicon project we used the <code class="prettyprint">el</code> property. The <code
              class="prettyprint">el</code> property not only tells Vue where it can find it's template but it also
            tells Vue where it should place the rendered Html inside of our Html structure:
          </p>
          <figure>
            <code class="prettyprint">el: '#app',</code>
            <figcaption>Fig 03-020</figcaption>
          </figure>
          <p>In the code snippet above <code class="prettyprint">#app</code> means go and find some element inside of
            our DOM with an <code class="prettyprint">id</code> of <code class="prettyprint">app</code>. The same thing
            has to be provided to our Vue instance in our <span class="filename">main.js</span> file as well. If we ran
            this code right now we would create our application but it would not show up on the screen because we have
            not yet told Vue where to put this Html.
          </p>
          <p>You'll recall that inside the <span class="filename">public</span> directory we've got that <span
            class="filename">index.html</span> file and inside there is a <code class="prettyprint">div</code> with an
            <code class="prettyprint">id</code> of <code class="prettyprint">app</code>. When we generated Vue CLI we
            already got a place created right out of the box for us to render our application to:
          </p>
          <figure>
            <pre class="prettyprint">&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</pre>
            <figcaption>Fig 03-021</figcaption>
          </figure>
          <p>To get our <span class="filename">main.js</span> file's Vue instance to actually show up inside the browser
            we need to provide an <code class="prettyprint">el</code> property:
          </p>
          <figure>
                    <pre class="prettyprint">new Vue({
    el: '#app',
    render: h =&gt; h(App)
});</pre>
            <figcaption>Fig 03-022</figcaption>
          </figure>
          <p>One thing I want to quickly mention here is back when we first generated our Vue CLI project, like just a
            moment ago, you might recall that when we looked at the <span class="filename">main.js</span> file we did
            not have an object or a property in here called <code class="prettyprint">el</code>. When we first generated
            this project <code class="prettyprint">main.js</code> had a different way of specifying the element that we
            wanted to render our application to. It created the new Vue instance and then it called a function on that
            instance:
          </p>
          <figure>
                    <pre class="prettyprint">new Vue({
    render: h =&gt; h(App)
}).mount('#app');</pre>
            <figcaption>Fig 03-023</figcaption>
          </figure>
          <p>The line of code, containing a the <code class="prettyprint">mount</code> chained function, tells Vue where
            it should render itself to.
          </p>
          <p>In the Vue JS world there's several different ways of doing any given operation. We have already seen many
            different ways in which we can define templates that are tied to our application. Calling <code
              class="prettyprint">#mount</code> and then passing in <code class="prettyprint">'#app'</code> is identical
            to writing out <code class="prettyprint">el: '#app'</code>, It's just two different ways of doing the exact
            same operation. This is a pattern that you are going to notice in the Vue world over and over again -
            there's more than one way to do just about everything.
          </p>
          <p>How do you decide which approach to use? It's pretty much down to personal preference but just for the sake
            of convention, and sticking with what Vue CLI does by default, we'll stay with the <code
              class="prettyprint">#mount</code> option rather than using <code class="prettyprint">el</code>
          </p>
          <p>The last thing we have to do is go back over to the browser to test our application and make sure that we
            can see the text we specified appear on the screen. Go back over to the browser to localhost:8080 and do a
            refresh of the application and you should see the text "Hi there!"
          </p>
          <h3>Making the SearchBar</h3>
          <p>In the last section we put together our App component. We're now going to move forward with the SearchBar
            component which is going to show an input field and anytime a user types in there we will trigger a search
            on the YouTube API to attempt to go and find some list of videos related to that search term.
          </p>
          <p>Flip back over to our code editor where we're going to create a new Vue file to contain the SearchBar
            component. Under the <span class="filename">src</span> directory create a <span class="filename">
              components</span> directory inside of which we will locate all our components. Inside the <span
              class="filename">components</span> folder we create a new file called <span class="filename">
              SearchBar.vue</span>. Inside the <span class="filename">SearchBar.vue</span> file we're going to add some
            boilerplate tags that are going to become very familiar over time. We'll begin by placing a <code
              class="prettyprint">template</code> tag and then underneath that we'll add a <code class="prettyprint">script</code>
            tag. Finally we'll add a <code class="prettyprint">style</code> tag which will eventually contain some CSS
            that is solely related to this one component and no other component inside of our application.
            <figure>
                        <pre class="prettyprint">&lt;template&gt;
&lt;/template&gt;

&lt;script&gt;
&lt;/script&gt;

&lt;style&gt;
&lt;/style&gt;</pre>
              <figcaption>Fig 03-024</figcaption>
            </figure>
          <p></p>
          <p>Back up inside the <code class="prettyprint">template</code> tag we'll immediately create an <code
            class="prettyprint">input</code> element and we'll wrap it with a <code class="prettyprint">div</code> tag.
          </p>
          <figure>
                    <pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
        &lt;input /&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-025</figcaption>
          </figure>
          <p>Now you might be a bit curious why we were wrapping this with a <code class="prettyprint">div</code> tag.
            Honestly that's really just for styling. By default a <code class="prettyprint">div</code> has a CSS display
            property ot <code class="prettyprint">block</code> which will make sure that this input element appears in
            the browser on it's own individual line. The <code class="prettyprint">div</code> here is really just kind
            of for layout purposes not necessarily because this component actually requires it from any technical
            standpoint or functionality standpoint. Add the following code to the <code
              class="prettyprint">script</code> tag:
          </p>
          <figure>
<pre class="prettyprint">&lt;script&gt;
export default {

};
&lt;/script&gt;</pre>
            <figcaption>Fig 03-026</figcaption>
          </figure>
          <p>The object that we provide is going to specify a couple of different options which we'll look at in the
            next section.
          </p>
          <h3>Nesting Components</h3>
          <p>We just put together our SearchBar component and now we're ready to start adding a couple of options. Let's
            start by adding the <code class="prettyprint">name</code> parameter which we spoke about a couple of
            sections back . So I'm going to provide a name of simply <code class="prettyprint">SearchBar</code> like so:
          </p>
          <figure>
                    <pre class="prettyprint">&lt;script&gt;
export default {
    name: 'SearchBar'
};
&lt;/script&gt;</pre>
            <figcaption>Fig 03-027</figcaption>
          </figure>
          <p>Now before we go any further I think that we should try to get the SearchBar component to be displayed
            inside of our application. If you go back over to the browser and refresh the page you'll notice that the
            search bar doesn't appear at all - which kind of makes sense. To get that search bar to appear we have to
            wire it up to the App component by adding some code to the <span class="filename">App.vue</span> file inside
            the <code class="prettyprint">script</code> tag. First we <code class="prettyprint">import</code> the
            component:
          </p>
          <figure>
            <pre class="prettyprint">import SearchBar from './components/SearchBar.vue';</pre>
            <figcaption>Fig 03-028</figcaption>
          </figure>
          <p>To get the SearchBar component to actually render inside the App component we add a <code
            class="prettyprint">SearchBar</code> tag inside our template - replacing the "Hi there!" placeholder text we
            had there previously:
          </p>
          <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
        &lt;SearchBar /&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-029</figcaption>
          </figure>
          <p>By convention we can do a self-closing tag here if we don't expect this component to contain any elements
            of it's own. However, in this case, we definitely do so I'm going to use a full tag like so:
          </p>
          <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
        &lt;SearchBar&gt;&lt;/SearchBar&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-030</figcaption>
          </figure>
          <p>Save this file and go back to the browser to see what happens. In the Console log you might notice an error
            message similar to:
          </p>
          <figure>
                    <pre class="prettyprint">vue.runtime.esm.js?2b0e:587 [Vue warn]: Unknown custom element: &lt;SearchBar&gt; - did you register the component correctly? For recursive components, make sure to provide the &quot;name&quot; option.

                    found in

                    ---&gt; &lt;App&gt; at src\App.vue
                           &lt;Root&gt;</pre>
            <figcaption>Fig 03-031</figcaption>
          </figure>
          <p>Whenever you want to nest a component like this or show one component inside of another it's not quite
            enough just to <code class="prettyprint">import</code> that component and then place it into the <code
              class="prettyprint">template</code>. There's actually one other step that we have to go through. I
            illustrated this error because the last step is very easy to forget.
          </p>
          <p>In the <span class="filename">App.vue</span> file, we imported the SearchBar (step 1) and we used it inside
            the template (step 2). Step number 3 involves adding a <code class="prettyprint">components</code> property.
            This is going to be an object that lists all the different components that are going to be used inside of
            the app's <code class="prettyprint">template</code>:
          </p>
          <figure>
                    <pre class="prettyprint">export default {
    name: 'App',
    components: {

    }
};</pre>
            <figcaption>Fig 03-032</figcaption>
          </figure>
          <p>We need to declare the SearchBar inside of the object we supply to the components property:</p>
          <figure>
                    <pre class="prettyprint">export default {
    name: 'App',
    components: {
        SearchBar: SearchBar
    }
};</pre>
            <figcaption>Fig 03-033</figcaption>
          </figure>
          <p>This let's our App component know that it might see a <code class="prettyprint">SearchBar</code> tag inside
            of it's <code class="prettyprint">template</code>. We can use a little bit of ES 2015 syntax to shorten this
            up because the key and the value are identical:
          </p>
          <figure>
<pre class="prettyprint">export default {
    name: 'App',
    components: {
        SearchBar
    }
};</pre>
            <figcaption>Fig 03-034</figcaption>
          </figure>
          <p>Save the <span class="filename">App.vue</span> file and flip back over to the browser and you should notice
            that our input field is displayed on screen.
          </p>
          <p>In summary, to show one component inside of another we add the <code class="prettyprint">import</code>
            statement, we use a <code class="prettyprint">SearchBar</code> tag inside of the <code class="prettyprint">template</code>
            and we declare a <code class="prettyprint">components</code> property that specifies a component called
            <code class="prettyprint">SearchBar</code>.
          </p>
          <h3>Event Directives</h3>
          <p>Our goal now is to make sure that anytime the user types inside the input text field we trigger some type
            of search in the YouTube API. Let's first get started by just making sure that we can get some event or some
            notification anytime the user types in the input text field. We already did this previously in one of our
            CodePen exercises. You'll recall that we added a directive to the <code class="prettyprint">input</code> tag
            in the <code class="prettyprint">template</code>. We will also add a <code class="prettyprint">method</code>
            object to our component definition.
          </p>
          <p>Let's begin by adding in the <code class="prettyprint">methods</code> object to our component definition:
          </p>
          <figure>
<pre class="prettyprint">&lt;script&gt;
export default {
    name: 'SearchBar',
    methods: {

    }
};
&lt;/script&gt;</pre>
            <figcaption>Fig 03-035</figcaption>
          </figure>
          <p>Remember methods give us the ability to change data inside of our application. So I'm going to make a
            method called <code class="prettyprint">onInput</code> that will be called with an event which will contain
            the text that the user just entered into the input. For the moment we will just write this out to the
            console:
          </p>
          <figure>
<pre class="prettyprint">&lt;script&gt;
export default {
    name: 'SearchBar',
    methods: {
        onInput: function(event) {
            console.log(event.target.value);
        }
    }
};
&lt;/script&gt;</pre>
            <figcaption>Fig 03-036</figcaption>
          </figure>
          <p>We will also wire that method up to our <code class="prettyprint">input</code> element in the <code
            class="prettyprint">template</code>:
          </p>
          <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
        &lt;input v-on:input=&quot;onInput&quot; /&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-037</figcaption>
          </figure>
          <p>Save this and back in the browser refresh the page and enter some text into the text input field and you'll
            see the console logs start to appear.
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-038.png"/>
            <figcaption>Fig 03-038</figcaption>
          </figure>
          <h3>Shorthand Event Syntax</h3>
          <p>In the last section we wired up the <code class="prettyprint">onInput</code> directive to our <code
            class="prettyprint">input</code> tag. Before we move on to talking about how we're going to use this
            information to actually do a search on the YouTube API there is one little refactor I want to do to the
            <code class="prettyprint">v-on</code> directive we used on the <code class="prettyprint">input</code> tag.
          </p>
          <p>The refactor we are going to perform is purely syntactic - it does not affect the functionality of the
            directive in any way:
          </p>
          <figure>
            <pre class="prettyprint">&lt;input @input=&quot;onInput&quot; /&gt;</pre>
            <figcaption>Fig 03-039</figcaption>
          </figure>
          <p>We have replaced the <code class="prettyprint">v-on:input</code> directive with a more concise syntax <code
            class="prettyprint">@input</code>. This can be read as anytime someone triggers an input event on this
            element run the <code class="prettyprint">onInput</code> function.
          </p>
          <h3>Data Sharing Between Components</h3>
          <p>The SearchBar component is now aware of what a user is typing into your application thanks to the <code
            class="prettyprint">onInput</code> method - we can get a search term to use with the YouTube API. But where
            inside of our application should we locate the code to actually execute that search? Going back to our
            component hierarchy diagram:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-039.png"/>
            <figcaption>Fig 03-039</figcaption>
          </figure>
          <p>In our application we are trying to display a list of videos to our user and we're also trying to allow
            them to select one individual video as well. So, it seems to me, there are two areas in our application
            where we definitely need to know about the current list of videos that the user has searched for - the
            VideoDetail and VideoList components. On the other hand the SearchBar component doesn't really care about
            the list of videos that are being fetched from YouTube. For this reason it would be most appropriate to put
            the YouTube search code in the App component.
          </p>
          <p>You might be thinking, wait a minute, if the VideoDetail and VideoList are the components that actually
            need access to the list of videos why don't we put the code for doing the search in one of those. Here is a
            simplified diagram to demonstrate why we are not going to do that:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-040.png"/>
            <figcaption>Fig 03-040</figcaption>
          </figure>
          <p>So anytime that we want to communicate information (data or arbitrary information) throughout our app it is
            very easy for us to do so using components that are parent and children to each other. So in other words the
            VideoDetail component can easily communicate data with the App component and likewise the App component can
            easily communicate with the VideoDetail.
          </p>
          <p>However, it is not as easy to communicate across sibling components. So VideoDetail, SearchBar and
            VideoList are all being displayed by the App component which makes them sibling components.
          </p>
          <p>This means that if there is some common data that needs to be used between both VideoDetail and VideoList
            the best place to locate all that data would be inside the App component. From there it can be easily shared
            with both VideoDetail and VideoList.
          </p>
          <h3>Communication with Props and Events</h3>
          <p>The next thing we have to do is to figure out how to get the SearchBar to somehow tell the App component
            that it needs to execute a search in the first place. At present the SearchBar component is just reading in
            input that is provided by the user. So the SearchBar has to somehow say to the App - "Hey we've got some new
            input it's time for you to execute a search". The method of communicating between parent and child
            components varies on the direction we are trying to communicate.
          </p>
          <p>So if we want the App component to provide some information or data or just communicate something down to
            the SearchBar component we do so using a process called passing props - which is short for properties. So
            anytime we want to communicate from the App down to the SearchBar we will pass a prop. A prop can be
            anything from an array to an object, string or function - all types of values. We will see many examples of
            this over time.
          </p>
          <p>On the other hand, communicating from the SearchBar up to the App component (e.g. the SearchBar notifying
            the App component that it has some new input and needs the App component to do a new search) uses a slightly
            different system. To communicate upwards we make use of the event system that is included in Vue. So if the
            SearchBar wants to say something to the App then the SearchBar needs to emit an event. The App component
            will then listen for that event and whenever that event is triggered the App has the ability to run some
            custom code - in our case it would perform a search on the YouTube API.
          </p>
          <h3>Emitting Events</h3>
          <p>In the last section we spoke about how a parent component can communicate to the child by passing props and
            how the child can communicate with the parent by emitting events. Let's add some code to the SearchBar
            component to make sure that it emits an event anytime someone changes that <code
              class="prettyprint">input</code> element. In <span class="filename">SearchBar.vue</span> every single time
            that the <code class="prettyprint">onInput</code> function is called we are going to want to emit an event
            to the inform that App component that there is a new term to search the YouTube API with.
          </p>
          <p>First, replace the <code class="prettyprint">console.log</code> statement with a call the <code
            class="prettyprint">$emit</code> function:
          </p>
          <figure>
                    <pre class="prettyprint">methods: {
    onInput: function(event) {
        this.$emit();
    }
}</pre>
            <figcaption>Fig 03-041</figcaption>
          </figure>
          <p>The first argument to this function is the name of the event we want to emit. In this case I'll use a name
            of <code class="prettyprint">termChange</code> to indicate that our search term just changed:
          </p>
          <figure>
                    <pre class="prettyprint">methods: {
    onInput: function(event) {
        this.$emit('termChange');
    }
}</pre>
            <figcaption>Fig 03-042</figcaption>
          </figure>
          <p>As an aside I want to mention that when we were listening for an <code class="prettyprint"> input</code>
            event on the input text field in the <code class="prettyprint">template</code> - input is a special event
            name. In other words input elements emit events called input anytime someone inputs something into them.
            However when you and I are emitting events we have complete control over the name that we choose. I used
            <code class="prettyprint">termChange</code> because one convention is to use the name of what is about to
            occur and then a verb that indicates what just changed.
          </p>
          <p>The second argument can be used to provide some additional information about the event that just occurred.
            So in this case we're probably going to want to inform the App component about the new search term which is
            available on <code class="prettyprint">event.target .value</code>:
          </p>
          <figure>
                    <pre class="prettyprint">methods: {
    onInput: function(event) {
        this.$emit('termChange', event.target.value);
    }
}</pre>
            <figcaption>Fig 03-043</figcaption>
          </figure>
          <p>The last thing I want to mention here is the <code class="prettyprint">$</code> sign in the <code
            class="prettyprint">emit</code> function. There's nothing special about using the dollar sign with a
            function name - it is valid Javascript. So the creators of the Vue library could just have easily have
            called the function <code class="prettyprint">emit</code> and left out the dollar sign. The reason they
            added the dollar sign in there is just in case you ever decided to add in some additional property to your
            component called emit as well.
          </p>
          <h3>Listening for Custom Events</h3>
          <p>Our SearchBar component is now emitting an event anytime someone enters some new text. We're now going to
            open our App component and make sure that anytime the SearchBar emits the <code class="prettyprint">termChange</code>
            event the App has the ability to run some code that will do a search on the YouTube API. Add the following
            code to the <code class="prettyprint">SearchBar</code> tag that we added to <span
              class="filename">App.vue</span>:
          </p>
          <figure>
            <pre class="prettyprint">&lt;SearchBar v-on:termChange=&quot;onTermChange&quot;&gt;&lt;/SearchBar&gt;</pre>
            <figcaption>Fig 03-044</figcaption>
          </figure>
          <p>We specify a method name of <code class="prettyprint">onTermChange</code> to run anytime the <code
            class="prettyprint">termChange</code> event is triggered. Inside the component definition we'll add another
            key value pair of <code class="prettyprint"> methods</code> and define a function of <code
              class="prettyprint">onTermChange</code>

          </p>
          <figure>
                    <pre class="prettyprint">export default {
    name: 'App',
    components: {
        SearchBar
    },
    methods: {
        onTermChange: function() {

        }
    }
};</pre>

            <figcaption>Fig 03-045</figcaption>
          </figure>
          <p>One quick thing I want to mention about these function declarations that we've been writing is that we've
            been using the <code class="prettyprint">function</code> keyword (see Fig 03-045 above). If we wanted to we
            could use a little bit of ES2015 syntax to shorten this to:
          </p>
          <figure>
<pre class="prettyprint">export default {
        name: 'App',
        components: {
            SearchBar
        },
        methods: {
            onTermChange() {

            }
        }
    };</pre>
            <figcaption>Fig 03-046</figcaption>
          </figure>
          <p>The longer form makes it clear that we are calling a function. However, moving forward we're going to use
            this slightly shortened syntax because you'll see this form in use in many of the more modern application
            that make use of Vue.
          </p>
          <p>Ok so, once again, anytime the <code class="prettyprint">v-on:termChange</code> event is triggered we will
            run the <code class="prettyprint">onTermChange</code> function.
          </p>
          <p>You'll remember that back inside of SearchBar whenever we emit <code class="prettyprint"> termChange</code>
            we also pass along the new search term that the user just entered by passing <code class="prettyprint">event.target.value</code>
            as the second argument. Because we add <code class="prettyprint">event.target.value</code> as the second
            argument it will show up as the first argument to our callback function or event handler:
          </p>
          <figure>
<pre class="prettyprint">methods: {
    onTermChange(searchTerm) {

    }
}</pre>
            <figcaption>Fig 03-047</figcaption>
          </figure>
          <p>So searchTerm is going to be the same string that the user just entered into SearchBar. Temporarily let's
            again just log this to the console:
          </p>
          <figure>
<pre class="prettyprint">methods: {
    onTermChange(searchTerm) {
        console.log(searchTerm);
    }
}</pre>
            <figcaption>Fig 03-048</figcaption>
          </figure>
          <p>Now before we go test this out I want to draw your attention to the listener we added to the <code
            class="prettyprint">SearchBar</code> tag:
          </p>
          <figure>
            <pre class="prettyprint">&lt;SearchBar v-on:termChange=&quot;onTermChange&quot;&gt;&lt;/SearchBar&gt;</pre>
            <figcaption>Fig 03-049</figcaption>
          </figure>
          <p>The syntax is almost identical to the syntax we used to listen to an <code class="prettyprint">input</code>
            event on an <code class="prettyprint">input</code> element earlier. So, as before, we can shorten the
            syntax:
          </p>
          <figure>
            <pre class="prettyprint">&lt;SearchBar @termChange=&quot;onTermChange&quot;&gt;&lt;/SearchBar&gt;</pre>
            <figcaption>Fig 03-041</figcaption>
          </figure>
          <p>In the browser refresh the page and if you type some text you should see it logged in the console as
            before. The difference this time round is the console log is being called in the App component's <code
              class="prettyprint">onTermChange</code> method. This confirms that the SearchBar component is
            communicating up to the App component successfully.
          </p>
          <h3>Youtube API Signup</h3>
          <p>Our App component is now aware of anytime the user enters in a new search term. We will locate a bit of
            code in the <span class="filename">App.vue</span> file's <code class="prettyprint">onTermChange</code>
            function to initiate a search for some videos. Let's take a look at a diagram that will give us a better
            idea how we will use the YouTube API:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-042A.png"/>
            <figcaption>Fig 03-042A</figcaption>
          </figure>
          <p>Each time the user types into the input text field we are going to use a library called <a
            href="https://github.com/axios/axios">axios</a> to make an Ajax request over to the YouTube API. In the Ajax
            request we will provide the search term we are looking for. The YouTube API will then execute a search on
            it's own server and then respond to us with a list of videos that match that search term.
          </p>
          <p>In order to make use of the YouTube API we first have to sign up to it and get an API key. Browse to <a
            target="_blank" href="console.developers.google.com">console.developers.google.com</a>, sign in if required,
            and create a new project (I did this by clicking the drop down next to the Google APIs logo and clicking the
            new project button). Take the default random name (My Project 32866 in my case) and click Create. Next click
            the Enable APIS and Services button. Search for the YouTube Data API v3 and open it up. Click the enable
            button.
          </p>
          <p>After the API is enabled we need to get an API key to allow us to access the API itself. Click on the
            Create Credentials button. This prompts us for some information about the API that we want to create. Make
            sure that you have the YouTube Data API v3 selected, specify that you will be calling the API from a web
            browser, and that we only want to see public data. After you have entered all the relevant information click
            the "What credentials do I need?" button. At this point you should see the API key. Copy the key and return
            to your editor.
          </p>
          <p>Inside the <span class="filename">App.vue</span> file directly underneath our <code class="prettyprint">import</code>
            statement add the following code:
          </p>
          <figure>
            <pre class="prettyprint">const API_KEY = 'your key here';</pre>
            <figcaption>Fig 03-042</figcaption>
          </figure>
          <p>You'll notice that I use capital letters with the underscore right here to declare the variable name.
            That's because this is a constant variable and I never expect this to be changed.
          </p>
          <p>Next we will install the Axios library which is what we are going to use to make an Ajax request to the
            YouTube API. From a terminal in the video-browser directory issue the command <span class="terminal">npm
              install --save axios</span>
          <h3>Searching Youtube</h3>
          <p>In the App.vue file import the axios library:</p>
          <figure>
            <pre class="prettyprint">import axios from 'axios';</pre>
            <figcaption>Fig 03-045</figcaption>
          </figure>
          <p>We will add the following code to the <code class="prettyprint">onTermChange</code> function to perform the
            YouTube search (You can find the YouTube API documentation by Googling YouTube API):
          </p>
          <figure>
<pre v-pre class="prettyprint">methods: {
    onTermChange(searchTerm) {
        axios.get('https://googleapis.com/youtube/v3/search', {
            params: {
                key: API_KEY,
                type: 'video',
                part: 'snippet',
                q: searchTerm
        }
    }).then(response =&gt; console.log(response));
}</pre>
            <figcaption>Fig 03-046</figcaption>
          </figure>
          <p>We use the <code class="prettyprint">axios.get</code> method to call the YouTube API passing the Url as the
            first argument. A <code class="prettyprint">params</code> object is passed as the the second object which
            specifies the following settings:
          </p>
          <ul>
            <li>key - The API_KEY const we just defined.</li>
            <li>type - The type of resource on YouTube we are looking for.</li>
            <li>part - Tells the YouTube API what type of information we want back</li>
            <li>q - The search term to pass to the YouTube API</li>
          </ul>
          <p>We then chain a <code class="prettyprint">.then</code> to the axios request. This statement accepts a
            function that gets called with the response that we get back from YouTube. So we can accept that as an
            argument and then for now just write the response to the console. Save the file and return to the browser,
            refresh the page and perform a search. You'll notice we get a nasty error message in our console. In the
            next section we'll investigate why we are seeing this error.
          </p>
          <h3>Investigating Video Responses</h3>
          <p>In the last section we got a nasty error message that complained with a status of 404 for this. This is
            because of a typo in the Url that we specified to the <code class="prettyprint">axios.get</code> method. It
            should have been <a target="blank" href="https://www.googleapis.com/youtube/v3/search">https
              ://www.googleapis.com/youtube/v3/search</a>. If we now save the file, refresh the browser and search again
            you should see a collection of console logs. This is because everytime the user enters some text an event is
            triggered. That event instantly triggers an Ajax request over to the YouTube API.
          </p>
          <p>If you investigate one of the responses you will see several different properties:</p>
          <ul>
            <li>A status request of 200 - means that the Ajax call was successful.</li>
            <li>A data property - contains the data returned from the request</li>
            <ul>
              <li>items - found inside the data property this array contains details on the different YouTube videos
                that were found from our search request.
              </li>
            </ul>
          </ul>
          <p>Inside on of the items you will find properties like id and snippet. Snippet contains:</p>
          <ul>
            <li>The channel the video was posted to</li>
            <li>A description</li>
            <li>When it was published</li>
            <li>Some thumbnails for the video</li>
            <li>The title</li>
          </ul>
          <p>Ok so this looks like we have some information about a list of videos coming back from the YouTube API.
          </p>
          <p>In the next section we'll talk about how we can use this list of videos to show the videos inside of our
            application.
          </p>
          <h3>Rendering a List of Videos</h3>
          <p>In the last section we were able to execute a search on the YouTube API for some given search term. We got
            a response that contained a list of videos that were found during that search. Now we need to take this list
            of videos and somehow display them on the screen.
          </p>
          <p>Create a new file in the <span class="filename">components</span> directory called <span class="filename">VideoList.vue</span>.
            Remember we always make one separate Vue file for every component that we create. Add the following code:
          </p>
          <figure>
<pre class="prettyprint">&lt;template&gt;
  &lt;ul&gt;
      VideoList
  &lt;/ul&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
      name: 'VideoList'
  };
&lt;/script&gt;

&lt;style&gt;

&lt;/style&gt;</pre>
            <figcaption>Fig 03-047</figcaption>
          </figure>
          <p>The unordered list will be used to render the list of videos - for the moment we have just added some
            placecholder text. The <code class="prettyprint">script</code> tag contains <code class="prettyprint">export
              default</code> which contains a <code class="prettyprint">name</code> property of VideoList.
          </p>
          <p>Before we go any further let's wire up the VideoList component to our App component to get it visible on
            the screen. In the App component we will go through the three step process that we follow to show one
            component inside of another.
          </p>
          <ul>
            <li>Add the <code class="prettyprint">import</code> statement - <code class="prettyprint">import VideoList
              from './components/VideoList.vue';</code>
            </li>
            <li>Add a tag for VideoList in the template - <code
              class="prettyprint">&lt;VideoList&gt;&lt;/VideoList&gt;</code>
            </li>
            <li>Add it to the <code class="prettyprint">components</code> property on the component configuration -
              <code class="prettyprint">VideoList</code></li>
          </ul>
          <p>Save the file and go to the browser where you should see the text VideoList in the browser window.
          </p>
          <h3>Updating Data Causes Rerenders</h3>
          <p>Our <code class="prettyprint">onTermChange</code> method is now making a request to the YouTube API to
            fetch a list of videos. We have also setup a VideoList component to actually display the list of videos. The
            next thing we need to do is communicate the list of videos that we fetch down from the parent App component
            to the child VideoList component. VideoList is the child because it is being display from within the App
            component.
          </p>
          <p>The following diagram illustrates this process:</p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-048.png"/>
            <figcaption>Fig 03-048</figcaption>
          </figure>
          <p>This is a timeline - starting from the top and ending up at the bottom. So with our workflow for getting a
            list of videos everything starts with the <code class="prettyprint">onTermChange</code> method being called.
            When that method is called we make a request to the YouTube API which responds with a list of objects that
            represents a list of videos. The next step is where things get interesting.
          </p>
          <p>Remember that any time that we have some type of variable or information tied to a Vue instance or a
            component we store that information on the <code class="prettyprint">data</code> property. So we use <code
              class="prettyprint"> methods</code> to update our <code class="prettyprint">data</code>. Whenever we
            update our <code class="prettyprint">data</code> the component is automatically re-rendered. We can then
            optionally make use of that <code class="prettyprint">computed</code> property to somehow twist those values
            into something that can be displayed on the screen. We're going to take that list of videos that are
            returned and we're going to assign it to a property on our <code class="prettyprint">data</code> object
            inside of the App component. Because we are updating the <code class="prettyprint">data</code> property we
            are going to cause the App component to automatically re-render it's template
          </p>
          <p>Now the important thing to realize here is that when we show one component inside of another, as we are
            doing here with the <code class="prettyprint">VideoList</code> inside the <code
              class="prettyprint">App</code> component, whenever the parent component re-renders it's template with some
            new data that causes all of the child components to be re-rendered as well. So whenever we update <code
              class="prettyprint">data</code> in the <code class="prettyprint">App</code> component <code
              class="prettyprint">VideoList</code> will be updated at the same time - all of which happens
            automatically.
          </p>
          <p>So the plan is to take the list of videos and store it on <code class="prettyprint">data</code> . When we
            do that causes everything to re-render. Then we can get our list of videos inside of VideoList and render
            them out in the template.
          </p>
          <p>In the next section, we will take our list of videos that are being retrieved when the <code
            class="prettyprint">onTermChange</code> function is executed and store them on the <code
            class="prettyprint">data</code> property.
          </p>
          <h3>Data in Components vs Instances</h3>
          <p>The <code class="prettyprint">data</code> property is defined in a slightly different way depending on
            whether we are working with a Vue instance or a Vue component. The following diagram describes this
            scenario:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-049.png"/>
            <figcaption>Fig 03-049</figcaption>
          </figure>
          <p>So if we are working with a Vue instance then we can define the <code class="prettyprint">data</code>
            property as an object:
          </p>
          <figure>
                    <pre class="prettyprint">data: {
    textInput: ''
},</pre>
            <figcaption>Fig 03-050</figcaption>
          </figure>
          <p>or a function that returns an object:</p>
          <figure>
<pre class="prettyprint">data: function() {
    return {
        textInput: ''
    }
},</pre>
            <figcaption>Fig 03-051</figcaption>
          </figure>
          <p>Once we start working with Vue components the <code class="prettyprint">data</code> property <span
            style="text-decoration: underline">must</span> be a function that returns an object.
          </p>
          <figure>
<pre class="prettyprint">data: function() {
    return {
        textInput: ''
    }
},</pre>
            <figcaption>Fig 03-052</figcaption>
          </figure>
          <p>Now, I'm sure, at this point you are curios about why there is a distinction. The following diagram
            illustrates why this requirement is in place:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-053.png"/>
            <figcaption>Fig 03-053</figcaption>
          </figure>
          <p>Now, just for a moment, I want you to imagine that we break the rules and make an App component within
            which we define our <code class="prettyprint">data</code> property as an object rather than as a function.
            When we define the <code class="prettyprint">data</code> property as an object you can imagine that it
            essentially gets created inside our Computer's Memory:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-054.png"/>
            <figcaption>Fig 03-054.png-</figcaption>
          </figure>
          <p>So inside of the our computers memory we've got that object just sitting around. When we then make an
            instance out of this App component - let's say we make three instances:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-055.png"/>
            <figcaption>Fig 03-055.png-</figcaption>
          </figure>
          <p>Every instance will be referring to the exact same object inside of memory. So if any of these instances
            start to modify the object all the other instances will change as well because they're all sharing the exact
            same object.
          </p>
          <p>The easiest workaround for this is to make a function that returns an object. When we do that every single
            time we create a component instance they will each have their own separate copy of that data object:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-056.png"/>
            <figcaption>Fig 03-056</figcaption>
          </figure>
          <p>So, essentially, because of this data sharing issue we have to create functions that create objects when
            we're working with <code class="prettyprint">data</code> inside of a component.
          </p>
          <p>In the next section we will update our App component so that it has a data property that returns an object.
          </p>
          <h3>Updating Data</h3>
          <p>In the last section we spoke about how data inside of a component has to be defined as a function that
            returns an object. So inside of my App component between our list of <code
              class="prettyprint">components</code> and our <code class="prettyprint">methods</code> we'll add a new
            property that will return an object that represents our <code class="prettyprint">data</code>:
          </p>
          <figure>
                    <pre class="prettyprint">data() {
    return {};
},</pre>
            <figcaption>Fig 03-056</figcaption>
          </figure>
          <p>So we define the <code class="prettyprint">data</code> property and use the shorter ES2015 syntax. Inside
            the <code class="prettyprint">data</code> function we return an object which will initialize our data. This
            is going to be like the starting state or the initial ingredients for our component. So we have to start
            thinking about what different properties our <code class="prettyprint">data</code> is going to contain.
          </p>
          <p>We definitely know that we need to have a list of videos because that's what we are retrieving from our
            <code class="prettyprint">onTermChange</code> function - so let's add a videos property which should be an
            array of objects where every object represents one video:
          </p>
          <figure>
<pre class="prettyprint">data() {
    return { videos: [] };
},</pre>
            <figcaption>Fig 03-057</figcaption>
          </figure>
          <p>Now inside the <code class="prettyprint">onTermChange</code> function where we have the <code
            class="prettyprint">.then</code> chained function to wait for a response from the YouTube API we can replace
            the console log with some logic that will take the list of videos that are contained inside of the response
            and update our <code class="prettyprint">data</code> property - specifically the videos property:
          </p>
          <figure>
                    <pre v-pre class="prettyprint">methods: {
    onTermChange(searchTerm) {
        axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: API_KEY,
                type: 'video',
                part: 'snippet',
                q: searchTerm
            }
        }).then(response =&gt; {
            this.videos = response.data.items;
        });
    }
}</pre>
            <figcaption>Fig 03-058</figcaption>
          </figure>
          <p>Remember the <code class="prettyprint">data</code> property that is returned in the <code
            class="prettyprint">response</code> is not at all related to the component instance - it is the <code
            class="prettyprint">data</code> property that is tied to our <code class="prettyprint">response</code>
            object that comes back from YouTube.
          </p>
          <p>Because <code class="prettyprint">videos</code> is a <code class="prettyprint">data</code> property when
            the above line is executed it will cause the entire template inside the App component to automatically
            re-render. As a quick test, let's add in a counter inside of our template that counts the number of videos
            that have been found on the YouTube API:
          </p>
          <figure>
<pre v-pre class="prettyprint">&lt;div&gt;
    &lt;SearchBar @termChange=&quot;onTermChange&quot;&gt;&lt;/SearchBar&gt;
    &lt;VideoList&gt;&lt;/VideoList&gt;
    {{ videos.length }}
&lt;/div&gt;</pre>
            <figcaption>Fig 03-059</figcaption>
          </figure>
          <p>Usually we would use a computed function here but because this is just a temporary thing we won't bother
            with a computed function. We reference the <code class="prettyprint">videos data</code> property and
            retrieve it's <code class="prettyprint">length</code> .
          </p>
          <p>Remember that when we are referencing a <code class="prettyprint">data</code> property or function that is
            tied to our component from within our template we do not have to prefix it with <code class="prettyprint">this</code>
            we can just write out the name of the property that we are trying to reference.
          </p>
          <p>So let's save this and we'll go back over to our browser and you'll notice that now we've got the counter
            appearing on the screen. Type a search term in to see how many videos are returned.
          </p>
          <p>The next step is to take the list of videos stored on the <code class="prettyprint">data</code> property
            and pass it down to the <code class="prettyprint">VideoList</code> component.
          </p>
          <h3>Communicating from Parent to Child</h3>
          <p>In the last section we updated our <code class="prettyprint">data</code> property of <code
            class="prettyprint">videos</code> whenever we got a reesponse back from the YouTube API. Because we updated
            a property that was defined on our <code class="prettyprint">data</code> object that causes our App
            component to automatically re-render.
          </p>
          <p>Now we want to communicate down the list of videos down to the VideoList component because the VideoList is
            responsible for rendering out information about each particular video on the screen. We've spoken a little
            bit about communicating from a parent to a child component previously - so instead of emitting events (that
            happens in the other direction) we pass props. This is a two step process. The first thing we're going to do
            is add a little bit of code to the parent component:
          </p>
          <figure>
            <pre class="prettyprint">&lt;VideoList v-bind:videos=&quot;videos&quot;&gt;&lt;/VideoList&gt;</pre>
            <figcaption>Fig 03-060</figcaption>
          </figure>
          <p>The <code class="prettyprint">videos</code> property we specify above (to the left of the = operator) will
            be available in the child component - there is no restriction on what you call this property (e.g.
            myVideoArray). The value to the right specifies the name of the <code class="prettyprint">data</code>
            property (so here the name is important) that we want to share from the App component - the parent. In this
            case that's the <code class="prettyprint">videos</code> property.
          </p>
          <p>The purpose of the <code class="prettyprint">v-bind</code> directive is to specify that anytime the <code
            class="prettyprint">videos</code> property is updated inside of the parent it should automatically try to
            re-render the <code class="prettyprint">VideoList</code> and provide that new list of videos to the <code
              class="prettyprint">VideoList</code> component.
          </p>
          <p>We can also use a shorthand form for the v-bind directive as well:</p>
          <figure>
            <pre class="prettyprint">&lt;VideoList :videos=&quot;videos&quot;&gt;&lt;/VideoList&gt;</pre>
            <figcaption>Fig 03-061</figcaption>
          </figure>
          <p>Throughout the rest of the course we will use this shorthand syntax.</p>
          <p>In the next section we will add some configuration to our child component to tell it about the props that
            it should expect to receive from it's parent.
          </p>
          <h3>Prop Validation</h3>
          <p>In the last section we added some configuration to our App component to take our list of videos and pass it
            down to the VideoList. Step two of passing props involves adding some configuration to our child component
            to tell it about what data it should expect to receive from it's parent.
          </p>
          <p>Open the <span class="filename">VideoList.vue</span> file and add the following code to the <code
            class="prettyprint">script</code> section:
          </p>
          <figure>
                    <pre class="prettyprint">export default {
  name: 'VideoList',
  props: ['videos']
};</pre>
            <figcaption>Fig 03-062</figcaption>
          </figure>
          <p>We assign an array to the <code class="prettyprint">props</code> property that contains a number of strings
            which match the exact property names that the component should expect to receive from the parent - <code
              class="prettyprint">videos</code> in our case. Defining our <code class="prettyprint">props</code> list
            can be as simple as listing out the names of all the different properties that we expect to receive. We can
            also add in some amount of configuration or validation to make sure that the child component is receiving
            the correct type of property as well. We might want to validate to make sure that the parent is passing down
            an array, or a string, or an object. This is optional, but recommended. So instead of an array of strings we
            can pass in an object where the keys are the name of the properties we expect to receive and the values are
            the type of the property that we expect. In the case of the videos object we expect it to be an array of
            objects so we can write the following:
          </p>
          <figure>
                    <pre class="prettyprint">export default {
  name: 'VideoList',
  props: {
      videos: Array
  }
};</pre>
            <figcaption>Fig 03-063</figcaption>
          </figure>
          <p>This component will then expect to receive a property called <code class="prettyprint">videos</code> that
            should be an array. If an array is not passed then the component will throw an error
          </p>
          <p>Now that we completed step number 2, we can make use of the prop that has been provided anywhere inside of
            our component. So we could use it in a computed function, or methods, or we could access it directly inside
            our template. We'll do the last one. Inside the template, I'm going to try to print out the number of videos
            that we have been passed again:
          </p>
          <figure>
                    <pre v-pre class="prettyprint">&lt;template&gt;
  &lt;ul&gt;
      VideoList
      {{ videos.length }}
  &lt;/ul&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-064</figcaption>
          </figure>
          <p>This syntax is identical to the earlier example when we accessed the <code class="prettyprint">videos
            data</code> property in the <code class="prettyprint">App</code> component. We do the exact same thing when
            we are accessing a prop as well - the common theme being we just use the name.
          </p>
          <p>Let's go back to the browser, refresh and test by entering a search at which point you should see the
            counter display the number of results returned.
          </p>
          <p>Now that we have got some <code class="prettyprint">props</code> we can start to add some logic to the
            VideoList component to render those out as a list.
          </p>
          <h3>Separate List Components</h3>
          <p>Our VideoList component now knows about the list of videos that it needs to render to the screen. As a
            quick reminder remember that the entire list itself is going to be comprised of two separate components. The
            first is the VideoList - which is what we are working on now. The purpose of VideoList is to take the list
            of videos that we pass down to it and then render one VideoListItem component for each video that it
            receives.
          </p>
          <p>Create a new file called <span class="filename">VideoListItem.vue</span> inside the <span class="filename">components</span>
            directory. Add the following boilerplate code:
          </p>
          <figure>
<pre class="prettyprint">&lt;template&gt;

&lt;/template&gt;

&lt;script&gt;
export default {
    name: 'VideoListItem'
};
&lt;/script&gt;</pre>
            <figcaption>Fig 03-065</figcaption>
          </figure>
          <p>Now, since we are using a <code class="prettyprint">ul</code> element inside of VideoList we will make each
            individual list item an <code class="prettyprint">li</code>.
          </p>
          <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;li&gt;
        VideoListItem
    &lt;/li&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-066</figcaption>
          </figure>
          <p>We have now created the VideoListItem component. Let's import it into the VideoList and wire it up as a
            component that the VideoList can display.
          </p>
          <figure>
<pre class="prettyprint">&lt;script&gt;
  import VideoListItem from './VideoListItem';</pre>
            <figcaption>Fig 03-067</figcaption>
          </figure>
          <p>Remember that anytime we want to tell the parent component that it has access to the child we have to add
            the <code class="prettyprint">components</code> property to that parent component itself and supply the name
            of the child component. Add the following code to the VideoList component configuration:
          </p>
          <figure>
<pre class="prettyprint">export default {
  name: 'VideoList',
  components: {
      VideoListItem
  },
  props: {
      videos: Array
  }
};</pre>
            <figcaption>Fig 03-068</figcaption>
          </figure>
          <p>Now inside of our VideoList component we have access to the VideoListItem component. Now we need to figure
            out how to create one VideoListItem component for every video that is contained within our <code
              class="prettyprint">videos</code> property.
          </p>
          <h3>Lists with v-for</h3>
          <p>In the last section we created a VideoListItem component and we wired it up to it's parent - VideoList.
          </p>
          <p>We now need to add some code to the VideoList to make sure it shows exactly one instance of the
            VideoListItem for every video that we have fetched. So far it looks like every single time we get a response
            back from the YouTube API we are always getting a list of five videos . So this is the number of
            VideoListItem components I would expect to see rendered in the list.
          </p>
          <p>To render the list we will use another directive inside the template section of our VideoList component:
          </p>
          <figure>
<pre class="prettyprint">&lt;template&gt;
      &lt;ul&gt;
          &lt;VideoListItem v-for=&quot;video in videos&quot;&gt;
          &lt;/VideoListItem&gt;
      &lt;/ul&gt;
  &lt;/template&gt;</pre>
            <figcaption>Fig 03-069</figcaption>
          </figure>
          <p>The <code class="prettyprint">v-for</code> directive is the directive you will use every time that you want
            to build a list of components out. We can interpret this directive as - for every single object or every
            single video inside of the list of videos that was provided as a <code class="prettyprint">prop</code> to
            our VideoList component make exactly one VideoListItem component.
          </p>
          <p>Notice also how we declared <code class="prettyprint">video</code> in the statement <code
            class="prettyprint">video in videos</code>. This allows use to access an individual <code
            class="prettyprint">video</code> from within the <code class="prettyprint">VideoListItem</code> component
            tag.
          </p>
          <p>Save the file, go back to the browser, refresh the page, enter a search term and you should see the
            following output:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-070.png"/>
            <figcaption>Fig 03-070</figcaption>
          </figure>
          <p>You are seeing this output because, at present, the VideoListItem component is simply outputting an <code
            class="prettyprint">li</code> element containing the text VideoListItem for each <code class="prettyprint">video</code>
            in the <code class="prettyprint">videos</code> prop.
          </p>
          <p>In the next section we will customize the VideoListItem component to show some information about the video
            that it represents.
          </p>
          <h3>Handling Props with v-for</h3>
          <p>In the last section we were able to get a collection of VideoListItem components to print out on the screen
            by using the <code class="prettyprint">v-for</code> directive.
          </p>
          <p>We now need figure out some way to say that for every video in this list of videos we want to communicate
            this video in the <code class="prettyprint">v-for</code> directive down to the <code class="prettyprint">VideoListItem</code>
            component so the component instance knows what video it is supposed to be displaying information about on
            the screen. This is another scenario where we want to communicate some data from the parent component of
            VideoList down to the child component of VideoListItem which will achieve by, again, making use of the Vue
            props system.
          </p>
          <p>We just went through this process but as a reminder we first have to add a <code class="prettyprint">
            v-bind</code> expression to the parent components template. This time around, that might seem like it's a
            bit more challenging here. It's definitely not the same type of setup that we had back inside of our App
            component:
          </p>
          <figure>
<pre class="prettyprint">&lt;div&gt;
    &lt;SearchBar @termChange=&quot;onTermChange&quot;&gt;&lt;/SearchBar&gt;
    &lt;VideoList :videos=&quot;videos&quot;&gt;&lt;/VideoList&gt;
&lt;/div&gt;
</pre>
            <figcaption>Fig 03-070</figcaption>
          </figure>
          <p>In particular, how do we get access to one individual video to pass down to the VideoListItem? Well, when
            we write out <code class="prettyprint">v-for=&quot;video in videos&quot;</code> a temporary variable of
            <code class="prettyprint">video</code> is declared that we can use inside of our template. <code
              class="prettyprint">video</code> represents one video or one object in our array.
          </p>
          <p>Let's add some configuration to the VideoListItem tag underneath the <code class="prettyprint">v-for</code>
            directive:
          </p>
          <figure>
<pre class="prettyprint">&lt;template&gt;
      &lt;ul&gt;
          &lt;VideoListItem
            v-for=&quot;video in videos&quot;
            :video=&quot;video&quot;
          &gt;
          &lt;/VideoListItem&gt;
      &lt;/ul&gt;
  &lt;/template&gt;</pre>
            <figcaption>Fig 03-071</figcaption>
          </figure>
          <p>So we write <code class="prettyprint">v-bind:</code> and then the name of the prop <code
            class="prettyprint">video</code> as we want it to show up inside of the child component. So now
            VideoListItem is going to have access to a variable called <code class="prettyprint">video</code> . After
            that we write <code
              class="prettyprint">="video"</code> which specifies the piece of data or the variable from the VideoList
            component that needs to be passed down to the child. <code class="prettyprint">video</code> is referencing
            the current video that we are iterating over inside of our list of videos. If we had specified a different
            name in the <code class="prettyprint">v-for</code> directive we would need to use that in our <code
              class="prettyprint">v-bind</code> directive also:
          </p>
          <figure>
<pre class="prettyprint">&lt;VideoListItem
    v-for=&quot;mySingleVideo in videos&quot;
    :video=&quot;mySingleVideo&quot;
  &gt;
  &lt;/VideoListItem&gt;</pre>
            <figcaption>Fig 03-072</figcaption>
          </figure>
          <p>We will stick with <code class="prettyprint">video</code> to keep the naming terminology consistent. So now
            that we are passing some information, as a <code class="prettyprint">prop</code> , from the parent to the
            child we need to tell the child component to expect to receive the <code class="prettyprint">prop</code> .
          </p>
          <p>In the VideoListItem component add a <code class="prettyprint">props</code> property and, in this case, we
            will supply the <code class="prettyprint">prop</code> names as an array of strings instead of an object,
            although either way is valid.
          </p>
          <figure>
<pre class="prettyprint">export default {
    name: 'VideoListItem',
    props: ['video']
};</pre>
            <figcaption>Fig 03-073</figcaption>
          </figure>
          <p>Now, in the template section of the VideoListItem component, replace the existing code with a reference to
            the <code class="prettyprint">video</code> prop:
          </p>
          <figure>
<pre v-pre class="prettyprint">&lt;template&gt;
    &lt;li&gt;
        {{ video.snippet.title }}
    &lt;/li&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-074</figcaption>
          </figure>
          <p>We get the name of the video from the <code v-pre class="prettyprint">{{ video.snippet.title }} </code>.
            The video object has a <code class="prettyprint">snippet</code> property which, in turn, contains <code
              class="prettyprint">title, description</code> and <code class="prettyprint">id</code> properties. Re-run
            the app inside of the browser and you should see a list of video titles appearing in our list.
          </p>
          <h3>Keys with v-for</h3>
          <p>In the last section we made use of the <code class="prettyprint">v-for</code> directive to render out a
            list of VideoListItems. Anytime we use this <code class="prettyprint">v-for</code> directive to build out a
            list of items there is one other property that we should (although it is optional) provide to the element or
            the component that we are making a list out of - the <code class="prettyprint">key</code> property:
          </p>
          <figure>
<pre class="prettyprint">&lt;VideoListItem
    v-for=&quot;video in videos&quot;
    :video=&quot;video&quot;
    :key=&quot;video.etag&quot;
  &gt;
  &lt;/VideoListItem&gt;</pre>
            <figcaption>Fig 03-074-</figcaption>
          </figure>
          <p>The <code class="prettyprint">key</code> property is used whenever our list is updated. In particular it's
            used to update our list in a performant fashion. If you look at the console in the browser for our
            application you wont see any warnings about a key not being present. This is because you don't strictly have
            to provide a key but in general we should do if possible because it enhances the performance of re-rendering
            our list of items. Inside the double quotes we provide a value that is unique and consistent to the
            individual record that we are rendering. In our case this is <code class="prettyprint">video .etag</code>.
          </p>
          <h3>Including Bootstrap Styling</h3>
          <p>Currently we are just outputting the title of the video in our list. We are going to add styling (using
            Bootstrap CSS) to display a thumbnail image with the video title to the right. From the Boostrap website
            browse to the <a
              href="https://getbootstrap.com/docs/4.1/getting-started/introduction/" target="_blank"> getting
              started</a> page and copy the link in the CSS section. Paste the link into the <span class="filename">index.html</span>
            tag under the <code class="prettyprint">title</code> element. Back in the browser if you refresh the page
            and perform a search you should notice that some styling has already been applied.
          </p>
          <h3>Styling the Search Bar</h3>
          <p>In the last section we installed the Bootstrap CSS library into our project. We're now going to use some
            the CSS that is included in Bootstrap to style our project starting with the search bar at the top of the
            page. Anytime we make use of the Bootstrap library Bootstrap always assumes that our root element will have
            a class of <code class="prettyprint">container</code> - which is used throughout Bootstrap to better style
            and align different items inside of our project. The <code class="prettyprint">div</code> element in the
            template of the App component is one of the absolute root elements inside of our application so we'll add a
            <code class="prettyprint">class</code> of <code class="prettyprint">container</code> to this element.
            Refresh the application and you'll immediately see that all the content on our page is more aligned towards
            the center of the screen.
          </p>
          <p>Next add some styling to the SearchBar component in the empty style tag. We use the <code
            class="prettyprint">scoped</code> attribute to ensure that the CSS we add here only affects this component:
          </p>
          <figure>
<pre class="prettyprint">&lt;style scoped&gt;
    input {
        width: 75%;
    }

    div {
        text-align: center;
        margin: 20px;
    }
&lt;/style&gt;</pre>
            <figcaption>Fig 03-075</figcaption>
          </figure>
          <p>Refresh the browser and you should see the search bar is more centered on the screen and there is also a
            little bit more of a margin between the browser's address bar and the search bar itself.
          </p>
          <h3>Styling the Video List</h3>
          <p>Next we will add some styling to the list of videos that gets rendered by the VideoList and VideoListItem
            components.
          </p>
          <p>We will apply the <code class="prettyprint">list-group</code> bootstrap style to the <code
            class="prettyprint">ul</code> element in the VideoList component:
          </p>
          <figure>
<pre class="prettyprint">&lt;template&gt;
  &lt;ul class=&quot;list-group&quot;&gt;
      &lt;VideoListItem
        v-for=&quot;video in videos&quot;
        :video=&quot;video&quot;
        :key=&quot;video.etag&quot;
      &gt;
      &lt;/VideoListItem&gt;
  &lt;/ul&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-076</figcaption>
          </figure>
          <p>and the <code class="prettyprint">list-group-item</code>style to the child <code
            class="prettyprint">li</code> elements in the VideoListItem component:
          </p>
          <figure>
<pre v-pre class="prettyprint">&lt;template&gt;
    &lt;li class=&quot;list-group-item&quot;&gt;
        {{ video.snippet.title }}
    &lt;/li&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-077</figcaption>
          </figure>
          <p>It's worth pointing out that we don't try and add styles directly to the <code class="prettyprint">&lt;VideoListItem&gt;</code>
            tag in the VideoList component. Instead we open up the component itself and add the styles to the <code
              class="prettyprint"> li</code> element located within. If you refresh the browser you should see the list
            of videos rendered using the styling we just specified.
          </p>
          <h3>Thumbnail Image Reference</h3>
          <p>Next we'll display a thumbnail image for each video returned in the list of videos. We'll begin by taking a
            look at the response object that comes back from the YouTube API. The snippet property contains a thumbnail
            property that itself contains three properties:
          </p>
          <ul>
            <li>default</li>
            <li>high</li>
            <li>medium</li>
          </ul>
          <p>These properties refer to the size of the image. Copy the value of the url property in the default image.
            In the template for the VideoListItem component add an <code class="prettyprint">img</code> tag:
          </p>
          <figure>
<pre v-pre class="prettyprint">&lt;template&gt;
    &lt;li class=&quot;list-group-item&quot;&gt;
        &lt;img :src=&quot;video.snippet.thumbnails.default.url&quot; /&gt;
             {{ video.snippet.title }}
    &lt;/li&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-078</figcaption>
          </figure>
          <p>Here we bind the <code class="prettyprint">src</code> property to the <code class="prettyprint">url</code>
            property we discussed above. If you refresh the browser you should now see the image thumbnails in the list
            of videos.</p>
          <h3>Thumbnail by Computed Property</h3>
          <p>In the last section we displayed our thumbnail image on the screen. However, we did add a very long
            property reference: <code class="prettyprint">video.snippet.thumbnails.default.url</code> directly into our
            template. This type of practice can make our template look messy and difficult to read. In this section, as
            an alternative, we are going to put this reference into our component as a computed property. We can use
            computed property to not only work with component data but also properties that are coming in through props
            inside of a component. Underneath <code class="prettyprint">props</code> add the <code
              class="prettyprint">computed</code> object with a <code class="prettyprint">thumbnailUrl</code> function:
          </p>
          <figure>
<pre v-pre class="prettyprint">export default {
    name: 'VideoListItem',
    props: ['video'],
    computed: {
        thumbnailUrl() {
            return this.video.snippet.thumbnails.default.url;
        }
    }
};</pre>
            <figcaption>Fig 03-079</figcaption>
          </figure>
          <p>Back in the <code class="prettyprint">img</code> tag in the <code class="prettyprint">template</code> we
            can now use our computed property:
          </p>
          <figure>
<pre v-pre class="prettyprint">&lt;template&gt;
    &lt;li class=&quot;list-group-item&quot;&gt;
        &lt;img :src=&quot;thumbnailUrl&quot; /&gt;
             {{ video.snippet.title }}
    &lt;/li&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-080</figcaption>
          </figure>
          <p>In the browser the application should work as before. To recap, we can use computed functions to work with
            or format data before we reference it inside our template. The <code class="prettyprint">this</code> keyword
            in the computed function above is present because we are referencing a <code class="prettyprint">prop</code>
            called <code class="prettyprint">video</code> inside of our component. We then add the properties: <code
              class="prettyprint">snippet.thumbnails.default.url</code> and make that the return value of our function.
            We specified a function name of <code class="prettyprint">thumbnailUrl</code> inside of the computed object.
            We can then reference that function anywhere within our template. Notice that when we referenced the
            computed function we do not have to specify any parentheses or prefix the function with <code
              class="prettyprint">this.</code> - we just use the computed function's name and Vue takes over from there.
          </p>
          <p>There was no mandatory requirement to refactor the code to use a computed property but anytime we add a
            very long property reference or any amount of Javascript logic directly into our template that's a sign that
            you might want to look at using a computed function to keep the template as simple and clean as possible.
          </p>
          <h3>More List Item Styling</h3>
          <p>Ok now we've got thumbnails displayed inside of our VideoList item but you'll notice that the title kind of
            wraps around underneath the thumbnail image which is not what we want.
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-081.png"/>
            <figcaption>Fig 03-081</figcaption>
          </figure>

          <p>The bootstrap documentation has a section on <a
            href="https://getbootstrap.com/docs/4.0/layout/media-object/#media-list">media list</a> which adds styling
            to show an image to the left with a bold title to the right.
          </p>
          <p>To achieve this layout we add a class of <code class="prettyprint">media</code> to our <code
            class="prettyprint">li</code> element and a class of <code class="prettyprint">mr-3</code> to our <code
            class="prettyprint">img</code> element. We also have to use a <code
            class="prettyprint">div</code> element with a class of <code class="prettyprint">media-body</code> which
            wraps anything that forms the text to the right hand side of the image:
          </p>
          <figure>
<pre v-pre class="prettyprint">&lt;template&gt;
    &lt;li class=&quot;list-group-item media&quot;&gt;
        &lt;img class=&quot;mr-3&quot; :src=&quot;thumbnailUrl&quot; /&gt;
        &lt;div class=&quot;media-body&quot;&gt;
             {{ video.snippet.title }}
        &lt;/div&gt;

    &lt;/li&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-081</figcaption>
          </figure>
          <p>Ok, so we made a difference but we didn't get our desired result. Now the title just appears underneath the
            thumbnail. This is because the <code class="prettyprint">list-group-item</code> and the <code
              class="prettyprint">media</code> class conflict on how the item should be style. To workaround this we
            will add some custom CSS. We add the CSS to a <code class="prettyprint">scoped style</code> tag in
            VideoListItem:</p>
          <figure>
<pre class="prettyprint">&lt;style scoped&gt;
    li {
        display: flex;
    }
&lt;/style&gt;</pre>
            <figcaption>Fig 03-082</figcaption>
          </figure>
          <p>The <code class="prettyprint">display: flex;</code> styling will cause the <code
            class="prettyprint">img</code> and the <code class="prettyprint">div</code> to display on the same line. If
            I save the file, flip back over to the browser and refresh the page (which is necessary because we have just
            added a new block of CSS) you should see we have now achieved the desired result:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-083.png"/>
            <figcaption>Fig 03-083</figcaption>
          </figure>
          <p>Whilst we are adding CSS we can make a couple of additional improvements here. Remember that we eventually
            want these list items to be clickable in order for the user to actually select a particular video. We can
            add some CSS to change the pointer and also show a little bit of a background highlight when we hover over
            an item in the list:
          </p>
          <figure>
<pre class="prettyprint">&lt;style scoped&gt;
    li {
        display: flex;
        cursor: pointer;
    }

    li:hover {
        background-color: #eee;
    }
&lt;/style&gt;</pre>
            <figcaption>Fig 03-084</figcaption>
          </figure>
          <p>This should give you the following result:</p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-085.png"/>
            <figcaption>Fig 03-085</figcaption>
          </figure>
          <h3>Handling Nested Clicks</h3>
          <p>We've pretty much wrapped up on the styling side of our VideoListItem component. We now need to think about
            what happens anytime a user clicks on one of the VideoListItems. As a quick reminder let's revisit our
            layout diagram:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-086.png"/>
            <figcaption>Fig 03-086</figcaption>
          </figure>
          <p>Anytime someone clicks on a VideoListItem we want to create the VideoDetail component which will show
            information such as the video itself and the video title. So this is going to be a very interesting
            challenge as we try to communicate a click event across the entirety of our application. To get a better
            idea of the challenge ahead let's revisit the application structure diagram:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-087.png"/>
            <figcaption>Fig 03-087</figcaption>
          </figure>
          <p>At the bottom of the diagram we see our VideoListItem components that are waiting for a user to click on
            them at which point we need to communicate the click event over to the VideoDetail component. Remember that
            anytime we want to communicate from a child component up to a parent component we do so by emitting an
            event.
          </p>
          <p>It's worth pointing out that we are talking about two slightly different types of events. We're talking
            about a click event - which is a native event that a user triggers by clicking an element in our browser. We
            are also talking about a Vue specific event that we are going to programmatically emit from within our
            VideoListItem component. So here's the strategy we're going to use to communicate this click over to the app
            and then down to the VideoDetail:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-087.png"/>
            <figcaption>Fig 03-087</figcaption>
          </figure>
          <p>Inside of our VideoListItem we are going to add some code to say that anytime someone clicks on it we are
            going to emit a custom event through Vue. We are then going to make sure that our VideoList component
            listens to all of it's child VideoListItem components so anytime the VideoListItem emits an event the
            VideoList will emit an event as well. This will bubble up to the App component. The App component will then
            somehow determine whether or not it needs to update the VideoDetail. At this point let's focus on how we're
            going to communicate this click event from the VideoListItem up to the App.
          </p>
          <p>In the VideoListItem component let's add some code to watch for a click event on the <code
            class="prettyprint">li</code> element. So anytime someone clicks on the li element we want to emit a Vue
            specific event:
          </p>
          <figure>
<pre v-pre class="prettyprint">&lt;template&gt;
    &lt;li class=&quot;list-group-item media&quot; @click=&quot;onVideoSelect&quot;&gt;
        &lt;img class=&quot;mr-3&quot; :src=&quot;thumbnailUrl&quot; /&gt;
        &lt;div class=&quot;media-body&quot;&gt;
             {{ video.snippet.title }}
        &lt;/div&gt;

    &lt;/li&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-088</figcaption>
          </figure>
          <p>Now let's create the <code class="prettyprint">onVideoSelect</code> method by adding it to a new <code
            class="prettyprint">methods</code> object in the component definition:
          </p>
          <figure>
<pre v-pre class="prettyprint">export default {
    name: 'VideoListItem',
    props: ['video'],
    computed: {
        thumbnailUrl() {
            return this.video.snippet.thumbnails.default.url;
        }
    },
    methods: {
        onVideoSelect() {

        }
    }

};</pre>
            <figcaption>Fig 03-089</figcaption>
          </figure>
          <p>In the next section we will write some code to take the native click event and trigger a Vue specific
            event.
          </p>
          <h3>Event Handling in the VideoList</h3>
          <p>In the last section we started adding some code to make sure that anytime someone clicks on a VideoListItem
            it would trigger an event. Let's continue to achieve this by adding some code to our new method in the
            VideoListItem component. Remember this event is a Vue specific event - it's not the standard click event.
            We've already triggered an event like this in our SearchBar component:
          </p>
          <figure>
            <pre class="prettyprint">this.$emit('termChange', event.target.value);</pre>
            <figcaption>Fig 03-090</figcaption>
          </figure>
          <p>The first argument is the event name we want to emit and the second argument is a the video that has been
            clicked on that belongs to this particular VideoListItem component. Add the following code inside the <code
              class="prettyprint">onVideoSelect</code> method:</p>
          <figure>
<pre class="prettyprint">methods: {
    onVideoSelect() {
        this.$emit('videoSelect', this.video);
    }
}</pre>
            <figcaption>Fig 03-091</figcaption>
          </figure>
          <p>Remember <code class="prettyprint">this.video</code> is the prop that was passed in from the parent
            component. Now that we are emitting this event inside the child we can add some code to our VideoList to
            listen for that child event. Anytime that child event occurs the VideoList in turn will emit an event of
            it's own that the App component can then listen to. In the template for the VideoList component add the
            following code:</p>
          <figure>
<pre class="prettyprint"> &lt;template&gt;
  &lt;ul class=&quot;list-group&quot;&gt;
      &lt;VideoListItem
        v-for=&quot;video in videos&quot;
        :video=&quot;video&quot;
        :key=&quot;video.etag&quot;
        @videoSelect=&quot;onVideoSelect&quot;
      &gt;
      &lt;/VideoListItem&gt;
  &lt;/ul&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-092</figcaption>
          </figure>
          <p>Remember, to add an event handler we write out <code class="prettyprint">@</code> and then the name of the
            event that we want to listen for - in the case <code class="prettyprint">videoSelect </code> then after the
            <code class="prettyprint">=</code> assignment operator we specify what we want to do when the event is
            triggered. We will again create a new method which we will call <code
              class="prettyprint">onVideoSelect</code>. We are using the same name for this method that we used in the
            VideoListItem component but remember this is going to be a completely different function in it's own <code
              class="prettyprint">methods</code> object. Add the following code to the VideoList component:</p>
          <figure>
<pre class="prettyprint">methods: {
  onVideoSelect(video) {
      this.$emit('videoSelect', video);
  }
}</pre>
            <figcaption>Fig 03-093</figcaption>
          </figure>
          <p>We use the same event name of <code class="prettyprint">videoSelect</code> and pass along the video object.
            Next we need to perform the last step which is to add our listener to the App component.
          </p>
          <h3>Receiving Events in the App</h3>
          <p>In the last section we got our VideoList component to emit the event that it was passed by VideoListItem.
            Now we need to get the App component to listen for the event from VideoList. In the App component let's
            start by adding an event handler to the VideoList tag:</p>
          <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div class=&quot;container&quot;&gt;
        &lt;SearchBar @termChange=&quot;onTermChange&quot;&gt;&lt;/SearchBar&gt;
        &lt;VideoList @videoSelect=&quot;onVideoSelect&quot; :videos=&quot;videos&quot;&gt;&lt;/VideoList&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-094</figcaption>
          </figure>
          <p>We use the same <code class="prettyprint">onVideoSelect</code> method name which means we need to add this
            method to the <code class="prettyprint">methods</code> object of the App component:
          </p>
          <figure>
<pre v-pre class="prettyprint">methods: {
    onVideoSelect(video) {
        console.log(video);
    },
    onTermChange(searchTerm) {
        axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: API_KEY,
                type: 'video',
                part: 'snippet',
                q: searchTerm
            }
        }).then(response =&gt; {
            this.videos = response.data.items;
        });
    }
}</pre>
            <figcaption>Fig 03-095</figcaption>
          </figure>
          <p>So, just for the moment, we are writing the video object to the console. The <code class="prettyprint">onVideoSelect</code>
            method has access to the <code class="prettyprint">video</code> object because in the <code
              class="prettyprint"> VideoList</code> component when we emitted our <code
              class="prettyprint">videoSelect</code> event we passed along the video object. Back in the browser,
            refresh, select a video and then check the console. As the video object gets written to the console you
            should see an observer object being written out that contains <code class="prettyprint">etag, id, kind and
              snippet</code> properties.
          </p>
          <p>This means that we are successfully communicating the video that was selected all the way up to the top of
            the hierarchy. So now we can look at creating the VideoDetail component and having the App communicate that
            selected video down to the component detail.
          </p>
          <h3>Passing Props to the Video Detail</h3>
          <p>In the last section we were able to confirm that anytime the user clicks on a VideoListItem we eventually
            notify the App component about that selection. Now we need to start working on our VideoDetail component.
            Once the VideoDetail is completed we can have our App component communicate to the VideoDetail anytime a new
            Video has been selected. Let's first begin by putting together some boilerplate for the VideoDetail
            component. Add a new file to the components directory called <span class="filename">VideoDetail.vue</span>
            with the following code:
          </p>
          <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
        Video Detail!
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
    export default {
        name: 'VideoDetail',
    }
&lt;/script&gt;</pre>
            <figcaption>Fig 03-096</figcaption>
          </figure>
          <p>So, at this point, the VideoList component has communicated the selected video up to the App component. Now
            the App is going to pass that selected video down into the VideoDetail component. Remember, anytime a parent
            communicates with a child we do that using the props system which involves two separate steps. First we
            setup the parent component to make sure that it uses a <code class="prettyprint">v-bind</code> expression
            inside of it's template. We also need to get our child component to understand what props it should expect
            to receive - in this case the selected video. In VideoDetail add a props object:</p>
          <figure>
<pre class="prettyprint">&lt;script&gt;
    export default {
        name: 'VideoDetail',
        props: ['video']
    }
&lt;/script&gt;</pre>
            <figcaption>Fig 03-097</figcaption>
          </figure>
          <p>So we will use the <code class="prettyprint">video prop</code> to store the selected <code
            class="prettyprint">video</code> that the user just clicked on. To verify this is working modify the
            template to display the <code class="prettyprint">name</code> of the selected <code class="prettyprint">video</code>
            :</p>
          <figure>
<pre v-pre class="prettyprint">&lt;template&gt;
  &lt;div&gt;
    {{ video.snippet.title }}
  &lt;/div&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-098</figcaption>
          </figure>
          <p>So now in the App component we can import the VideoDetail component and make sure that the app communicates
            the selected video down to the VideoDetail:
          </p>
          <figure>
            <pre class="prettyprint">import VideoDetail from './components/VideoDetail.vue';</pre>
            <figcaption>Fig 03-099</figcaption>
          </figure>
          <p>Next add the newly imported VideoDetail to the components object of the App component:</p>
          <figure>
<pre class="prettyprint">components: {
    SearchBar,
    VideoList,
    VideoDetail
},</pre>
            <figcaption>Fig 03-100</figcaption>
          </figure>
          <p>Finally, I'm going to make sure that I add the <code class="prettyprint">VideoDetail</code> component
            itself to the template of the <code class="prettyprint">App</code> component.
          </p>
          <figure>
<pre class="prettyprint">&lt;template&gt;
    &lt;div class=&quot;container&quot;&gt;
        &lt;SearchBar @termChange=&quot;onTermChange&quot;&gt;&lt;/SearchBar&gt;
        &lt;VideoDetail :video=&quot;selectedVideo&quot; /&gt;
        &lt;VideoList @videoSelect=&quot;onVideoSelect&quot; :videos=&quot;videos&quot;&gt;&lt;/VideoList&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-101</figcaption>
          </figure>
          <p>We add a (shorthand) v-bind expression to pass down the <code class="prettyprint">selectedVideo</code> .
          </p>
          <h3>Updating Data</h3>
          <p>In the last section we said that the App component needed to somehow communicate the selected <code
            class="prettyprint">video</code> from the <code class="prettyprint">onVideoSelect</code> method to our <code
            class="prettyprint">VideoDetail</code> component. Let's take a look at a quick diagram that is going to help
            us understand exactly how that process is going to work:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-102.png"/>
            <figcaption>Fig 03-102</figcaption>
          </figure>
          <p>Here we can see the entire video selection process in diagram format. You can see the chain of listening
            for and emitting events all the way up to the App. At present, inside the <code
              class="prettyprint">App</code> component, whenever that event finally comes up and triggers our <code
              class="prettyprint">onVideoSelect</code> function we are currently only logging details about the <code
              class="prettyprint">video</code> object out to the console. We need to add a new property to the <code
              class="prettyprint">data</code> object in the <code
              class="prettyprint">App</code> component to get the <code class="prettyprint">video</code> object
            communicated over to the <code class="prettyprint">VideoDetail</code> component. We will call the new
            property <code class="prettyprint">selectedVideo</code> and it will reflect the current video that the user
            has selected.
          </p>
          <p>So inside of the <code class="prettyprint">App</code> components handler for listening for that click event
            of <code class="prettyprint">onVideoSelect</code> we will place some code to update the <code
              class="prettyprint">selectedVideo</code> prop. Anytime that data property is updated it will cause our
            component to re-render and we'll use that re-render as an opportunity to communicate this newly selected
            video down to the <code
              class="prettyprint">VideoDetail</code> component as a prop. So that's the idea, we're going to make use of
            the data system of the <code class="prettyprint">App</code> component to communicate the newly clicked video
            over to the <code class="prettyprint">VideoDetail</code> component. Add the <code class="prettyprint">selectedVideo</code>
            prop to the <code class="prettyprint"> data</code> object:
          </p>
          <figure>
<pre class="prettyprint">data() {
    return { videos: [], selectedVideo: null };
},</pre>
            <figcaption>Fig 03-103</figcaption>
          </figure>
          <p>The default value of <code class="prettyprint">selectedVideo</code> is <code
            class="prettyprint">null</code> because when our application first starts there will be no video selected.
            Inside of <code class="prettyprint">onVideoSelect</code> we will add some code to update this property:</p>
          <figure>
<pre class="prettyprint">onVideoSelect(video) {
    this.selectedVideo = video;
},</pre>
            <figcaption>Fig 03-104</figcaption>
          </figure>
          <p>Recall, that anytime we update a data property it causes our component to instantly re-render with that new
            piece of data. Now inside the <code class="prettyprint">template</code> of the <code
              class="prettyprint">App</code> component we can modify the <code class="prettyprint">VideoDetail</code>
            tag:
          </p>
          <figure>
            <pre class="prettyprint">&lt;VideoDetail :video=&quot;selectedVideo&quot; /&gt;</pre>
            <figcaption>Fig 03-105</figcaption>
          </figure>
          <p>This will assign the <code class="prettyprint">selectedVideo</code> to the <code
            class="prettyprint">video</code> prop. Again remember that, inside of a template, to reference a data
            property we do not have to append the data property name with <code class="prettyprint">this.</code> or
            anything of that nature - we just put the data properties name, in our case <code class="prettyprint">selectedVideo</code>
          </p>
          <p>Go to the browser, refresh the application, select a video and you should see it's title appear above the
            VideoList component:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-106.png"/>
            <figcaption>Fig 03-106</figcaption>
          </figure>
          <p>You will notice an error message: <code class="prettyprint">Cannot read property 'snippet' of null</code>
            being emitted by our <code class="prettyprint">VideoDetail</code> component. In the next section we'll
            figure out why we are seeing this error message and add a fix.</p>
          <h3>The v-if Directive</h3>
          <p>In the last section we added some code to the VideoDetail component to show the title of the selected
            video. However we are getting an error message: <code class="prettyprint">Cannot read property 'snippet' of
              null</code> When our application first renders our <code class="prettyprint">App</code> component has a
            data property for <code class="prettyprint">selectedVideo</code> which is set to null:
          </p>
          <figure>
<pre class="prettyprint">data() {
    return { videos: [], selectedVideo: null };
},</pre>
            <figcaption>Fig 03-106</figcaption>
          </figure>
          <p>We take the <code class="prettyprint">selectedVideo</code> property and we pass it down to the <code
            class="prettyprint">VideoDetail</code> component:
          </p>
          <figure>
            <pre class="prettyprint">&lt;VideoDetail :video=&quot;selectedVideo&quot; /&gt;</pre>
            <figcaption>Fig 03-107</figcaption>
          </figure>
          <p>Inside <code class="prettyprint">VideoDetail</code> our template tries to read the <code
            class="prettyprint">snippet</code> property of the <code class="prettyprint">video</code> prop:
          </p>
          <figure>
<pre v-pre class="prettyprint">&lt;template&gt;
    &lt;div&gt;
        {{ video.snippet.title }}
    &lt;/div&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-108</figcaption>
          </figure>
          <p>At this point it is null which is why we are seeing the error message above. Add some code to make sure
            that if the <code class="prettyprint">video</code> prop is null we do not attempt to read the <code
              class="prettyprint">snippet</code> property on it:
          </p>
          <figure>
<pre v-pre class="prettyprint">&lt;template&gt;
    &lt;div v-if=&quot;video&quot;&gt;
        {{ video.snippet.title }}
    &lt;/div&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-109</figcaption>
          </figure>
          <p>The <code class="prettyprint">v-if</code> directive can be thought of as a conditional rendering statement
            which will look at the value of the variable or the term we pass in and evaluate it. If it finds a falsy
            value, which null is (null is very similar to the false Boolean value in Javascript) then Vue will not
            render the <code class="prettyprint">div</code> or anything inside it. Because Vue doesn't render the <code
              class="prettyprint">div</code> it also skips the line of code contained within - and therefore the error
            is not thrown.
          </p>
          <p>You'll most frequently see <code class="prettyprint">v-if</code> around anytime you're loading up some data
            from some remote API because it always takes some amount of time to retrieve that data. So with <code
              class="prettyprint">v-if</code> we can very easily tell our application to wait until data is available
            and only then try and render the relevant content. In the next section we will figure out we are going to
            get this <code
              class="prettyprint">VideoDetail</code> component, that will eventually show a video player, to display on
            the screen.
          </p>
          <h3>Referencing Video Title and Description</h3>
          <p>You've now communicated the selected video to the VideoDetail component. We're now ready to get the video
            player to appear on the screen along with a short title and description for that particular video that the
            user has clicked on.
          </p>
          <p>We will start with the video title and description. Add the following code to the <code
            class="prettyprint">template</code> of the <code class="prettyprint">VideoDetail</code> component.
          </p>
          <figure>
<pre v-pre class="prettyprint">&lt;template&gt;
    &lt;div v-if=&quot;video&quot;&gt;
        &lt;div class=&quot;details&quot;&gt;
            &lt;h4&gt;{{ video.snippet.title }}&lt;/h4&gt;
            &lt;p&gt;{{ video.snippet.description }}&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>
            <figcaption>Fig 03-110</figcaption>
          </figure>
          <p>The original mock-up shows a box around the title and description. Add the following styling to achieve
            this effect:
          </p>
          <figure>
<pre class="prettyprint">&lt;style scoped&gt;
    .details {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
&lt;/style&gt;</pre>
            <figcaption>Fig 03-111</figcaption>
          </figure>
          <p>This should achieve the effect from the mockup:</p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-112.png"/>
            <figcaption>Fig 03-112</figcaption>
          </figure>
          <p>In the next section we will look at implementing the actual video player</p>
          <h3>Crafting the Embed URL</h3>
          <p>We've got a lot of information about the video now visible on the screen but we need to make sure the
            actual video player displays as well. If you visit <a target="_blank" href="www.youtube.com">youtube</a> and
            click on the share button you should see an embed option:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-113.png"/>
            <figcaption>Fig 03-113</figcaption>
          </figure>
          <p>YouTube provides some <code class="prettyprint">html</code> which includes an <code class="prettyprint">iframe</code>
            with a <code class="prettyprint">src</code> of <code
              class="prettyprint">https://www.youtube.com/embed/</code> followed by the unique video id:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-114.png"/>
            <figcaption>Fig 03-114</figcaption>
          </figure>
          <p>When you embed a YouTube video you can add it directly to another web application. Add the following code
            above the <code class="prettyprint">div</code> with a class of <code class="prettyprint">details</code>:
          </p>
          <figure>
<pre class="prettyprint">&lt;div&gt;
    &lt;iframe :src=&quot;videoUrl&quot;/&gt;
&lt;/div&gt;</pre>
            <figcaption>Fig 03-115</figcaption>
          </figure>
          <p>The <code class="prettyprint">src</code> property is a dynamic value provided by the <code
            class="prettyprint">videoUrl</code> computed function:
          </p>
          <figure>
<pre class="prettyprint">computed: {
    videoUrl() {
        const { videoId } = this.video.id;
        return `https://www.youtube.com/embed/${videoId}`;
    }
}</pre>
            <figcaption>Fig 03-115</figcaption>
          </figure>
          <p>Because the <code class="prettyprint">videoId</code> <code class="prettyprint">const</code> that we used
            and the prop name of <code class="prettyprint">this.video.id.videoId</code> are identical we use ES2015
            destructuring assignment syntax and surround our <code class="prettyprint">const</code> with curly braces.
            We also use template string syntax (with a pair of back ticks) over string concatenation in the return
            statement. So save the file, refresh the browser and you will see the following:</p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-116.png"/>
            <figcaption>Fig 03-116</figcaption>
          </figure>
          <p>So a box appears but there doesn't look like there is any content inside of it. If I go over to the console
            you might notice a couple of warnings and even errors over here such as <code class="prettyprint">Error
              parsing header</code> or <code class="prettyprint">ERR_BLOCKED_BY_CLIENT</code> These errors are thrown by
            the YouTube <code class="prettyprint">iframe</code> - we don't have any control over them. In the next
            section we will add some styling to the video player.</p>
          <h3>Responsive Embeds</h3>
          <p>We've now got our YouTube embed visible on the screen but it's a little bit small. We will use the
            Bootstrap <a target="blank" href="http://getbootstrap.com/docs/4.0/utilities/embed/"> Embeds</a> class which
            will cause the <code class="prettyprint">iframe</code> to expand to more suitably fit the space available to
            it. The documentation provides an example:
          </p>
          <figure>
<pre class="prettyprint">&lt;div class=&quot;embed-responsive embed-responsive-16by9&quot;&gt;
  &lt;iframe class=&quot;embed-responsive-item&quot; src=&quot;https://www.youtube.com/embed/zpOULjyy-n8?rel=0&quot; allowfullscreen&gt;&lt;/iframe&gt;
&lt;/div&gt;</pre>
            <figcaption>Fig 03-117</figcaption>
          </figure>
          <p>We have to place a <code class="prettyprint">div</code> round our <code class="prettyprint"> iframe</code>
            with a couple of different classes applied to it. We also add one class on the <code class="prettyprint">iframe</code>
            as well. Let's add this to the VideoDetail component:</p>
          <figure>
<pre class="prettyprint">&lt;div class=&quot;embed-responsive embed-responsive-16by9&quot;&gt;
    &lt;iframe class=&quot;embed-responsive-item&quot; :src=&quot;videoUrl&quot;/&gt;
&lt;/div&gt;</pre>
            <figcaption>Fig 03-118</figcaption>
          </figure>
          <p>Back in the browser you should see the VideoDetail now displays a larger video window which will adjust as
            we resize the browser window. In our mockup we showed the VideoDetail next to the VideoList. We will take
            care of this detail in the next section.
          </p>
          <h3>Two Column Layout</h3>
          <p>Our video <code class="prettyprint">iframe</code> is now plainly visible on the screen but it's still
            stacked on top of our VideoList. So the last thing we have to do is to make sure that the VideoDetail
            component is displayed to the right of the VideoList. To accomplish this we will apply some layout CSS
            provided by Bootstrap. In the <span class="filename">App.vue</span> file add a div that wraps both the
            VideoDetail and VideoList tags:
          </p>
          <figure>
<pre class="prettyprint">&lt;div class=&quot;row&quot;&gt;
    &lt;VideoDetail :video=&quot;selectedVideo&quot; /&gt;
    &lt;VideoList @videoSelect=&quot;onVideoSelect&quot; :videos=&quot;videos&quot;&gt;&lt;/VideoList&gt;
&lt;/div&gt;</pre>
            <figcaption>Fig 03-119</figcaption>
          </figure>
          <p>If you viewed this in the browser now you would still see the VideoDetail and the VideoList being displayed
            on different lines. That's because currently the VideoDetail is going to try and take up as much space
            (width wise) as it possibly can. We will add a class to the VideoDetail component to constrain it's width on
            the screen:
          </p>
          <figure>
            <pre class="prettyprint">&lt;div v-if=&quot;video&quot; class=&quot;col-md-8&quot;&gt;</pre>
            <figcaption>Fig 03-120</figcaption>
          </figure>
          <p>This will create a column out of the <code class="prettyprint">div</code> element that at most can only
            occupy eight column spaces. By default Bootstrap has a 12 column layout - so essentially we have 12 column
            units to work with. With 8 allocated to the VideoDetail we now have 4 left to allocate to the VideoList. In
            the VideoList component add the following class to the root <code
              class="prettyprint">ul</code> element:
          </p>
          <figure>
            <pre class="prettyprint">&lt;ul class=&quot;list-group col-md-4&quot;&gt;</pre>
            <figcaption>Fig 03-121</figcaption>
          </figure>
          <p>In the browser you should now see the VideoDetail appear on the left-hand side.
          <h3>App Review</h3>
          <p>Our application is complete but there are a couple of items we should review that are important to keep in
            mind when you work on future Vue applications. The first thing is how we communicate information between
            different components that we create. Anytime that we want to communicate information between components it's
            always between parent and child:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-122.png"/>
            <figcaption>Fig 03-122</figcaption>
          </figure>
          <p>In our application we had the VideoDetail, the SearchBar and the VideoList as sibling components - in other
            words they were all being displayed by the App component. Communicating information between the VideoDetail
            and SearchBar or theVideoList would be communication between siblings. Doing so is not the easiest way to
            pass around information inside of a Vue app. Instead we choose to communicate directly from, for example,
            the VideoDetail up to the parent App or from the App down to the VideoDetail. The direction we want to
            communicate information will dictate the technique used:</p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-123.png"/>
            <figcaption>Fig 03-123</figcaption>
          </figure>
          <p>If you want to go from a parent down to a child we refer to that as passing props (short for properties).
            This is a two step process:
          </p>
          <figure>
            <img src="./images/vuejsessentials/Fig03-124.png"/>
            <figcaption>Fig 03-124</figcaption>
          </figure>
          <p>We make sure that the parent components tag for showing that component has a <code class="prettyprint">v-bind</code>
            directive. This makes sure that the parent component is going to send some information down to the child.
            Likewise the child also has to be told about the props that it should expect to receive from the parent.
          </p>
          <p>On the other hand, communication from a child component up to a parent is done with a completely different
            system - events. So a child component like our SearchBar or our VideoListItem has the ability to emit events
            and then the parent component can listen for those events. We only use events to communicate from a child up
            to a parent and we do not try to modify any props passed by the parent component.
          </p>
          <p>So the real theme of this application was figuring out how we communicate between components. I think we
            did a reasonable job of getting a better handle on that.
          </p>
          <h3>Coding Exercise 3 Events and Methods</h3>
          <h3>Coding Exercise 4 Component Data</h3>
          <h3>Coding Exercise 5 Events, Data, and Directives</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {name: 'VuejsEssentialsWritingEffectiveApps.vue'}
</script>

<style scoped>

</style>
