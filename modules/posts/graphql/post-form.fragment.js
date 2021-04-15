import {fragment, params, rawString, types} from 'typed-graphqlify';
import TagsFragment from '~/modules/tags/graphql/tags.fragment';

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
      sizes: rawString('square')
    }, types.custom()),
  },
  //...PlaceCardFragment,
  tags: TagsFragment,
});