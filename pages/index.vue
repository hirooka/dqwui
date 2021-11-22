<template>
  <div>
    <v-row justify="center" align="center" class="my-0">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">
            ドラクエウォークの火力ツール
          </v-card-title>
          <v-card-text>
            <p>ドラクエウォークの上級職において最適なこころの組み合わせを提案します。</p>
            <p>{{ kokoro }}種類のこころ(主にS, A, Bグレード)をサポートし、約{{ combination }}通りの組み合わせの中から最適なこころの組み合わせを数秒で計算します。</p>
            <p>
              APIも提供しています。APIドキュメントは、<a
                href="https://dqwapi.hirooka.pro/api.html"
                target="_blank"
                rel="noopener noreferrer"
                title="API doc"
              >
                こちら
              </a>です。
            </p>
            <hr class="my-0">
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              nuxt
              to="/combo"
              block
            >
              こころ組み合わせ
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn
              color="primary"
              nuxt
              to="/kokoro"
              block
              class="my-4"
            >
              こころ一覧
            </v-btn>
          </v-card-actions>
          <v-card-text>
            <p class="text-right">
              ({{ commitId }})
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import logger from '~/plugins/logger'
export default Vue.extend({
  async asyncData ({ app }) {
    const path = '/v1/kokoro/combos/info'
    const response = await app.$axios.get(path)
    const data = response.data
    logger.info(data)
    return {
      kokoro: data.kokoro,
      combination: data.combination
    }
  },
  data () {
    return {
      kokoro: '-',
      combination: '-',
      commitId: process.env.NUXT_ENV_GIT_COMMIT_ID
    }
  }
})
</script>
