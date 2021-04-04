import {types, fragment, params, rawString} from 'typed-graphqlify';
import ProfileCardFragment from '~/modules/users/graphql/profile-card.fragment';
import CommentCardChildFragment from '~/modules/comments/graphql/comment-card-child.fragment';

export default fragment('CommentCardFragment', 'Comment', {
  id:            types.number,
  user_id:       types.number,
  branch_id:     types.number,
  parent_id:     types.number,
  model_id:      types.number,
  text:          types.string,
  branch_replies_count: types.number,
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
    is_liked: types.boolean,
  },
  branch: CommentCardChildFragment,
  user: ProfileCardFragment
});