export const REGISTER_USER = `
  registerUser(
    username:             $username,
    email:                $email,
    password:             $password,
    passwordConfirmation: $passwordConfirmation
  )
`;

export const GET_USER = `
  getUser(id: $id) {
    id
    oneOfNames
    description
    avatar
  }
`;