<template>
  <v-app>
    <v-toolbar app>
      <v-btn
        flat
        @click.stop="drawer = !drawer"
      >
        <!-- <span class="mr-2"></span> -->
        <v-icon>menu</v-icon>
      </v-btn>
      <!-- <v-spacer></v-spacer> -->
      <v-toolbar-title class="headline text-uppercase">
        <span>Happy</span>
        <span class="font-weight-light">Tracker</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      absolute
      dark
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img v-bind:src="pickFace()">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title></v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="nav(item.route)"
        >
          <v-list-tile-action >
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import router from './router.js'

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'home', route: '/' },
        { title: 'About', icon: 'flare', route: 'about' },
        { title: 'Tracker', icon: 'tag_faces', route: 'track' },
        { title: 'Results', icon: 'explore', route: 'results' }
      ],
      mini: false,
      right: true,
      avatarNum: '85',
      avatarGen: 'men',
      avatarURL: '',
      avatarLoaded: false
    }
  },
  methods: {
    nav (url) {
      router.push(url)
    },
    pickFace () {
      if (!this.avatarLoaded) {
        let gen = ['men', 'women', 'lego']
        this.avatarGen = gen[Math.floor(Math.random() * gen.length)]
        if (this.avatarGen === 'lego') {
          this.avatarNum = Math.floor(Math.random() * 9)
        } else {
          this.avatarNum = Math.floor(Math.random() * 99)
        }
        this.avatarURL = `https://randomuser.me/api/portraits/${this.avatarGen}/${this.avatarNum}.jpg`
        this.avatarLoaded = true
      }
      return (this.avatarURL)
    }
  }
}
</script>
