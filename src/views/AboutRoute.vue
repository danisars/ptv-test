<template>
  <v-card>
    <v-card-title>
      <h4 class="mx-4">
        About route
      </h4>
    </v-card-title>
    <v-card-text>
      <v-row justify="center" align="center" class="mx-1 interval-wrapper">
        <v-col cols="4" lg="3">
          <h3>
            Update interval
          </h3>
        </v-col>
        <v-col cols="3" v-if="editInterval">
          <v-text-field
            v-model="interval"
            @update:focused="hideEditForm"
            @update:modelValue="updateIntervalValue"
            focused
            variant="outlined"
            suffix="s"
            density="compact"
            :hide-details="true"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="auto" v-else>
          <h4 class="cursor-pointer" @click="editInterval = true">
            {{ formatTime(interval) }}
            <v-icon icon="mdi-pencil" size="small"></v-icon>
          </h4>

        </v-col>
        <v-col cols="grow" class="d-flex justify-end">
          <v-icon icon="mdi-refresh" size="large" class="sync-indicator" v-if="!errors"></v-icon>
        </v-col>
      </v-row>
      <v-list v-if="routeInfo" density="compact">
        <v-list-item min-height="32">
          <v-row>
            <v-col cols="4" lg="3">
              <h4 class="mr-4">
                Distance:
              </h4>
            </v-col>
            <v-col>
              <p>
                {{ formatDistance(routeInfo.distance) }}
              </p>
            </v-col>
          </v-row>
        </v-list-item>
        <v-list-item min-height="32">
          <v-row>
            <v-col cols="4" lg="3">
              <h4 class="mr-4">
                Travel Time:
              </h4>
            </v-col>
            <v-col>
              <p>
                {{ formatTime(routeInfo.travelTime) }}
              </p>
            </v-col>
          </v-row>
        </v-list-item>
        <v-list-item min-height="32">
          <v-row>
            <v-col cols="4" lg="3">
              <h4 class="mr-4">
                Traffic Delay:
              </h4>
            </v-col>
            <v-col>
              <p>
                {{ formatTime(routeInfo.trafficDelay) }}
              </p>
            </v-col>
          </v-row>
        </v-list-item>
        <v-alert v-for="(warning, index) in routeInfo.warnings" :key="index" type="warning" class="pa-3 py-2 mx-4 mt-2">
          {{ warning.description }}
        </v-alert>
      </v-list>
      <template v-else-if="errors && errors.length">
        <v-alert v-for="(error, index) in errors" :key="index" type="error" class="pa-3 py-2 mx-4 mt-2">
          {{ error.description }}
        </v-alert>
      </template>
      <v-progress-linear class="my-4 px-4" v-else indeterminate color="primary"></v-progress-linear>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useCoordinatesStore } from "@/stores/coordinates";
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import { getRouteInfo } from "@/repository/PTVRepository";
import { formatTime, formatDistance } from "@/helpers/format";
import { useRouter } from "vue-router";

const router = useRouter()
const coordinatesStore = useCoordinatesStore()

const routeInfo = ref(null)
const errors = ref(null)
let updateInterval
const interval = ref(30)
const editInterval = ref(false)

watch(editInterval, () => {
  if (editInterval.value === true) {
    stopUpdate()
  } else {
    startUpdate()
  }
})

const updateIntervalValue = (newValue) => {
  if (newValue < 30) {
    interval.value = 30
  }
}

const hideEditForm = (focused) => {
  if (!focused) {
    editInterval.value = false
  }
}

const fetchRouteInfo = async () => {
  try {
    const { data } = await getRouteInfo(coordinatesStore.coordinates)
    routeInfo.value = data
  } catch (error) {
    stopUpdate()
    if (error?.response?.data) {
      errors.value = error.response.data?.causes || []
    }
  }
}

const startUpdate = () => {
  if (errors.value) {
    return
  }

  updateInterval = setInterval(() => {
    fetchRouteInfo()
  }, interval.value * 1000)
}

const stopUpdate = () => {
  clearInterval(updateInterval)
}

onMounted(async () => {
  if (!coordinatesStore.coordinates.start || !coordinatesStore.coordinates.end) {
    return router.push({
      name: 'coordinates'
    })
  }

  await fetchRouteInfo()

  startUpdate()
})

onBeforeUnmount(() => {
  stopUpdate()
})
</script>

<style lang="scss">
.sync-indicator {
  animation: infiniteRotate 2s linear infinite;
}

@keyframes infiniteRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.interval-wrapper {
  height: 68px;
}
</style>
