/* eslint-disable no-undef */
import { sum } from "./Sum";

test("adds 3 + 2 to equal 3", () => {
  const result = sum(3, 2);
  expect(result).toEqual(5);
});
