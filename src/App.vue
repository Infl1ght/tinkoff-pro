<template>
  <MainComponent />
</template>

<script lang="ts">
import Vue from 'vue';
import MainComponent from './components/MainComponent.vue';

export default Vue.extend({
  name: 'App',

  components: {
    MainComponent,
  },

  data: () => ({
    //
  }),
});
</script>
