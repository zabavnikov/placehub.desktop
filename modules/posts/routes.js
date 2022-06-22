export default [
  { path: '/posts', name: 'posts', component: 'index' },
  { path: '/posts/:postId(\\d+)', name: 'posts.show', component: 'show' },
];
