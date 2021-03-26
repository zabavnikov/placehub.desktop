import { types, fragment } from 'typed-graphqlify';

export default {
  tags: fragment('TagsFragment', 'Tag', {
    id:   types.number,
    name: types.string,
  })
};