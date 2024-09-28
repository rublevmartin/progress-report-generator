<template>
    <footer class="footer">
        <div class="shell">
            <div class="footer__actions">
                <button v-if="state.stepNumber < 3" @click="nextStep"
                    :class="{ 'disabled': state.stepNumber > state.stepFullfilled }" class="btn btn--large">
                    Next Step
                </button>

                <button v-if="state.stepNumber === 3" @click="resetApp" class="btn btn--large">
                    Restart
                </button>
            </div>
        </div>
    </footer>
</template>

<style lang="scss">
.footer {
    padding: 50px 0;
    text-align: center;

    &__actions {
        display: flex;
        flex-direction: row-reverse;
        justify-content: center;
    }
}
</style>

<script>
import { state, mutations } from '../store.js';

export default {
    setup() {
        const resetApp = () => {
            state.stepNumber = 1;
            state.stepFullfilled = 0;
            state.selectedReport = null;
            state.selectedReportFile = null;
            state.selectedFormatFile = null;
        };
        return {
            state,
            nextStep: mutations.nextStep,
            resetApp
        };
    }
}
</script>