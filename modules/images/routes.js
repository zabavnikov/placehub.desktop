export default [
  { path: '/images', name: 'images', component: 'index' },
  { path: '/images/:imageId(\\d+)', name: 'images.show', component: 'show' },
  { path: '/images/:imageId(\\d+)/edit', name: 'images.edit', component: 'form' },
];