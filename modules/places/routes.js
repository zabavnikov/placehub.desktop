export default [
  { path: '/places', name: 'places', component: 'index' },
  { path: '/places/create/:placeType(regions|localities|poi)?',  name: 'places.create', component: 'form' },
  { path: '/places/:placeType(regions|localities|poi)/:placeId(\\d+)/edit',  name: 'places.edit', component: 'form' },

  // Страны.
  { path: '/countries', name: 'places.countries', component: 'countries-index' },
  { path: '/:placeType(countries|regions|localities|poi)/:placeId(\\d+)', name: 'places.show', component: 'show' },
];
