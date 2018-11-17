<template>
  <v-container style="heigth: 100%">
    <v-layout
      style="heigth: 100%"
      text-xs-center
      wrap
    >
      <v-flex style="heigth: 100px">
        <h1 class="display-2 font-weight-bold mb-3">
          Results
        </h1>
        <GoogleMap></GoogleMap>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import GoogleMap from '../components/GoogleMap.vue'

export default {
  components: {
    GoogleMap
  },
  data: () => ({
    points: {}
  })
}
</script>

<style scoped>

</style>
