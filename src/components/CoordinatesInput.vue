<template>
  <div>
    <v-form ref="coordinates">
      <v-row v-if="label" class="pb-0">
        <v-col class="pb-0">
          {{ label }}
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col>
          <v-text-field
            :modelValue="latitude"
            @update:modelValue="changeLatitudeValue($event)"
            label="Latitude"
            variant="outlined"
            density="compact"
            placeholder=""
            hint="Range: -90 to 90"
            :color="color"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            :modelValue="longitude"
            @update:modelValue="changeLongitudeValue($event)"
            label="Longitude"
            variant="outlined"
            density="compact"
            hint="Range: -180 to 180"
            :color="color"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { validateLongitude, validateLatitude } from "@/helpers/validateCoordinates";

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
})

const latitude = ref(props.modelValue.split(',')[0] || '')
const longitude = ref(props.modelValue.split(',')[1] || '')

const emits = defineEmits(['update:modelValue'])

const changeLatitudeValue = (newValue) => {
  if (newValue.length === 0) {
    return latitude.value = newValue
  }

  if (validateLatitude(newValue)) {
    latitude.value = newValue
  }
}

const changeLongitudeValue = (newValue) => {
  if (newValue.length === 0) {
    return longitude.value = newValue
  }

  if (validateLongitude(newValue)) {
    longitude.value = newValue
  }
}

const updateValue = computed(() => {
  return `${latitude.value},${longitude.value}`
})

const emitUpdateValue = () => {
  if (latitude.value && longitude.value) {
    emits('update:modelValue', updateValue.value)
  }

  if (latitude.value === '' || longitude.value === '') {
    emits('update:modelValue', '')
  }
}

watch(latitude, () => {
  emitUpdateValue()
})

watch(longitude, () => {
  emitUpdateValue()
})
</script>


