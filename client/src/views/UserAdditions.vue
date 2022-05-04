<template>
<div>
  <b-container>
    <b-row>
    <b-col v-for="addition in additions" v-bind:key="addition._id" cols="12" sm="6" md="4">
            <addition-item v-bind:addition="addition"/>
        </b-col>
    </b-row>
        </b-container>
</div>
</template>
<script>
import { Api } from '@/Api'
import AdditionItem from '../components/AdditionItem.vue'

export default {
  components: {
    'addition-item': AdditionItem
  },
  data() {
    return {
      additions: []
    }
  },
  mounted() {
    const userID = this.$route.params._id
    Api.get('http://localhost:3000/api/bikeshops/' + userID)
      .then(response => {
        console.log(response.data)
        this.additions = response.data
        console.log(this.additions)
      })
      .catch(error => {
        console.log('failed to get user data', error)
      })
  }
}
</script>
