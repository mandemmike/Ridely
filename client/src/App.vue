<template>
  <div id="app">
  <div>
    <b-modal ref="addLocation-modal" hide-footer title="Add a new location">
      <div class="d-block text-center">
         <b-form>
              <b-form-group>

          <b-form-input
          v-model="form.bikeshopName"
            placeholder="Location name"
            required
          ></b-form-input>
      </b-form-group>
          </b-form>
      </div>
       <b-button class="mt-3" variant="success" block @click="addLocation">Add</b-button>
      <b-button class="mt-2" block @click="toggleModal">Cancel</b-button>
    </b-modal>
  </div>
    <!-- Render the content of the current page view -->
    <router-view/>
    </div>
</template>

<script>

import { Api } from '@/Api'
export default {
  el: '#app',
  components: {
    // Define the name of the component here
    // 'user-Logo': UserLogo,
    // 'login-view': LoginView
  },
  data() {
    return {
      form: {
        bikeshopName: ''
      }
    }
  },
  methods: {
    showModal() {
      this.$refs['addLocation-modal'].show()
    },
    addLocation() {
      const userID = this.$route.params._id
      Api.post('http://localhost:3000/api/bikeshops',
        {
          name: this.form.bikeshopName,
          added_by: userID
        })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log('failed to get user data', error)
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: 0.5px;
  text-align: center;
  color: #2c3e50;
}
.navbar-brand{
  @import url(//db.onlinewebfonts.com/c/af66aa5680372d137e074a1ab91718ee?family=TerminaW05-Black);
  font-family: TerminaW05-Black;
  font-size: 1.4em !important;
}

</style>
