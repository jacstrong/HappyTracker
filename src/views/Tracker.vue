<template>
<v-layout row justify-center>
  <swipe-box :username="username" />
    <v-dialog v-model="usernameDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Choose a username</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Username"
                  v-model="username"
                  required
                  box
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
      usernameDialog: true,
      username: ''
    }
  },
  methods: {
    usernameSave () {
      this.usernameDialog = false
      // TODO: GET THE STORE WORKING AND SAVE THE USERNAME

    }
  }
}
</script>
