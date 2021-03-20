<template>
  <div class="flex flex-col min-h-screen mx-auto layout-container">
    <div class="layout">
      <!--<nav class="layout-nav">
        123
      </nav>-->
      <main class="layout-main">
        <section v-if="hasHeroSlot">
          <slot name="hero"></slot>
        </section>

        <div class="mt-4 mb-4">
          <h1 class="font-bold uppercase" v-if="heading">{{ heading }}</h1>
          <h3 style="color: #616161;" v-if="subheading">{{ subheading }}</h3>
        </div>

        <div v-if="$auth.loggedIn && $auth.user.email_verified_at === null" class="p-4 mt-4 bg-red-200">
          На вашу электронную почту мы отправили письмо. Пожалуйста подтвердите, что электронная почта Ваша. Спасибо.
        </div>

        <div :class="{
          'flex min-h-full': true,
          [this.reverse ? 'layout-revers' : 'layout-not-revers']: true
        }">
          <div v-if="hasSidebarSlot" class="layout-sidebar">
            <slot name="sidebar-before"></slot>
            <slot name="sidebar"></slot>
            <slot name="sidebar-after"></slot>
          </div>
          <div class="layout-content">
            <slot name="content-before"></slot>
            <slot name="content"></slot>
            <slot name="content-after"></slot>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    heading: String,
    subheading: String,
    reverse: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    hasHeroSlot() {
      return !!this.$slots['hero'];
    },

    hasSidebarSlot() {
      return !!this.$slots['sidebar-before'] || !!this.$slots['sidebar'] || !!this.$slots['sidebar-after'];
    }
  }
}
</script>

<style lang="scss">
$nav-width: 200px;
$content-width: 540px;
$sidebar-width: 280px;
$column-gap: 40px;

.layout-container {
  width: $content-width + $sidebar-width + $column-gap;
}

.layout {
  display: flex;
  flex: 1;
}

.layout-nav {
  width: $nav-width;
  margin-right: $column-gap;
}

.layout-main {
  width: $content-width + $sidebar-width + $column-gap;
}

.layout-content {
  flex: 1;
}

.layout-sidebar {
  width: $sidebar-width;
  flex-shrink: 0;

  + .layout-content {
    margin-right: $column-gap;
  }
}

.layout-not-revers {
  flex-direction: row-reverse;

  .layout-sidebar + .layout-content {
    margin-right: $column-gap;
  }
}

.layout-revers {
  .layout-sidebar {
    margin-right: $column-gap;
  }
}
</style>
