<template>
  <v-layout
    v-if="true"
    v-touch="{
      left: () => swipeLeft('Not Happy'),
      right: () => swipeRight('Happy'),
      up: () => swipeUp('You Made Someone Happy!'),
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
  props: ['username'],
  data: () => ({
    hasGeolocation: true,
    swipeDirection: 'None',
    trackedSwipes: [],
    username: '',
    lng: '',
    lat: ''
  }),
  created: function () {
    // navigator.geolocation.getCurrentPosition()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess)
    } else {
      this.hasGeolocation = false
    }
    console.log(this.username)
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
      let temp = [{
        name: this.username,
        action: direction,
        lng: this.lng,
        lat: this.lat,
        time: this.printDate()
      }]
      this.trackedSwipes.push(temp)
      console.log(this.trackedSwipes)
      if (this.trackedSwipes.length >= 10) {
        sendData()
      }
    },
    geoSuccess (position) {
      this.lat = position.coords.latitude
      this.lng = position.coords.longitude
      console.log(this.lat)
      console.log(this.lng)
    },
    printDate () {
      let temp = new Date()
      let dateStr = temp.getFullYear().toString() +
                    temp.getMonth().toString() +
                    temp.getDate().toString() +
                    temp.getHours().toString() +
                    temp.getMinutes().toString()
      return (dateStr)
    },
    sendData () {

    }
  }
}
</script>
