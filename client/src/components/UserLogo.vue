<template>
  <router-link to="/users">
            <div class="mb-4">
      <b-avatar></b-avatar>
      <h1>Profile</h1>
            </div>
       </router-link></template>
<script>
export default {
  methods: {
    isLoggedIn() {

    }
  }
}
</script>
<style scoped>
h1 {
      font-size: 100%; line-height:120%;
}
div.mb-4{
  position: relative;
  right: 500px;
}

</style>
