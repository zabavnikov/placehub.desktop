import {fragment, params, rawString, types} from 'typed-graphqlify';
import ProfileCardFragment from '~/modules/users/graphql/profile-card.fragment';
import PlaceCardFragment from '~/modules/places/graphql/place-card.graphql';

export default fragment('PostCardFragment', 'Post', {
  id:               types.number,
  user_id:          types.number,
  shortText:       types.string,
  commentsCount:   types.number,
  is_draft:         types.boolean,
  hashtags:     types.custom(),
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

  user:   ProfileCardFragment,
  place:  PlaceCardFragment,
});