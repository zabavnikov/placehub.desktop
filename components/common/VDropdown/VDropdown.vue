<template>
  <div class="v-dropdown">
    <tippy
      :trigger="trigger"
      interactive
      :placement="placement"
      theme="simple"
      animation="shift-toward"
    >
      <template v-slot:trigger>
        <slot name="trigger">
          <img src="/images/icons/more.svg" width="20" class="block cursor-pointer">
        </slot>
      </template>
      <div class="v-dropdown-content">
        <slot></slot>
      </div>
    </tippy>
  </div>
</template>

<script>
  export default {
    props: {
      trigger: {
        type: String,
        default: 'click',
      },
      placement: {
        type: String,
        default: 'bottom-end'
      }
    }
  }
</script>

<style lang="scss">
  .v-dropdown-content {
    box-shadow: 0 0 24px rgba(0,0,0,.4);
    border-radius: 4px;
    overflow: hidden;
    background-color: #fff;

    a, .dropdown-item {
      cursor: pointer;
      display: block;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: 500;

      &:hover {
        background-color: #ffecb3;
      }
    }
  }
</style>
