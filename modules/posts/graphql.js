import { USER_FIELDS } from '~/modules/users/graphql';

export const POST = `
  post(id: $postId) {
    id
    user_id
    place_id
    text
    can
    likesCount
    created_at(relative: true)
    hashtags
    images(sizes: "default@resize:auto:640:480") {
      id
      url
      sizes
    }
    like {
      is_liked
    }
    user {
      ${USER_FIELDS}
    }
  }
`;

export const POST_FRAGMENT = `
  id
  user_id
  place_id
  shortText
  likesCount
  hashtags
  can
  created_at(relative: true)
  images(sizes: "default@resize:auto:640:480") {
    id
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

// Mutations
export const CREATE_POST = `
  mutation($input: PostInput!) {
    postForm: createPost(input: $input) {
      ${POST_FRAGMENT}
    }
  }
`;

export const UPDATE_POST = `
  mutation($id: Int!, $input: PostInput!) {
    postForm: updatePost(id: $id, input: $input)
  }
`;

//
// Replies
//
export const POST_REPLY_FRAGMENT = `
  id
  user_id
  place_id
  text
  likesCount
  hashtags
  can
  created_at(relative: true)
  images(sizes: "default@resize:auto:640:480") {
    id
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

export const POST_REPLIES = `
  postReplies(postId: $postId) {
    ${POST_REPLY_FRAGMENT}
  }
`;

export const CREATE_POST_REPLY = `
  mutation($input: PostReplyInput!) {
    postReplyForm: createPostReply(input: $input) {
      ${POST_REPLY_FRAGMENT}
    }
  }
`;

export const UPDATE_POST_REPLY = `
  mutation($id: Int!, $input: PostReplyInput!) {
    postReplyForm: createPostReply(id: $id, input: $input)
  }
`;