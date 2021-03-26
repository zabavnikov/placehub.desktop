import { types, fragment } from 'typed-graphqlify';
import ProfileCardFragment from '~/modules/users/graphql/profile-card.fragment';

export default fragment('CommentCardFragment', 'Comment', {
  id:      types.number,
  user_id: types.number,
  model_id: types.number,
  text:    types.string,
  user:    ProfileCardFragment
});