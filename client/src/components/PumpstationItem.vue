<template>
    <div>
  <b-card
    class="mb-2"
    style="max-width: 15rem;"
  >
    <b-card-text>
      <font-awesome-icon icon="tools" size="3x" />
      <h2>{{pumpstation.name}}</h2>
      <p v-if="pumpstation.address && pumpstation.address.city">{{pumpstation.address.city}}</p>
      <p v-else></p>
      <p v-if="pumpstation.address && pumpstation.address.street">{{pumpstation.address.street}}</p>
      <p v-else></p>
      <div class="rating">
      <p>Rating: {{ pumpstation.rating }}</p></div>
    </b-card-text>
    <div class="rating">
    <b-form-rating v-model="value"></b-form-rating>
    <p class="mt-2">Value: {{ pumpstation.rating }}</p>
  </div>

    <b-button href="#" variant="primary" v-on:click="$emit('show-location')">See location</b-button>
  </b-card>
</div>
</template>

<script>
export default {
  name: 'pumpstation-item',
  props: ['pumpstation'],
  data() {
    return {
      name: 'pumpstation.name',
      city: 'pumpstation.address.city'
    }
  }
}
</script>
<style scoped>
@media screen and (max-width: 624px) {
  .rating { display: none ;}
  }
</style>
