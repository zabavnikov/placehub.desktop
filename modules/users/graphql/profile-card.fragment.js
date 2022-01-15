import {fragment, types} from 'typed-graphqlify';

export default fragment('ProfileCardFragment', 'User', {
  id:           types.number,
  name:         types.string,
  avatar:       types.string,
});