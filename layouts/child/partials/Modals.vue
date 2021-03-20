<template>
  <div id="modals">
    <modal-places-delete v-if="isAdministrator && modals.places.delete.show"></modal-places-delete>
    <v-modal-complaint v-if="modals.complaints.complaint.show"></v-modal-complaint>
  </div>
</template>

<script>
  const ModalPlacesDelete = () => import('~/modules/places/components/modals/delete');
  const VModalComplaint = () => import('~/modules/complaints/components/VModalComplaint');

  export default {
    components: {ModalPlacesDelete, VModalComplaint },

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
