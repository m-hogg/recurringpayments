<template>
  <v-app>
    <v-container fluid style="height: 100vh" class="grey darken-3">
      <v-row class="fill-height justify-center align-center">
        <v-col cols="6">
          <v-window v-model="window">

            <v-window-item>
              <v-card class="pa-5" max-height="600px">
                <v-card-title>Do you have any of these subscriptions?</v-card-title>
                <v-card-subtitle>Total: ${{ cost }}</v-card-subtitle>
                <v-card-text style="overflow-y: scroll; height: 300px">
                  <template v-for="(subscription, index) in subscriptions">
                    <v-checkbox v-model="selected" :key="index" :label="subscription.name" :value="subscription" />
                  </template>
                </v-card-text>
                <v-card-actions>
                  <v-btn block color="primary" @click="window++">Next</v-btn>
                </v-card-actions>
              </v-card>
            </v-window-item>

            <v-window-item>
              <v-card max-height="600px">
                <v-card-title>
                  Your results
                </v-card-title>
                <v-card-subtitle>
                  Those subscriptions cost you ${{ cost }} per month. How much would you have if you invested that?
                </v-card-subtitle>
                <v-card-text>
                  <sub-cost-chart :cost-per-month="cost" />
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
import subscriptions from './subscriptions.json'
import SubCostChart from './components/SubCostChart.js'

export default {
  name: 'App',
  components: {
    SubCostChart
  },
  data() {
    return {
      subscriptions,
      selected: [],
      window: 0
    }
  },
  computed: {
    cost () {
      let cost = 0
      this.selected.forEach(el => {
        cost += el.price
      })
      return cost
    }
  },
}
</script>
