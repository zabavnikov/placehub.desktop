const folder = 'posts';

export default [
  { folder, path: '/posts', name: 'posts', component: 'index' },
  { path: '/posts/drafts', name: 'posts.drafts', component: 'drafts' },
  { folder, path: '/posts/:postId(\\d+)/edit', name: 'posts.edit', component: 'form' },
  { path: '/posts/:postId(\\d+)', name: 'posts.show', component: 'show' },
];
