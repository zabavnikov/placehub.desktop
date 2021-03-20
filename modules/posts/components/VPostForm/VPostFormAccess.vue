<template>
  <v-dropdown>
    <div slot="trigger" v-cloak class="flex items-center cursor-pointer">
      <div class="mr-1 text-xs font-bold">{{ !value ? 'Видно всем' : 'Черновик' }}</div>
      <v-icon name="chevron-down" width="16px" height="16px" stroke="#aaa"></v-icon>
    </div>
    <ul class="dropdown-menu" style="min-width: 140px;">
      <li
          v-for="(name, key) in values"
          :key="key"
          class="dropdown-menu-item"
          @click="$emit('input', !(key === 'all'))"
      >
        <div class="flex items-center">
          <div style="height: 16px">{{ name }}</div>
          <v-icon
              v-if="(key === 'all' && value === false) || (key === 'draft' && value === true)"
              name="check"
              width="16px"
              height="16px"
              class="ml-auto"
          >
          </v-icon>
        </div>
      </li>
    </ul>
  </v-dropdown>
</template>

<script>
import VDropdown from "~/components/ui/VDropdown/VDropdown";

export default {
  components: {VDropdown},
  props: {
    value: {
      type: [Boolean, Number],
      default: false,
    }
  },

  computed: {
    values() {
      return {
        all: 'Видно всем',
        draft: 'Черновик'
      }
    }
  }
}
</script>
