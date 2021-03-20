<template>
  <div class="season-selector">
    <div
      v-for="(name, key) in seasons"
      :class="{
        'season-selector__season': true,
        'season-selector__season--active': value === key
      }"
      @click="$emit('input', key)" v-text="name"></div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
      }
    },

    computed: {
      seasons() {
        return {
          autumn: 'Осень',
          winter: 'Зима',
          summer: 'Лето',
          spring: 'Весна'
        }
      },
    }
  }
</script>

<style lang="scss">
  .season-selector {
    display: flex;

    &__season {
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;

      &--active {
        background-color: #FFE082;
      }
    }
  }
</style>
