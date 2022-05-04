<template>
  <div>
    <div>
  <!-- As a link -->
  <div>
  <b-navbar toggleable="md" variant="dark" type="dark">
    <b-navbar-brand to="/">Ridely.</b-navbar-brand>
    <b-navbar-toggle class="mb-2" target="nav-collapse"></b-navbar-toggle>
    <b-nav-form>
      <b-form-input class="mr-sm-2" input type="text" v-model="search"
      placeholder="Search"></b-form-input>
      <b-button id="filter-button" variant="primary" v-b-toggle.collapse-2  >Filter <font-awesome-icon icon="filter" /></b-button>&nbsp;
    </b-nav-form>
    <b-collapse align="left" id="nav-collapse" is-nav>
     <b-button v-if="loggedIn()" id="add-location" variant="outline-success" class="my-2 my-sm-0" @click="showModal">Add
          <BIconPlusCircle/></b-button>&nbsp;
          <b-button v-if="loggedIn() === false" id="login-button" to="/login-panel" variant="success" class="my-2 my-sm-0">Login</b-button>
          <b-button v-else id="logout-button" to="/" variant="danger" class="my-2 my-sm-0">Logout</b-button>&nbsp;
          <b-button v-if="loggedIn()" id="profile"  :to="{name: 'users', params: {_id: this.$route.params._id}}" class="my-2 my-sm-0" >Profile</b-button>
    </b-collapse>

  </b-navbar>
  </div>
  <b-collapse id="collapse-2">
    <b-card align="left">
    <b-form-checkbox-group
      v-model="filterSelected"
      :options="filterOptions"
      class="mb-3"
      id="checkboxes"
      value-field="item"
      text-field="name"
    ></b-form-checkbox-group>
    </b-card>
    </b-collapse>
     <div class="map">
  <map-page v-bind:latitude="coordinates.lat" v-bind:longitude="coordinates.lng"/>
</div>
</div>
<div>
    <b-modal ref="addLocation-modal"
    @show="resetModal"
      @hidden="resetModal" hide-footer title="Add a new location">
      <div v-if="locationAdded === false" class="d-block text-center">
          <b-form>
              <b-form-radio-group
      v-model="selected"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
    ></b-form-radio-group>

              <b-form-group>

          <b-form-input
          v-model="form.locationName"
            placeholder="Location name"
            required
          ></b-form-input>
      </b-form-group>
      <b-form-group>

          <b-form-input
          v-model="form.address.street"
            placeholder="Location Street name"
            required
          ></b-form-input>
      </b-form-group>
      <b-form-group>

          <b-form-input
          v-model="form.address.city"
            placeholder="Location City"
            required
          ></b-form-input>
      </b-form-group>
      <b-form-group>

          <b-form-input
          v-model="form.address.zip_code"
          v-on:keyup.enter="addLocation"
            placeholder="Location Zip code"
            required
          ></b-form-input>
      </b-form-group>
          </b-form>
      <b-button class="mt-3" variant="success" block @click="addLocation">Add</b-button>
      <b-button class="mt-2" block @click="closeModal">Cancel</b-button>
       </div>
       <p align="center" v-else>{{addLocationMessage}}</p>
    </b-modal>
</div>
<div class="col-xs-4 col-sm-4 col-lg-6 overflow-auto">
<div v-for="item in filteredLocations" v-bind:key="item._id">
            <bikeshop-item v-if="isABikeshop(item._id)" v-bind:bikeshop="item" @show-location="setCoordinates(item.lat, item.lng)"/>
            <parking-item  v-else-if="isAParkinglot(item._id)" v-bind:bikeshop="item"/>
            <pumpstation-item v-else v-bind:pumpstation="item"/>
        </div>

</div>
<div>
    <p align="left">{{message}}</p>
    </div>
        </div>
</template>

<script>
import BikeshopItem from '../components/BikeshopItem.vue'
import ParkinglotItem from '../components/ParkingItem.vue'
import PumpstationItem from '../components/PumpstationItem.vue'
import { BIconPlusCircle } from 'bootstrap-vue'
import Map from '../components/Map'
import { Api } from '@/Api'
export default {
  name: 'bikeshops, testMap',
  components: {
    'map-page': Map,
    'bikeshop-item': BikeshopItem,
    'parking-item': ParkinglotItem,
    'pumpstation-item': PumpstationItem,
    BIconPlusCircle
  },
  created: function () {
    if (this.$route.params._id) {
      this.isLoggedIn = true
    }
  },
  mounted() {
    console.log('PAGE is loaded!')
    Api.get('http://localhost:3000/api/bikeshops')
      .then(response => {
        console.log(response.data)
        this.bikeshops = response.data
        console.log(this.bikeshops)
      })
      .catch(error => {
        this.bikeshops = []
        console.log(error)
        //   TODO: display some error message instead of logging to console
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })
    Api.get('http://localhost:3000/api/parkinglots')
      .then(response => {
        console.log(response.data)
        this.parkinglots = response.data
        console.log(this.parkinglots)
        this.allLocations = this.bikeshops.concat(this.parkinglots)
        this.allLocations = this.allLocations.sort(() => Math.random() - 0.5)
        console.log(this.allLocations)
      })
      .catch(error => {
        this.parkinglots = []
        console.log(error)
        //   TODO: display some error message instead of logging to console
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })
    Api.get('http://localhost:3000/api/pumpstations')
      .then(response => {
        console.log(response.data)
        this.pumpstations = response.data
        console.log(this.pumpstations)
        this.allLocations = this.pumpstations.concat(this.parkinglots,
          this.bikeshops)
        this.allLocations = this.allLocations.sort(() => Math.random() - 0.5)
        console.log(this.allLocations)
      })
      .catch(error => {
        this.pumpstations = []
        console.log(error)
        //   TODO: display some error message instead of logging to console
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })
  },
  data() {
    return {
      allLocations: [],
      bikeshops: [],
      parkinglots: [],
      pumpstations: [],
      message: '',
      addLocationMessage: '',
      form: {
        locationName: '',
        address: {
          city: '',
          street: '',
          zip_code: ''
        }
      },
      search: '',
      selected: '',
      options: [
        { item: 'bikeshop', name: 'Bikeshop' },
        { item: 'bike_parkinglot', name: 'Bike parkinglot' },
        { item: 'pumpstation', name: 'Pumpstation' }
      ],
      filterSelected: [],
      filterOptions: [
        { item: 'bikeshops', name: 'Bikeshops' },
        { item: 'parkinglots', name: 'Bike parkinglots' },
        { item: 'pumpstations', name: 'Pumpstations' }
      ],
      locationAdded: false,
      coordinates: {
        lat: 58,
        lng: 11
      },
      isLoggedIn: false
    }
  },
  methods: {
    loggedIn() {
      if (this.$route.params._id) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
      return this.isLoggedIn
    },
    showModal() {
      this.$refs['addLocation-modal'].show()
    },
    closeModal() {
      this.$refs['addLocation-modal'].hide()
    },
    addBikeshop() {
      const userID = this.$route.params._id
      Api.post('http://localhost:3000/api/bikeshops',
        {
          address: this.form.address,
          name: this.form.locationName,
          added_by: userID
        })
        .then(response => {
          console.log(response.data)
          this.locationAdded = true
          this.addLocationMessage = 'New bikeshop added!'
        })
        .catch(error => {
          console.log('failed to get user data', error)
        })
    },
    addParkinglot() {
      const userID = this.$route.params._id
      Api.post('http://localhost:3000/api/parkinglots',
        {
          address: this.form.address,
          name: this.form.locationName,
          added_by: userID
        })
        .then(response => {
          console.log(response.data)
          this.locationAdded = true
          this.addLocationMessage = 'New bike parkinglot added!'
        })
        .catch(error => {
          console.log('failed to get user data', error)
        })
    },
    addPumpstation() {
      console.log('reached')
      const userID = this.$route.params._id
      Api.post('http://localhost:3000/api/pumpstations',
        {
          address: this.form.address,
          name: this.form.locationName,
          added_by: userID
        })
        .then(response => {
          console.log(response.data)
          this.locationAdded = true
          this.addLocationMessage = 'New pumpstation added!'
        })
        .catch(error => {
          console.log('failed to get user data', error)
        })
    },
    addLocation() {
      if (this.selected === 'bikeshop') {
        this.addBikeshop()
      } else if (this.selected === 'bike_parkinglot') {
        this.addParkinglot()
      } else if (this.selected === 'pumpstation') {
        this.addPumpstation()
      }
    },
    resetModal() {
      this.form.address.city = ''
      this.form.bikeshopName = ''
      this.locationAdded = false
    },
    isABikeshop(itemID) {
      let isBikeshop = false
      this.bikeshops.forEach((bikeshop) => {
        if (bikeshop._id === itemID) {
          isBikeshop = true
        }
      })
      return isBikeshop
    },
    isAParkinglot(itemID) {
      let isParkinglot = false
      this.parkinglots.forEach((parkinglot) => {
        if (parkinglot._id === itemID) {
          isParkinglot = true
        }
      })
      return isParkinglot
    },
    arrayEquals(array1, array2) {
      const result = array1.every(function (element) {
        return array2.includes(element)
      })
      return result
    },
    filteredAllLocations(searchResults) {
      if (this.search) {
        this.allLocations.forEach((bikeshop) => {
          if (Object.values(bikeshop).includes(this.search)) {
            searchResults.push(bikeshop)
            this.message = ''
          } else if (bikeshop.address &&
              Object.values(bikeshop.address).includes(this.search)) {
            searchResults.push(bikeshop)
            this.message = ''
          } else if (searchResults.length === 0) {
            this.message = 'Nothing found'
          }
        })
      }
    },
    filteredBikeshops(searchResults) {
      if (this.search) {
        this.bikeshops.forEach((bikeshop) => {
          if (Object.values(bikeshop).includes(this.search)) {
            searchResults.push(bikeshop)
            this.message = ''
          } else if (bikeshop.address &&
              Object.values(bikeshop.address).includes(this.search)) {
            searchResults.push(bikeshop)
            this.message = ''
          } else if (searchResults.length === 0) {
            this.message = 'Nothing found'
          }
        })
      }
    },
    filteredParkinglots(searchResults) {
      if (this.search) {
        this.parkinglots.forEach((bikeshop) => {
          if (Object.values(bikeshop).includes(this.search)) {
            searchResults.push(bikeshop)
            this.message = ''
          } else if (bikeshop.address &&
              Object.values(bikeshop.address).includes(this.search)) {
            searchResults.push(bikeshop)
            this.message = ''
          } else if (searchResults.length === 0) {
            this.message = 'Nothing found'
          }
        })
      }
    },
    filteredPumpstations(searchResults) {
      if (this.search) {
        this.pumpstations.forEach((bikeshop) => {
          if (Object.values(bikeshop).includes(this.search)) {
            searchResults.push(bikeshop)
            this.message = ''
          } else if (bikeshop.address &&
              Object.values(bikeshop.address).includes(this.search)) {
            searchResults.push(bikeshop)
            this.message = ''
          } else if (searchResults.length === 0) {
            this.message = 'Nothing found'
          }
        })
      }
    },
    setCoordinates(latitude, longitude) {
      this.coordinates.lat = latitude
      this.coordinates.lng = longitude
      console.log(this.coordinates.lat, this.coordinates.lng)
    },
    clicked() {
      this.coordinates.lat = 57
      this.coordinates.lng = 11
      console.log(this.coordinates.lat, this.coordinates.lng)
    }
  },
  computed: {
    filteredLocations: function () {
      if (!this.search) {
        switch (this.filterSelected.toString()) {
          case [].toString():
            return this.allLocations
          case ['bikeshops', 'parkinglots', 'pumpstations'].toString():
            return this.allLocations
          case ['bikeshops'].toString():
            return this.bikeshops
          case ['parkinglots'].toString():
            return this.parkinglots
          case ['pumpstations'].toString():
            return this.pumpstations
          case ['bikeshops', 'parkinglots'].toString():
            return this.bikeshops.concat(this.parkinglots).sort(() => Math.random() - 0.5)
          case ['parkinglots', 'pumpstations'].toString():
            return this.parkinglots.concat(this.pumpstations).sort(() => Math.random() - 0.5)
          case ['bikeshops', 'pumpstations'].toString():
            return this.bikeshops.concat(this.pumpstations).sort(() => Math.random() - 0.5)
        }
      }

      const searchResults = []
      if (this.search) {
        switch (this.filterSelected.toString()) {
          case [].toString():
            this.filteredAllLocations(searchResults)
            break
          case ['bikeshops', 'parkinglots', 'pumpstations'].toString():
            this.filteredAllLocations(searchResults)
            break
          case ['bikeshops'].toString():
            this.filteredBikeshops(searchResults)
            break
          case ['parkinglots'].toString():
            this.filteredParkinglots(searchResults)
            break
          case ['pumpstations'].toString():
            this.filteredPumpstations(searchResults)
            break
          case ['bikeshops', 'parkinglots'].toString():
            this.filteredBikeshops(searchResults)
            this.filteredParkinglots(searchResults)
            break
          case ['parkinglots', 'pumpstations'].toString():
            this.filteredParkinglots(searchResults)
            this.filteredPumpstations(searchResults)
            break
          case ['bikeshops', 'pumpstations'].toString():
            this.filteredBikeshops(searchResults)
            this.filteredPumpstations(searchResults)
            break
        }
      }
      return searchResults.sort(() => Math.random() - 0.5)
    }
  }

}
</script>
<style scoped>
p {
    margin-left: 30px;
    margin-right: auto;
    margin-top: 20vh;
}
.map{
  margin-top: 55px;
  position: fixed;
  width: 100% !important;
  height: 90% !important;
}
@media screen and (max-width: 600px) {
  #filter-button{
    margin-top: 7px !important;
  }

}

@media screen and (max-width: 400px) {
  .overflow-auto
    { overflow-x: auto !important;
    overflow-y: hidden;
    height:30vh !important;}
}

.bikeshop{
  position: relative;
  overflow:scroll
}
.map{
  margin-top: 0px;
  position: fixed;
  width: 100%;
  height: 100%;
}
.mysidebar{
  margin-top: 50px
}
div.overflow-auto {
  width: 240px;
  height:90vh;
  overflow-x: scroll;
  border: none;
  position: fixed;
}
</style>
