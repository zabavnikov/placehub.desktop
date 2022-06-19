<template>
  <v-dropdown v-if="$auth.loggedIn" class="flex-shrink-0 ml-auto">
    <ul class="dropdown-menu">
      <n-link v-if="can.update" :to="{name: `${modelType}.edit`, params: {[routeParams]: modelId}}"
              class="dropdown-menu-item flex items-center space-x-3">
        <v-icon name="pencil" class="w-5 h-5"></v-icon>
        <span>Редактировать</span>
      </n-link>
      <li @click="$overlay.show(() => import('~/modules/complaints/components/ComplaintModal'), {
        props: {modelType, modelId}
      })"
          class="dropdown-menu-item flex items-center space-x-3">
        <v-icon name="ban" class="w-5 h-5"></v-icon>
        <span>Пожаловаться</span>
      </li>
      <li v-if="can.delete" @click="onDelete" class="dropdown-menu-item flex items-center space-x-3">
        <v-icon name="trash" class="w-5 h-5"></v-icon>
        <span>Удалить</span>
      </li>
    </ul>
  </v-dropdown>
</template>

<script>
import VIcon from '~/components/common/VIcon';
import VDropdown from '~/components/ui/VDropdown';

export default {
  components: {
    VIcon,
    VDropdown
  },

  props: {
    can: {
      type: Object,
    },
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