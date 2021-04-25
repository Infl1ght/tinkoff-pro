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
          Сколько начисляется процентов на остаток в месяц? <Tooltip>Можно посмотреть в последней выписке по счёту Tinkoff Black</Tooltip> 
        </div>
        <div>
          <input
            class="input-money"
            v-model="interestSum"
            type="number"
            min="0"
            step="0.1" />
          ₽
        </div>
        <div class="or">
          или
        </div>
        <div>
          Среднемесячный остаток на карте: <Tooltip>Какая сумма денег хранится на счёте в среднем за месяц. На эту сумму начисляется процент на остаток.</Tooltip>
        </div>
        <div>
          <input
            class="input-money"
            v-model.lazy="averageMonthlyAmount"
            type="number"
            min="0"
            step="0.1" />
          ₽
        </div>
      </div>
      <div class="input-checkbox">
        <input type="checkbox" id="checkbox" v-model="payForNotifications">
        Пользуюсь оповещениями об операциях по карте ({{ notificationsCost }}₽/месяц)
        <Tooltip>Плата за оповещения об операциях по карте входит в стоимость Tinkoff Pro</Tooltip>
      </div>
      <div class="input-checkbox">
        <input type="checkbox" id="checkbox" v-model="payForService">
        Плачу за обслуживание карты ({{ serviceCost }}₽/месяц)
        <Tooltip>Обслуживание карты бесплатно, если:
          <ul style="margin-block-start: 0.3em; padding-left: 15px;">
            <li>оформлена подписка Tinkoff Pro;</li>
            <li>на карте, вкладах, накопительных и брокерских счетах каждый день в сумме хранится не менее 50 000 ₽;</li>
            <li>вы взяли кредит в Тинькофф;</li>
            <li>вам меньше 18 лет;</li>
            <li>вы получаете пенсию на карту Tinkoff Black</li></ul></Tooltip>
      </div>
      <div class="input-checkbox">
        <input type="checkbox" id="checkbox" v-model="payForTinkoffMobile">
        Пользуюсь Tinkoff Mobile
      <span v-show="payForTinkoffMobile">
        и плачу за минуты Tinkoff Mobile
        <input
          class="input-money-small"
          v-model.lazy="tinkoffMobileCost"
          type="number"
          min="0"
          step="1" />
        ₽
        <Tooltip>Tinkoff Pro включает в себя 600 минут связи. Выгода от Tinkoff Pro при использовании Tinkoff Mobile зависит от региона и от других факторов. Выгоду необходимо подсчитать самостоятельно исходя из Вашего тарифа.</Tooltip>
      </span>
      </div>
      <div>
        Оцениваю дополнительные бонусы от Tinkoff Pro в
        <input
          class="input-money-small"
          v-model.lazy="additionalProfit"
          type="number"
          min="0"
          step="1" />
        ₽
        <Tooltip>Tinkoff Pro предоставляет и другие бонусы, которые трудно выразить определённым количеством денег. Например, увеличенный кэшбэк, бОльший выбор категорий для кэшбэка, увеличенные лимиты на переводы денег на другие карты и другие плюшки. Здесь можно указать сумму, в которую Вы оцениваете дополнительные преимущества Tinkoff Pro.</Tooltip>
      </div>
    </div>

    <h3>
      Вердикт:
      <span v-if="proIsProfitable" class="profit">выгодно!</span>
      <span v-else class="loss">не выгодно!</span>
    </h3>
    <h4>
      В месяц вы будете
      <span v-if="proIsProfitable" class="profit">дополнительно получать <span class="result-sum">{{ round(balanceWithPro - balanceWithoutPro) }}₽</span></span>
      <span v-else class="loss">дополнительно платить <span class="result-sum">{{ round(balanceWithoutPro - balanceWithPro) }}₽</span></span>
    </h4>
    <span class="underlined cursor-pointer" @click="showCalculationInfo = !showCalculationInfo">Как посчиталась эта сумма?</span>
    <div v-show="showCalculationInfo">
      <table>
        <tbody>
          <tr><td>Увеличенный процент на остаток (+{{round((interestPro - interest) * 100)}}%)</td><td>+{{ round(interestIncomeWithPro - interestIncomeWithoutPro) }}₽</td></tr>
          <tr v-if="payForNotifications"><td>Экономия на плате за оповещения</td><td>+{{ notificationsCost }}₽</td></tr>
          <tr v-if="payForService"><td>Экономия на плате за обслуживание</td><td>+{{ serviceCost }}₽</td></tr>
          <tr v-if="payForTinkoffMobile"><td>Экономия на плате за Tinkoff Mobile</td><td>+{{ tinkoffMobileCost }}₽</td></tr>
          <tr v-if="parseFloat(additionalProfit)"><td>Дополнительные бонусы от Tinkoff Pro</td><td>+{{ additionalProfit }}₽</td></tr>
          <tr><td>Стоимость Tinkoff Pro</td><td>-{{ proCost }}₽</td></tr>
          <tr class="abovelined"><td>Итог</td><td>{{ round(balanceWithPro - balanceWithoutPro) }}₽</td></tr>
        </tbody>
      </table>
    </div>
    <div class="settings">
      <span class="underlined cursor-pointer" @click="showSettings = !showSettings">Настройки</span>
    </div>
    <div v-show="showSettings">
      <table>
        <tbody>
          <tr>
            <td>Процент на остаток по счёту без Tinkoff Pro</td>
            <td>
              <input
                class="input-money-small"
                :value="round(parseFloat(interest) * 100)"
                @change="interest = parseFloat($event.target.value) / 100"
                type="number"
                min="0"
                step="0.1" />%
              </td>
          </tr>
          <tr>
            <td>Процент на остаток по счёту c Tinkoff Pro</td>
            <td>
              <input
                class="input-money-small"
                :value="round(parseFloat(interestPro) * 100)"
                @change="interestPro = parseFloat($event.target.value) / 100"
                type="number"
                min="0"
                step="0.1" />%
              </td>
          </tr>
          <tr>
            <td>Максимальная сумма на счёте, на которую начисляются проценты</td>
            <td>
              <input
                style="width: 90px;"
                class="input-money-small"
                :value="parseFloat(maxAmountForInterest)"
                @change="maxAmountForInterest = parseFloat($event.target.value)"
                type="number"
                min="0"
                step="1" />₽
              </td>
          </tr>
          <tr>
            <td>Стоимость обслуживания счёта</td>
            <td>
              <input
                class="input-money-small"
                :value="parseFloat(serviceCost)"
                @change="serviceCost = parseFloat($event.target.value)"
                type="number"
                min="0"
                step="1" />₽
              </td>
          </tr>
          <tr>
            <td>Стоимость оповещений</td>
            <td>
              <input
                class="input-money-small"
                :value="parseFloat(notificationsCost)"
                @change="notificationsCost = parseFloat($event.target.value)"
                type="number"
                min="0"
                step="1" />₽
              </td>
          </tr>
          <tr>
            <td>Стоимость Tinkoff Pro</td>
            <td>
              <input
                class="input-money-small"
                :value="parseFloat(proCost)"
                @change="proCost = parseFloat($event.target.value)"
                type="number"
                min="0"
                step="1" />₽
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Tooltip from './Tooltip.vue';

export default {
  name: 'MainComponent',
  components: {
    Tooltip,
  },
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
      showSettings: false,
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
    proIsProfitable() {
      return this.balanceWithPro > this.balanceWithoutPro;
    },
  },
}
</script>

<style>
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
  .settings {
    margin-top: 13px;
  }
</style>
