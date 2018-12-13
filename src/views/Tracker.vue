<template>
<v-layout row justify-center>
  <swipe-box :username="username" v-model="geo" />

    <v-dialog v-model="usernameDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Choose a Username</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Username"
                  v-model="username"
                  width="100%"
                  required
                  outline
                  :rules="[
                    () => !!username || 'This field is required',
                    () => !!username && username.length <= 25 || 'Address must be less than 25 characters',
                  ]"
                  counter="25"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="usernameSave()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="geo"
      width="500"
    >

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Warning
        </v-card-title>

        <v-card-text>
          Happy Tracker needs your location to gather accurate data. Please enable geolocation or use a different browser
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="geo = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-if="!usernameDialog" :value="dirDialog" fullscreen>
      <v-card color="rgba(0,0,0,0.75)" @click.once="dirDialog = false">
        <v-btn style="left:calc(50vw - 36px)" color="green lighten-3" fab large absolute depressed>
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
        <v-btn style="top:calc(50vh - 36px)" color="red lighten-3" left fab large absolute depressed>
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-btn style="top:calc(50vh - 36px)" color="blue lighten-3" right fab large absolute depressed>
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
        <v-btn style="left:calc(50vw - 77px); top:60px" color="green lighten-3" class="px-1" large absolute depressed>
          Made Someones Day
        </v-btn>
        <v-btn style="top:calc(50vh - 24px); left:55px" color="red lighten-3" class="pr-1" left large absolute depressed>
          Not Happy
        </v-btn>
        <v-btn style="top:calc(50vh - 24px); right:60x" color="blue lighten-3" class="pl-1" right large absolute depressed>
          Happy
        </v-btn>
      </v-card>
    </v-dialog>

  </v-layout>
</template>

<script>
import SwipeBox from '../components/SwipeBox'

export default {
  components: {
    SwipeBox
  },
  data () {
    return {
      usernameDialog: false,
      username: '',
      geo: false,
      dirDialog: true
    }
  },
  created: function () {
    this.username = this.$store.state.username
    if (this.$store.state.username === '') {
      this.usernameDialog = true
    }
  },
  methods: {
    usernameSave () {
      if (this.username !== '') {
        this.usernameDialog = false
      }
      this.$store.commit('newUsername', this.username)
    }
  }
}
</script>
