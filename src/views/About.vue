<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to the Happy Tracker.
        </h1>
        <p class="subheading font-weight-regular">
          Happy tracker is a website dedicated to making the world a happier place.
        </p>
      </v-flex>

      <v-flex
        mb-5
        xs12
      >
        <h2 class="headline font-weight-bold mb-3">How it works</h2>
        <p>Look around you and observe how happy the people are around you. As you find people who are happy, SWIPE LEFT. As you find
          people who are not so, SWIPE LEFT. When you do something that made someones day, you get to SWIPE UP. Count as many people as
          you can! Check out the results tab to see where are the happy people are.</p>
        <v-btn
          class="ma-4"
          @click="nav('/track')"
        >
          Start Now
        </v-btn>

        <v-layout justify-center>
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-layout>
      </v-flex>

      <v-flex
        xs12
        mb-5
      >
        <h2 class="headline font-weight-bold mb-3">Important Links</h2>

        <v-layout justify-center>
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-layout>
      </v-flex>

      <v-flex
        xs12
        mb-5
      >
        <h2 class="headline font-weight-bold mb-3">FYI</h2>

        <v-layout justify-center>
          <v-card>
            <v-card-text>
              <v-card-title><h2> We are not lawyers, so we don't know what to say here but we will say that we:</h2></v-card-title>
              <v-list>
                <v-list-tile>Record your loction</v-list-tile>
                <v-list-tile>Record your IP</v-list-tile>
                <v-list-tile>Laugh with you when people walk into stuff while on their phones</v-list-tile>
                <v-list-tile>Will not bother to remove your data</v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from '../router.js'
export default {
  data: () => ({
  }),
  methods: {
    nav (url) {
      router.push(url)
    }
  }
}
</script>

<style>

</style>
