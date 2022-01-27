export const GET_CHAT = `
  getChat(id: $id) {
    id
    stacks {
      name
      messages {
        id
        chat_id
        text
      }
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = `
  mutation($from: String!, $text: String) {
    createMessage(from: $from, text: $text)
  }
`;