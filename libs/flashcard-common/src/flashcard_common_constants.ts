export const FLASHCARD_REVIEW_TIMES: Record<number, number> = {
  0: 0,
  1: 5,
  2: 25,
  3: 120,
  4: 600,
  5: 3600,
  6: 5 * 3600,
  7: 24 * 3600,
  8: 5 * 24 * 3600,
  9: 25 * 24 * 3600,
  10: 120 * 24 * 3600,
  11: Infinity,
};

// Assumption: the above mapping might change, so that is why I'm making this a bit more complicated,
// to make it resilient for the future by avoiding multiple sources of truth.
export const NO_REVIEW_BIN = Object.keys(FLASHCARD_REVIEW_TIMES)
  .map((key) => parseInt(key, 10))
  .find((key) => FLASHCARD_REVIEW_TIMES[key] === Infinity);

export const MAX_INCORRECT_ANSWERS = 10;
