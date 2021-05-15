<template>
  <div id="modals">
    <modal-places-delete v-if="isAdministrator && modals.places.delete.show"></modal-places-delete>
  </div>
</template>

<script>
  const ModalPlacesDelete = () => import('~/modules/places/components/modals/delete');

  export default {
    components: {ModalPlacesDelete},

    computed: {
      modals() {
        return this.$eventBus.modals;
      },

      isGuest() {
        return !this.$auth.loggedIn;
      },

      isAdministrator() {
        return this.$auth.loggedIn && this.$auth.user.role === 'administrator';
      }
    }
  }
</script>
