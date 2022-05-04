<template>
  <div>
    <b-navbar variant="dark" type="dark">
    <b-navbar-brand to="/search">Ridely.</b-navbar-brand>
  </b-navbar>
  <b-container fluid="md" id="login-container"><br>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-row class="justify-content-md-center">
      <b-form-group>
        <b-col>
          <b-form-input
            v-model="form.firstName"
            placeholder="First name"
            required
          ></b-form-input>
        </b-col>
      </b-form-group>
      </b-row>

<b-row class="justify-content-md-center">
      <b-form-group>
        <b-col>
          <b-form-input
            v-model="form.lastName"
            placeholder="Last name"
            required
          ></b-form-input>
        </b-col>
      </b-form-group>
</b-row>

<b-row class="justify-content-md-center">
      <b-form-group>
        <b-col>
          <b-form-input
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
          ></b-form-input>
        </b-col>
      </b-form-group>
</b-row>

<b-row class="justify-content-md-center">
      <b-form-group>
        <b-col>
          <b-form-input
            v-model="form.password"
            type="password"
            placeholder="Password"
            required
          ></b-form-input>
        </b-col>
      </b-form-group>
</b-row>

<b-row class="justify-content-md-center">

      <b-btn-toolbar>
        <b-col>
        &nbsp;<b-button type="submit" variant="outline-success">Submit</b-button>&nbsp;
        <b-button type="reset" variant="danger">Reset</b-button>
        </b-col>
      </b-btn-toolbar>

</b-row>
    </b-form>
  </b-container>
  </div>
</template>

<script>
// import axios from 'axios'
import { Api } from '@/Api'
export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      console.log(this.form.email)
      event.preventDefault()
      alert(JSON.stringify(this.form))
      Api.post('http://localhost:3000/api/users', {
        email: this.form.email,
        password: this.form.password,
        firstName: this.form.firstName,
        lastName: this.form.lastName
      })
        .then(res => {
          if (res.status === 201) {
            console.log('Account created')
            console.log(res.data._id)
          } else {
            console.log('Please try again')
          }
        })
        .catch(error => {
          console.log('Please try again')
          console.log(error)
        })
        .finally(() => {})
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.firstName = ''
      this.form.lastName = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
<style scoped>
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
#login-container{
 background-color: rgb(38, 39, 46);
  width: 300px;
  height: 300px;
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
</style>
