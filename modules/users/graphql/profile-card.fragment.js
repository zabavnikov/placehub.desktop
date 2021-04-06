import { types, fragment } from 'typed-graphqlify';

export default fragment('ProfileCardFragment', 'User', {
  id:           types.number,
  name:         types.string,
  username:     types.string,
  one_of_names: types.string,
  avatar:       types.string,
});