<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-1 font-weight-bold mb-2 mt-5">
          Выгодно ли Вам подключать Tinkoff Pro?
        </h1>

        <p class="subheading font-weight-regular">
          Калькулятор поможет посчитать, подключать ли Вам Tinkoff Pro или нет
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <v-text-field
          v-model="interestSum"
          type="number"
          min="0"
          step="0.1"
          label="Сумма на счете"
          maxlength="20"
        >
        </v-text-field>
        <h3 v-if="result">Выгодно!</h3>
        <h3 v-else>Не выгодно!</h3>
        <h2 class="headline font-weight-bold mb-3">
          What's next?
        </h2>

        <v-row justify="center">
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MainComponent',

  data: () => ({
    interestSum: '100',
  }),

  watch: {
    interestSum: (value) => {
      console.log('value :>> ', value);
    },
  },

  computed: {
    result() {
      const limit = (140 * 12) / 0.015;
      const sum = parseFloat(this.interestSum);
      return sum > limit;
    },
  },
});
</script>
