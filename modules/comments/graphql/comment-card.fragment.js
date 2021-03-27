import { types, fragment, params } from 'typed-graphqlify';
import ProfileCardFragment from '~/modules/users/graphql/profile-card.fragment';

export default (typeName) => fragment('CommentCardFragment', typeName, {
  id:            types.number,
  branch_id:     types.number,
  parent_id:     types.number,
  user_id:       types.number,
  model_id:      types.number,
  text:          types.string,
  replies_count: types.number,
  created_at:          types.string,
  branch: {
    id:        types.number,
    branch_id: types.number,
    parent_id: types.number,
    user_id:   types.number,
    model_id:  types.number,
    text:      types.string,
    created_at:          types.string,
    user: ProfileCardFragment
  },
  user: ProfileCardFragment
});