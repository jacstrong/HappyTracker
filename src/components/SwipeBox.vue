<template>
  <v-layout
    v-if="hasGeolocation"
    v-touch="{
      left: () => console.log('tracking man'),
      right: () => swipeRight('Right'),
      up: () => swipeUp('Up'),
      down: () => swipeDown('Down')
    }"
    column
    align-center
    justify-center
    style="height: 500px"
    class="grey lighten-2"
  >
    <v-subheader>Swipe Direction</v-subheader>
    {{ swipeDirection }}
  </v-layout>
  <v-layout
    v-else
    column
    align-center
    justify-center
    style="height: 500px"
    class="red lighten-2"
  >
    <v-subheader>Looks like you don't have location access on this device. Please allow us to view your location for Happy Tracker to work</v-subheader>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    hasGeolocation: true,
    swipeDirection: 'None',
    trackedSwipes: [],
    username: 'NULL NAME',
    lng: '',
    lat: ''
  }),
  created: {
    onload () {
      navigator.geolocation.getCurrentPosition()
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.geoSuccess)
      } else {
        this.hasGeolocation = false
      }
    }
  },
  methods: {
    swipeLeft (direction) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess)
      this.swipeDirection = direction
      this.addSwipeToList('S')
    },
    swipeRight (direction) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess)
      this.swipeDirection = direction
      this.addSwipeToList('H')
    },
    swipeUp (direction) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess)
      this.swipeDirection = direction
      this.addSwipeToList('M')
    },
    swipeDown (direction) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess)
      this.swipeDirection = direction
      this.addSwipeToList('Y')
    },
    addSwipeToList (direction) {
      this.trackedSwipes.push({
        name: this.username,
        action: direction,
        lng: this.lng,
        lat: this.lat,
        time: this.printDate()
      })
    },
    geoSuccess (position) {
      this.lat = position.coords.latitude
      this.lng = position.coords.longitude
    },
    printDate () {
      let temp = new Date()
      let dateStr = temp.getFullYear().toString() +
                    temp.getMonth().toString() +
                    temp.getDate().toString() +
                    temp.getHours().toString() +
                    temp.getMinutes().toString()
      return (dateStr)
    }
  }
}
</script>
