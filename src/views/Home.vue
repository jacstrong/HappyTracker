<template>
  <div>
    <v-parallax
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-layout
        align-center
        column
        justify-center
      >
        <h1 class="display-2 font-weight-thick mb-3">HAPPY<span class="font-weight-light">TRACKER</span></h1>
        <h4 class="subheading">See where people are most happy!</h4>
        <v-divider></v-divider>
        <v-btn
          class="ma-4"
          @click="nav('/about')"
        >
          Let's go!
        </v-btn>
        <v-divider></v-divider>
        <v-btn
          class="ma-4"
          @click="nav('/results')"
        >
          See Results
        </v-btn>
      </v-layout>
    </v-parallax>
    <v-layout
      text-xs-center
      column
      wrap
    >
      <v-flex mb-4></v-flex>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to the <span class="display-2 font-weight-thick">HAPPY</span><span class="font-weight-thin">TRACKER</span>
        </h1>
        <p class="subheading font-weight-regular">
          Happy Tracker is a mental health promoting tool and game
          <br>created by Jacob Strong, and Skyler Cowley.
        </p>
        <p class="subheading font-weight-regular">
          The thought is that by being more concious of those around you,
          <br>including yourself, you will be happier. Happy tracker is simple and helps people
          <br>focus on those around them and even gamifies making others smile.
        </p>
      </v-flex>

      <v-flex
        xs12
        mb-5
      >
        <h2 class="headline font-weight-bold mb-3">Cool Reading</h2>

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
        <h2 class="headline font-weight-bold mb-3">Just For Smiles :)</h2>

        <v-layout justify-center>
          <a
            v-for="(link, i) in smiles"
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
      >
        <h3 class="subheading font-weight-bold">&#169;2018 - Jacob Strong & Skyler Cowley -- <a href="https://github.com/jacstrong/HappyTracker">GitHub</a></h3>
      </v-flex>
    </v-layout> -->
  </div>
</template>

<script>
import router from '../router.js'

export default {
  components: {
  },
  data: () => ({
    importantLinks: [
      {
        text: 'Helping Others',
        href: 'https://www.huffingtonpost.com/2016/12/12/international-day-of-happiness-helping-_n_6905446.html'
      },
      {
        text: 'Pay Attention',
        href: 'https://motivationmatter.com/2018/02/11/pay-attention-happiness-project/'
      },
      {
        text: 'Happiness is Contagious',
        href: 'https://www.njlifehacks.com/happiness-is-contagious/'
      }
    ],
    smiles: [
      {
        text: 'Speeding Ticket',
        href: 'https://www.youtube.com/watch?v=T2BY8zZ1CTM'
      },
      {
        text: 'Procrastination',
        href: 'https://www.youtube.com/watch?v=arj7oStGLkU'
      },
      {
        text: 'Germans, am I right?',
        href: 'https://www.youtube.com/watch?v=PcRyjkYdDxM'
      },
      {
        text: 'GO!',
        href: 'https://www.youtube.com/watch?v=WJq4jWSQNd8'
      },
      {
        text: 'Maple Seeds',
        href: 'https://www.youtube.com/watch?v=qgAaZA8OreQ'
      }
    ]
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
