<template>
  <div class="wrapper">
    <AppHeader title="Progress Report Generator" description="by Martin R." />

    <main>
      <AppIntro :title="state.stepNumber === 1 ? 'Welcome to the Progress Report Generator!' : ''"
        :text="state.texts[state.stepNumber - 1]" :step="state.stepNumber" />

      <div class="steps">
        <StepOne v-if="state.stepNumber === 1" />

        <StepTwo v-if="state.stepNumber === 2" />

        <StepThree v-if="state.stepNumber === 3" />
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script>
import { state } from './store.js';
import AppIntro from './components/AppIntro.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import StepOne from './components/steps/StepOne.vue';
import StepTwo from './components/steps/StepTwo.vue';
import StepThree from './components/steps/StepThree.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    AppIntro,
    StepOne,
    StepTwo,
    StepThree
  },
  setup() {
    return {
      state
    };
  }
}
</script>