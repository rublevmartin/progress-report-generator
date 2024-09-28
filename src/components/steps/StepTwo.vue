<template>
  <div class="step">
    <div class="shell">
      <div class="step__buttons" v-if="formats.length > 0">
        <button v-for="(format, index) in formats" :key="index" :class="{ 'active': selectedFormat === index }"
          @click="fullfillStep(index)" class="btn">
          {{ format.localizedName }}
        </button>
      </div>

      <p class="step__loading" v-else>Loading...</p>
    </div>
  </div>
</template>

<script>
import { state, mutations } from '../../store.js';
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const formats = ref([]);
    const selectedFormat = ref(null);

    const fetchFormats = async () => {
      try {
        const response = await fetch("https://demos.telerik.com/reporting/api/reports/formats");
        formats.value = await response.json();

        // Automatically select the first format and fulfill the step
        if (formats.value.length > 0) {
          selectedFormat.value = 0;
          state.selectedFormatFile = formats.value[0].name;
          mutations.fullfillStep();
        }
      } catch (error) {
        console.error("Error fetching formats:", error);
      }
    };

    const fullfillStep = (index) => {
      selectedFormat.value = index;
      state.selectedFormatFile = formats.value[index].name;
      mutations.fullfillStep();
    };

    onMounted(fetchFormats);

    return {
      formats,
      selectedFormat,
      fullfillStep
    };
  }
}
</script>
