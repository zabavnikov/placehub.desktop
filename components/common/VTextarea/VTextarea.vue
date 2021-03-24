<template>
  <div class="v-textarea">
    <textarea
        :id="id"
        :value="value"
        :rows="rows"
        :autofocus="autofocus"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        @input="$emit('input', $event.target.value)"
        @focus="$emit('focus')"
        @paste="onPaste"
        ref="textarea"
        class="input"
    >
    </textarea>
  </div>
</template>

<script>
// Utils
import regExpUrl from '~/utils/regexp-url';

export default {
  props: {
    id: String,
    value: String,
    placeholder: String,
    maxlength: String,

    rows: {
      type: [String, Number],
      default: 1
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    autofocus: {
      type: Boolean,
      default: false,
    },

    parseUrl: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      parse: false
    }
  },

  watch: {
    value: {
      handler() {
        this.updateHeight();
      },

      immediate: true,
    },

    autofocus(newValue) {
      if (newValue) {
        this.$refs.textarea.focus();
      } else {
        this.$refs.textarea.blur();
      }
    }
  },

  methods: {
    updateHeight() {
      this.$nextTick()
          .then(() => {
            const textarea = this.$refs.textarea;

            if (textarea) {
              textarea.style.height = 'auto';
              textarea.style.height = textarea.scrollHeight + 'px';
            }
          });
    },

    onPaste: function (event) {
      if (this.parse) return;

      let text = event.clipboardData.getData('text');

      if (this.parseUrl === true) {
        const matches = text.match(regExpUrl);

        if (matches) {
          this.$emit('parse-url-progress', this.parse = true);

          this.$refs.textarea.innerText = this.$refs.textarea.innerText.replace(regExpUrl, '');

          this.$axios
              .$post('/api/urls', {
                url: matches[0]
              })
              .then(url => {
                this.$emit('url', url);
              })
              .finally(() => {
                this.$emit('parse-url-progress', this.parse = false);
              });

          event.preventDefault();
        }
      }
    }
  }
}
</script>
