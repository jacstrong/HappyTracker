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
import axios from 'axios'

export default {
  components: {
    axios
  },
  data: () => ({
    name: 'GoogleMap',
    // props: ['name'],
    mapName: 'heat' + '-map',
    radioGroup: 1,
    showPersonal: false,
    pointsS: [],
    pointsH: [],
    returnData: [],
    map: {},
    heatmap: {},
    heatmap2: {}
  }),
  created: function () {
    axios.get('/.netlify/functions/chunk')
      .then(res => {
        this.returnData = res.data
        this.initHeatmap()
      }).catch(err => {
        console.error(err)
      })
  },
  mounted: function () {
    const element = document.getElementById('map_canvas')
    const options = {
      zoom: 14,
      center: new google.maps.LatLng(41.7406976, -111.8150656),
      mapTypeId: 'satellite'
    }

    this.map = new google.maps.Map(element, options)
    console.log(1)
    this.initHeatmap()
  },
  methods: {
    submitHandler () {

    },
    initHeatmap () {
      this.heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.getPoints(),
        map: this.map
      })
      this.heatmap2 = new google.maps.visualization.HeatmapLayer({
        data: this.getPoints2(),
        map: this.map
      })
      // this.heatmap.setMap(this.heatmap.getMap() ? null : this.map)
      var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
      ]
      this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient)
    },
    getPoints () {
      this.returnData.forEach((coord) => {
        if (coord.action === 'S') {
          const position = new google.maps.LatLng(coord.lat, coord.lng)
          this.points.push(position)
        }
      })
      return this.pointsS
    },
    getPoints2 () {
      this.returnData.forEach((coord) => {
        if (coord.action === 'H') {
          const position = new google.maps.LatLng(coord.lat, coord.lng)
          this.points.push(position)
        }
      })
      return this.pointsH
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
