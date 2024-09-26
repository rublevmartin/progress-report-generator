<template>
  <div class="wrapper">
    <AppHeader title="Progress Report Generator" description="by Martin R." />

    <main>
      <AppIntro title="Welcome to the Progress Report Generator!"
        text="Start by choosing Report that you want to view or download." step="1" />

      <div class="steps">
        <StepOne />

        <HelloWorld />
      </div>
    </main>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import AppIntro from './components/AppIntro.vue';
import AppHeader from './components/AppHeader.vue';
import StepOne from './components/steps/StepOne.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    AppHeader,
    AppIntro,
    StepOne
  }
}
</script>