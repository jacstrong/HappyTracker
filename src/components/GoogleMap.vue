<template>
  <div>
    <v-card>
      <!-- <v-card-text class="pa0"> -->
        <v-container fluid>
          <v-layout row wrap fill-height >
            <v-radio-group v-model="radioGroup">
              <v-layout row xs12 wrap fill-height>
                <!-- <v-flex sm3> -->
                  <v-radio
                    class="no-bottom"
                    :label="'Happy'"
                    :value="1"
                  ></v-radio>
                <!-- </v-flex> -->

                <!-- <v-flex xs6 sm3> -->
                  <v-radio
                    class="no-bottom"
                    :label="'Not Happy'"
                    :value="2"
                  ></v-radio>
                <!-- </v-flex> -->

                <!-- <v-flex sm3> -->
                  <v-radio
                    class="no-bottom"
                    :label="'Made Someone Happy'"
                    :value="3"
                  ></v-radio>
                <!-- </v-flex> -->
              </v-layout>
            </v-radio-group>
            <v-flex sm3>
              <v-checkbox
                v-model="showPersonal"
                label="My Tracks"
                value="bottom"
              ></v-checkbox>
            </v-flex>
            <v-flex>
            <v-btn
              class="blue lighten-2"
              @click="submitHandler()"
            >
              Submit
            </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      <!-- </v-card-text> -->
    </v-card>
    <div id="map_canvas" style="width:100%; height:100%"></div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data: () => ({
    name: 'GoogleMap',
    // props: ['name'],
    mapName: 'heat' + '-map',
    radioGroup: 1,
    showPersonal: false
  }),
  mounted: function () {
    const element = document.getElementById('map_canvas')
    const options = {
      zoom: 14,
      center: new google.maps.LatLng(41.7406976, -111.8150656)
    }

    const map = new google.maps.Map(element, options)
  },
  methods: {
    submitHandler () {

    }
  }
}
</script>

<style scoped>
#map_canvas {
  height: 100%;
  min-height: 400px;
}
.no-padding-margin {
  margin: 0;
  padding: 0;
}
.no-bottom {
  margin-bottom: 0;
  padding-bottom: 0;
}
</style>
