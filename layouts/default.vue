<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      width="192"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          dense
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon href="https://twitter.com/hirooka_pro" target="_blank">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn icon href="https://hirooka.pro" target="_blank">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <div class="text-caption">
        {{ commitId }}
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} hirooka</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-heart',
          title: '特級職最適こころ',
          to: '/combo/5'
        },
        {
          icon: 'mdi-heart-outline',
          title: '上級職最適こころ',
          to: '/combo'
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'こころ一覧',
          to: '/kokoro'
        }
      ],
      title: 'dqw',
      commitId: process.env.NUXT_ENV_GIT_COMMIT_ID
    }
  }
}
</script>
