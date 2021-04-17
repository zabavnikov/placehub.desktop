import {fragment, params, rawString, types} from 'typed-graphqlify';
import ProfileCardFragment from '~/modules/users/graphql/profile-card.fragment';
import TagsFragment from '~/modules/tags/graphql/tags.fragment';
import PlaceCardFragment from '~/modules/places/graphql/place-card.fragment';

export default fragment('PostCardFragment', 'Post', {
  id:               types.number,
  user_id:          types.number,
  short_text:       types.string,
  image_order:      types.string,
  comments_count:   types.number,
  is_draft:         types.boolean,

  created_at: params({
    relative: true
  }, types.string),

  images: {
    id: types.number,
    presets: params({
      sizes: rawString('small_fill')
    }, types.custom()),
  },

  like: {
    is_liked: types.boolean
  },

  user:   ProfileCardFragment,
  tags:   TagsFragment,
  place:  PlaceCardFragment,
});