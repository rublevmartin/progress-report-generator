<template>
    <header class="header">
        <div class="shell">
            <h1 class="header__title">
                {{ title }}
            </h1>

            <h2 class="header__description">
                {{ description }}
            </h2>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
.header {
    padding: 40px 0;
    text-align: center;

    @media #{$mobile} {
        padding: 20px 0 0;
    }

    &__title {
        font-family: $font-title;
        text-transform: uppercase;
        color: $primary-color;
        text-shadow: 0 3px 5px rgba($dark-color, 0.25);
        font-size: 50px;

        @media #{$mobile} {
            font-size: 26px;
        }

        &::before {
            content: '< ';
        }

        &::after {
            content: ' />'
        }
    }

    &__description {
        font-family: $font-cursive;
        font-size: 30px;
        transform: rotate(-5deg) translateY(-20px);

        @media #{$mobile} {
            font-size: 22px;
        }
    }
}
</style>