import {types, fragment, params, rawString} from 'typed-graphqlify';
import ProfileCardFragment from '~/modules/users/graphql/profile-card.fragment';

export default fragment('CommentCardChildFragment', 'Comment', {
  id:            types.number,
  branch_id:     types.number,
  parent_id:     types.number,
  user_id:       types.number,
  model_id:      types.number,
  text:          types.string,
  replies_count: types.number,
  likes_count: types.number,
  created_at:     params({
    relative: true
  }, types.string),
  images: {
    id:      types.number,
    presets: params({
      sizes: rawString('square')
    }, types.custom()),
  },
  like: {
    user_id: types.number,
    model_id: types.number,
  },
  user: ProfileCardFragment
});