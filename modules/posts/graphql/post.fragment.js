import {fragment, params, rawString, types} from 'typed-graphqlify';
import ProfileCardFragment from '~/modules/users/graphql/profile-card.fragment';
import TagsFragment from '~/modules/tags/graphql/tags.fragment';

export default fragment('PostFragment', 'Post', {
  id:           types.number,
  user_id:      types.number,
  place_id:     types.number,
  text:         types.string,
  image_order:  types.string,
  created_at:   types.string,
  images: {
    id:   types.number,
    text: types.string,
    presets: params({
      sizes: rawString('small')
    }, types.custom()),
  },
  like: {
    is_liked: types.boolean
  },
  //...PlaceCardFragment,
  user: ProfileCardFragment,
  tags: TagsFragment,
});