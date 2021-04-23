<template>
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
    <span class="settings-button">
      <img src="@/assets/icons/settings.svg" height="32"/>
    </span>
    <p>
      Простой калькулятор поможет посчитать, подключать ли Вам <a href="https://www.tinkoff.ru/pro/">Tinkoff Pro</a> или нет
    </p>
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
        v-model="averageMonthlyAmount"
        value
        type="number"
        min="0"
        step="0.1" />
      ₽
    </div>
    <div>
      <input type="checkbox" id="checkbox" v-model="usePaidNotifications">
      Пользуюсь оповещениями об операциях по карте ({{ notificationsCost }}₽/месяц)
    </div>
    <h3 v-if="result">Выгодно!</h3>
    <h3 v-else>Не выгодно!</h3>
    <h4>За месяц вы будете дополнительно получать {{ round(incomeWithPro) }}₽</h4>
    Как посчиталась эта сумма?
    За счёт повышенного процента на остаток по счёту
    ({{ round(interestPro * 100)}}% вместо {{ round(interest * 100) }}%) вы получите {{ }}
  </div>
</template>

<script>
export default {
  name: 'MainComponent',
  data() {
    return {
      interestSum: 100,
      averageMonthlyAmount: 20000,
      usePaidNotifications: true,
      interest: 0.035,
      interestPro: 0.05,
      notificationsCost: 59,
      serviceCost: 199,
      maxAmountForInterest: 300000,
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
      const additionalCosts = this.usePaidNotifications
        ? this.serviceCost - this.notificationsCost : this.serviceCost;
      return amountForInterest * this.interestMonthlyPro - additionalCosts;
    },
    incomeWithoutPro() {
      const amountForInterest = this.averageMonthlyAmount < this.maxAmountForInterest
        ? this.averageMonthlyAmount : this.maxAmountForInterest;
      const additionalCosts = this.usePaidNotifications
        ? this.serviceCost - this.notificationsCost : this.serviceCost;
      return (amountForInterest * 0.015) / 12 - additionalCosts;
    },
    result() {
      let monthLimit = this.serviceCost;
      if (this.usePaidNotifications) {
        monthLimit -= this.notificationsCost;
      }
      const limit = (monthLimit * 12) / 0.015;
      const sum = this.averageMonthlyAmount;
      return sum > limit;
    },
  },
}
</script>

<style scoped>
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
  p {
    text-indent: 15px;
  }

  .input-money {
    width: 100px;
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

  .settings-button {
    position: absolute;
    left: 32px;
    top: 32px;
    height: 32px;
    z-index: 1;
  }
  .or {
    margin-left: 30px;
  }
</style>
