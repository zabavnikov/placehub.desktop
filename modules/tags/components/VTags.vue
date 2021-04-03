<template>
  <div class="space-x-2">
    <n-link
        v-for="tag in tags"
        :key="tag.id"
        :to="{name: routeName, query: {tags: tag.id}}"
        class="hover:underline"
    >
      #{{ tag.name }}
    </n-link>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
    routeName: {
      type: String,
      default() {
        return this.$route.name;
      }
    }
  }
}
</script>