<template>
  <v-app @keyup.stop="1">
    <v-container fluid style="height: 100vh" class="grey darken-3">
      <v-row class="fill-height justify-center align-center">
        <v-col :cols="$vuetify.breakpoint.xsOnly ? 12 : 4">
          <v-window v-model="window">
            <v-window-item>
              <v-card>
                  <v-card-title style="word-break: keep-all">
                    How much do you want to save per month?
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="amount"
                      autofocus
                      @keyup.enter.stop="(amountValid && amount) ? window++ : null"
                      prepend-icon="mdi-currency-usd"
                      :rules="[
                        str => {
                          if (typeof str != 'string') return false
                          if(str === '') return true
                          return !isNaN(str) && !isNaN(parseFloat(str)) ? true : `How are you going to save ${str} dollars?`
                        }
                      ]"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn @click="window++" :disabled="!amountValid || !amount" block color="primary">
                      Next
                    </v-btn>
                  </v-card-actions>
              </v-card>
            </v-window-item>

            <v-window-item>
              <v-card>
                  <v-card-title style="word-break: keep-all">
                    How many years do you want to save for?
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="years"
                      autofocus
                      @keyup.enter.stop="(amountValid && amount) ? window++ : null"
                      :rules="[
                        str => {
                          if (typeof str != 'string') return false
                          if(str === '') return true
                          return !isNaN(str) && !isNaN(parseFloat(str)) ? true : `How are you going to save for ${str} years?`
                        }
                      ]"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn @click="window++" :disabled="!yearsValid || !amount" block color="primary">
                      Next
                    </v-btn>
                  </v-card-actions>
              </v-card>
            </v-window-item>

            <v-window-item>
              <v-card max-height="600px" style="word-break: keep-all">
                <v-card-title>
                  Your results
                </v-card-title>
                <v-card-subtitle>
                  If you invested ${{ amount }} per month for {{ years }} years, here's how much you would have!
                </v-card-subtitle>
                <v-card-text>
                  <interest-chart :cost-per-month="Number(amount)" :intervals="intervals"  />
                </v-card-text>
              </v-card>
            </v-window-item>

          </v-window>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import InterestChart from './components/InterestChart.js'

export default {
  name: 'App',
  components: {
    InterestChart
  },
  data() {
    return {
      amount: null,
      years: null,
      window: 0
    }
  },
  mounted () {
    console.log(this.$vuetify);
  },
  computed: {
    amountValid () {
      if (typeof this.amount != 'string') return false
      if(this.amount === '') return false
      return !isNaN(this.amount) && !isNaN(parseFloat(this.amount))
    },

    yearsValid () {
      if (typeof this.years != 'string') return false
      if(this.years === '') return false
      return !isNaN(this.years) && !isNaN(parseFloat(this.years))
    },

    intervals () {
      const intervals = []
      if (!this.years) return [5, 10, 15]

      let i = 0
      while (i < Number(this.years)) {
        intervals.push(i)
        i += 5
      }
      intervals.push(Number(this.years))

      return intervals
    }
  },
}
</script>
