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
      geo: false
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
