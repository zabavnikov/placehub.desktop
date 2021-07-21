<template>
  <div class="flex flex-auto">
    <div class="w-3/12 p-6">
      <slot></slot>
    </div>
    <div class="flex-auto h-full">
      <slot name="map"></slot>
    </div>
  </div>
</template>

<style>
.sidebar {
  width: 400px;
}
</style>