<template>
  <div class="flex items-center bg-white rounded-lg h-48 p-6 overflow-hidden">

    <div class="flex items-center space-x-6">
      <img :src="user.avatar" :alt="user.name" class="rounded-full" />
      <div>
        <h1 class="text-2xl">{{ user.name }}</h1>
        <n-link
            v-if="$auth.loggedIn && user.id === $auth.user.id"
            :to="{name: 'users.edit', params: {userId: user.id}}" class="text-green-500 underline">Редактировать</n-link>
        <div v-if="user.description" class="mt-2">{{ user.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    }
  }
}
</script>