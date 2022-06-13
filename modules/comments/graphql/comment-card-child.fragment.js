
export default fragment('CommentCardChildFragment', 'Comment', {
  id:            types.number,
  user_id:       types.number,
  branch_id:     types.number,
  parent_id:     types.number,
  model_id:      types.number,
  text:          types.string,
  branch_replies_count: types.number,
  replies_count: types.number,
  likes_count: types.number,
  created_at:     params({
    relative: true
  }, types.string),
  images: params({
    sizes: rawString("default@width:1024")
  }, {
    id: types.number,
    url: types.string,
    sizes: types.custom()
  }),
  like: {
    is_liked: types.boolean,
  },
});