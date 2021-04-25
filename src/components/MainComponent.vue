<template>
  <div class="centered">
    <h1>
      Выгодно ли Вам подключать Tinkoff Pro?
      <img class="centered-image" src="@/assets/icons/thinking_face.svg" height="48"/>
    </h1>
    <span class="repo-link-block">
      <a class="repo-link" href="https://github.com/Infl1ght/tinkoff_pro_profit/">
        <span>Репозиторий проекта на GitHub</span>
        <img class="github-image" src="@/assets/icons/github.png" height="24"/>
      </a>
    </span>
    <p>
      Простой калькулятор поможет посчитать, подключать ли Вам <a class="underlined" href="https://www.tinkoff.ru/pro/">Tinkoff Pro</a> или нет
    </p>
    <div class="calculation-block">
      <div class="main-calculation-block">
        <div>
          Сколько начисляется процентов на остаток в месяц?
        </div>
        <div>
          <input
            class="input-money"
            v-model="interestSum"
            value
            type="number"
            min="0"
            step="0.1" />
          ₽
        </div>
        <div class="or">
          или
        </div>
        <div>
          Среднемесячный остаток на карте:
        </div>
        <div>
          <input
            class="input-money"
            v-model.lazy="averageMonthlyAmount"
            value
            type="number"
            min="0"
            step="0.1" />
          ₽
        </div>
      </div>
      <div class="input-checkbox">
        <input type="checkbox" id="checkbox" v-model="payForNotifications">
        Пользуюсь оповещениями об операциях по карте ({{ notificationsCost }}₽/месяц)
      </div>
      <div class="input-checkbox">
        <input type="checkbox" id="checkbox" v-model="payForService">
        Плачу за обслуживание карты ({{ serviceCost }}₽/месяц)
      </div>
      <div class="input-checkbox">
        <input type="checkbox" id="checkbox" v-model="payForTinkoffMobile">
        Пользуюсь Tinkoff Mobile
      <span v-show="payForTinkoffMobile">
        и плачу за минуты Tinkoff Mobile
        <input
          class="input-money-small"
          v-model.lazy="tinkoffMobileCost"
          value
          type="number"
          min="0"
          step="1" />
        ₽
      </span>
      </div>
      <div>
        Оцениваю дополнительные бонусы от Tinkoff Pro в
        <input
          class="input-money-small"
          v-model.lazy="additionalProfit"
          value
          type="number"
          min="0"
          step="1" />
        ₽
      </div>
    </div>

    <h3>
      Вердикт:
      <span v-if="result" class="profit">выгодно!</span>
      <span v-else class="loss">не выгодно!</span>
    </h3>
    <h4>
      В месяц вы будете
      <span v-if="result" class="profit">дополнительно получать <span class="result-sum">{{ round(balanceWithPro - balanceWithoutPro) }}₽</span></span>
      <span v-else class="loss">дополнительно платить <span class="result-sum">{{ round(balanceWithoutPro - balanceWithPro) }}₽</span></span>
    </h4>
    <span class="underlined cursor-pointer" @click="showCalculationInfo = !showCalculationInfo">Как посчиталась эта сумма?</span>
    <div v-show="showCalculationInfo">
      <table>
        <tbody>
          <tr><td>Дополнительная прибыль с увеличенного процента на остаток (+{{round((interestPro - interest) * 100)}}%)</td><td>+{{ round(interestIncomeWithPro - interestIncomeWithoutPro) }}₽</td></tr>
          <tr v-if="payForNotifications"><td>Экономия на плате за оповещения</td><td>+{{ notificationsCost }}₽</td></tr>
          <tr v-if="payForService"><td>Экономия на плате за обслуживание</td><td>+{{ serviceCost }}₽</td></tr>
          <tr v-if="payForTinkoffMobile"><td>Экономия на плате за Tinkoff Mobile</td><td>+{{ tinkoffMobileCost }}₽</td></tr>
          <tr v-if="parseFloat(additionalProfit)"><td>Дополнительные бонусы от Tinkoff Pro</td><td>+{{ additionalProfit }}₽</td></tr>
          <tr><td>Стоимость Tinkoff Pro</td><td>-{{ proCost }}₽</td></tr>
          <tr class="abovelined"><td>Итог</td><td>{{ round(balanceWithPro - balanceWithoutPro) }}₽</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainComponent',
  data() {
    return {
      interestSum: 175,
      averageMonthlyAmount: 60000,
      payForNotifications: true,
      payForTinkoffMobile: false,
      payForService: false,
      interest: 0.035,
      interestPro: 0.05,
      maxAmountForInterest: 300000,
      notificationsCost: 59,
      proCost: 199,
      serviceCost: 99,
      tinkoffMobileCost: 149,
      showCalculationInfo: false,
      additionalProfit: 0,
    }
  },
  mounted() {
    this.calcAverageMontlyAmount();
  },
  watch: {
    interestSum() {
      this.calcAverageMontlyAmount();
    },
    averageMonthlyAmount() {
      this.calcInterestSum();
    },
  },
  methods: {
    round(number) {
      return Math.round(number * 100) / 100;
    },
    calcAverageMontlyAmount() {
      this.averageMonthlyAmount = this.round(this.interestSum / this.interestMonthly);
    },
    calcInterestSum() {
      this.interestSum = this.round(this.averageMonthlyAmount * this.interestMonthly);
    },
  },
  computed: {
    interestMonthly() {
      return this.interest / 12;
    },
    interestMonthlyPro() {
      return this.interestPro / 12;
    },
    interestIncomeWithPro() {
      const amountForInterest = this.averageMonthlyAmount < this.maxAmountForInterest
        ? this.averageMonthlyAmount : this.maxAmountForInterest;
      return amountForInterest * this.interestMonthlyPro;
    },
    incomeWithPro() {
      return this.interestIncomeWithPro + parseFloat(this.additionalProfit);
    },
    interestIncomeWithoutPro() {
      const amountForInterest = this.averageMonthlyAmount < this.maxAmountForInterest
        ? this.averageMonthlyAmount : this.maxAmountForInterest;
      return amountForInterest * this.interestMonthly;
    },
    additionalCostsWithoutPro() {
      let additionalCost = 0;
      if (this.payForNotifications) {
        additionalCost += parseFloat(this.notificationsCost);
      }
      if (this.payForService) {
        additionalCost += parseFloat(this.serviceCost);
      }
      if (this.payForTinkoffMobile) {
        additionalCost += parseFloat(this.tinkoffMobileCost);
      }
      return additionalCost;
    },
    balanceWithPro() {
      return this.incomeWithPro - this.proCost;
    },
    balanceWithoutPro() {
      return this.interestIncomeWithoutPro - this.additionalCostsWithoutPro;
    },
    result() {
      console.log('additionalCost :>> ', this.balanceWithPro, this.balanceWithoutPro);
      return this.balanceWithPro > this.balanceWithoutPro;
    },
  },
}
</script>

<style scoped>
  h1 {
    margin-bottom: 0px;
  }
  h3 {
    margin-top: 7px;
    margin-bottom: 0px;
    font-size: 1.5rem;
  }
  h4 {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .loss {
    color: red;
  }
  .profit {
    color: green;
  }
  .underlined {
    text-decoration: none;
    border-bottom: dashed 2px;
    color: #000;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  a:visited {
    color: #000;
  }
  p {
    margin-block-start: 0.25em;
  }

  .input-money {
    width: 120px;
    font-size: 1.15rem;
    margin: 5px 0px;
  }
  .input-money-small {
    width: 60px;
    font-size: 1rem;
    margin-left: 5px;
  }
  .centered {
    margin: 0 auto;
    padding-top: 5px;
    max-width: 800px;
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
    text-decoration: none;
  }
  .or {
    margin: 5px 20px;
    font-size: 1rem;
  }
  .calculation-block {
    background: rgba(0, 0, 0, .07);
    border-radius: 8px;
    padding: 15px;
    font-size: 1.1rem;
  }
  .main-calculation-block {
    margin-bottom: 15px;
  }
  .centered-image {
    vertical-align: middle;
  }
  .github-image {
    vertical-align: middle;
    margin-left: 4px;
  }
  .input-checkbox {
    margin: 10px 0px;
  }
  .result-sum {
    font-size: 1.5rem;
    color: black;
  }
  .abovelined {
    border-top: 1px solid black;
  }
  table {
    border-collapse: collapse;
    padding: 5px;
    margin-top: 5px;
    background: rgba(0, 0, 0, .05);
  }
  td {
    padding: 5px;
  }
</style>
