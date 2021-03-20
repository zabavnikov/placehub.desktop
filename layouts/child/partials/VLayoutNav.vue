<template>
  <nav>
    <ul>
      <li><n-link to="/posts/create">Добавить пост</n-link></li>
      <li><n-link to="/places/create">Добавить геообъект</n-link></li>
    </ul>
    <slot name="nav-before"></slot>
    <slot name="nav"></slot>
    <slot name="nav-after"></slot>
  </nav>
</template>
