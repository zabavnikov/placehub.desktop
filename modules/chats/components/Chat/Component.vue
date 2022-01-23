<template>
  <div>
    <chat-form></chat-form>
  </div>
</template>

<script>
import ChatForm from './partials/ChatForm';

export default {
  components: {
    ChatForm
  },
  mounted() {
    this.$echo.channel('chats.posts-1')
        .listen('.chats.newMessage', (event) => {
          console.log(event);
        });
  }
}
</script>