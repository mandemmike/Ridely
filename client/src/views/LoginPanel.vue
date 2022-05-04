
<template >

<div>
  <b-navbar variant="dark" type="dark">
    <b-navbar-brand to="/">Ridely.</b-navbar-brand>
  </b-navbar>
<div class="columns" v:bind:key="login-panel">
    <div id="login" class="column is-two-thirds">
      <section class="section">
        <span class="dot">
          <BIconBicycle font-scale="4" variant="success"/>
        </span> <br><br>
        <!-- form starts here -->
        <section class="form">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input v-model="email" class="login-input" v:bind:key="email" type="email" placeholder="Your email">
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input v-model="password" v-on:keyup.enter="Submit()" v:bind:key="password" class="login-input" type="password" placeholder="Your password">
            </div>
          </div>

          <br><b-button type="submit" variant="outline-success" @click="Submit()">Login</b-button>
          </section>
    </section><p>
      {{ response }}</p>
      <p>Don't have an account? <b-link :to="{name: 'create-account'}">Register</b-link></p>
      </div>
      </div>
</div>
</template>

<script>
import axios from 'axios'
// import { serverBus } from '../main.js'
import { BIconBicycle } from 'bootstrap-vue'
export default {
  components: {
    BIconBicycle
  },
  props: ['userInfo'],
  data() {
    return {
      email: '',
      succes: '',
      password: '',
      Verified: false,
      response: '',
      user: {}
    }
  },
  methods: {
    Submit() {
      axios.post('http://localhost:3000/api/login', {
        email: this.email,
        password: this.password
      }).then((res) => {
        if (res.status === 200) {
          this.Verified = true
          this.response = res.data
          this.user = res.data
          console.log(this.user)
          this.$router.push({ name: 'users', params: { _id: this.user._id } })
        } else {
          this.response = 'Login Failed. Please try again'
          console.log(this.response)
        }
      })
        .catch((error) => {
          this.response = 'Login Failed. Please try again'
          console.log(error)
        }).finally(() => {
        })
    }
  }
}
</script>
<style scoped>
#login{
  background-color: rgb(38, 39, 46);
  width: 300px;
  height: 370px;
  color: white;
  border-radius: 5px;
  text-align: center;
  align-items: center;
  display: block;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10vh;
  margin-bottom: 10vh;
}
.dot {
  height: 77px;
  width: 77px;
  background-color: rgb(30, 31, 36);
  border-radius: 50%;
  display: inline-block;
  margin-top: 2vh;
  color:#5cb85c;
  border: 2px solid
}
.login-input{
  border-radius: 5px;
  border: none;
}
</style>
