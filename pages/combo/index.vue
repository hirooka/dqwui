<template>
  <div>
    <h2>
      こころ組み合わせ
    </h2>
    <div class="my-2">
      <p class="text-body-2">
        最適だと考えられるこころの組み合わせを提案します。
      </p>
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
            @change="selectJob"
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
            @change="selectAttack"
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
            :disabled="healing"
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
            :disabled="healing"
          />
        </v-col>
        <v-col
          class="d-flex"
          cols="6"
          sm="6"
          lg="6"
        >
          <v-select
            v-model="selectedCost"
            label="レベル/コスト"
            outlined
            :items="costs"
            item-text="level"
            item-value="cost"
            dense
            class="mt-n4 mb-n4 pt-0"
            @change="selectCost"
          />
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
          cols="12"
          sm="6"
          lg="6"
        >
          <v-select
            v-model="selectedExclusions"
            label="除外するこころ(下の表のこころを押して追加できます)"
            outlined
            :items="exclusions"
            item-text="text"
            item-value="value"
            multiple
            chips
            dense
            clearable
            class="mt-n4 mb-n4 pt-0"
            @blur="changeSelectedExclusions"
          >
            <template #selection="{ item }">
              <v-chip
                small
                close
                @click:close="deleteExclusion(item)"
              >
                <span>{{ item.text }}</span>
              </v-chip>
            </template>
          </v-select>
        </v-col>
        <v-col
          class="d-flex"
          cols="12"
          sm="6"
          lg="6"
        >
          <v-autocomplete
            v-model="selectedInclusions"
            label="必ず含むこころ(検索入力できます)"
            outlined
            :items="inclusions"
            item-text="text"
            item-value="value"
            multiple
            chips
            dense
            clearable
            class="mt-n4 mb-n4 pt-0"
            @input="search = ''"
            @change="search = ''"
            @blur="changeSelectedInclusions"
          >
            <template #selection="{ item }">
              <v-chip
                small
                close
                @click:close="deleteInclusion(item)"
              >
                <span>{{ item.text }}</span>
              </v-chip>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col
          class="d-flex"
          cols="12"
          sm="12"
          lg="12"
        >
          <v-btn
            class="mt-n4 mb-0 pt-0"
            block
            color="primary"
            @click="find"
          >
            しらべる
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <h4 class="mb-4">
        組み合わせ一覧
      </h4>
      <v-data-table
        :headers="headers"
        :items="combinations"
        :items-per-page="20"
        class="elevation-1"
        mobile-breakpoint="0"
        dense
        fixed-header
      >
        <template #[`item.s0`]="{item}">
          <v-chip
            :color="getCircleColor(item.slots[0].color.toLowerCase())"
            :text-color="getTextColor(item.slots[0].color.toLowerCase())"
            small
            @click="addExclusion(item.slots[0])"
          >
            {{ item.slots[0].name }}{{ item.slots[0].grade }} ({{ item.slots[0].cost }})
          </v-chip>
        </template>
        <template #[`item.s1`]="{item}">
          <v-chip
            :color="getCircleColor(item.slots[1].color.toLowerCase())"
            :text-color="getTextColor(item.slots[1].color.toLowerCase())"
            small
            @click="addExclusion(item.slots[1])"
          >
            {{ item.slots[1].name }}{{ item.slots[1].grade }} ({{ item.slots[1].cost }})
          </v-chip>
        </template>
        <template #[`item.s2`]="{item}">
          <v-chip
            :color="getCircleColor(item.slots[2].color.toLowerCase())"
            :text-color="getTextColor(item.slots[2].color.toLowerCase())"
            small
            @click="addExclusion(item.slots[2])"
          >
            {{ item.slots[2].name }}{{ item.slots[2].grade }} ({{ item.slots[2].cost }})
          </v-chip>
        </template>
        <template #[`item.s3`]="{item}">
          <v-chip
            :color="getCircleColor(item.slots[3].color.toLowerCase())"
            :text-color="getTextColor(item.slots[3].color.toLowerCase())"
            small
            @click="addExclusion(item.slots[3])"
          >
            {{ item.slots[3].name }}{{ item.slots[3].grade }} ({{ item.slots[3].cost }})
          </v-chip>
        </template>
      </v-data-table>
    </v-container>
    <v-container fluid>
      <v-dialog
        v-model="dialog"
        width="640"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            color="secondary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            計算方法
          </v-btn>
        </template>
        <v-card>
          <v-card-title />
          <v-card-text>
            <v-data-table
              :headers="dialogheaders"
              :items="dialogitems"
              :items-per-page="8"
              hide-default-footer
              disable-sort
              mobile-breakpoint="0"
              dense
              class="elevation-1"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              閉じる
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
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
import 'cookie-universal-nuxt'
import logger from '~/plugins/logger'
const json = require('../../assets/level-cost.json')
interface Slot {
  type: string
  number: number
  grade: string
  color: string
  cost: number
  isUp: boolean
}
interface Exclusion {
  text: string
  value: string
}
interface Inclusion {
  text: string
  value: string
}
export default Vue.extend({
  async asyncData ({ app }) {
    // const path = '/v1/kokoro/combos'
    // const cbs = await app.$axios.get(path)
    // const cbsData = cbs.data
    const ks = await app.$axios.get('/v1/kokoros/min')
    const ksData = ks.data
    let e
    if (app.$cookies.get('exclusions')) {
      e = app.$cookies.get('exclusions').split(',')
    } else {
      e = []
    }
    let i
    if (app.$cookies.get('inclusions')) {
      i = app.$cookies.get('inclusions').split(',')
    } else {
      i = []
    }

    let c = 532
    if (app.$cookies.get('cost')) {
      c = app.$cookies.get('cost')
    }
    let j = 'GOD_HAND'
    if (app.$cookies.get('job')) {
      j = app.$cookies.get('job')
    }
    let atk = 'SLASH'
    if (app.$cookies.get('attack')) {
      atk = app.$cookies.get('attack')
    }
    let atr = 'DEIN'
    if (app.$cookies.get('attribute')) {
      atr = app.$cookies.get('attribute')
    }
    let r = 'NONE'
    if (app.$cookies.get('race')) {
      r = app.$cookies.get('race')
    }
    // let l = 0
    // if (app.$cookies.get('level')) {
    //   l = app.$cookies.get('level')
    // }
    let b = 'フローラ'
    if (app.$cookies.get('bride')) {
      b = app.$cookies.get('bride')
    }
    return {
      // combinations: cbsData,
      exclusions: ksData,
      inclusions: ksData,
      selectedExclusions: e,
      selectedInclusions: i,
      selectedJob: j,
      selectedAttack: atk,
      selectedAttribute: atr,
      selectedRace: r,
      // level: l,
      bride: b,
      selectedCost: c
    }
  },
  data () {
    return {
      healing: false,
      // level: 0,
      costs: json.SPECIAL,
      bride: 'フローラ',
      loading: false,
      jobs: [
        { text: 'ゴッドハンド', value: 'GOD_HAND' },
        { text: '大魔道士', value: 'DAIMADOUSHI' },
        { text: 'バトルマスター', value: 'BATTLE_MASTER' },
        { text: 'レンジャー', value: 'RANGER' },
        { text: '賢者', value: 'SAGE' },
        { text: 'パラディン', value: 'PALADIN' },
        { text: '魔法戦士', value: 'ARMAMENTALIST' },
        { text: 'スーパースター', value: 'SUPERSTAR' },
        { text: '海賊', value: 'PIRATE' },
        { text: 'まものマスター', value: 'MONSTER_MASTER' }
      ],
      attacks: [
        { text: '斬撃', value: 'SLASH' },
        { text: '体技', value: 'HIT' },
        { text: 'じゅもん', value: 'SPELL' },
        { text: 'こう魔斬撃', value: 'PHYSICS_SPELL_SLASH' },
        { text: 'こう魔体技', value: 'PHYSICS_SPELL_HIT' },
        { text: 'ブレス', value: 'BREATH' },
        { text: 'じゅもん回復', value: 'HEALING_SPELL' },
        { text: 'とくぎ回復', value: 'HEALING_SPECIALTY' }
      ],
      attributes: [
        { text: '無属性', value: 'NONE' },
        { text: 'バギ', value: 'BAGI' },
        { text: 'デイン', value: 'DEIN' },
        { text: 'ドルマ', value: 'DORUMA' },
        { text: 'ギラ', value: 'GIRA' },
        { text: 'ヒャド', value: 'HYADO' },
        { text: 'イオ', value: 'IO' },
        { text: 'ジバリア', value: 'JIBARIA' },
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
        { text: '？？？？系', value: 'SECRET' },
        { text: 'スライム系', value: 'SLIME' },
        { text: '水系', value: 'WATER' },
        { text: 'ゾンビ系', value: 'ZOMBIE' }
      ],
      exclusions: [],
      inclusions: [],

      selectedCost: 532,
      selectedJob: 'BATTLE_MASTER',
      selectedAttack: 'SLASH',
      selectedAttribute: 'DEIN',
      selectedRace: 'NONE',
      selectedExclusions: [] as string[],
      selectedInclusions: [] as string[],

      // TODO: change slot name by job
      headers: [
        { text: 'つよさ', value: 'value' },
        { text: '左下スロット', value: 's0' },
        { text: '右下スロット', value: 's1' },
        { text: '左上スロット', value: 's2' },
        { text: '右上スロット(虹)', value: 's3' },
        { text: 'コスト', value: 'cost' },
        { text: 'さいだいHP', value: 'hp' },
        { text: 'さいだいMP', value: 'mp' },
        { text: 'ちから', value: 'op' },
        { text: 'みのまもり', value: 'dp' },
        { text: 'こうげき魔力', value: 'os' },
        { text: 'かいふく魔力', value: 'ds' },
        { text: 'すばやさ', value: 'sp' },
        { text: 'きようさ', value: 'dx' },
        { text: 'ちから+こうげき魔力', value: 'opos' },
        { text: 'ちから+きようさ', value: 'opdx' },
        { text: 'こうげき倍率', value: 'attackMag' },
        { text: '属性倍率', value: 'attributeMag' },
        { text: '系統倍率', value: 'raceMag' },
        { text: 'スキル回復倍率', value: 'healingSkillMag' },
        { text: 'じゅもん回復倍率', value: 'healingSpellMag' },
        { text: 'とくぎ回復倍率', value: 'healingSpecialtyMag' }
      ],
      combinations: [],
      dialog: false,
      dialogheaders: [
        { text: 'タイプ', value: 'type' },
        { text: '説明', value: 'description' }
      ],
      dialogitems: [
        {
          type: '斬撃',
          description: 'ちからの合計 x 斬撃倍率の合計 x 属性斬撃倍率と属性倍率の合計 x 系統倍率の合計'
        },
        {
          type: '体技',
          description: 'ちからの合計 x 体技倍率の合計 x 属性体技倍率と属性倍率の合計 x 系統倍率の合計'
        },
        {
          type: 'じゅもん',
          description: 'こうげき魔力の合計 x じゅもん倍率の合計 x 属性じゅもん倍率と属性倍率の合計 x 系統倍率の合計'
        },
        {
          type: 'こうげき力とこうげき魔力を込めた斬撃',
          description: 'ちからとこうげき魔力の合計 x 斬撃倍率の合計 x 属性斬撃倍率と属性倍率の合計 x 系統倍率の合計'
        },
        {
          type: 'こうげき力とこうげき魔力を込めた体技',
          description: 'ちからとこうげき魔力の合計 x 体技倍率の合計 x 属性体技倍率と属性倍率の合計 x 系統倍率の合計'
        },
        {
          type: 'ブレス',
          description: 'ちからときようさの合計 x ブレス倍率の合計 x 属性ブレス倍率と属性倍率の合計 x 系統倍率の合計'
        },
        {
          type: 'じゅもん回復',
          description: 'かいふく魔力の合計 x スキル回復倍率の合計 x じゅもん回復倍率の合計'
        },
        {
          type: 'とくぎ回復',
          description: 'かいふく魔力の合計 x スキル回復倍率の合計 x とくぎ回復倍率の合計'
        }
      ]
    }
  },
  methods: {
    async find () {
      logger.info('.')
      this.loading = true
      const path = '/v1/kokoro/combos'
      const response = await this.$axios.get(path, {
        params: {
          j: this.selectedJob,
          k: this.selectedAttack,
          a: this.selectedAttribute,
          r: this.selectedRace,
          l: 0, // this.level,
          b: this.bride,
          e: this.selectedExclusions.join(','),
          i: this.selectedInclusions.join(','),
          c: this.selectedCost
        }
      })
      const data = response.data
      this.combinations = data
      this.loading = false
      this.$cookies.set('job', this.selectedJob)
      this.$cookies.set('attack', this.selectedAttack)
      this.$cookies.set('attribute', this.selectedAttribute)
      this.$cookies.set('race', this.selectedRace)
      // this.$cookies.set('level', this.level)
      this.$cookies.set('bride', this.bride)
      this.$cookies.set('cost', this.selectedCost)
    },
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
    },
    changeSelectedExclusions () {
      this.$cookies.set('exclusions', this.selectedExclusions.join(','))
    },
    addExclusion (slot: Slot) {
      const ex = `${slot.number}${slot.grade.toLowerCase()}`
      if (!this.selectedExclusions.includes(ex)) {
        this.selectedExclusions.push(`${slot.number}${slot.grade.toLowerCase()}`)
        this.$cookies.set('exclusions', this.selectedExclusions.join(','))
      }
    },
    deleteExclusion (item: Exclusion) {
      const ex = `${item.value}`
      if (this.selectedExclusions.includes(ex)) {
        this.selectedExclusions = this.selectedExclusions.filter(v => v !== ex)
        this.$cookies.set('exclusions', this.selectedExclusions.join(','))
      }
    },
    changeSelectedInclusions () {
      this.$cookies.set('inclusions', this.selectedInclusions.join(','))
    },
    deleteInclusion (item: Inclusion) {
      const ex = `${item.value}`
      if (this.selectedInclusions.includes(ex)) {
        this.selectedInclusions = this.selectedInclusions.filter(v => v !== ex)
        this.$cookies.set('inclusions', this.selectedInclusions.join(','))
      }
    },
    selectJob () {
      if (this.selectedJob === 'GOD_HAND' || this.selectedJob === 'DAIMADOUSHI') {
        this.costs = json.SPECIAL
        this.selectedCost = json.SPECIAL[1].cost
      } else {
        this.costs = json.ADVANCED
        this.selectedCost = json.ADVANCED[1].cost
      }
    },
    selectAttack () {
      if (this.selectedAttack === 'HEALING_SPELL' || this.selectedAttack === 'HEALING_SPECIALTY') {
        this.selectedAttribute = 'NONE'
        this.selectedRace = 'NONE'
        this.healing = true
      } else {
        this.healing = false
      }
    },
    selectCost () {
    }
  }
})
</script>
