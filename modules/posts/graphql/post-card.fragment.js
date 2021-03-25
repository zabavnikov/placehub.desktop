import {types, fragment, params, rawString} from 'typed-graphqlify';
import ProfileCardFragment from '~/modules/users/graphql/profile-card.fragment';

export default fragment('PostCardFragment', 'Post', {
  id:           types.number,
  user_id:      types.number,
  short_text:   types.string,
  image_order:  types.string,
  created_at:   types.string,
  images: {
    id:      types.number,
    presets: params({
      sizes: rawString('small')
    }, types.custom()),
  },
  ...ProfileCardFragment,
});