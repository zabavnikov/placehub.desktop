import {types, fragment, params, rawString} from 'typed-graphqlify';
import ProfileCardFragment from '~/modules/users/graphql/profile-card.fragment';
import PlaceCardFragment from '~/modules/places/graphql/place-card.fragment';
import TagsFragment from '~/modules/tags/graphql/tags.fragment';

export default fragment('PostFragment', 'Post', {
  id:           types.number,
  user_id:      types.number,
  place_id:     types.number,
  short_text:   types.string,
  image_order:  types.string,
  created_at:   types.string,
  images: {
    id:      types.number,
    presets: params({
      sizes: rawString('small')
    }, types.custom()),
  },
  //...PlaceCardFragment,
  user: ProfileCardFragment,
  ...TagsFragment,
});