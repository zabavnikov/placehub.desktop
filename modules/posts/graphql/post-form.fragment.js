import {fragment, params, rawString, types} from 'typed-graphqlify';
import TagsFragment from '~/modules/tags/graphql/tags.fragment';
import PlaceCardGraphQL from '~/modules/places/graphql/place-card.graphql'

export default fragment('PostFormFragment', 'Post', {
  id:           types.number,
  user_id:      types.number,
  place_id:     types.number,
  text:         types.string,
  image_order:  types.string,
  is_draft:     types.boolean,
  images: {
    id:   types.number,
    text: types.string,
    presets: params({
      sizes: rawString('small_fill')
    }, types.custom()),
  },
  place: PlaceCardGraphQL,
  tags: TagsFragment,
});