<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h2>WebPack - Remove automatic -loader module name extension</h2>
        </div>
        <div class="panel-body">
          <h2>WebPack - Remove automatic -loader module name extension</h2>
          <p>I followed the process to <router-link to="/vuejsdeployingtoheroku" active-class="active"><a>
            deploy</a></router-link> maxsage.tech to Heroku. This process involves using vue-cli to create
            a new project and then building a minified and compressed version of the web application to a
            dist directory.
          </p>
          <p>Vue-cli creates different scripts than what I had setup previously in package.json. So whereas
          in the previous incarnation of the maxsage.tech web application I had the following script:</p>
          <figure>
          <pre><code class="language-json">&quot;scripts&quot;: {
  &quot;dev&quot;: &quot;cross-env NODE_ENV=development webpack-dev-server --open --inline --hot --port 8082&quot;,
  &quot;build&quot;: &quot;cross-env NODE_ENV=production webpack --progress --hide-modules&quot;
},</code></pre>
          <figcaption>Fig 01-001</figcaption>
          </figure>
          <p>However, I ended up with following script section instead:</p>
          <figure>
          <pre><code class="language-json">&quot;scripts&quot;: {
  &quot;dev&quot;: &quot;webpack-dev-server --inline --progress --config build/webpack.dev.conf.js&quot;,
  &quot;start&quot;: &quot;node server.js&quot;,
  &quot;lint&quot;: &quot;eslint --ext .js, src&quot;,
  &quot;build&quot;: &quot;node build/build.js&quot;,
  &quot;serve&quot;: &quot;node server.js&quot;
},</code></pre>
          <figcaption>Fig 01-002</figcaption>
          </figure>
          <p>With the above script in place changes I made to the src directory did not reflect in the
          web application until I had performed another build. With the previous script changes had been reflected
          immediately in the application. I think this is due to the hot reload option --hot:</p>
          <figure>
          <pre><code class="language-json">&quot;dev&quot;: &quot;cross-env NODE_ENV=development webpack-dev-server --open --inline --hot --port 8082&quot;,</code></pre>
          <figcaption>Fig 01-003</figcaption>
          </figure>
          <p>So, basically, I re-introduced the above line into my new script:</p>
          <figure>
          <pre><code class="language-json">&quot;scripts&quot;: {
  &quot;dev&quot;: &quot;cross-env NODE_ENV=development webpack-dev-server --open --inline --hot --port 8082&quot;,
  &quot;start&quot;: &quot;node server.js&quot;,
  &quot;lint&quot;: &quot;eslint --ext .js, src&quot;,
  &quot;build&quot;: &quot;node build/build.js&quot;,
  &quot;serve&quot;: &quot;node server.js&quot;
},</code></pre>
          <figcaption>Fig 01-004</figcaption>
          </figure>
          <p>This means I can issue the command:</p>
          <figure>
          <pre class="terminal">npm run dev</pre>
          <figcaption>Fig 01-005</figcaption>
          </figure>
          <p>To allow me to run in development mode and have changes to the src directory reflected in real
          time or I can issue the command:</p>
          <figure>
          <pre class="terminal">npm run build</pre>
          <figcaption>Fig 01-006</figcaption>
          </figure>
          <p>To build a minified and compressed version of the application to the dist directory.</p>
          <h3>The Problem</h3>
          <p>Along the way this did throw up an issue I had in my existing webpack.config.js detailed <a
            href="https://github.com/webpack/webpack/issues/2986">here</a>. Webpack used to automatically
          append <code class="language-">-loader</code>  to a module when the first module lookup failed.</p>
          <p>This meant in the <span class="filename">webpack.config.js</span> code like this:</p>
          <figure>
          <pre><code class="language-javascript">{
  test: /\.js$/,
  loader: 'babel',
  exclude: /node_modules/
},</code></pre>
          <figcaption>Fig 01-007</figcaption>
          </figure>
          <p>Would throw an error:</p>
          <figure>
          <pre class="terminal">ERROR in multi (webpack)-dev-server/client?http://localhost:8082 webpack/hot/dev-server
            ./src/main.js
Module not found: Error: Can't resolve 'babel' in 'C:\Development\maxsagetech'
BREAKING CHANGE: It's no longer allowed to omit the '-loader' suffix when using loaders.
                 You need to specify 'babel-loader' instead of 'babel',
                 see https://webpack.js.org/guides/migrating/#automatic-loader-module-name-extension-removed
 @ multi (webpack)-dev-server/client?http://localhost:8082 webpack/hot/dev-server ./src/main.js
          </pre>
          <figcaption>Fig 01-008</figcaption>
          </figure>
          <p>This is detailed in <a href="https://github.com/webpack/webpack/issues/2986">this feature
            request</a>.  I resolved this by appending <code class="language-">-loader</code> to all the loader
            properties in the <span
            class="filename">webpack.config.js</span> file:</p>
          <figure>
          <pre><code class="language-javascript">  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/
},</code></pre>
          <figcaption>Fig 01-009</figcaption>
          </figure>

          <h3>Resources</h3>
          <p>You can read the official Webpack documentation <a href="https://webpack.js.org/">here</a>.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WebpackRemoveAutomaticLoaderModuleNameExtension'
}
</script>

<style scoped>

</style>
