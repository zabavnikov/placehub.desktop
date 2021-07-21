<template>
  <n-link :to="{name: 'users.show', params: {username: user.username}}" :class="{'card-profile--small': small}" class="card-profile flex items-center space-x-2">
    <img :src="user.avatar" :alt="user.one_of_names" :class="avatarClasses" class="rounded-full">
    <div>
      <div class="font-bold text-gray-800">{{ user.one_of_names }}</div>
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
    },
    small: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    avatarClasses() {
      return this.small ? 'w-6 h-6' : 'w-9 h-9';
    }
  }
}
</script>