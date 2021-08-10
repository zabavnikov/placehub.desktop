import {fragment, params, rawString, types} from 'typed-graphqlify';
import ProfileCardFragment from '~/modules/users/graphql/profile-card.fragment';
import TagsFragment from '~/modules/tags/graphql/tags.fragment';
// import PlaceCardFragment from '~/modules/places/graphql/place-card.graphql';

export default fragment('PostCardFragment', 'Post', {
  id:               types.number,
  user_id:          types.number,
  short_text:       types.string,
  comments_count:   types.number,
  is_draft:         types.boolean,
  image_order:  types.string,
  created_at: params({
    relative: true
  }, types.string),

  images: params({
    sizes: rawString("default@width:1024")
  }, {
    id: types.number,
    text: types.string,
    url: types.string,
    sizes: types.custom()
  }),

  like: {
    is_liked: types.boolean
  },

  user:   ProfileCardFragment,
  tags:   TagsFragment,
  //place:  PlaceCardFragment,
});