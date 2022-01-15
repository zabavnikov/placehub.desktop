export const USER_FIELDS = `
  id
  name
  description
  avatar
`;

export const REGISTER_USER = `
  registerUser(
    name:                 $name,
    email:                $email,
    password:             $password,
    passwordConfirmation: $passwordConfirmation
  )
`;

export const GET_USER = `
  getUser(id: $id) {
    ${USER_FIELDS}
  }
`;