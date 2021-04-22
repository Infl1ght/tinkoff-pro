<template>
  <div>
  <div class="centered">
    <h1>
      Выгодно ли Вам подключать Tinkoff Pro?
    </h1>
    <span class="repo-link-block">
      <a class="repo-link" href="https://github.com/Infl1ght/tinkoff_pro_profit/">
        <span class="centered-vertical">Репозиторий проекта на GitHub</span>
        <img src="@/assets/icons/github.png" height="24"/>
      </a>
    </span>

    <p>
      Простой калькулятор поможет посчитать, подключать ли Вам <a href="https://www.tinkoff.ru/pro/">Tinkoff Pro</a> или нет
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

<style>
  h1 {
    margin-bottom: 10px;
  }
  a {
    text-decoration: none;
    border-bottom: dashed 2px;
    color: #000;
  }
  a:visited {
    color: #000;
  }

  .centered {
    margin: 0 auto;
    width: 900px;
  }
  .repo-link-block {
    position: absolute;
    right: 8px;
    top: 5px;
    height: 24px;
  }
  .centered-vertical {
    height: 24px;
    display: table-cell;
    vertical-align: middle;
    padding-right: 5px;
  }
  a.repo-link {
    border-bottom: none;
    font-size: 15px;
  }
</style>
