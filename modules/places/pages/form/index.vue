<template>
  <the-layout :heading="heading">
    <template #sidebar>
      <ul>
        <li class="mt-4">Вы можете редактировать свои места, которые <i>еще не были подтверждены</i> администратором.
        </li>
        <li class="mt-4">Поле подтверждения места, редактировать его может только администратор.</li>
      </ul>
    </template>

    <template #content>
      <div v-if="! place.type" class="space-y-6">
        <n-link to="/places/create/regions" class="flex items-start space-x-4 bg-white shadow-md rounded p-4">
          <img src="/images/icons/places/earth.svg" width="52px" alt="">
          <div>
            <h3 class="text-lg font-bold text-gray-700">Добавить регион</h3>
            <div class="help mt-1">
              В том числе город федерального значения, область, республика, край, автономный округ,
              автономная область, штат, провинция и т.д.
            </div>
          </div>
        </n-link>

        <n-link to="/places/create/localities" class="flex items-start space-x-4 bg-white shadow-md rounded p-4">
          <img src="/images/icons/places/asia.svg" width="52px" alt="">
          <div>
            <h3 class="text-lg font-bold text-gray-700">Добавить населенный пункт</h3>
            <div class="help mt-1">
              Перед добавлением населенного пункта убедитесь, что существует регион в котором находиться этот населенный
              пункт.
              Если регион не существует, сначала создайте его.
            </div>
          </div>
        </n-link>

        <n-link to="/places/create/poi" class="flex items-start space-x-4 bg-white shadow-md rounded p-4">
          <img src="/images/icons/places/pin.svg" width="52px" alt="">
          <div>
            <h3 class="text-lg font-bold text-gray-700">Добавить место</h3>
            <div class="help mt-1">
              Перед добавлением места убедитесь, что существует населенный пункт или регион в котором находиться это
              место.
              Если населенный пункт или регион не существует, сначала создайте их.
            </div>
          </div>
        </n-link>
      </div>

      <form v-else @submit.prevent="onSubmit" autocomplete="off" class="space-y-4">
        <div>
          <label class="label"><span v-html="parentLabel"></span> <span class="asterisk"></span></label>
          <place-search
              :value="place.parent_names"
              :only="only"
              @select="place.parent_id = $event.id; place.lat = $event.lat; place.lng = $event.lng"></place-search>
        </div>

        <div v-if="place.type === 'localities'">
          <label for="locality-type-id" class="label">Тип населенного пункта <span class="asterisk"></span></label>
          <select v-model="place.category_id" id="locality-type-id" class="input">
            <option v-for="localityType in categories" :value="localityType.id" :key="localityType.id">{{
                localityType.name
              }}
            </option>
          </select>

          <!-- <label for="is-capital" class="label flex items-center mt-1">
             <input v-model="place.is_capital" id="is-capital" type="checkbox">
             <span class="ml-1">Населенный пункт является столицей?</span>
           </label>-->
        </div>

        <div v-if="place.type === 'poi'">
          <label for="poi-category-id" class="label">Категория места <span class="asterisk"></span></label>
          <select v-model="place.category_id" id="poi-category-id" class="input">
            <optgroup v-for="category in categories" :value="category.id" :key="category.id" :label="category.name">
              <option v-for="childCategory in category.categories" :value="childCategory.id" :key="childCategory.id">
                {{ childCategory.name }}
              </option>
            </optgroup>
          </select>
        </div>

        <div>
          <label for="name" class="label">{{ inputName }} <span class="asterisk"></span></label>
          <input type="text" class="input" id="name" v-model="place.name">
        </div>

        <div>
          <label class="label">Где на карте? <span class="asterisk"></span></label>
          <div class="help">Передвиньте маркер на карте, чтобы указать координаты места.</div>
          <v-map
              :lat-lng="[place.lat, place.lng]"
              :zoom="place.zoom"
              :name="place.parent_names"
              draggable
              clickable
              style="height: 480px;"
              class="mt-2 rounded overflow-hidden"
              @zoom="place.zoom = $event"
              @select="place.parent_id = $event.id"
              @dragend="place.lat = $event[0]; place.lng = $event[1]"
          >
          </v-map>
        </div>

        <div class="mt-6">
          <button type="button" @click="confirmDialog = true" class="button button-success">Продолжить</button>
        </div>

        <v-overlay v-if="confirmDialog" @close="confirmDialog = false">
          <div class="p-4 bg-white rounded" style="width: 320px;">
            Нажмите кнопку <b>{{ isEdit ? 'Сохранить' : 'Создать' }}</b>, если вся информация заполенена верно.
            <hr class="my-4">
            <div class="flex justify-end space-x-2">
              <button class="button" @click="confirmDialog = false">Отмена</button>
              <button class="button button-success">{{ isEdit ? 'Сохранить' : 'Создать' }}</button>
            </div>
          </div>
        </v-overlay>
      </form>
    </template>
  </the-layout>
</template>

<script>
import Page from '~/modules/places/pages/form/composables/page';

export default {
  mixins: [Page]
}
</script>
