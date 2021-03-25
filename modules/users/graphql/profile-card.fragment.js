import { types, fragment } from 'typed-graphqlify';

export default {
  user: fragment('ProfileCardFragment', 'User', {
    id:           types.number,
    username:     types.string,
    one_of_names: types.string,
    avatar:       types.string,
  })
}