<template>
  <div class="flex items-center">
    <div>{{ name }}</div>
    <div v-if="editable" @click="$emit('delete')" class="rounded bg-blue-100 p-0.5 ml-1">
      <v-icon store="white" name="x" width="16" height="16" class="cursor-pointer"></v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },

    editable: Boolean
  },
  computed: {
    nameClasses() {
      return this.editable === true
          ? 'rounded-l'
          : 'rounded';
    }
  }
}
</script>