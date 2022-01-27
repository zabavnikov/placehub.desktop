<template>
  <the-layout>
    <template #sidebar>{{ isChat }}</template>
    <chat slot="content" :chat="chat"></chat>
  </the-layout>
</template>

<script>
import { gql } from 'nuxt-graphql-request';
import { GET_CHAT } from '~/modules/chats/graphql';
import Chat from '~/modules/chats/components/Chat';

export default {
  components: {
    Chat
  },

  async asyncData({ $graphql, query }) {
    const isChat = query.id > 0;

    let chat = false;

    if (isChat) {
      const { getChat } = await $graphql.default.request(gql`
        query($id: ID!) {
          ${GET_CHAT}
        }
      `, {
        id: query.id
      });

      chat = getChat;
    }

    return {
      isChat,
      chat
    }
  }
}
</script>