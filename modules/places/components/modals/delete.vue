<template>
  <v-overlay @close="onClose">
    <div class="p-6 bg-white rounded">
      <div>Будет удалено нас. пунктов: {{ payload.count.localities }}</div>
      <div>Будет удалено мест: {{ payload.count.poi }}</div>
      <div class="flex mt-4">
        <button type="button" class="button" @click="onDelete(payload.url)">Да, удалить</button>
        <button type="button" class="button button-success ml-4" @click="onClose">Отмена</button>
      </div>
    </div>
  </v-overlay>
</template>

<script>
import VOverlay from '~/components/common/VOverlay';

export default {
    components: { VOverlay },

    computed: {
      payload() {
        return this.$eventBus.modals.places.delete.data;
      }
    },

    methods: {
      onDelete(url) {
        this.$axios
          .$get(url)
          .then(response => this.onClose())
      },

      onClose() {
        this.$eventBus.$emit('modal', ['places', 'delete']);
      }
    }
  }
</script>
