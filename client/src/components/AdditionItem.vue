<template>
    <div class="justify-content-lg-center m-3">
        <b-row>
  <b-card
    style="width: 15rem;"
    class="mb-2"
    align="center"
  >
    <b-card-text>
      <h2>{{addition.name}}</h2>
    </b-card-text>

    <b-button href="#" variant="primary">Status</b-button>
  </b-card>
        </b-row>
</div>
</template>

<script>
export default {
  name: 'addition-item',
  props: ['addition'],
  data() {
    return {
      name: 'addition.name'
    }
  }
}
</script>
