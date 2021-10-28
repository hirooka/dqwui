<template>
  <div>
    <h1>組み合わせ</h1>
    <v-col
      class="d-flex"
      cols="12"
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
        v-model="selectedWeapon"
        :items="weapons"
        item-text="text"
        item-value="value"
        @change="selectWeapon"
      />
      <v-select
        v-model="selectedSkill"
        :items="skills"
        item-text="text"
        item-value="value"
        @change="selectSkill"
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

    <v-data-table
      :headers="headers"
      :items="combinations"
      :items-per-page="10"
      class="elevation-1"
    >
      <template #[`item.s0`]="{item}">
        {{ item.slots[0].name }} ({{ item.slots[0].rank }})
      </template>
      <template #[`item.s1`]="{item}">
        {{ item.slots[1].name }} ({{ item.slots[1].rank }})
      </template>
      <template #[`item.s2`]="{item}">
        {{ item.slots[2].name }} ({{ item.slots[2].rank }})
      </template>
      <template #[`item.s3`]="{item}">
        {{ item.slots[3].name }} ({{ item.slots[3].rank }})
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import logger from '~/plugins/logger'
export default Vue.extend({
  async asyncData ({ app }) {
    const path = '/v1/damages'
    const cbs = await app.$axios.get(path)
    const cbsData = cbs.data
    const ks = await app.$axios.get('/v1/kokoros/k')
    const ksData = ks.data
    const wps = await app.$axios.get('/v1/weapons/w')
    const wpsData = wps.data
    const jbs = await app.$axios.get('/v1/kokoros/j')
    const jbsData = jbs.data
    logger.info(jbsData)
    return {
      combinations: cbsData,
      exclusions: ksData,
      weapons: wpsData,
      jobs: jbsData
    }
  },
  data () {
    return {
      jobs: [],
      weapons: [],
      skills: [
        { text : "天雷なぎはらい", value : "天雷なぎはらい"},
        { text : "創世の光", value : "創世の光" }
      ],
      exclusions: [],

      selectedJob: 'BATTLE_MASTER',
      selectedWeapon: { text : 'ルビスの剣', value : 'ルビスの剣' },
      selectedSkill: { text : "創世の光", value : "創世の光" },
      selectedExclusions: [],

      // TODO: change slot name by job
      headers: [
        { text: 'すいていダメージ', value: 'damage' },
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
      logger.info(this.selectedJob)
      const path = '/v1/damages'
      const response = await this.$axios.get(path, {
        params: {
          j: this.selectedJob,
          s: this.selectedSkill.value,
          e: this.selectedExclusions.join(',')
        }
      })
      const data = response.data
      this.combinations = data
    },
    async selectWeapon () {
      const path = '/v1/weapons/s'
      const response = await this.$axios.get(path, {
        params: {
          w: this.selectedWeapon
        }
      })
      const data = response.data
      this.skills = data
      this.selectedSkill = this.skills[0]

      const pathDamages = '/v1/damages'
      const responseDamages = await this.$axios.get(pathDamages, {
        params: {
          j: this.selectedJob,
          s: this.selectedSkill.value,
          e: this.selectedExclusions.join(',')
        }
      })
      const dataDamages = responseDamages.data
      this.combinations = dataDamages
    },
    async selectSkill () {
      const path = '/v1/damages'
      const response = await this.$axios.get(path, {
        params: {
          j: this.selectedJob,
          s: this.selectedSkill,
          e: this.selectedExclusions.join(',')
        }
      })
      const data = response.data
      this.combinations = data
    },
    async selectExclusions () {
      logger.info(this.selectedExclusions)
      logger.info(this.selectedExclusions.join(','))
      const path = '/v1/damages'
      const response = await this.$axios.get(path, {
        params: {
          j: this.selectedJob,
          s: this.selectedSkill,
          e: this.selectedExclusions.join(',')
        }
      })
      const data = response.data
      this.combinations = data
    }
  }
})
</script>
