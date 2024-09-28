<template>
    <div class="step">
        <div class="shell">
            <div class="step__buttons">
                <button v-for="(report, index) in state.reports" :key="index"
                    :class="{ 'active': state.selectedReport === index }" @click="fullfillStep(index)" class="btn">
                    {{ report.name }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { state, mutations } from '../../store.js';

export default {
    setup() {
        const fullfillStep = (index) => {
            state.selectedReport = index;
            state.selectedReportFile = state.reports[index].file;
            mutations.fullfillStep();
        };

        return {
            state,
            fullfillStep,
        };
    }
}
</script>

<style lang="scss">
.step {
    padding: 50px 0 0;

    &__buttons {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: -10px;
    }

    &__loading {
        padding: 43px 0;
        text-align: center;
        font-size: 20px;
    }
}
</style>