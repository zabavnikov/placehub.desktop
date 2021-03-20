<template>
  <the-layout reverse heading="Профиль пользователя">
    <template #sidebar>
      <ul>
        <li></li>
      </ul>
    </template>

    <template #content>
      <div class="mt-4">
        <button @click="onSubmit" :class="{loading}" class="button button-success">Сохранить</button>
      </div>
    </template>
  </the-layout>
</template>

