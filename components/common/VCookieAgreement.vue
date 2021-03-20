<template>
  <div class="p-3 fixed left-0 bottom-0" style="width: 440px">
    <div class="bg-white p-3 rounded shadow-lg">
      <h3 class="text-lg font-bold mb-2">Мы используем файлы cookie</h3>
      <div class="post-text">На сайте используются cookie-файлы и другие аналогичные технологии. Если, прочитав это
        сообщение, вы остаетесь на нашем сайте, это означает, что вы не возражаете против использования этих технологий.
      </div>
      <button type="button" class="button button-success mt-3" @click="onClick">Хорошо</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$emit('accepted');
      this.$el.remove();
    }
  }
}
</script>

