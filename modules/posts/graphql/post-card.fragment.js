import {types, fragment, params, rawString} from 'typed-graphqlify';
import ProfileCardFragment from '~/modules/users/graphql/profile-card.fragment';
import TagsFragment from '~/modules/tags/graphql/tags.fragment';

export default fragment('PostCardFragment', 'Post', {
  id:             types.number,
  user_id:        types.number,
  short_text:     types.string,
  image_order:    types.string,
  comments_count: types.number,
  created_at:     params({
    relative: true
  }, types.string),
  images: {
    id: types.number,
    presets: params({
      sizes: rawString('small')
    }, types.custom()),
  },
  user: ProfileCardFragment,
  tags: TagsFragment,
});