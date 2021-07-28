import {fragment, params, rawString, types} from 'typed-graphqlify';
import ProfileCardFragment from '~/modules/users/graphql/profile-card.fragment';
import TagsFragment from '~/modules/tags/graphql/tags.fragment';

export default fragment('PostFragment', 'Post', {
  id:           types.number,
  user_id:      types.number,
  place_id:     types.number,
  text:         types.string,
  created_at: params({
    relative: true
  }, types.string),

  sets: params({
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
  //...PlaceCardFragment,
  user: ProfileCardFragment,
  tags: TagsFragment,
});