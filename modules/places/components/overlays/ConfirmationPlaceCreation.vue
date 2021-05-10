<template>
  <div class="p-4 bg-white rounded" style="width: 320px;">
    Нажмите кнопку <b>{{ isEdit ? 'Сохранить' : 'Создать' }}</b>, если вся информация заполенена верно.
    <hr class="my-4">
    <div class="flex justify-end space-x-2">
      <button class="button" @click="$overlay.hide()">Отмена</button>
      <button class="button button-success" @click="$emit('submit')">{{ isEdit ? 'Сохранить' : 'Создать' }}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isEdit: Boolean
  }
}
</script>