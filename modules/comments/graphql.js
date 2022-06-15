export const COMMENT = `
  id
  user_id
  branch_id
  parent_id
  model_id
  text
  branch_replies_count
  replies_count
  likes_count
  created_at
  like {
    is_liked
  }
  user {
    id
    name
    avatar
  }
  branch {
    id
    user_id
    branch_id
    parent_id
    model_id
    text
    branch_replies_count
    replies_count
    likes_count
    created_at
    like {
      is_liked
    }
    user {
      id
      name
      avatar
    }
  }
`;