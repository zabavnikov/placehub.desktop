<template>
  <header class="header px-6">
    <div class="header-container mx-auto flex items-center h-full">
      <n-link to="/" class="mr-6 font-bold uppercase">PlaceHub</n-link>
      <div class="py-2">
        <n-link v-if="$auth.loggedIn" :to="{name: 'users.show', params: {userId: $auth.user.id}}" class="button button-success">Написать</n-link>
      </div>

      <n-link v-if="$auth.loggedIn" to="/places/create" class="ml-3 text-base uppercase">Добавить место</n-link>

      <!--      <n-link to="/places" class="mr-6 font-bold">Места</n-link>-->
      <!--<n-link to="/images" class="mr-6 font-bold">Фотографии</n-link>-->
      <!--<span class="cursor-pointer" @click="$store.commit('modals/toggle', ['users', 'loginRegister'])">Войти</span>-->

      <div class="flex items-center ml-auto">

        <div v-if="$auth.loggedIn" class="flex items-center">
          <n-link to="/feedback" class="font-bold">Сообщить об ошибке</n-link>

          <v-dropdown>
            <div slot="trigger" class="header-iconable">
              <img :src="$auth.user.avatar" width="32" class="block rounded-full" :alt="$auth.user.name">
            </div>
            <ul class="dropdown-menu">
              <n-link :to="{name: 'users.show', params: {userId: $auth.user.id}}" class="dropdown-menu-item">Мой профиль</n-link>
              <n-link :to="{name: 'posts.drafts'}" class="dropdown-menu-item">Мои черновики</n-link>
              <n-link :to="{name: 'users.edit', params: {userId: $auth.user.id}}" class="dropdown-menu-item">Редактировать</n-link>
              <a @click="$auth.logout()" class="dropdown-menu-item">Выход</a>
            </ul>
          </v-dropdown>
        </div>
        <div v-else class="flex items-center">
          <n-link to="/login">Войти</n-link>&nbsp; | &nbsp;
          <n-link to="/register">Регистрация</n-link>
        </div>
      </div>

    </div>
  </header>
</template>

<script>
import VDropdown from "~/components/ui/VDropdown/VDropdown";

export default {components: {VDropdown}}
</script>

<style lang="scss">
.header {
  position: sticky;
  top: 0;
  height: var(--header-hegiht);
  background-color: rgba(255,255,255,.80);
  box-shadow: 0 1px 4px rgba(0,0,0,.04);
  z-index: 20;
  backdrop-filter: blur(4px);

  &-container {
    width: 860px;
  }

  a {
    display: flex;
    align-items: center;
    height: inherit;
  }
}

.header-iconable {
  @apply flex items-center justify-center;
  width: var(--header-hegiht);
  height: var(--header-hegiht);
}

.container {
  max-width: 860px;
  width: 100%;
  height: inherit;
  margin-right: auto;
  margin-left: auto;
}
</style>
