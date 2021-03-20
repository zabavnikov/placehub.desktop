<template>
  <div :class="{'flex items-start space-between': editable}">
    <a :href="url.url" target="_blank" title="Перейти на сайт" rel="nofollow"
       :class="{'flex items-start space-x-3': compact}">
      <div class="flex-shrink-0 mb-3 rounded wh-ratio w-24 bg-center bg-cover"
           :style="{backgroundImage: `url(${url.image})`}"></div>

      <div class="flex space-x-3">
        <div class="flex space-x-3" :class="{['items-center']: !url.description}" title="Перейти на сайт" rel="nofollow">
          <VIcon v-if="!compact" name="external-link" class="flex-shrink-0" stroke="#aaa"
                 :class="{['mt-1']: url.description}"/>
          <div>
            <div class="post-text underline">{{ url.title }}</div>
            <div v-if="url.description" class="post-text mt-2 text-gray-600">{{ url.description }}</div>
            <div class="mt-1 text-xs text-gray-500">{{ url.host }}</div>
          </div>
        </div>
      </div>
    </a>

    <div v-if="editable" class="ml-6">
      <VIcon name="x" class="flex-shrink-0 mt-1 cursor-pointer" @click="$emit('delete')" stroke="red"/>
    </div>
  </div>
</template>

<script>
import VIcon from "~/components/common/VIcon";

export default {
  name: 'VUrl',
  components: {VIcon},
  props: {
    url: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false
    },
    compact: {
      type: Boolean,
      default: true,
    }
  },
}
</script>