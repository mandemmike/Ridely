<template>
  <div>

    <b-modal ref="my-modal" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
      <b-button class="mt-3" variant="outline-warning" block @click="hideModal">Cancel</b-button>
      <b-button class="mt-2" variant="outline-success" block @click="toggleModal">Toggle Me</b-button>
    </b-modal>
  </div>
</template>
