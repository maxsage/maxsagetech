<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h1>The Complete Node JS Course</h1>
          <h2>Section 1 Getting Started</h2>
        </div>
        <div class="panel-body">
          <h3>01 Welcome</h3>

          <p>The Complete Node Course aims to make you a highly competent Node developer.</p>

          <h3>02 What is Node</h3>

          <p>Node is a runtime environment for executing Javascript outside of a browser.
          Often Node is used to build back-end services otherwise known as API's. Client
          applications like web or mobile apps are just the surface of the app. Often
          they need to speak to some services on a Server or in the Cloud to send emails,
          work with data, push notifications etc.</p>

          <p>Node is ideal for building highly-scalable, data-intensive, real-time back end
          services.</p>

          <p>Whilst they are some similar services out there such ASP.Net, Rails, Django Node
          has the following advantages:</p>

          <ul>
            <li>Easy to get started</li>
            <li>Good for prototyping and agile development</li>
            <li>Super fast and highly scalable</li>
            <li>Javascript everywhere</li>
            <li>Cleaner and more consistent codebase</li>
            <li>Largest ecosystem of open-source libs</li>
          </ul>

          <h3>03 Node Architecture</h3>
          <p>Node is a runtime environment for executing Javascript code. Prior to node
          Javascript was only used to write applications that ran on the browser.
          Every browser has a Javascript engine built-in which takes our Javascript code
          and converts it to machine code.</p>

          <ul>
            <li>Edge        Chakra</li>
            <li>Firefox     SpiderMonkey</li>
            <li>Chrome      v8</li>
          </ul>
          <p>The variety of engines can result in Javacript behaving differently between
          browsers.</p>
          <p>A browser provides a run-time environment for Javascript. In browsers we have
          window and document objects which allow us to work in the browser environment.</p>

          <p>In 2009 Ryan Dahl took Google's V8 engine and embedded it inside a C++ program
          called Node - so similar to a browser Node is a run-time environment for
          Javascript code. It contains a Javascript engine that can execute our Javascript
          code. In addition if provides certain objects relevant to the environment in
          which the code is being executed. So instead of window and document objects we
          have objects like fs for working with the file system or os for interrogating the
          Operating System.</p>

          <p>Node is NOT a programming language like C# or Java. Node is also NOT a framework
          like ASP.NET or Rails. These are frameworks for building web applications. Node
          is not a framework - it is a run-time environment for executing Javascript code</p>

          <h3>04 How Node Works</h3>
          <p>Node applications are highly-scalable. This is because of the non-blocking or
          asynchronous nature of Node - a single thread is used to handle multiple requests.</p>

          <p>In contrast blocking or synchronous architecture (ASP.Net or Rails) means that a
          single thread is allocated to handle that request. If, for example, this involves
          querying a database the thread must wait until the database request is complete.
          We then require a new thread if we want to serve another client. If we have a large
          number of concurrent clients then at some point we are going to run out of
          threads - resulting in clients waiting for a thread to become available.</p>

          <p>Node applications are asynchronous by default making it ideal for I/O intensive
          apps (disk or network). Node should NOT be used for CPU intensive applications
          such as video encoding or image manipulation. These applications involve a lot
          of CPU calculations but few operations that touch the file or network systems.</p>

          <p>Because Node applications are single threaded when performing the calculations
          to serve one client other clients have to wait - which is what makes it unsuitable
          for CPU intensive applications.</p>

          <h3>05 Installing Node</h3>

          <p>To see if we already have Node installed:</p>
          <figure><pre class="prettyprint">node --version</pre>
            <figcaption>Fig 01-001</figcaption>
          </figure>

          <p>Install the latest stable version of Node (by running the installer) from
          nodejs.org.</p>

          <h3>06 Your First Node Program</h3>
          <p>Create a new file called 06-your-first-node-program.js</p>

          <figure><pre class="prettyprint">function sayHello(name) {
  console.log('Hello ' + name);
}

sayHello('Mosh');
          </pre>
            <figcaption>Fig 01-002</figcaption>
          </figure>

          <p>Run the application by passing it to Node using the following terminal command:</p>


          <figure>
            <pre class="prettyprint">node 06-your-first-node-program.js</pre>
            <figcaption>Fig 01-002a</figcaption>
          </figure>

          <p>Node will give the file we specified to v8 for execution.</p>

          <h3>07 Course Structure</h3>

          <p>Section 2 covers the Node Module System which is one of the fundamental concepts
          in Node. You will learn how to create your own modules as well as use the modules
          built in to the core of Node such as operating system, file system http etc.</p>

          <p>Section 3 covers Node Package Manager</p>

          <p>Sections 4 and 5 cover Building RESTful APIs with Express. Throughout these sections
          we will use a simple Javascript array to store our data because before we look at
          storing data in MongoDb you need to clearly understand asynchronous Javascript.</p>

          <p>Section 6 covers Asynchronous Javascript. We will look at how synchronous code differs
          from asynchronous code. We will look at various patterns for working with asynchronous
          code such as callbacks, promises and async and await.</p>

          <p>Sections 7,8 and 9 cover storing data using MongoDb and Mongoose (a library to make
          working with MongoDb easier)</p>

          <p>Section 10 covers Authentication and Authorization including role management using
          JSON web tokens.</p>

          <p>Section 11 covers handling and logging errors which is a very important topic when
          building real world applications.</p>

          <p>Sections 12 and 13 cover Unit and Integration testing.</p>

          <p>Section 14 looks at Test-driven development which is a way of writing software by
          writing tests first.</p>

          <p>Section 15 Details how to deploy an application to Heroku.</p>

          <h3>08 Recap</h3>

          <p>Getting Started with Node</p>
          <p>So, in this section, you learned that:</p>
          <ul>
            <li>Node is a runtime environment for executing JS code.</li>
            <li>Essentially, Node is a C++ program that embeds Chrome’s v8 engine, the fastest
              JS engine in the world.</li>
            <li>We use Node to build fast and scalable networking applications. It’s a perfect
              choice for building RESTful services.</li>
            <li>Node applications are single-threaded. That means a single thread is used to
              serve all clients.</li>
            <li>Node applications are asynchronous or non-blocking by default. That means
              when the application involves I/O operations (eg accessing the file system or the
              network), the thread doesn’t wait (or block) for the result of the operation. It is
              released to serve other clients.</li>
            <li>This architecture makes Node ideal for building I/O-intensive applications.</li>
            <li>You should avoid using Node for CPU-intensive applications, such as a video
              encoding service. Because while executing these operations, other clients have
              to wait for the single thread to finish its job and be ready to serve them.</li>
            <li>In Node, we don’t have browser environment objects such as window or the
              document object. Instead, we have other objects that are not available in
              browsers, such as objects for working with the file system, network, operating
              system, etc.</li>
          </ul>
          <h3>09 Asking Questions</h3>
          <p>Asking Questions</p>
          <p>Section 1, Lecture 9</p>
          <p>You may have questions throughout your course. Follow these steps to make
          the most of your course and become the best coder you can be.</p>

          <ol>
            <li>Do your own research. You can usually find the answer to your question
              by googling the question or the error you’re experiencing.</li>
            <li>Try to solve the problem without “phoning a friend”. Coming to the
              resolution on your own will help you grow and become a stronger coder.</li>
            <li>Still stuck? Post your question on the discussion board for the course.
              My team is here to help!</li>
            <li>Help other students by answering their questions on the discussion board.
              The best way to learn something is to teach it.</li>
          </ol>
          <p>“Everyone should know how to code a computer, because it teaches you how to
          think!” – Steve Jobs</p>

          <p>Happy coding,</p>

          <p>Mosh</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheCompleteNodejsCourse01GettingStarted.vue'
}</script>

<style scoped>

</style>
