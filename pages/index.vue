<template>
  <div>
    <v-row justify="center" align="center" class="my-0">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">
            ドラクエウォーク最適こころ計算ツール<v-icon>mdi-beta</v-icon>
          </v-card-title>
          <v-card-text>
            <p>ドラクエウォークの上級職において最適だと考えられるこころの組み合わせを提案します。</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              nuxt
              to="/combo/5"
              block
              class="my-4"
            >
              こころ組み合わせ(特級職)
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn
              color="primary"
              nuxt
              to="/combo"
              block
              class="my-4"
            >
              こころ組み合わせ(上級職)
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
            <p>Sグレードのこころだけではなく、メガモンスター、ほこらモンスター、あまり枠のモンスターについてはAグレードも、めったに枠のモンスターについてはAグレードやBグレードもできるだけサポートします。</p>
            <p>現在、{{ kokoro }}種類のこころ(複数のグレードを含む)をサポートし、約{{ combination }}通りの組み合わせの中から最適と考えられるこころの組み合わせを数秒で計算します。サポートするこころは随時追加していきます。</p>
            <p>なお、計算費用の関係上、すべての組み合わせを網羅的に計算することはできないため、一部最適ではない組み合わせが提案されることもあります。</p>
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
