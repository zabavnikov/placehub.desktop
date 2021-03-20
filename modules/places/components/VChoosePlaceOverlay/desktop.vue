<template>
  <v-overlay>
    <div class="flex">
      <div class="relative" style="width: 540px; height: 480px;">
        <div class="absolute z-10 w-full p-3">
          <VSearchPlace @select="$emit('input', $event)" :name="fields.name || ''" />
        </div>
        <VMap
            :lat-lng="[fields.lat || 0, fields.lng || 0]"
            :zoom="fields.zoom || 2"
            @dragend="$emit('dragend', $event)"
        />
      </div>
      <div class="bg-white p-3 relative" style="width: 320px; flex-shrink: 0">
        <div class="text-lg mb-4 font-bold">
          Не нашли подходящего места?
          <a href="/places/create" target="_blank" class="underline">Добавьте его сами.</a>
          <div class="mt-2">После добавления места, <b>повторите поиск</b>.</div>
        </div>
        <div class="absolute z-10 p-3 bottom-0 left-0">
          <button type="button" @click="$overlay.toggle()" class="button button-success">Продолжить</button>
        </div>
      </div>
    </div>
  </v-overlay>
</template>

<script src="./composables/VChoosePlaceOverlay.js"></script>