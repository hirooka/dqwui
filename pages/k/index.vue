<template>
  <div>
    <h1>こころ</h1>
    <v-data-table
      :headers="headers"
      :items="kokoros"
      :items-per-page="10"
      class="elevation-1"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import logger from '~/plugins/logger'
export default Vue.extend({
  async asyncData ({ app }) {
    const path = '/v1/kokoros';
    const response = await app.$axios.get(path);
    logger.info(response);
    const data = response.data;
    return {
      kokoros: data
    }
  },
  data () {
    return {
      headers: [
        { text: 'ばんごう', value: 'id' },
        { text: 'なまえ', value: 'name' },
        { text: 'グレード', value: 'rank' },
        { text: 'タイプ', value: 'type' },
        { text: 'さいだいHP', value: 'type' },
        { text: 'さいだいMP', value: 'type' },
        { text: 'ちから', value: 'op' },
        { text: 'みのまもり', value: 'dp' },
        { text: 'こうげき魔力', value: 'os' },
        { text: 'かいふく魔力', value: 'ds' },
        { text: 'きようさ', value: 'dx' },
        { text: 'すばやさ', value: 'sp' },
      ]
    }
  },
});
</script>
