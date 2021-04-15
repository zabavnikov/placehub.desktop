import {fragment, types} from 'typed-graphqlify';

export default fragment('TagsFragment', 'Tag', {
  id:   types.number,
  name: types.string,
});