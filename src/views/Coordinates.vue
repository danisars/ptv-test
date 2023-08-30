<template>
  <v-card>
    <v-card-title>
      <h4>
        Coordinates
      </h4>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-form>
            <CoordinatesInput v-model="coordinates.start" label="Start position" />
            <CoordinatesInput v-model="coordinates.end" label="Destination position" />
          </v-form>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-col cols="auto">
          <v-btn @click="getRoute" color="primary" :disabled="validForm">
            Get route info
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import CoordinatesInput from '@/components/CoordinatesInput.vue'
import { useCoordinatesStore } from "@/stores/coordinates";
import { useRouter } from "vue-router";
import { computed, reactive } from "vue";

const router = useRouter()
const coordinatesStore = useCoordinatesStore()

const coordinates = reactive({
  start: '12.523,34.2512',
  end: '52.3254,25.2135'
})

const validForm = computed(() => {
  return !coordinates.start || !coordinates.end
})
const getRoute = () => {
  coordinatesStore.updateCoordinates(coordinates)

  router.push({
    name: 'about-route'
  })
}
</script>