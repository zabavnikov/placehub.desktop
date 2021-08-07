<template>
 <div class="layout-main">
   <div class="layout-content">
     <div class="rounded-lg overflow-hidden">
       <div class="relative" style="height: 480px;">
         <div class="absolute z-10 w-full p-3">
           <VSearchPlace @select="$emit('input', $event)" :name="fields.name || ''"/>
         </div>
         <VMap
             :lat-lng="[fields.lat || 0, fields.lng || 0]"
             :zoom="fields.zoom || 2"
             @dragend="$emit('dragend', $event)"
         />
       </div>
       <div class="bg-white p-3 relative">
         <div class="text-base mb-4">
           Не нашли подходящего места?
           <a href="/places/create" target="_blank" class="underline">Добавьте его сами.</a>
           <div>После добавления места, <b>повторите поиск</b>.</div>
         </div>
         <button type="button" @click="$overlay.hide()" class="button button-success">Продолжить</button>
       </div>
     </div>
   </div>
 </div>
</template>

<script src="./composables/VChoosePlaceOverlay.js"></script>