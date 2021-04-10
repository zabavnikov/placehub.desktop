import {types, fragment, params, rawString} from 'typed-graphqlify';
import ProfileCardFragment from '~/modules/users/graphql/profile-card.fragment';
import PlaceCardFragment from '~/modules/places/graphql/place-card.fragment';
import TagsFragment from '~/modules/tags/graphql/tags.fragment';

export default fragment('PostFormFragment', 'Post', {
  id:           types.number,
  user_id:      types.number,
  place_id:     types.number,
  text:         types.string,
  images_order:  types.string,
  is_draft:     types.boolean,
  images: {
    id:   types.number,
    text: types.string,
    presets: params({
      sizes: rawString('square')
    }, types.custom()),
  },
  //...PlaceCardFragment,
  tags: TagsFragment,
});