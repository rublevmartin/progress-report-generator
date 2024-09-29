<template>
    <div class="intro">
        <div class="shell">
            <p class="intro__step">
                Step: {{ step }}
            </p>

            <h3 class="intro__title">
                {{ title }}
            </h3>

            <p class="intro__text">
                {{ text }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: false
        },
        text: {
            type: String,
            required: true
        },
        step: {
            type: Number,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
.intro {
    text-align: center;

    &__step {
        color: $accent-color;
        text-transform: uppercase;
        font-family: $font-title;
        font-size: 32px;

        @media #{$mobile} {
            font-size: 22px;
        }
    }

    &__title {
        font-size: 22px;

        @media #{$mobile} {
            font-size: 20px;
        }
    }
}
</style>