<template>
  <v-dropdown v-if="$auth.loggedIn" class="flex-shrink-0 ml-auto">
    <ul class="dropdown-menu">
      <n-link :to="{name: `${modelType}.edit`, params: {[routeParams]: modelId}}" class="dropdown-menu-item">Редактировать
      </n-link>
      <li @click="$eventBus.$emit('modal', ['complaints', 'complaint', {modelType, modelId}])"
          class="dropdown-menu-item">Пожаловаться
      </li>
<!--      <li v-if="$auth.user.id === content.user_id" @click="onDelete" class="dropdown-menu-item">Удалить</li>-->
    </ul>
  </v-dropdown>
</template>

<script>
import VDropdown from '~/components/ui/VDropdown';

export default {
  components: {
    VDropdown
  },

  props: {
    modelType: {
      type: String,
      required: true,
    },
    modelId: {
      type: Number,
      required: true,
    },
    routeName: {
      type: String,
      required: true,
    },
    routeParams: {
      type: String,
      required: true,
    },
  }
}
</script>