export const GET_MESSAGES = `
  getChat(id: $id) {
    
  }
`;

export const CREATE_MESSAGE_MUTATION = `
  mutation($from: String!, $text: String) {
    createMessage(from: $from, text: $text)
  }
`;