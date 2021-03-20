export default [
  { path: '/reviews/:reviewId(\\d+)', name: 'reviews.show', component: 'show' },
  { path: '/reviews/:placeId(\\d+)/:reviewId(\\d+)/edit', name: 'reviews.edit', component: 'form' },
  { path: '/reviews/create/:placeId(\\d+)', name: 'reviews.create', component: 'form' },
];
