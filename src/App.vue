<template>
  <div class="container">
    <router-view name="header-top"></router-view>
    <router-view>

    </router-view>

  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: {
    appHeader: Header
  }
}
</script>

<style>
  figcaption {
    font-weight: bold;
    padding: 10px 0px 20px 0px;
  }

  .filename {
    font-family: Consolas;
    font-weight: bold;
  }

  .terminal {
    font-size: small;
    color: white;
    font-family: Consolas;
    background-color: black;
    padding: 2px 5px 4px 5px;
    border-radius: 4px;
  }

  .table-striped > tbody > tr:nth-child(2n+0) > td, .table-striped > tbody > tr:nth-child(2n+0) > th {
    background-color: #AEAEAE;
  }

  .thead-dark {
    background-color: #88888F;
  }

  table.table-bordered {
    border: 1px solid black;
    margin-top: 20px;
  }

  table.table-bordered > thead > tr > th {
    border: 1px solid black;
  }

  table.table-bordered > tbody > tr > td {
    border: 1px solid black;
  }

</style>
