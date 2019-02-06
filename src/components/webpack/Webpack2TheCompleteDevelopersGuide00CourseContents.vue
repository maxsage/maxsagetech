<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h2>WebPack 2 The Complete Developers Guide</h2>
        </div>
        <div class="panel-body">
          <h2>01 Start Here!</h2>
          <p>The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
            The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
            The quick brown fox jumps over the lazy dog.</p>

          <h2>02 Links to Github Repos</h2>
          <h2>03 Why Do We Use Build Tools?</h2>
          <p>Webpack has gained popularity as Single Page Apps have started to be implemented
            over Server Side Technologies.
          </p>
          <figure>
            <img src="./images/webpack2thecompletedevelopersguide/Fig01-001.png"/>
            <figcaption>Fig 01-001</figcaption>
          </figure>
          <h3>Server Side Templating</h3>
          <p>Server side templating is a little bit more of a legacy technology for creating web
          applications and showing Html documents to users. In a Server Side Templating world
          we depend on a backend server to create an Html document and send it down to the user.
          This Html document is a fully rendered Html document - it contains all the information
          required to render the page fully (text, images, buttons, form elements etc.)</p>
          <h3>Single Page App</h3>
          <p>In contrast, in a Single Page App world our server sends down a bear bones Html document
          to the user. Once the Html document loads it goes and grabs a couple of JavaScript scripts.
          The Javascript is then responsible for assembling a web page to show to the user. </p>
          <p>The takeaway from this is that in a Server Side Templating world we rely on the server
          to put together the Html document. In a Single Page App world we rely on a big old pile
          of Javascript code that is being executed on the client's browser to put together our
          Html document. </p>
          <figure>
            <img src="./images/webpack2thecompletedevelopersguide/Fig01-002.png"/>
            <figcaption>Fig 01-002</figcaption>
          </figure>
          <p>In a Server Side Templating web application every time the user navigates around the
          application you are getting back a new Html document from the server.</p>
          <figure>
            <img src="./images/webpack2thecompletedevelopersguide/Fig01-003.png"/>
            <figcaption>Fig 02-003</figcaption>
          </figure>
          <p>In a Single Page Application world a user visits the page which makes an Http request
          to our server. The server sends back a new Html document that includes some Javascript
          scripts. The front end framework that we are using (React, Angular, Backbone, Knockout,
          VueJS etc.) will boot up and assemble some amount of Html on the page to display to the
          user. Whenever the user clicks a link to navigate to another page we don't get a brand
          new Html document from the server. Instead we are relying on our front-end framework to
          show some amount of new content on the screen.</p>
          <p>The popularity of SPA applications has grown over SST application in in the last couple
            of years. SST is still very popular and forms the vast majority of websites online. However
          as far as very dynamic web pages go we are definitely seeing a trend towards Single Page
          Applications.</p>
          <p>We use Webpack because in Single Page Application world we are relying upon Javascript
          code that is being executed on our user's browser to assemble the entire web application:
          </p>
          <figure>
            <img src="./images/webpack2thecompletedevelopersguide/Fig01-004.png"/>
            <figcaption>Fig 01-004</figcaption>
          </figure>
          <p>This results in a huge pile of Javascript that is being shipped down to our user's
            browser - tens of thousands of lines of code. In the Server Side Templating
            world there used to be very little Javascript code that we would send down to a
            client because the only Javascript code we would need was, for example, would be
            stuff to handle fancy events like button clicks, or animations etc.
          </p>
          <p>This change in the amount of Javascript in Single Page Applications starts to answer
          the question as to why we need Webpack. In the next section we will look at what
          Webpack does to make dealing with this tremendous amount of Javascript code easier.</p>
          <h3>Javascript Modules</h3>
          <p>In this section we will look at the type of problems that arise when we have a lot
          of Javascript tied to a single page application and what Webpack does to solve these
          problems. Imagine for a second that you have just got a job as an engineer to work on
          a really large Javascript application. When you look at the code base you find that
          they have tens of thousands of lines of code split between three different files:</p>
          <figure>
            <img src="./images/webpack2thecompletedevelopersguide/Fig02-001.png"/>
            <figcaption>Fig 02-001</figcaption>
          </figure>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Webpack2TheCompleteDevelopersGuide00CourseContents'
}
</script>

<style scoped>
  img {
    max-width: 100%;
  }
</style>
