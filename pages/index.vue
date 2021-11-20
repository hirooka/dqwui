<template>
  <div>
    <v-row justify="center" align="center" class="my-3">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">
            ドラクエウォークの火力ツール
          </v-card-title>
          <v-card-text>
            <p>ドラクエウォークの上級職において最適なこころの組み合わせを提案します。</p>
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
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
