import { USER_FIELDS } from '~/modules/users/graphql';

export const POST_FRAGMENT = `
  id
  user_id
  place_id
  shortText
  commentsCount
  likesCount
  is_draft
  created_at(relative: true)
  images(sizes: "default@resize:auto:640:480") {
    id
    text
    url
    sizes
  }
  like {
    is_liked
  }
  user {
    ${USER_FIELDS}
  }
`;

export const GET_POSTS = `
  getPosts(userId: $userId) {
    ${POST_FRAGMENT}
  }
`;