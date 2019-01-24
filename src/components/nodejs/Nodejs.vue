<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h2>Course Contents</h2>
        </div>
        <div class="panel-body">
          <ul>
            <router-link to="/thecompletenodejscourse-01-getting-started" active-class="active">
              <a>Getting Started</a>
            </router-link>
            <ol>
              <li>01 - Welcome</li>
              <li>02 - What is Node</li>
              <li>03 - Node Architecture</li>
              <li>04 - How Node Works</li>
              <li>05 - Installing Node</li>
              <li>06 - Your First Node Program</li>
              <li>07 - Course Structure</li>
              <li>08 - Recap</li>
              <li>09 - Asking Questions</li>
            </ol>
            <router-link to="/thecompletenodejscourse-02-node-module-system" active-class="active">
              <a>Node Module System</a>
            </router-link>
            <ol>
              <li>10 - Introduction</li>
              <li>11 - Global Object</li>
              <li>12 - Modules</li>
              <li>13 - Creating a Module</li>
              <li>14 - Loading a Module</li>
              <li>15 - Module Wrapper Function</li>
              <li>16 - Path Module</li>
              <li>17 - OS Module</li>
              <li>18 - File System Module</li>
              <li>19 - Events Module</li>
              <li>20 - Event Arguments</li>
              <li>21 - Extending Event Emitter</li>
              <li>22 - HTTP Module</li>
              <li>23 - Recap</li>
            </ol>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nodejs.vue'
}
</script>

<style scoped>

</style>
