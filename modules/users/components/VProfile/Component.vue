<template>
  <n-link :to="{name: 'users.show', params: {username: user.username}}" class="flex items-center space-x-2">
    <img :src="user.avatar" :alt="user.one_of_names" class="w-10 h-10 rounded-full">
    <div>
      <div class="font-semibold text-gray-800">{{ user.one_of_names }}</div>
      <div v-if="sub" class="text-xs text-gray-600">{{ sub }}</div>
    </div>
  </n-link>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    sub: {
      type: String,
    }
  }
}
</script>