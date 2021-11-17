<template>
  <div>
    <h1>こころ組み合わせ</h1>

    <v-col
      class="d-flex"
      cols="auto"
      sm="6"
    >
      <v-select
        v-model="selectedJob"
        :items="jobs"
        item-text="text"
        item-value="value"
        @change="selectJob"
      />
      <v-select
        v-model="selectedAttack"
        :items="attacks"
        item-text="text"
        item-value="value"
        @change="selectAttack"
      />
      <v-select
        v-model="selectedAttribute"
        :items="attributes"
        item-text="text"
        item-value="value"
        @change="selectAttribute"
      />
      <v-select
        v-model="selectedRace"
        :items="races"
        item-text="text"
        item-value="value"
        @change="selectRace"
      />
    </v-col>

    <v-col
      class="d-flex"
      cols="12"
      sm="6"
    >
      <v-select
        v-model="selectedExclusions"
        :items="exclusions"
        item-text="text"
        item-value="value"
        multiple
        @change="selectExclusions"
      />
    </v-col>

    <v-col
      class="d-flex"
      cols="auto"
      sm="6"
    >
      <div v-if="loading">
        <v-progress-circular indeterminate />
      </div>
    </v-col>

    <v-data-table
      :headers="headers"
      :items="combinations"
      :items-per-page="10"
      class="elevation-1"
    >
      <template #[`item.s0`]="{item}">
        {{ item.slots[0].name }} ({{ item.slots[0].grade }})
      </template>
      <template #[`item.s1`]="{item}">
        {{ item.slots[1].name }} ({{ item.slots[1].grade }})
      </template>
      <template #[`item.s2`]="{item}">
        {{ item.slots[2].name }} ({{ item.slots[2].grade }})
      </template>
      <template #[`item.s3`]="{item}">
        {{ item.slots[3].name }} ({{ item.slots[3].grade }})
      </template>
    </v-data-table>
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
      loading: false,
      jobs: [
        { text: 'バトルマスター', value: 'BATTLE_MASTER' },
        { text: 'レンジャー', value: 'RANGER' },
        { text: '賢者', value: 'SAGE' },
        { text: 'パラディン', value: 'PALADIN' },
        { text: '魔法戦士', value: 'ARMAMENTALIT' },
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

      selectedJob: { text: 'バトルマスター', value: 'BATTLE_MASTER' },
      selectedAttack: { text: '斬撃', value: 'SLASH' },
      selectedAttribute: { text: 'デイン', value: 'DEIN' },
      selectedRace: { text: '指定なし', value: 'NONE' },
      selectedExclusions: [],

      // TODO: change slot name by job
      headers: [
        { text: 'いりょく', value: 'value' },
        { text: 'S1', value: 's0' },
        { text: 'S2', value: 's1' },
        { text: 'S3', value: 's2' },
        { text: 'S4', value: 's3' },
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
    async selectJob () {
      this.loading = true
      const path = '/v1/kokoro/combos'
      const response = await this.$axios.get(path, {
        params: {
          j: this.selectedJob,
          k: this.selectedAttack.value,
          a: this.selectedAttribute.value,
          r: this.selectedRace.value,
          e: this.selectedExclusions.join(',')
        }
      })
      const data = response.data
      this.combinations = data
      this.loading = false
    },
    async selectAttack () {
      this.loading = true
      const path = '/v1/kokoro/combos'
      const response = await this.$axios.get(path, {
        params: {
          j: this.selectedJob.value,
          k: this.selectedAttack,
          a: this.selectedAttribute.value,
          r: this.selectedRace.value,
          e: this.selectedExclusions.join(',')
        }
      })
      const data = response.data
      this.combinations = data
      this.loading = false
    },
    async selectAttribute () {
      this.loading = true
      const path = '/v1/kokoro/combos'
      const response = await this.$axios.get(path, {
        params: {
          j: this.selectedJob.value,
          k: this.selectedAttack.value,
          a: this.selectedAttribute,
          r: this.selectedRace.value,
          e: this.selectedExclusions.join(',')
        }
      })
      const data = response.data
      this.combinations = data
      this.loading = false
    },
    async selectRace () {
      this.loading = true
      const path = '/v1/kokoro/combos'
      const response = await this.$axios.get(path, {
        params: {
          j: this.selectedJob.value,
          k: this.selectedAttack.value,
          a: this.selectedAttribute.value,
          r: this.selectedRace,
          e: this.selectedExclusions.join(',')
        }
      })
      const data = response.data
      this.combinations = data
      this.loading = false
    },
    async selectExclusions () {
      this.loading = true
      logger.info(this.selectedExclusions)
      logger.info(this.selectedExclusions.join(','))
      const path = '/v1/kokoro/combos'
      const response = await this.$axios.get(path, {
        params: {
          j: this.selectedJob.value,
          k: this.selectedAttack.value,
          a: this.selectedAttribute.value,
          r: this.selectedRace.value,
          e: this.selectedExclusions.join(',')
        }
      })
      const data = response.data
      this.combinations = data
      this.loading = false
    }
  }
})
</script>
