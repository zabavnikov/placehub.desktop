export default [
  { path: '/places', name: 'places', component: 'index' },
  { path: '/places/create',  name: 'places.create', component: 'form' },
  { path: '/places/:placeId(\\d+)', name: 'places.show', component: 'show/index' },
  { path: '/places/:placeId(\\d+)/edit',  name: 'places.edit', component: 'form' },

  // Страны.
  { path: '/countries', name: 'places.countries', component: 'countries-index' },
];
