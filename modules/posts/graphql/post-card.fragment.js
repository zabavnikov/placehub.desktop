import {types, fragment, params, rawString} from 'typed-graphqlify';
import ProfileCardFragment from '~/modules/users/graphql/profile-card.fragment';

export default fragment('PostCardFragment', 'Post', {
  id:           types.number,
  user_id:      types.number,
  short_text:   types.string,
  image_order:  types.string,
  images: params({
    ordered: true,
  }, {
    id:      types.number,
    presets: {
      small: types.string
    },
    // добавить image preset field
    // params({names: ['small'])}
  }),
  ...ProfileCardFragment,
});