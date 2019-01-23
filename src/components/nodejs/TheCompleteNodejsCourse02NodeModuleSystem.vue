<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h1>The Complete Node JS Course</h1>
          <h2>Section 1 Getting Started</h2>
        </div>
        <div class="panel-body">
          <h1>Section 2 - Node Module System</h1>
          <h2>Introduction</h2>
          <p>Throughout this section we will investigate some of the built in modules in
          Node:</p>
          <ul>
            <li>os</li>
            <li>fs</li>
            <li>events</li>
            <li>http</li>
          </ul>
          <p>We will also cover how to create your own modules.</p>
          <h2>Global Object</h2>
          <p>Previously we used the console.log command. The console object
          is known as a global object. It is part of the global scope  which means we
          can access it from anywhere in our code.</p>

          <p>There are a bunch of other objects and functions that are globally available
          in Node. setTimeout() is used to call a function after a delay. This function is
          part of standard Javascript so it can be used on the client, in the browser or in
          Node. We also have:</p>

          <ul>
            <li>clearTimeout()</li>
            <li>setInterval() - call a function repeatedly at a specified interval.</li>
            <li>clearInterval() - stops the function from being called repeatedly.</li>
          </ul>

          <p>The above are all Javascript global objects.</p>

          <p>In browsers we have the window object that represents the global scope. So
          all the variables and functions that are defined globally we can access via
          the window object:</p>

          <figure>
            <pre class="prettyprint">window.console.log</pre>
            <figcaption>Fig 02-001</figcaption>
          </figure>
          <p>or</p>
          <figure>
            <pre class="prettyprint">console.log</pre>
            <figcaption>Fig 02-002</figcaption>
          </figure>

          <p>The Javascript engine will prefix this statement with window.console.log because
          that is where the object is defined. Similarly the setTimeout, clearTimeout,
          setInterval and clearInterval methods all belong to the window object so we can
            call</p>

          <figure>
            <pre class="prettyprint">window.setTimeout</pre>
            <figcaption>Fig 02-003</figcaption>
          </figure>

          <p>In Node instead of the window object we have an object called global so the
          functions discussed above through the global object. One thing to know about
            Node is that a variable declared like this:</p>

          <figure>
            <pre class="prettyprint">var message = '';</pre>
            <figcaption>Fig 02-004</figcaption>
          </figure>

          <p>is not added to the global object. So, in Node,  if we wrote:</p>

          <figure>
            <pre class="prettyprint">console.log(global.message);</pre>
            <figcaption>Fig 02-005</figcaption>
          </figure>

          <p>we would see 'undefined' in the console. This is  due to Node's modular system
          which we will learn about in the next section.</p>

          <h2>Modules</h2>
          <p>In the last section we learned that in client side Javascript that we run in
          a browser when we declare a variable or a function it is added to the global
          scope:</p>

          <figure>
          <pre class="prettyprint">var sayHello = function() {

}

window.sayHello();</pre>
            <figcaption>Fig 02-005</figcaption>
          </figure>

          <p>The problem with this behaviour that is in a real world application we often
          split our Javascript code into multiple files. This means that it is possible
          to define the same sayHello function. Because the function is added to the
          global scope one definition will overwrite the other.</p>

          <p>In order to build reliable and maintainable applications we should avoid defining
          variables and functions in the global scope. Instead we need modularity where
          we create small building blocks or modules where we define our variables and
          functions. They are then encapsulated in that module.</p>

          <p>Every file in a node application is considered a module.</p>

          <p>Variables and functions defined within the module are private (in OOP terms). If
          we want to make a variable of function available outside of the module we
          need to explicitly export it.</p>

          <p>Every Node application has at least one file or module which we refer to as the
          main module.</p>

          <p>If we write out the module object to the console:</p>

          <figure>
            <pre class="prettyprint">console.log(module)</pre>
            <figcaption>Fig 02-006</figcaption>
          </figure>

          <p>We will see a JSON object containing various properties such as id, exports, parent,
          filename, loaded etc:</p>

          <figure>
          <pre class="prettyprint">Module {
id: '.',
exports: {},
parent: null,
filename: 'C:\\DevelopmentTutorials\\TheCompleteNodeJSCourse\\02-node-module-system\\12-modules.js',
loaded: false,
children: [],
paths:
[ 'C:\\DevelopmentTutorials\\TheCompleteNodeJSCourse\\02-node-module-system\\node_modules',
'C:\\DevelopmentTutorials\\TheCompleteNodeJSCourse\\node_modules',
'C:\\DevelopmentTutorials\\node_modules',
'C:\\node_modules' ] }</pre>
            <figcaption>Fig 02-007</figcaption>
          </figure>

          <h2>Creating a Module</h2>

          <p>Let's add a new module called logger.js for logging messages. The module will be
          re-used in this application and potentially other applications. In this module we
          will imagine that we are going to use a remote logging service for logging our
          messages. So there are third party websites out there that provide a url where
          we can send an http request to log a message:</p>

          <figure>
            <pre class="prettyprint">var url = 'http://mylogger.io/log';</pre>
            <figcaption>Fig 02-008</figcaption>
          </figure>

          <p>We also create a function called log that takes a message and sends an http request.
          For now, for simplicity, we will just write the message to the console:</p>

          <figure>
          <pre class="prettyprint">function log(message) {
                      // Send an HTTP request
                    }</pre>
            <figcaption>Fig 02-009</figcaption>
          </figure>

          <p>The variable and the log function are both scoped to this module - they are private
          and not visible from the outside.</p>

          <p>However in app.js we want to be able to access the log function. So we need to make
          this public and visible from the outside.</p>

          <p>One of the properties of the module object is exports which by default is set to
          an empty object. Anything that we add to this object will be exported from the module:</p>

          <figure>
            <pre class="prettyprint">module.exports.log = log;</pre>
            <figcaption>Fig 02-010</figcaption>
          </figure>

          <p>Similarly if we wanted to export the url we defined in 13-logger.js we could write the
          following:</p>

          <figure>
            <pre class="prettyprint">module.exports.url = url;</pre>
            <figcaption>Fig 02-011</figcaption>
          </figure>

          <p>We can change the name that get's exported:</p>

          <figure>
            <pre class="prettyprint">module.exports.endPoint = url;</pre>
            <figcaption>Fig 02-012</figcaption>
          </figure>

          <p>We only export a subset of functions from modules - keeping other details private.</p>

          <h2>14 - Loading a Module</h2>

          <p>To load a module we use the require function:</p>

          <figure>
            <pre class="prettyprint">require('./13-logger');</pre>
            <figcaption>Fig 02-013</figcaption>
          </figure>

          <p>This is a node function it is not available in the browser. The js file extension is
          optional as Node assumes we will specify a Javascript file and therefore automatically
          adds the js extension.</p>

          <p>If the file was in a subfolder we could specify:</p>

          <figure>
            <pre class="prettyprint">require('./subFolder/logger');</pre>
            <figcaption>Fig 02-014</figcaption>
          </figure>

          <p>or if the file was in a parent folder:</p>

          <figure>
            <pre class="prettyprint">require('../logger');</pre>
            <figcaption>Fig 02-015</figcaption>
          </figure>

          <p>The require function returns the object that is exported from the specified module.</p>

          <p>To demonstrate write the following:</p>

          <figure>
          <pre class="prettyprint">var logger = require('./logger');

                    console.log(logger);</pre>
            <figcaption>Fig 02-016</figcaption>
          </figure>

          <p>Then we run the application we get an object with a single method called log that is
          a function. We can now call this function in app.js:</p>

          <figure>
            <pre class="prettyprint">logger.log('message');</pre>
            <figcaption>Fig 02-017</figcaption>
          </figure>

          <p>In more recent versions of Javascript we have the ability to use a const. So, as a best
          practice, when loading a module using the require function it is better to store the
          result in constant:</p>

          <figure>
            <pre class="prettyprint">const logger = require('./13-logger');</pre>
            <figcaption>Fig 02-018</figcaption>
          </figure>

          <p>This prevents us from accidentally overwriting the value of logger:</p>

          <figure>
            <pre class="prettyprint">logger = 1;</pre>
            <figcaption>Fig 02-019</figcaption>
          </figure>

          <p>When using a const this will result in a "Assignment to constant variable" error.</p>

          <p>One last thing to mention is that sometimes instead of exporting an object from a
          module you might want to export a single function. For example, in our logger module,
          we don't necessarily need an object because we have a single method. An object would
          be useful if we had multiple methods or properties but in this case we can export a
          single function:</p>

          <figure>
            <pre class="prettyprint">module.exports = log;</pre>
            <figcaption>Fig 02-020</figcaption>
          </figure>

          <p>then in app.js call the function directly:</p>

          <figure>
            <pre class="prettyprint">logger('message');</pre>
            <figcaption>Fig 02-021</figcaption>
          </figure>

          <h2>15 Module Wrapper Function</h2>

          <p>You now know that the variables and functions defined in a module are scoped to that
          module. How does Node do this? To illustrate let's introduce a syntax error to the first
          line of logger.js (this must be on the first line):</p>

          <figure>
            <pre class="prettyprint">var x=;</pre>
            <figcaption>Fig 02-022</figcaption>
          </figure>

          <p>If you run logger.js you will receive the following error:</p>

          <figure>
          <pre class="prettyprint">(function (exports, require, module, __filename, __dirname) { var x =;

                    SyntaxError: Unexpected token ;</pre>
            <figcaption>Fig 02-023</figcaption>
          </figure>

          <p>If you look above the SyntaxError message you will see a function declaration which accepts
          the following parameters - exports, require, module, __filename, __dirname.</p>

          <p>Under the hood Node does not execute the code defined in our module directly. Instead it
          wraps it inside a function (the one we saw in the error message above). So, at runtime,
          our code will look similar to this (we will remove the syntax error):</p>

          <figure>
          <pre class="prettyprint">(function (exports, require, module, __filename, __dirname) {
                    var url = 'http://mylogger.io/log';

                    function log(message) {
                      // Send an HTTP request
                      console.log(message);
                    }

                      module.exports = log;
                    })</pre>
            <figcaption>Fig 02-024</figcaption>
          </figure>

          <p>The actual code is more complex than shown above but to avoid distracting from the topic
          we will keep the example simple. More advanced Javascript developers will recognise the
          code above as an Immediately Invoked Function Expression of IIFE.</p>

          <p>The takeaway is that Node never executes our code directly. Instead it wraps each module
          in a function. Looking at the parameters that the module accepts we have require (which
          we have seen before). The require function appears to be global but actually it is local
          to each module - in every module require is one of the parameter passed into the function.</p>

          <p>The function is known as the Module Wrapper Function. We have also used the module function
          previously. The exports parameter is a shortcut to module.exports so we could write:</p>

          <figure>
            <pre class="prettyprint">module.exports.log = log;</pre>
            <figcaption>Fig 02-025</figcaption>
          </figure>

          <p>or</p>

          <figure>
            <pre class="prettyprint">exports.log = log;</pre>
            <figcaption>Fig 02-026</figcaption>
          </figure>

          <p>However you can't reset exports like this:</p>

          <figure>
            <pre class="prettyprint">exports = log; // module.exports</pre>
            <figcaption>Fig 02-027</figcaption>
          </figure>

          <p>In addition we also have __filename and __dirname parameters which represent the name of the
          file and the path. Let's take a look:</p>

          <figure>
          <pre class="prettyprint">console.log(__filename);
console.log(__dirname);

__dirname returns a path to the directory that contains that module.</pre>
            <figcaption>Fig 02-028</figcaption>
          </figure>

          <h2>16 Path Module</h2>
          <p>In the last section we mentioned that there are a few useful modules that are built into the
          core of Node. These modules allow you to work with files, the network, operating system etc. and
          include the following:</p>

          <ul>
            <li>File System - work with files.</li>
            <li>HTTP - create web servers that listen for HTTP requests.</li>
            <li>OS - work with the Operating System.</li>
            <li>Path - provides utilities for working with paths.</li>
            <li>Process - information about the current process.</li>
            <li>Query Strings - useful when building HTTP services.</li>
            <li>Stream - for working with streams of data.</li>
          </ul>

          <p>In this section we will investigate the Path module. If you run 16-path-module.js
          you will get the following information:</p>

          <figure>
          <pre class="prettyprint">{ root: 'C:\\',
                    dir: 'C:\\DevelopmentTutorials\\TheCompleteNodeJSCourse\\02-node-module-system',
                    base: '16-path-module.js',
                    ext: '.js',
                    name: '16-path-module' }</pre>
            <figcaption>Fig 02-029</figcaption>
          </figure>

          <h2>17 OS Module</h2>
          <p>This section describes how to get information about the current operating system. Some of the
          available methods include:</p>
          <ul>
            <li>freemem</li>
            <li>totalmem</li>
            <li>userInfo([options])</li>
            <li>uptime</li>
          </ul>
          
          <p>If you run 17-os-module.js you will get the following information:</p>

          <figure>
          <pre class="prettyprint">Total Memory: 17081073664
                    Free Memory: 10441883648</pre>
            <figcaption>Fig 02-030</figcaption>
          </figure>

          <p>Before node it was not possible to get information about the operating system using Javascript.
          Javascript only ran inside a browser and we could only work with the Window or Document objects.
</p>

          <h2>18 File System Module</h2>
          <p>Almost all of the functions in the fs module come in two forms - synchronous (blocking) or
          asynchronous (non-blocking). Where possible you should avoid using the synchronous methods.
          As we mentioned in the previous section a Node process has a single thread. If you are u
          using Node to build the backend for your application you may have hundreds or thousands of
          clients connecting to that back-end.</p>

          If you keep that client busy you wont be able serve many clients.

          All the asynchronous methods take a function as their last argument. This function is known as
          a callback.

          19 Events Module
          ----------------
          One of the core concepts in Node is events. An event is basically a signal that indicates that
          something has happened in our application.

          In the Events module we have a class called EventEmitter. When we call require events the require
          function returns an EventEmitter class (hence the casing):

          const EventEmitter = require('events');

          We then create an instance of the EventEmitter class:

          const emitter = new EventEmitter();

          The emit method raises an event:

          emitter.emit('messageLogged');

          In order to respond to the event being raised we need to register a listener:

          emitter.on('messageLogged', function() {
          console.log('Listener called');
          });

          the on method takes two arguments - the name of the event to listen for and a callback function.

          The order in which you define the emitter and the listener is important. If you register the
          listener after calling the emit method it will not pick up the event. This is because when we call
          the emit method it iterates over all the registered listeners and calls them synchronously.

          20 Event Arguments
          ------------------

          Often when you raise an event you also want to send some information about that event. As an example,
          let's assume that when we log a message our remote login service might generate an id for that message.
          Perhaps we want to return that id to the client or it may give us a Url to access that log message
          directly. When raising an event, we can add additional arguments, referred to as event arguments:

          emitter.emit('messageLogged', 1, 'url');

          The magic values that we supply above are a bit confusing. A better practice is to encapsulate the
          values inside an object:

          emitter.emit('messageLogged', {id: 1, url: 'http://' });

          When registering the listener the callback function can also recieve the event argument:

          emitter.on('messageLogged', function(arg) {
          console.log('Listener called');
          });

          One last way to simplify the code is to use the ECMAScript 6 arrow function. An arrow functon allows
          you to remove the function keyword and add an arrow =>:


          21 Extending Event Emitter
          --------------------------

          In the real world it is quite rare that you would work with the EventEmitter directly. Instead you
          normally create a class that has all the abilities of the EventEmitter and then you would use
          that class in your code.

          To explain open the 21-logger.js module where we are exporting a simple logger function called log
          which writes the message to the console. After this we want to raise an event. Later in the app module
          we will respond to that event.

          We create a class in 21-logger.js called Logger that extends the EventEmitter class:

          class Logger extends EventEmitter {

          This gives the Logger class all the functionality that is defined in EventEmitter but we can also
          add additional functionality. When a function is defined in a class it is known as a method. Also,
          the function keyword is not required.

          Instead of using the EventEmitter class in 21-logger.js we use an instance of the logger class

          22 HTTP Module
          --------------
          One of the powerful building blocks of Node is the Http module that we use for creating networking
          applications. For example, we can create a web server that listens for Http requests on a given
          port. With this we can easily create a backend service for our client applications - like a web
          application that we build with React or Angular or a mobile application running on a mobile device.

          In the real world we are not going to use the Http module to build a backend service for our
          application. The reason is that as we add more routes our code becomes complicated. Instead we
          use a framework called express which gives our application a clean structure to handle various
          routes. Internally the express framework is built on top of the Http module in Node.

          23 Recap
          --------

          Node Core
          So, in this section, you learned that:
          - We don’t have the window object in Node.
          - The global object in Node is “global”.
          - Unlike browser applications, variables we define are not added to the “global”
          object.
          - Every file in a Node application is a module. Node automatically wraps the code
          in each file with an IIFE (Immediately-invoked Function Expression) to create
          scope. So, variables and functions defined in one file are only scoped to that file
          and not visible to other files unless explicitly exported.
          - To export a variable or function from a module, you need to add them to
          module.exports:
          module.exports.sayHello = sayHello;
          - To load a module, use the require function. This function returns the
          module.exports object exported from the target module:
          const logger = require(‘./logger’);
          - Node has a few built-in modules that enable us to work with the file system, path
          objects, network, operating system, etc.
          - EventEmitter is one of the core classes in Node that allows us to raise (emit) and
          handle events. Several built-in classes in Node derive from EventEmitter.
          - To create a class with the ability to raise events, we should extend EventEmitter:
          class Logger extends EventEmitter {
          }
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TheCompleteNodejsCourse02NodeModuleSystem.vue'
  }</script>

<style scoped>

</style>
