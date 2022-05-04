<template>

<div id="userInfo">
  <b-navbar variant="dark" type="dark">
    <b-navbar-brand :to="{ name: 'search_id', params: { _id: this.user._id } }">Ridely.</b-navbar-brand>
  </b-navbar>
  <b-card no-body>
  <b-tabs pills card align="center">
  <b-tab title="My account" active>
<div class="container bootstrap snippets bootdey">
    <div class="row" v:bind="user">
        <!-- left column -->
        <div>
</div>
            <!-- edit form column -->
            <div class="col-md-9 personal-info justify-content-center mx-auto">
            <div class="alert alert-primary" role="alert">
              <strong>Hi favorite biker!</strong> Don't forget to confirm your changes.
            </div>
            <h3>Personal info</h3>
        <div class="form-row justify-content-center">
          <form class="form-horizontal" role="form">
              <div class="form-group">
              <label class="col-lg-3 control-label">First name</label>
              <div class="col-lg-8 mx-auto">
              <input v-model="user.firstName" class="form-control" type="text" value='first name'>
              </div>
              </div>
              <div class="form-group">
              <label class="col-lg-3 control-label">Last name</label>
              <div class="col-lg-8 mx-auto">
                <input v-model="user.lastName"  class="form-control" type="text" value="last name">
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label" value="email">Email</label>
              <div class="col-lg-8 mx-auto">
                <input v-model="user.email" class="form-control" type="text" value="">
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label">Password</label>
              <div class="col-lg-8 mx-auto">
                <input v-model="user.password"  class="form-control" type="password">
              </div>
            </div>
                  <b-button class="btn_message" id="btn" variant="primary" @click="Updateprofile()">Confirm changes</b-button> &nbsp;
                  <b-button class="btn_message" id="btn" variant="danger" @click="deletAccount()">Delete Account</b-button> &nbsp;
                  <b-button class="btn_message" id="btn" variant="danger" @click="resetAccount()">Reset Account</b-button> &nbsp;

                  <div v-if="deleted"><h1>User Account Deleted</h1></div>
                  <div v-if="updated"><h1>User Account Updated</h1></div>
                  <div v-if="reseted"><h1>User Account Reseted</h1></div>
        </form>
        </div>
      </div>
  </div>
</div>
  </b-tab>
  <b-tab title="My additions"> <user-additions/></b-tab>
  </b-tabs>
  </b-card>
</div>

</template>

<script>

// @ is an alias to /src
import axios from 'axios'
import { Api } from '@/Api'
import UserAdditions from '../views/UserAdditions.vue'
// import { serverBus } from '../main.js'

export default {
  props: ['userInfos'],
  components: {
    'user-additions': UserAdditions
  },
  data: function () {
    return {
      user: {
      },
      deleted: false,
      additions: [],
      updated: false,
      reseted: false
    }
  },
  methods: {
    Updateprofile() {
      const id = this.$route.params._id
      axios.patch('http://localhost:3000/api/users/' + id, {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.password
      })
        .then(response => {
          if (response.status === 200) {
            this.updated = true
            this.created()
          }
        })
        .catch(error => {
          this.message = error
        })
    },
    deletAccount() {
      axios.delete('http://localhost:3000/api/users', { params: { _id: this.$route.params._id } })
        .then(response => {
          this.deleted = true
        })
        .catch(error => {
          console.log('failed to get user data', error)
        })
    },
    dataTransfer: function () {
      console.log(this.user)
      this.$router.push({ name: 'search_id', params: { _id: this.user._id } })
    },
    resetAccount() {
      const userID = this.$route.params._id
      Api.put('http://localhost:3000/api/users/' + userID, {
        _id: userID,
        email: this.user.email,
        password: this.user.password
      })
        .then(response => {
          this.reseted = true
        })
        .catch(error => {
          console.log('failed to get user data', error)
        })
    }

  },
  created: function () {
    const id = this.$route.params._id
    axios.get('http://localhost:3000/api/users/' + id)
      .then(response => {
        this.user = response.data[0]
      })
      .catch(error => {
        console.log('failed to get user data', error)
      })
  }
}

</script>

<style scoped>
body{
    margin-top: 20px;
    align-items: center !important;
}
.alert{
  display:inline-block;
}
.text-primary{
  margin-top: 2%;
}

@media screen and (max-width: 768px) {
#side-menu{
height: 0% !important;
width: 100% !important;
margin-left: 45%;
margin-bottom: -40%;
}
.b-button{
  width: 0% !important;
  height: 100% !important;
  vertical-align: 10% !important;
}
}

</style>
