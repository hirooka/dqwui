<template>
  <div>
    <h2>
      こころ一覧
    </h2>
    <div class="my-2">
      <p class="text-body-2">
        サポートしているこころとそのグレードの一覧です。
      </p>
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
        :headers="tableHeaders"
        :items="extendedKokoros"
        :items-per-page="20"
        class="elevation-1"
        mobile-breakpoint="0"
        dense
        fixed-header
        :search="search"
        show-expand
        single-expand
        item-key="uuid"
      >
        <template #[`item.name`]="{item}">
          <v-chip
            :color="getCircleColor(item.type.toLowerCase())"
            :text-color="getTextColor(item.type.toLowerCase())"
            small
          >
            {{ item.name }}
          </v-chip>
        </template>
        <template #expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <div v-if="item.damages.length > 0">
              こうげき
            </div>
            <div v-else />
            <ui>
              <li v-for="(d, index) in item.damages" :key="index">
                <span v-if="d.attribute ==='BAGI'">バギ属性</span>
                <span v-else-if="d.attribute ==='DEIN'">デイン属性</span>
                <span v-else-if="d.attribute ==='DORUMA'">ドルマ属性</span>
                <span v-else-if="d.attribute ==='GIRA'">ギラ属性</span>
                <span v-else-if="d.attribute ==='HYADO'">ヒャド属性</span>
                <span v-else-if="d.attribute ==='IO'">イオ属性</span>
                <span v-else-if="d.attribute ==='JIBARIA'">ジバリア属性</span>
                <span v-else-if="d.attribute ==='MERA'">メラ属性</span>
                <span v-else-if="d.attack ==='ALL' && d.attribute ==='ALL' && d.race ==='NONE'">全属性</span>
                <span v-else />
                <span v-if="d.race ==='ANIMAL'">けもの系</span>
                <span v-else-if="d.race ==='BIRD'">鳥系</span>
                <span v-else-if="d.race ==='DEVIL'">悪魔系</span>
                <span v-else-if="d.race ==='DRAGON'">ドラゴン系</span>
                <span v-else-if="d.race ==='ELEMENT'">エレメント系</span>
                <span v-else-if="d.race ==='INSECT'">虫系</span>
                <span v-else-if="d.race ==='MACHINE'">マシン系</span>
                <span v-else-if="d.race ==='MATERIAL'">マテリアル系</span>
                <span v-else-if="d.race ==='PHANTOM'">怪人系</span>
                <span v-else-if="d.race ==='PLANT'">植物系</span>
                <span v-else-if="d.race ==='SECRET'">？？？？系</span>
                <span v-else-if="d.race ==='SLIME'">スライム系</span>
                <span v-else-if="d.race ==='WATER'">水系</span>
                <span v-else-if="d.race ==='ZOMBIE'">ゾンビ系</span>
                <span v-else />
                <span v-if="d.attack ==='SLASH'">斬撃</span>
                <span v-else-if="d.attack ==='HIT'">体技</span>
                <span v-else-if="d.attack ==='SPELL'">じゅもん</span>
                <span v-else-if="d.attack ==='BREATH'">ブレス</span>
                <span v-else />
                <span>ダメージ {{ d.magnification }}%</span>
              </li>
            </ui>
            <div v-if="item.chr > 0">
              会心率 {{ item.chr }}%
            </div>
            <div v-else />
            <div v-if="item.healings.length > 0">
              かいふく
            </div>
            <div v-else />
            <ui>
              <li v-for="(h, index) in item.healings" :key="index">
                <span v-if="h.type ==='SKILL'">スキル</span>
                <span v-else-if="h.type ==='SPECIALTY'">とくぎ</span>
                <span v-else-if="h.type ==='SPELL'">じゅもん</span>
                <span v-else />
                <span>HP回復効果 {{ h.magnification }}%</span>
              </li>
            </ui>
            <div v-if="item.resistances.length > 0">
              耐性
            </div>
            <div v-else />
            <ui>
              <li v-for="(r, index) in item.resistances" :key="index">
                <span v-if="r.attribute ==='BAGI'">バギ属性</span>
                <span v-else-if="r.attribute ==='DEIN'">デイン属性</span>
                <span v-else-if="r.attribute ==='DORUMA'">ドルマ属性</span>
                <span v-else-if="r.attribute ==='GIRA'">ギラ属性</span>
                <span v-else-if="r.attribute ==='HYADO'">ヒャド属性</span>
                <span v-else-if="r.attribute ==='IO'">イオ属性</span>
                <span v-else-if="r.attribute ==='JIBARIA'">ジバリア属性</span>
                <span v-else-if="r.attribute ==='MERA'">メラ属性</span>
                <span v-else-if="r.attribute ==='ALL' && r.race ==='NONE'">全属性</span>
                <span v-else />
                <span v-if="r.race ==='ANIMAL'">けもの系</span>
                <span v-else-if="r.race ==='BIRD'">鳥系</span>
                <span v-else-if="r.race ==='DEVIL'">悪魔系</span>
                <span v-else-if="r.race ==='DRAGON'">ドラゴン系</span>
                <span v-else-if="r.race ==='ELEMENT'">エレメント系</span>
                <span v-else-if="r.race ==='INSECT'">虫系</span>
                <span v-else-if="r.race ==='MACHINE'">マシン系</span>
                <span v-else-if="r.race ==='MATERIAL'">マテリアル系</span>
                <span v-else-if="r.race ==='PHANTOM'">怪人系</span>
                <span v-else-if="r.race ==='PLANT'">植物系</span>
                <span v-else-if="r.race ==='SECRET'">？？？？系</span>
                <span v-else-if="r.race ==='SLIME'">スライム系</span>
                <span v-else-if="r.race ==='WATER'">水系</span>
                <span v-else-if="r.race ==='ZOMBIE'">ゾンビ系</span>
                <span v-else />
                <span v-if="r.attack ==='SLASH'">斬撃</span>
                <span v-else-if="r.attack ==='HIT'">体技</span>
                <span v-else-if="r.attack ==='SPELL'">じゅもん</span>
                <span v-else-if="r.attack ==='BREATH'">ブレス</span>
                <span v-else />
                <span>耐性 {{ r.magnification }}%</span>
              </li>
            </ui>
          </td>
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
      tableHeaders: [
        { text: 'ばんごう', value: 'number' },
        { text: 'なまえ', value: 'name' },
        { text: 'グレード', value: 'grade' },
        { text: 'タイプ', value: 'type' },
        { text: 'コスト', value: 'cost' },
        { text: 'さいだいHP', value: 'hp' },
        { text: 'さいだいMP', value: 'mp' },
        { text: 'ちから', value: 'op' },
        { text: 'みのまもり', value: 'dp' },
        { text: 'こうげき魔力', value: 'os' },
        { text: 'かいふく魔力', value: 'ds' },
        { text: 'きようさ', value: 'dx' },
        { text: 'すばやさ', value: 'sp' },
        { text: 'ちから+こう魔', value: 'opos' },
        { text: 'ちから+きようさ', value: 'opdx' },
        { text: '倍率情報', value: 'data-table-expand' }
      ],
      kokoros: []
    }
  },
  computed: {
    extendedKokoros (): any {
      return this.kokoros.map((kokoro: any) => ({
        ...kokoro,
        opos: kokoro.op + kokoro.os,
        opdx: kokoro.op + kokoro.dx
      }))
    }
  },
  methods: {
    getTextColor (color: string) {
      if (color === 'yellow') {
        return 'black'
      } else {
        return 'white'
      }
    },
    getCircleColor (color: string) {
      if (color === 'rainbow') {
        return 'black'
      } else {
        return color
      }
    }
  }
})
</script>
