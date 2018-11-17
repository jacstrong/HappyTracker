<template>
  <v-layout
    v-if="true"
    v-touch="{
      left: () => swipeLeft('Not Happy'),
      right: () => swipeRight('Happy'),
      up: () => swipeUp('You Made Someone Happy!')
    }"
    column
    align-center
    justify-center
    style="height: 500px"
    v-bind:class="backgroundClass"
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
import axios from 'axios'

export default {
  props: ['username', 'value'],
  data: () => ({
    backgroundClass: 'grey lighten-2',
    hasGeolocation: true,
    swipeDirection: 'None',
    trackedSwipes: [],
    username1: '',
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
    this.username1 = this.$store.state.username
    console.log(this.username)
  },
  methods: {
    swipeLeft (direction) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess)
      this.swipeDirection = direction
      this.addSwipeToList('S')
      this.backgroundClass = 'red lighten-2'
    },
    swipeRight (direction) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess)
      this.swipeDirection = direction
      this.addSwipeToList('H')
      this.backgroundClass = 'blue lighten-2'
    },
    swipeUp (direction) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess)
      this.swipeDirection = direction
      this.addSwipeToList('M')
      this.backgroundClass = 'green lighten-2'
    },
    addSwipeToList (direction) {
      if (this.lng !== '') {
        let temp = {
          name: this.username,
          action: direction,
          lng: this.lng,
          lat: this.lat,
          time: this.printDate()
        }
        this.trackedSwipes.push(temp)
        console.log(this.trackedSwipes)
        if (this.trackedSwipes.length >= 10) {
          this.sendData()
        }
      } else {
        this.$emit('input', true)
      }
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
    },
    sendData () {
      axios.post('/.netlify/functions/chunk', this.trackedSwipes)
        .then(() => {
          console.log('sending data' + this.trackedSwipes)
          this.trackedSwipes = []
        })
        .catch((err) => {
          console.error(err)
          this.trackedSwipes = []
        })
    }
  },
  beforeDestroy: function () {

  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
