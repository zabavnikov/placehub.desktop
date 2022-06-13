import { existsSync, readdirSync } from 'fs';

const routes = [];

// Ищем файл routes.js в каждом модуле, если нашли, то подключаем его.
readdirSync('./modules').forEach(folder => {
  const file = `./modules/${folder}/routes.js`;

  if (existsSync(file)) {
    routes.push(...require(file).default);
  }
});

module.exports = (nuxtRoutes, resolve) => {
  routes.forEach(route => {
    const module = route.name.split('.')[0];

    route.component = resolve(`modules/${module}/pages/${route.component}`);
    route.chunkName = route.name.replace(/\./g, '_');

    nuxtRoutes.push(route);
  });

  return nuxtRoutes;
}