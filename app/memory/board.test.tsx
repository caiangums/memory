import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { Board } from "./board";
import { ITEMS } from "./constants";

describe("Board", () => {
  it("renders the Board", () => {
    render(<Board />);

    expect(screen.getByLabelText("Memory Board")).toBeInTheDocument();

    expect(
      screen.getByText("Find all the matching pair of cards.")
    ).toBeInTheDocument();
    expect(screen.getByText("Cards Found: 0")).toBeInTheDocument();
    expect(screen.getByText("Moves: 0")).toBeInTheDocument();
    expect(screen.queryByText("End of Game!")).not.toBeInTheDocument();
    expect(screen.getByText("Reset Game")).toBeInTheDocument();

    expect(screen.queryAllByLabelText("Memory Card")).toHaveLength(20);
  });

  describe("on card clicks", () => {
    const user = userEvent.setup();

    describe("and matching cards", () => {
      it("increase the found card counter and count moves", async () => {
        render(<Board />);

        const cardText = ITEMS[0];

        const matchingTextCards = screen.queryAllByText(cardText);

        for (const card of matchingTextCards) {
          await user.click(card);
        }

        expect(await screen.findByText("Cards Found: 2")).toBeInTheDocument();
        expect(await screen.findByText("Moves: 2")).toBeInTheDocument();
      });
    });

    describe("and no matching cards", () => {
      it("keeps the found card counter at same value and count moves", async () => {
        render(<Board />);

        const [cardTextFirst, cardTextSecond] = ITEMS;
        const [matchingTextCardFirst] = screen.queryAllByText(cardTextFirst);
        const [matchingTextCardSecond] = screen.queryAllByText(cardTextSecond);

        await user.click(matchingTextCardFirst);
        await user.click(matchingTextCardSecond);

        expect(await screen.findByText("Cards Found: 0")).toBeInTheDocument();
        expect(await screen.findByText("Moves: 2")).toBeInTheDocument();
      });
    });
  });
});
