import { shuffle, isGameOver } from "./utils";
import { ITEMS } from "./constants";

describe("Utils", () => {
  describe("shuffle function", () => {
    const strArray = "abcdefgh".split("");
    const originalStrArray = [...strArray];

    it("shuffles the array", () => {
      const shuffled = shuffle(strArray);

      expect(shuffled.join("")).not.toEqual(strArray.join(""));
    });

    it("keeps the resulting array the same size", () => {
      const shuffled = shuffle(strArray);

      expect(shuffled).toHaveLength(strArray.length);
    });

    it("does not change the original array", () => {
      shuffle(strArray);

      expect(strArray.join("")).toEqual(originalStrArray.join(""));
    });
  });

  describe("isGameOver function", () => {
    const allCards = [...ITEMS];

    it("returns false if empty array is sent", () => {
      const isOver = isGameOver([]);

      expect(isOver).toBeFalsy();
    });

    it("returns false if less than all cards have been found", () => {
      const lessCards = allCards.slice(0, ITEMS.length - 4);
      const isOver = isGameOver(lessCards);

      expect(isOver).toBeFalsy();
    });

    it("returns true if all cards have been found", () => {
      const isOver = isGameOver(allCards);

      expect(isOver).toBeTruthy();
    });
  });
});
