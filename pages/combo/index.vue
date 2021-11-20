<template>
  <div>
    <h2>
      こころ組み合わせ
    </h2>
    <div class="mb-4">
      ドラクエウォークの火力ツールです。
    </div>
    <v-container fluid>
      <v-row align="center">
        <v-col
          class="d-flex"
          cols="6"
          sm="6"
          lg="3"
        >
          <v-select
            v-model="selectedJob"
            label="職業"
            outlined
            :items="jobs"
            item-text="text"
            item-value="value"
            dense
            class="mt-n4 mb-n4 pt-0"
          />
        </v-col>
        <v-col
          class="d-flex"
          cols="6"
          sm="6"
          lg="3"
        >
          <v-select
            v-model="selectedAttack"
            label="こうげきタイプ"
            outlined
            :items="attacks"
            item-text="text"
            item-value="value"
            dense
            class="mt-n4 mb-n4 pt-0"
          />
        </v-col>
        <v-col
          class="d-flex"
          cols="6"
          sm="6"
          lg="3"
        >
          <v-select
            v-model="selectedAttribute"
            label="属性"
            outlined
            :items="attributes"
            item-text="text"
            item-value="value"
            dense
            class="mt-n4 mb-n4 pt-0"
          />
        </v-col>
        <v-col
          class="d-flex"
          cols="6"
          sm="6"
          lg="3"
        >
          <v-select
            v-model="selectedRace"
            label="系統"
            outlined
            :items="races"
            item-text="text"
            item-value="value"
            dense
            class="mt-n4 mb-n4 pt-0"
          />
        </v-col>
        <v-col
          class="d-flex"
          cols="6"
          sm="6"
          lg="6"
        >
          <v-text-field
            v-model="level"
            label="レベル"
            outlined
            type="number"
            min="30"
            max="80"
            dense
            class="mt-n4 mb-n4 pt-0"
          >
            80
          </v-text-field>
        </v-col>
        <v-col
          class="d-flex"
          cols="6"
          sm="6"
          lg="6"
        >
          <v-radio-group
            v-model="bride"
            mandatory
            row
            dense
            class="mt-n6 mb-n4 pt-0"
          >
            <template #label>
              <div>花嫁</div>
            </template>
            <v-radio
              label="フローラ"
              value="フローラ"
            />
            <v-radio
              label="ビアンカ"
              value="ビアンカ"
            />
            <v-radio
              label="デボラ"
              value="デボラ"
            />
          </v-radio-group>
        </v-col>
        <v-col
          class="d-flex"
          cols="6"
          sm="6"
          lg="6"
        >
          <v-select
            v-model="selectedExclusions"
            label="除外するこころ"
            outlined
            :items="exclusions"
            item-text="text"
            item-value="value"
            multiple
            chips
            dense
            class="mt-n4 mb-n4 pt-0"
          />
        </v-col>
        <v-col
          class="d-flex"
          cols="6"
          sm="6"
          lg="6"
        >
          <v-btn
            class="mt-n8 mb-n4 pt-0"
            block
            color="primary"
            dense
            @click="search"
          >
            しらべる
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-data-table
      :headers="headers"
      :items="combinations"
      :items-per-page="10"
      class="elevation-1"
      mobile-breakpoint="0"
      dense
      fixed-header
    >
      <template #[`item.s0`]="{item}">
        <v-chip
          :color="item.slots[0].color.toLowerCase()"
          :text-color="getTextColor(item.slots[0].color.toLowerCase())"
          small
          @click="setExclusion(item.slots[0])"
        >
          {{ item.slots[0].name }}{{ item.slots[0].grade }}
        </v-chip>
      </template>
      <template #[`item.s1`]="{item}">
        <v-chip
          :color="item.slots[1].color.toLowerCase()"
          :text-color="getTextColor(item.slots[1].color.toLowerCase())"
          small
          @click="setExclusion(item.slots[1])"
        >
          {{ item.slots[1].name }}{{ item.slots[1].grade }}
        </v-chip>
      </template>
      <template #[`item.s2`]="{item}">
        <v-chip
          :color="item.slots[2].color.toLowerCase()"
          :text-color="getTextColor(item.slots[2].color.toLowerCase())"
          small
          @click="setExclusion(item.slots[2])"
        >
          {{ item.slots[2].name }}{{ item.slots[2].grade }}
        </v-chip>
      </template>
      <template #[`item.s3`]="{item}">
        <v-chip
          :color="item.slots[3].color.toLowerCase()"
          :text-color="getTextColor(item.slots[3].color.toLowerCase())"
          small
          @click="setExclusion(item.slots[3])"
        >
          {{ item.slots[3].name }}{{ item.slots[3].grade }}
        </v-chip>
      </template>
    </v-data-table>

    <v-dialog
      v-model="loading"
      fullscreen
    >
      <v-container
        fluid
        fill-height
      >
        <v-layout
          justify-center
          align-center
        >
          <v-progress-circular
            indeterminate
            color="primary"
          />
        </v-layout>
      </v-container>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import logger from '~/plugins/logger'
export default Vue.extend({
  async asyncData ({ app }) {
    const path = '/v1/kokoro/combos'
    const cbs = await app.$axios.get(path)
    const cbsData = cbs.data
    const ks = await app.$axios.get('/v1/kokoros/k')
    const ksData = ks.data
    return {
      combinations: cbsData,
      exclusions: ksData
    }
  },
  data () {
    return {
      level: 80,
      bride: 'フローラ',
      loading: false,
      jobs: [
        { text: 'バトルマスター', value: 'BATTLE_MASTER' },
        { text: 'レンジャー', value: 'RANGER' },
        { text: '賢者', value: 'SAGE' },
        { text: 'パラディン', value: 'PALADIN' },
        { text: '魔法戦士', value: 'ARMAMENTALIST' },
        { text: 'スーパースター', value: 'SUPERSTAR' },
        { text: '海賊', value: 'PIRATE' }
      ],
      attacks: [
        { text: '斬撃', value: 'SLASH' },
        { text: '体技', value: 'HIT' },
        { text: 'じゅもん', value: 'SPELL' },
        { text: 'こう魔斬撃', value: 'PHYSICS_SPELL_SLASH' },
        { text: 'こう魔体技', value: 'PHYSICS_SPELL_HIT' },
        { text: 'ブレス', value: 'BREATH' }
      ],
      attributes: [
        { text: 'バギ', value: 'BAGI' },
        { text: 'デイン', value: 'DEIN' },
        { text: 'ドルマ', value: 'DORUMA' },
        { text: 'ギラ', value: 'GIRA' },
        { text: 'ヒャド', value: 'HYADO' },
        { text: 'イオ', value: 'IO' },
        { text: 'ジバリア', value: 'BJIBARIA' },
        { text: 'メラ', value: 'MERA' }
      ],
      races: [
        { text: '指定なし', value: 'NONE' },
        { text: 'けもの系', value: 'ANIMAL' },
        { text: '鳥系', value: 'BIRD' },
        { text: '悪魔系', value: 'DEVIL' },
        { text: 'ドラゴン系', value: 'DRAGON' },
        { text: 'エレメント系', value: 'ELEMENT' },
        { text: '虫系', value: 'INSECT' },
        { text: 'マシン系', value: 'MACHINE' },
        { text: '物質系', value: 'MATERIAL' },
        { text: '怪人系', value: 'PHANTOM' },
        { text: '植物系', value: 'PLANT' },
        { text: 'スライム系', value: 'SLIME' },
        { text: '水系', value: 'WATER' },
        { text: 'ゾンビ系', value: 'ZOMBIE' }
      ],
      exclusions: [],

      selectedJob: 'BATTLE_MASTER',
      selectedAttack: 'SLASH',
      selectedAttribute: 'DEIN',
      selectedRace: 'NONE',
      selectedExclusions: [],

      // TODO: change slot name by job
      headers: [
        { text: 'いりょく', value: 'value' },
        { text: '左下スロット', value: 's0' },
        { text: '右下スロット', value: 's1' },
        { text: '左上スロット', value: 's2' },
        { text: '右上スロット(虹)', value: 's3' },
        { text: 'さいだいHP', value: 'hp' },
        { text: 'さいだいMP', value: 'mp' },
        { text: 'ちから', value: 'op' },
        { text: 'みのまもり', value: 'dp' },
        { text: 'こうげき魔力', value: 'os' },
        { text: 'かいふく魔力', value: 'ds' },
        { text: 'すばやさ', value: 'sp' },
        { text: 'きようさ', value: 'dx' }
      ],
      combinations: []
    }
  },
  methods: {
    async search () {
      logger.info('.')
      this.loading = true
      const path = '/v1/kokoro/combos'
      const response = await this.$axios.get(path, {
        params: {
          j: this.selectedJob,
          k: this.selectedAttack,
          a: this.selectedAttribute,
          r: this.selectedRace,
          l: this.level,
          b: this.bride,
          e: this.selectedExclusions.join(',')
        }
      })
      const data = response.data
      this.combinations = data
      this.loading = false
    },
    getTextColor (color: string) {
      if (color === 'yellow') {
        return 'black'
      } else {
        return 'white'
      }
    },
    setExclusion (slot: any) {
      const ex: string = `${slot.id}${slot.grade.toLowerCase()}`
      this.selectedExclusions.push(ex)
    }
  }
})
</script>
