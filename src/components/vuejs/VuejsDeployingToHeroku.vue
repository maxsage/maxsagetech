<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h2>Vuejs Deploying to Heroku</h2>
        </div>
        <div class="panel-body">
          <h3>Easily deploy a Vue + Webpack App to Heroku in 5 Steps [tutorial]</h3>
          <p>The majority of the information one this page is copied from a helpful post on <a
            href="https://medium.com/netscape/deploying-a-vue-js-2-x-app-to-heroku-in-5-steps-tutorial-a69845ace489">medium.com</a>
            by a guy called Nick Manning. I also used a bit of info from the Udemy course Webpack 2: The Complete
            Developer's Guide. Specifically <a
              href="https://www.udemy.com/webpack-2-the-complete-developers-guide/learn/v4/t/lecture/6308390?start=450">Section
              9 - Deployment to Heroku</a>. Where it details making updates after the initial deployment (at around the
            7 minute mark).
          </p>
          <p>In this tutorial we will cover:</p>
          <ul>
            <li>Creating a vue project</li>
            <li>Creating a Heroku app</li>
            <li>Configuring the vue project so that Heroku can server up our vue code.</li>
            <li>Push and deploy</li>
          </ul>
          <h3>1. Generate a Vue.js Project</h3>
          <p>First off, if you haven't already, install Vue.js (<a
            href="https://vuejs.org/v2/guide/installation.html#NPM">instructions here</a>). We’ll also need Vue’s CLI to
            easily generate our project. (As a bonus option, feel free to use the awesome Yarn dependency manager rather
            than npm for these examples. Just substitute the npm command with yarn instead throughout the rest of this
            tutorial):
          </p>
          <figure>
          <pre class="prettyprint">npm install --global vue-cli
vue init webpack &lt;YOUR-PROJECT-NAME-HERE&gt;
cd &lt;YOUR-PROJECT-NAME-HERE&gt;
npm install npm run dev</pre>
            <figcaption>Fig 01-001</figcaption>
          </figure>
          <p>Please Note - when issuing the vue init command above do so from the parent directory to the project e.g.
            c:\Development
          </p>
          <p>Make sure your browser window opens and displays the starter project.</p>
          <h3>2. Create Your Heroku App</h3>
          <p>Heroku is a platform that let’s us easily deploy and host our Vue.js app. If you haven’t already, sign up
            for a Heroku account here. Then, install Heroku’s CLI tool via the instructions <a
              href="https://dashboard.heroku.com">here</a>. Then, let’s create our Heroku app:
          </p>
          <figure>
            <pre class="prettyprint">heroku create &lt;YOUR-PROJECT-NAME-HERE&gt;</pre>
            <figcaption>Fig 01-002</figcaption>
          </figure>
          <p>When this is done, you’ll get a fresh URL to your project, i.e. https:// &lt;YOUR-PROJECT-NAME-HERE&gt;.herokuapp.com.
            Make sure you head over to the URL and see a temporary Heroku landing page there.
          </p>
          <p>Lastly, in order to avoid having Heroku install needless development dependencies when deploying later,
            let’s go ahead and set the NODE_ENV setting to production:
          </p>
          <figure>
            <pre class="prettyprint">heroku config:set NODE_ENV=production --app &lt;YOUR-PROJECT-NAME-HERE&gt;</pre>
            <figcaption>Fig 01-003</figcaption>
          </figure>
          <h3>3. Create a server.js and Build Your Site</h3>
          <p>Since Vue is only a frontend library, the easiest way to host it and do things like serve up assets is to
            create a simple Express friendly script that Heroku can use to start a mini-web server. Read up quickly on
            Express if you haven’t already. After that, add express:
          </p>
          <figure>
            <pre class="prettyprint">npm install express --save</pre>
            <figcaption>Fig 01-004</figcaption>
          </figure>
          <p>Now add a server.js file to your project’s root directory:</p>
          <figure>
          <pre class="prettyprint">// server.js

var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

app = express(); app.use(serveStatic(__dirname + &quot;/dist&quot;));
var port = process.env.PORT || 5000;

app.listen(port);
console.log('server started '+ port);</pre>
            <figcaption>Fig 01-005</figcaption>
          </figure>
          <p><strong>IMPORTANT: What you probably noticed is that this will serve up a dist directory.</strong> dist is
            a predefined directory that Vue.js builds which is a compressed, minified version of your site. We’ll build
            this and then tell Heroku to run server.js so Heroku hosts up this dist directory:
          </p>
          <figure>
            <pre class="prettyprint">npm run build</pre>
            <figcaption>Fig 01-006</figcaption>
          </figure>
          <p>You should see an output dist directory now.</p>
          <p>Let’s test our server.js file by running it:</p>
          <figure>
            <pre class="prettyprint">node server.js</pre>
            <figcaption>Fig 01-007</figcaption>
          </figure>
          <p>Now go to http://localhost:5000 and make sure your app loads. This is the actual site Heroku will serve up.
          </p>
          <p>Lastly, we’ll have to edit our start script in package.json to start our node server, as Heroku will
            automatically look for this script when looking for how to run a node.js app.
          </p>

          <figure>
          <pre class="prettyprint">// package.json
{
  &quot;name&quot;: &quot;&lt;YOUR-PROJECT-NAME-HERE&gt;&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;A Vue.js project&quot;,
  &quot;author&quot;: &quot;&quot;,
  &quot;private&quot;: true,
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
    &quot;build&quot;: &quot;node build/build.js&quot;,
    &quot;start&quot;: &quot;node server.js&quot;, &lt;--- EDIT THIS LINE HERE
...</pre>
            <figcaption>Fig 01-008</figcaption>
          </figure>
          <h3>4. Git Init and Add Your Heroku Remote</h3>
          <p>Repository Heroku allows us to push to a remote repository so we’ll first need to create our own git
            repository:
          </p>
          <figure>
            <pre class="prettyprint">git init</pre>
            <figcaption>Fig 01-009</figcaption>
          </figure>
          <p>Now let’s add our Heroku remote repository:</p>
          <figure>
            <pre class="prettyprint">heroku git:remote --app &lt;YOUR-PROJECT-NAME-HERE&gt;</pre>
            <figcaption>Fig 01-009</figcaption>
          </figure>
          <p>Let’s keep our generated dist directory so that we can always keep a pristine copy of what we’ve deployed
            to Heroku by removing dist/ from .gitigore
          </p>
          <figure>
          <pre class="prettyprint">.DS_Store
node_modules/ dist/ &lt;--- REMOVE THIS LINE
npm-debug.log*
yarn-debug.log*
yarn-error.log*
test/unit/coverage
test/e2e/reports
selenium-debug.log

# Editor directories and files
.idea
*.suo
*.ntvs*
*.njsproj
*.sln</pre>
            <figcaption>Fig 01-010</figcaption>
          </figure>
          <p>Now, most importantly, let’s add and commit our code files:</p>
          <figure>
            <pre class="prettyprint">git add . &amp;&amp; git commit -a -m &quot;Adding files.&quot;</pre>
            <figcaption>Fig 01-011</figcaption>
          </figure>
          <h3>5. Push Your Code to Deploy!</h3>
          <p>Now all we need to deploy to Heroku is:</p>
          <figure>
            <pre class="prettyprint">git push heroku master</pre>
            <figcaption>Fig 01-012</figcaption>
          </figure>
          <p>This will take our committed code, push it to Heroku’s remote repository, run our start command in
            package.json which will serve up our freshly built dist directory.
          </p>
          <p>If you come across any issues, you can always run heroku logs to troubleshoot.</p>
          <p>If deployment is successful, test out your project’s URL https://&lt;YOUR-PROJECT-NAME-HERE&gt;.herokuapp.com
            and you’re done!
          </p>
          <h3>6. Updating your site</h3>
          <p>When you make further modifications to the app run the following to push them to heroku:</p>
          <figure>
          <pre class="prettyprint">npm run build
git add .
git commit -m &quot;update&quot;
git push heroku master</pre>
            <figcaption>Fig 01-013</figcaption>
          </figure>
          <p>BONUS TIP: Heroku’s free tier forces your app to go to sleep if there’s no traffic hitting it after awhile,
            thus causing some serious “wake up” time if someone tries to check out your app. One thing I like to do is
            set a free health check (i.e. via pingdom.com) that hits my Heroku URL every few minutes to keep it awake.
          </p>
          <h3>Git Bash</h3>
          <p>To change directory in Git Bash:</p>
          <figure>
            <pre class="prettyprint">cd /c/Development/maxsagetech</pre>
            <figcaption>Fig 01-014</figcaption>
          </figure>
          <h3>Node</h3>
          <p>Specify the Version of Node that should be used to run your application on Heroku. Always specify a version
            that matches the runtime you're developing with. To find this use:
          </p>
          <figure>
            <pre class="prettyprint">node --version</pre>
            <figcaption>Fig 01-015</figcaption>
          </figure>
          <p>Which will return something like:</p>
          <figure>
            <pre class="prettyprint">v8.11.2</pre>
            <figcaption>Fig 01-016</figcaption>
          </figure>
          <p>Specify this in the package.json like so:</p>
          <figure>
<pre class="prettyprint">&quot;engines&quot;: {
  &quot;node&quot;: &quot;8.11.2&quot;
},</pre>
            <figcaption>Fig 01-017</figcaption>
          </figure>
          <h3>Fixing the "cannot GET /URL" error on refresh with Client Side Routers</h3>
          <p>Vue Router and react-router are examples of Client Side Routers CSR. I encountered a problem using Vue
            Router in conjunction with a basic express configuration when deploying to heroku. If you browse to a route
            e.g. <a target="_blank" href="https://maxsagetech.herokuapp.com/vuejsessentials-01-an-introduction-to-vue">https
              ://maxsagetech.herokuapp.com/vuejsdeployingtoheroku</a>
            using the links in the application (behind the scenes these use <code class="prettyprint">&lt;router-link&gt;</code>)
            and then hit refresh you will see get an error message:
          </p>
          <figure>
            <pre class="prettyprint">Cannot GET /vuejsdeployingtoheroku</pre>
            <figcaption>Fig 01-018</figcaption>
          </figure>
          <p>This is an error that can occur with all CSR - not just Vue Router. Let's use React as an example. The
            first time a user loads your app (i.e. visits your website), they don’t have any JavaScript loaded. That
            means no React and no React Router - so the first request will always be to your server. Then, assuming
            there was a successful GET request, all your JavaScript loads and React Router confidently hijacks your
            routing. From here on out, any other route changes in your app will be handled by React Router.
          </p>
          <p>Notice the issue yet? React Router can only load after the first successful GET request to your server (or
            /). The reason for the dreaded Cannot GET /* error is because, if you’re at /dashboard and then hit refresh,
            the browser will make a GET request to /dashboard which will fail since you have no logic on your server for
            handling that request (since React Router is supposed to do it).
          </p>
          <p>More in depth explanation of this issue can be found on the following link:</p>
          <a target="_blank" href="https://tylermcginnis.com/react-router-cannot-get-url-refresh/">Fixing the "cannot GET
            /URL"
            error on refresh with React Router (or how client side
            routers work)</a><br />
          <p>A description of the resolution when using Vue Router can be found here:</p>
          <a
            href="https://forum.vuejs.org/t/how-do-i-implement-connect-history-api-fallback-so-that-url-paths-redirect-to-index-html/10938/2">
            How do I implement `connect-history-api-fallback` so that URL paths redirect to index.html?
          </a>
          <p>It involves installing <code class="prettyprint">connect-history-api-fallback</code> and configuring your
            server.js express configuration file to use it.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VuejsEssentials00CourseContents.vue'
}
</script>

<style scoped>

</style>
