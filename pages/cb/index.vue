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
      @change="selectJob"
    />
    <v-select
      v-model="selectedSkill"
      :items="skills"
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
        item-text="display"
        item-value="val"
        multiple
        @change="selectExclusions"
      ></v-select>
    </v-col>

    <v-data-table
      :headers="headers"
      :items="combinations"
      :items-per-page="10"
      class="elevation-1"
    >
      <template #item.s0="{item}">
        {{item.slots[0].name}} ({{item.slots[0].rank}})
      </template>
      <template #item.s1="{item}">
        {{item.slots[1].name}} ({{item.slots[1].rank}})
      </template>
      <template #item.s2="{item}">
        {{item.slots[2].name}} ({{item.slots[2].rank}})
      </template>
      <template #item.s3="{item}">
        {{item.slots[3].name}} ({{item.slots[3].rank}})
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import logger from '~/plugins/logger'
import { getters } from "~/store";
export default Vue.extend({
  async asyncData ({ app }) {
    const path = '/v1/damages';
    const response = await app.$axios.get(path);
    //logger.info(response);
    const data = response.data;
    return {
      combinations: data
    }
  },
  data () {
    return {
      // TODO: getting via API
      jobs: ['BATTLE_MASTER', 'RANGER', 'SAGE', 'PALADIN'],
      // TODO: getting via API
      skills: [
        '創世の光', '天雷なぎはらい', 'グランエスパーダ', 'ウィンドスラッシュ',
        'レボルスライサー', '月影の大鎌', 'ヒートスライサー', 'アーススイング',
        'ホーリークラッシュ', 'ビッグバンソード', 'ゴッドスマッシュ',
      ],
      // TODO: getting via API
      exclusions: [
        { display: 'ランプのまじん S', val: '322s' },
        { display: 'ランプのまじん A', val: '322a' },
        { display: 'ランプのまじん B', val: '322b' },
      ],
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
        { text: 'きようさ', value: 'dx' },
      ],
      combinations: [],
      selectedJob: 'BATTLE_MASTER',
      selectedSkill: '創世の光',
      selectedExclusions: [],
    }
  },
  methods: {
    async selectJob () {
      const path = '/v1/damages';
      const response = await this.$axios.get(path, {
        params: {
          j: this.selectedJob,
          s: this.selectedSkill,
          e: this.selectedExclusions.join(',')
        }
      })
      const data = response.data;
      this.combinations = data;
    },
    async selectSkill () {
      const path = '/v1/damages';
      const response = await this.$axios.get(path, {
        params: {
          j: this.selectedJob,
          s: this.selectedSkill,
          e: this.selectedExclusions.join(',')
        }
      })
      const data = response.data;
      this.combinations = data;
    },
    async selectExclusions () {
      logger.info(this.selectedExclusions)
      logger.info(this.selectedExclusions.join(','))
      const path = '/v1/damages';
      const response = await this.$axios.get(path, {
        params: {
          j: this.selectedJob,
          s: this.selectedSkill,
          e: this.selectedExclusions.join(',')
        }
      })
      const data = response.data;
      this.combinations = data;
    }
  }
});
</script>
