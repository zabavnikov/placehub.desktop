<template>
  <div>
    <textarea class="input" @keydown.enter="onSubmit"></textarea>
  </div>
</template>

<script>
import gql from 'nuxt-graphql-request';
import { CREATE_MESSAGE_MUTATION } from '~/modules/chats/graphql';

export default {
  setup(props, { root }) {
    const onSubmit = async event => {
      event.preventDefault();

      const createMessage = await root.$graphql.default
          .request(CREATE_MESSAGE_MUTATION, {
            from: 'posts-1',
            text: event.target.value
          });
    }

    return {
      onSubmit
    }
  }
}
</script>