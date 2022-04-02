import {fragment, params, rawString, types} from 'typed-graphqlify';
import ProfileCardFragment from '~/modules/users/graphql/profile-card.fragment';
import TagsFragment from '~/modules/tags/graphql/tags.fragment';
import PlaceCardFragment from '~/modules/places/graphql/place-card.graphql';

export default fragment('PostFragment', 'Post', {
  id:           types.number,
  user_id:      types.number,
  place_id:     types.number,
  text:         types.string,
  image_order:  types.string,
  created_at: params({
    relative: true
  }, types.string),

  images: params({
    sizes: rawString("default@resize:auto:640:480")
  }, {
    id: types.number,
    text: types.string,
    url: types.string,
    sizes: types.custom()
  }),
  like: {
    is_liked: types.boolean
  },
  place: PlaceCardFragment,
  user: ProfileCardFragment,
  tags: TagsFragment,
});