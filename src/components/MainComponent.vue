<template>
    <div>
      <h1>
        Выгодно ли Вам подключать Tinkoff Pro?
      </h1>

      <p class="subheading font-weight-regular">
        Простой калькулятор поможет посчитать, подключать ли Вам Tinkoff Pro или нет
      </p>
      <input
        v-model="interestSum"
        value
        type="number"
        min="0"
        step="0.1" />
      <h3 v-if="result">Выгодно!</h3>
      <h3 v-else>Не выгодно!</h3>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MainComponent',

  data: () => ({
    interestSum: '100',
  }),

  computed: {
    result() {
      const limit = (140 * 12) / 0.015;
      const sum = parseFloat(this.interestSum);
      return sum > limit;
    },
  },
});
</script>
