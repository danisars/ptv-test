import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCoordinatesStore = defineStore('coordinates', () => {
  const coordinates = reactive({
    start: '',
    end: '',
  })

  const updateCoordinates = (newCoordinates) => {
    Object.assign(coordinates, newCoordinates)
  }

  return { coordinates, updateCoordinates }
})
