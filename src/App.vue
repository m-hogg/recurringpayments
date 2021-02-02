<template>
  <!-- <div id="app" class="h-full flex justify-center items-center">
    <div class="bg-gray-400 p-24 rounded-lg">
      <h1>Do you subscribe to any of these services?</h1>
      <div v-for="(subscription, index) in subscriptions" :key="index" class="bg-gray-300">
        <label class="inline-flex items-center mt-3">
          <input v-model="selected" :value="subscription" type="checkbox" class="h-5 w-5 text-gray-600">
          <span>{{ subscription.name }}</span>
        </label>
      </div>
      <v-btn>Next</v-btn>
    </div>
  </div> -->
  <v-app>
    <v-container fluid style="height: 100vh" class="grey darken-3">
      <v-row class="fill-height justify-center align-center">
        <v-col cols="6">
          <v-card>
            <v-card-title>Do you have any of these subscriptions?</v-card-title>
            <v-card-text>
              <template v-for="(subscription, index) in subscriptions">
                <v-checkbox v-model="selected" :key="index" :label="subscription.name" :value="subscription" />
              </template>
            </v-card-text>
            <v-card-actions>
              <v-btn block color="primary">Next</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import subscriptions from './subscriptions.json'

export default {
  name: 'App',
  data() {
    return {
      subscriptions,
      selected: []
    }
  },
}
</script>
