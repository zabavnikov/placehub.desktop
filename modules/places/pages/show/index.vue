<template>
  <the-layout :heading="place.name" wide>
    <template #content>
      <VMap :lat-lng="[place.lat, place.lng]" :zoom="place.zoom" class="rounded overflow-hidden"
             style="height: 200px;" />

<!--      <div class="flex space-x-2 mt-4">
        <div>
          <n-link
              v-if="place.type === 'localities' || place.type === 'poi'"
              :to="`/reviews/create/${place.id}`"
              class="button button-success">Добавить отзыв
          </n-link>
        </div>
        <div>
          <button
              @click="$overlay.toggle('images-upload')"
              type="button"
              class="button button-success p-2">Добавить фотографии</button>
        </div>
      </div>

      <div class="mt-4">
        <h2 class="text-2xl">
          <n-link :to="`/images?placeId=${place.id}`" class="inline-block" title="Нажмите для просмотра всех фотографий места">
            <div class="underline">Фотографии</div>
            <div class="help">Смотреть все фотографии</div>
          </n-link>
        </h2>
        <ImagesGallery linkable :images="images" class="mt-4"/>
      </div>

      <div v-if="place.type === 'localities' || place.type === 'poi'" class="mt-4">
        <h2 class="text-2xl">
          <n-link to="/" class="inline-block" title="Нажмите для просмотра всех отзывов о месте">
            <div class="underline">Отзывы</div>
            <div class="help">Смотреть все отзывы</div>
          </n-link>
        </h2>

        <div class="space-y-2 mt-4">
          <div v-for="review in reviews.data">
            <v-review :key="review.id" :content="review"></v-review>
            <hr class="my-4">
          </div>
        </div>
      </div>-->
    </template>
  </the-layout>
</template>

<script>
import PlacesPageShow from '~/modules/places/pages/show';
import VReview from "~/modules/reviews/_desktop/components/VReview";
import VMap from "~/modules/places/components/VMap";
import ImagesGallery from "~/modules/images/components/ImagesGallery";

export default {
  mixins: [PlacesPageShow],
  components: {VReview, ImagesGallery, VMap}
}
</script>
