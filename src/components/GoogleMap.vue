<template>
  <div>
    <v-card>
      <v-container fluid>
        <v-layout row wrap fill-height justify-center>

          <v-flex sm3>
            <v-btn
              class="red lighten-3"
              @click="toggleHeatmapS()"
            >Not Happy</v-btn>
          </v-flex>

          <v-flex sm3>
            <v-btn
              class="blue lighten-3"
              @click="toggleHeatmapH()"
            >Happy</v-btn>
          </v-flex>

          <v-flex sm3>
            <v-btn
              class="green lighten-3"
              @click="toggleHeatmapM()"
            >Made Happy</v-btn>
          </v-flex>

        </v-layout>
      </v-container>
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
    pointsM: [],
    returnData: [],
    map: {},
    heatmapS: {},
    showHeatmapS: true,
    heatmapH: {},
    showHeatmapH: true,
    heatmapM: {},
    showHeatmapM: true,
    gradientS: [],
    gradientH: []
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
      this.heatmapS = new google.maps.visualization.HeatmapLayer({
        data: this.getSPoints(),
        map: this.map,
        radius: 10
      })
      this.heatmapH = new google.maps.visualization.HeatmapLayer({
        data: this.getHPoints(),
        map: this.map,
        radius: 10
      })
      this.heatmapM = new google.maps.visualization.HeatmapLayer({
        data: this.getMPoints(),
        map: this.map,
        radius: 10
      })

      var gradientH = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 63, 255, 1)'
      ]

      var gradientS = [
        'rgba(127, 0, 63, 0)',
        'rgba(127, 0, 63, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)'
      ]

      var gradientM = [
        'rgba(0, 255, 0, 0)',
        'rgba(0, 255, 0, 1)',
        'rgba(0, 255, 0, 1)',
        'rgba(0, 255, 0, 1)',
        'rgba(0, 255, 75, 1)',
        'rgba(0, 255, 75, 1)',
        'rgba(0, 255, 75, 1)',
        'rgba(0, 255, 90, 1)',
        'rgba(0, 255, 90, 1)',
        'rgba(0, 155, 90, 1)',
        'rgba(0, 155, 90, 1)',
        'rgba(0, 155, 100, 1)',
        'rgba(0, 100, 100, 1)',
        'rgba(0, 100, 100, 1)'

      ]

      this.heatmapH.set('gradient', gradientH)
      this.heatmapS.set('gradient', gradientS)
      this.heatmapM.set('gradient', gradientM)
    },
    toggleHeatmapS () {
      this.showHeatmapS = !this.showHeatmapS
      if (this.showHeatmapS) {
        this.heatmapS.setMap(this.map)
      } else {
        this.heatmapS.setMap(null)
      }
    },
    toggleHeatmapH () {
      this.showHeatmapH = !this.showHeatmapH
      if (this.showHeatmapH) {
        this.heatmapH.setMap(this.map)
      } else {
        this.heatmapH.setMap(null)
      }
    },
    toggleHeatmapM () {
      this.showHeatmapM = !this.showHeatmapM
      if (this.showHeatmapM) {
        this.heatmapM.setMap(this.map)
      } else {
        this.heatmapM.setMap(null)
      }
    },
    getSPoints () {
      this.returnData.forEach((coord) => {
        if (coord.action === 'S') {
          const position = new google.maps.LatLng(coord.lat, coord.lng)
          this.pointsS.push(position)
        }
      })
      return this.pointsS
      // return [
      //   new google.maps.LatLng(37.782551, -122.445368),
      //   new google.maps.LatLng(37.782745, -122.444586),
      //   new google.maps.LatLng(37.782842, -122.443688),
      //   new google.maps.LatLng(37.782919, -122.442815),
      //   new google.maps.LatLng(37.782992, -122.442112),
      //   new google.maps.LatLng(37.783100, -122.441461),
      //   new google.maps.LatLng(37.783206, -122.440829),
      //   new google.maps.LatLng(37.783273, -122.440324),
      //   new google.maps.LatLng(37.783316, -122.440023),
      //   new google.maps.LatLng(37.783357, -122.439794),
      //   new google.maps.LatLng(37.783371, -122.439687),
      //   new google.maps.LatLng(37.783368, -122.439666),
      //   new google.maps.LatLng(37.783383, -122.439594),
      //   new google.maps.LatLng(37.783508, -122.439525),
      //   new google.maps.LatLng(37.783842, -122.439591),
      //   new google.maps.LatLng(37.784147, -122.439668),
      //   new google.maps.LatLng(37.784206, -122.439686),
      //   new google.maps.LatLng(37.784386, -122.439790),
      //   new google.maps.LatLng(37.784701, -122.439902),
      //   new google.maps.LatLng(37.784965, -122.439938),
      //   new google.maps.LatLng(37.785010, -122.439947),
      //   new google.maps.LatLng(37.785360, -122.439952),
      //   new google.maps.LatLng(37.785715, -122.440030),
      //   new google.maps.LatLng(37.786117, -122.440119),
      //   new google.maps.LatLng(37.786564, -122.440209),
      //   new google.maps.LatLng(37.786905, -122.440270),
      //   new google.maps.LatLng(37.786956, -122.440279)
      // ]
    },
    getHPoints () {
      this.returnData.forEach((coord) => {
        if (coord.action === 'H') {
          const position = new google.maps.LatLng(coord.lat, coord.lng)
          this.pointsH.push(position)
        }
      })
      return this.pointsH
      // return [
      //   new google.maps.LatLng(37.783273, -122.440324),
      //   new google.maps.LatLng(37.783316, -122.440023),
      //   new google.maps.LatLng(37.783357, -122.439794),
      //   new google.maps.LatLng(37.783371, -122.439687),
      //   new google.maps.LatLng(37.783368, -122.439666),
      //   new google.maps.LatLng(37.783383, -122.439594),
      //   new google.maps.LatLng(37.783508, -122.439525),
      //   new google.maps.LatLng(37.783842, -122.439591),
      //   new google.maps.LatLng(37.784147, -122.439668),
      //   new google.maps.LatLng(37.784206, -122.439686),
      //   new google.maps.LatLng(37.784386, -122.439790),
      //   new google.maps.LatLng(37.784701, -122.439902),
      //   new google.maps.LatLng(37.784965, -122.439938),
      //   new google.maps.LatLng(37.785010, -122.439947),
      //   new google.maps.LatLng(37.785360, -122.439952),
      //   new google.maps.LatLng(37.785715, -122.440030),
      //   new google.maps.LatLng(37.786117, -122.440119),
      //   new google.maps.LatLng(37.786564, -122.440209),
      //   new google.maps.LatLng(37.786905, -122.440270),
      //   new google.maps.LatLng(37.786956, -122.440279),
      //   new google.maps.LatLng(37.800224, -122.433520),
      //   new google.maps.LatLng(37.800155, -122.434101),
      //   new google.maps.LatLng(37.800160, -122.434430),
      //   new google.maps.LatLng(37.800378, -122.434527),
      //   new google.maps.LatLng(37.800738, -122.434598),
      //   new google.maps.LatLng(37.800938, -122.434650),
      //   new google.maps.LatLng(37.801024, -122.434889),
      //   new google.maps.LatLng(37.800955, -122.435392),
      //   new google.maps.LatLng(37.800886, -122.435959),
      //   new google.maps.LatLng(37.800811, -122.436275)
      // ]
    },
    getMPoints () {
      this.returnData.forEach((coord) => {
        if (coord.action === 'M') {
          const position = new google.maps.LatLng(coord.lat, coord.lng)
          this.pointsM.push(position)
        }
      })
      return this.pointsM
      // return [
      //   new google.maps.LatLng(37.800938, -122.434650),
      //   new google.maps.LatLng(37.801024, -122.434889),
      //   new google.maps.LatLng(37.800955, -122.435392),
      //   new google.maps.LatLng(37.800886, -122.435959),
      //   new google.maps.LatLng(37.800811, -122.436275),
      //   new google.maps.LatLng(37.800788, -122.436299),
      //   new google.maps.LatLng(37.800719, -122.436302),
      //   new google.maps.LatLng(37.800702, -122.436298),
      //   new google.maps.LatLng(37.800661, -122.436273),
      //   new google.maps.LatLng(37.800395, -122.436172),
      //   new google.maps.LatLng(37.800228, -122.436116),
      //   new google.maps.LatLng(37.800169, -122.436130),
      //   new google.maps.LatLng(37.800066, -122.436167),
      //   new google.maps.LatLng(37.784345, -122.422922),
      //   new google.maps.LatLng(37.784389, -122.422926),
      //   new google.maps.LatLng(37.784437, -122.422924),
      //   new google.maps.LatLng(37.784746, -122.422818),
      //   new google.maps.LatLng(37.785436, -122.422959),
      //   new google.maps.LatLng(37.786120, -122.423112),
      //   new google.maps.LatLng(37.786433, -122.423029),
      //   new google.maps.LatLng(37.786631, -122.421213),
      //   new google.maps.LatLng(37.786660, -122.421033),
      //   new google.maps.LatLng(37.786801, -122.420141),
      //   new google.maps.LatLng(37.786823, -122.420034),
      //   new google.maps.LatLng(37.786831, -122.419916),
      //   new google.maps.LatLng(37.787034, -122.418208),
      //   new google.maps.LatLng(37.787056, -122.418034),
      //   new google.maps.LatLng(37.787169, -122.417145),
      //   new google.maps.LatLng(37.787217, -122.416715),
      //   new google.maps.LatLng(37.786144, -122.416403),
      //   new google.maps.LatLng(37.785292, -122.416257)
      // ]
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
