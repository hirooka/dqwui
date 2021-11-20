<template>
  <div>
    <h2>
      こころ一覧
    </h2>
    <div class="mt-0">
      このツールでサポートしているこころの一覧です。
    </div>
    <v-card>
      <v-card-title>
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="さがす"
          single-line
          hide-details
          dense
          class="mb-2 mt-n2"
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="kokoros"
        :items-per-page="20"
        class="elevation-1"
        mobile-breakpoint="0"
        dense
        fixed-header
        :search="search"
      >
        <template #[`item.name`]="{item}">
          <v-chip
            :color="item.type.toLowerCase()"
            :text-color="getTextColor(item.type.toLowerCase())"
            small
          >
            {{ item.name }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import logger from '~/plugins/logger'
export default Vue.extend({
  async asyncData ({ app }) {
    const path = '/v1/kokoros'
    const response = await app.$axios.get(path)
    logger.info(response)
    const data = response.data
    return {
      kokoros: data
    }
  },
  data () {
    return {
      search: '',
      headers: [
        { text: 'ばんごう', value: 'id' },
        { text: 'なまえ', value: 'name' },
        { text: 'グレード', value: 'grade' },
        { text: 'タイプ', value: 'type' },
        { text: 'さいだいHP', value: 'hp' },
        { text: 'さいだいMP', value: 'mp' },
        { text: 'ちから', value: 'op' },
        { text: 'みのまもり', value: 'dp' },
        { text: 'こうげき魔力', value: 'os' },
        { text: 'かいふく魔力', value: 'ds' },
        { text: 'きようさ', value: 'dx' },
        { text: 'すばやさ', value: 'sp' }
      ],
      kokoros: []
    }
  },
  methods: {
    getTextColor (color: string) {
      if (color === 'yellow') {
        return 'black'
      } else {
        return 'white'
      }
    }
  }
})
</script>
