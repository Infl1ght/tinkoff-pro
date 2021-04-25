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
      Простой калькулятор поможет посчитать, подключать ли Вам <a href="https://www.tinkoff.ru/pro/">Tinkoff Pro</a> или нет
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
      </div>
      <div v-show="payForTinkoffMobile">
        <div>
          Плачу за минуты Tinkoff Mobile:
        </div>
        <div>
          <input
            class="input-money"
            v-model.lazy="tMobileCost"
            value
            type="number"
            min="0"
            step="1" />
          ₽
        </div>
      </div>
    </div>

    <h3>
      Вердикт:
      <span v-if="result">выгодно!</span>
      <span v-else>не выгодно!</span>
    </h3>
    <h4>За месяц вы будете дополнительно получать {{ round(balanceWithPro - balanceWithoutPro) }}₽</h4>
    Как посчиталась эта сумма?
    За счёт повышенного процента на остаток по счёту
    ({{ round(interestPro * 100)}}% вместо {{ round(interest * 100) }}%) вы получите {{ round(incomeWithPro) }}₽ вместо {{ round(incomeWithoutPro) }}₽, 
    но заплатите {{ proCost }}₽ за Tinkoff Pro
  </div>
</template>

<script>
export default {
  name: 'MainComponent',
  data() {
    return {
      interestSum: 100,
      averageMonthlyAmount: 20000,
      payForNotifications: true,
      payForTinkoffMobile: false,
      payForService: false,
      interest: 0.035,
      interestPro: 0.05,
      maxAmountForInterest: 300000,
      notificationsCost: 59,
      proCost: 199,
      serviceCost: 99,
      tMobileCost: 149,
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
    incomeWithPro() {
      const amountForInterest = this.averageMonthlyAmount < this.maxAmountForInterest
        ? this.averageMonthlyAmount : this.maxAmountForInterest;
      return amountForInterest * this.interestMonthlyPro;
    },
    incomeWithoutPro() {
      const amountForInterest = this.averageMonthlyAmount < this.maxAmountForInterest
        ? this.averageMonthlyAmount : this.maxAmountForInterest;
      return amountForInterest * this.interestMonthly;
    },
    additionalCostsWithoutPro() {
      let additionalCost = 0;
      if (this.payForNotifications) {
        additionalCost += this.notificationsCost;
      }
      if (this.payForService) {
        additionalCost += this.serviceCost;
      }
      if (this.payForTinkoffMobile) {
        additionalCost += parseFloat(this.tMobileCost);
      }
      return additionalCost;
    },
    balanceWithPro() {
      return this.incomeWithPro - this.proCost;
    },
    balanceWithoutPro() {
      return this.incomeWithoutPro - this.additionalCostsWithoutPro;
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
  a {
    text-decoration: none;
    border-bottom: dashed 2px;
    color: #000;
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
  .centered {
    margin: 0 auto;
    padding-top: 10px;
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
  }
  .or {
    margin: 5px 20px;
    font-size: 1rem;
  }
  .calculation-block {
    background: rgba(0, 0, 0, .07);
    border-radius: 8px;
    padding: 15px;
    font-size: 1.15rem;
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
</style>
