import { it, expect} from "vitest";
import { validateLatitude, validateLongitude } from "./validateCoordinates";

it("Validate correct latitude string 'asf.12' ", () => {
  expect(validateLatitude('asf.12')).toBe(false)
})

it("Validate correct latitude string '12.42'", () => {
  expect(validateLatitude('12.42')).toBe(true)
})

it("Validate correct latitude string '120.52'", () => {
  expect(validateLatitude('120.52')).toBe(false)
})

it("Validate correct longitude string 'asf.12' ", () => {
  expect(validateLongitude('asf.12')).toBe(false)
})

it("Validate correct longitude string '12.42'", () => {
  expect(validateLongitude('12.42')).toBe(true)
})

it("Validate correct longitude string '120.52'", () => {
  expect(validateLongitude('120.52')).toBe(true)
})