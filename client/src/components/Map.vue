<template>
  <div>
    <GmapMap
      :center="coordinates"
      :zoom="16"
      :options="options"
      style="width: 100%; height: 96vh; margin: 0px auto"
    >
    <GmapMarker
        :key="index"
        v-for="(gmp, index) in locations"
        :position="gmp"
        @click="center=gmp"
      ></GmapMarker></GmapMap>
  </div>
</template>
<script>
export default {
  props: {
    latitude: Float32Array,
    longitude: Float32Array
  },
  data() {
    return {
      coordinates: {
        lat: this.latitude,
        lng: this.longitude
      },
      locations: [
        {
          lat: this.latitude,
          lng: this.longitude
        }],

      options: {
        mapId: '14b7289127689dad',
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false
      }
    }
  },
  watch: {
    latitude: function (newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.locations = [{
        lat: newVal,
        lng: this.longitude,
        label: 'Frölunda'
      }]
      this.coordinates.lat = newVal
      console.log(this.locations)
    },
    longitude: function (newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.locations = [{
        lat: this.latitude,
        lng: newVal,
        label: 'Frölunda'
      }]
      this.coordinates.lng = newVal
      console.log(this.locations)
    }
  },

  mounted() {
    this.$getLocation({})
      .then((coordinates) => {
        this.coordinates = coordinates
        console.log(this.coordinates.lat)
        this.locations = [
          {
            lat: this.coordinates.lat,
            lng: this.coordinates.lng
          }]
      })
      .catch((error) => alert(error))
  }
}
</script>
