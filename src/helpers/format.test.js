import { it, expect} from "vitest";
import { formatTime, formatDistance } from "./format";

it("Format time should display correct 126s", () => {
  expect(formatTime(126)).toBe('2m 6s')
})

it("Format time should display correct 3664s", () => {
  expect(formatTime(3664)).toBe('1h 1m 4s')
})

it("Format distance should display correct 1000m", () => {
  expect(formatDistance(1000)).toBe('1km')
})

it("Format distance should display correct 17443m", () => {
  expect(formatDistance(17443)).toBe('17km 443m')
})